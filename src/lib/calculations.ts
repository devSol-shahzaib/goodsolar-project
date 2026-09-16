import { Country, City } from "./data/locations";
import { Appliance } from "./data/appliances";
import { basePricing, Pricing, PriceRange } from "./data/pricing";

export interface UserAppliance extends Appliance {
  quantity: number;
  hoursPerDay: number;
}

export interface CalculationInput {
  country: Country;
  city: City;
  appliances: UserAppliance[];
  systemType: "on-grid" | "off-grid" | "hybrid";
  batteryBackupHours: number;
  budgetRange: [number, number];
}

export interface CostItem {
  name: string;
  spec: string;
  min: number;
  max: number;
}

export interface CalculationResult {
  totalLoadW: number;
  dailyConsumptionKWh: number;
  monthlyUnits: number;
  systemSizeKW: number;
  numPanels: number;
  inverterSizeKW: number;
  batteryKWh: number;
  numBatteries: number;
  costs: CostItem[];
  totalCost: PriceRange;
  monthlySavings: number;
  paybackYears: number;
}

export function calculateSolarSystem(input: CalculationInput): CalculationResult {
  const { country, city, appliances, systemType, batteryBackupHours } = input;
  const exchangeRate = country.exchangeRateToPKR;

  // 1. Load Summary
  let totalLoadW = 0;
  let dailyConsumptionKWh = 0;

  appliances.forEach((app) => {
    const load = app.wattage * app.quantity;
    totalLoadW += load;
    dailyConsumptionKWh += (load * app.hoursPerDay) / 1000;
  });

  const monthlyUnits = dailyConsumptionKWh * 30;

  // 2. System Size
  // Formula: (daily_kWh * 1.25 loss factor) / peak_sun_hours
  const systemSizeKW = (dailyConsumptionKWh * 1.25) / city.peakSunHours;
  const numPanels = Math.ceil((systemSizeKW * 1000) / 550);
  // An inverter is a power device, so what constrains it is the peak load passing
  // through it — not the daily energy the panels have to replace. Sizing it from
  // `systemSizeKW` under-specs it whenever appliances run for few hours a day: a
  // 1.8kW air conditioner used 2h/day gives a 0.82kW system size, and the report
  // then recommended a 1kW inverter for an 1800W load, which trips on startup.
  //
  // Size against peak load with headroom for motor-start surge (compressors and
  // pumps draw several times their running current for a moment), and never below
  // what the array itself can deliver — the opposite case is a house of continuous
  // low-power loads whose energy requirement outruns its instantaneous draw.
  const INVERTER_SURGE_HEADROOM = 1.2;
  const inverterSizeKW = Math.ceil(
    Math.max((totalLoadW * INVERTER_SURGE_HEADROOM) / 1000, systemSizeKW),
  );

  // 3. Battery Recommendation
  // For simplicity, assume 12V 200Ah batteries (2.4kWh each)
  // Required kWh = totalLoadW * backupHours / 1000 (rough estimate)
  // Or more accurately: dailyConsumptionKWh * (backupHours / 24)
  const batteryKWh = dailyConsumptionKWh * (batteryBackupHours / 24) * 1.2; // 1.2 safety factor
  const numBatteries = batteryBackupHours > 0 ? Math.ceil(batteryKWh / 2.4) : 0;

  // 4. Costs (adjusted by exchange rate)
  const pricing: Pricing = {
    ...basePricing,
    panelPerWatt: {
      min: basePricing.panelPerWatt.min / exchangeRate,
      max: basePricing.panelPerWatt.max / exchangeRate,
    },
    inverterPerKW: {
      min: basePricing.inverterPerKW.min / exchangeRate,
      max: basePricing.inverterPerKW.max / exchangeRate,
    },
    battery200AhLithium: {
      min: basePricing.battery200AhLithium.min / exchangeRate,
      max: basePricing.battery200AhLithium.max / exchangeRate,
    },
    mountingWiringFlat: {
      min: basePricing.mountingWiringFlat.min / exchangeRate,
      max: basePricing.mountingWiringFlat.max / exchangeRate,
    },
    installation: {
      min: basePricing.installation.min / exchangeRate,
      max: basePricing.installation.max / exchangeRate,
    },
    electricityRatePerUnit: basePricing.electricityRatePerUnit / exchangeRate,
  };

  const costs: CostItem[] = [
    {
      name: "Solar Panels",
      spec: `${numPanels} × 550W Tier-1`,
      min: numPanels * 550 * pricing.panelPerWatt.min,
      max: numPanels * 550 * pricing.panelPerWatt.max,
    },
    {
      name: "Inverter",
      spec: `${inverterSizeKW}kW ${systemType}`,
      min: inverterSizeKW * pricing.inverterPerKW.min,
      max: inverterSizeKW * pricing.inverterPerKW.max,
    },
  ];

  if (numBatteries > 0) {
    costs.push({
      name: "Battery Bank",
      spec: `${numBatteries} × 200Ah Lithium`,
      min: numBatteries * pricing.battery200AhLithium.min,
      max: numBatteries * pricing.battery200AhLithium.max,
    });
  }

  costs.push({
    name: "Mounting + Wiring",
    spec: "Structure & Cables",
    min: pricing.mountingWiringFlat.min,
    max: pricing.mountingWiringFlat.max,
  });

  costs.push({
    name: "Installation",
    spec: "Professional Setup",
    min: pricing.installation.min,
    max: pricing.installation.max,
  });

  const totalCostMin = costs.reduce((sum, item) => sum + item.min, 0);
  const totalCostMax = costs.reduce((sum, item) => sum + item.max, 0);

  // 5. Savings & Payback
  const monthlySavings = monthlyUnits * pricing.electricityRatePerUnit;
  const yearlySavings = monthlySavings * 12;
  const avgTotalCost = (totalCostMin + totalCostMax) / 2;
  const paybackYears = yearlySavings > 0 ? avgTotalCost / yearlySavings : 0;

  return {
    totalLoadW,
    dailyConsumptionKWh,
    monthlyUnits,
    systemSizeKW,
    numPanels,
    inverterSizeKW,
    batteryKWh,
    numBatteries,
    costs,
    totalCost: { min: totalCostMin, max: totalCostMax },
    monthlySavings,
    paybackYears,
  };
}
