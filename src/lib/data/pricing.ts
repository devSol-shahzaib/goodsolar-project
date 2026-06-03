export interface PriceRange {
  min: number;
  max: number;
}

export interface Pricing {
  panelPerWatt: PriceRange;
  inverterPerKW: PriceRange;
  battery200AhLithium: PriceRange;
  mountingWiringFlat: PriceRange;
  installation: PriceRange;
  electricityRatePerUnit: number;
}

// Base pricing for Pakistan (PKR)
export const basePricing: Pricing = {
  panelPerWatt: { min: 40, max: 50 }, // 22,000-28,000 for 550W
  inverterPerKW: { min: 18000, max: 25000 },
  battery200AhLithium: { min: 45000, max: 60000 },
  mountingWiringFlat: { min: 15000, max: 25000 },
  installation: { min: 10000, max: 20000 },
  electricityRatePerUnit: 50,
};
