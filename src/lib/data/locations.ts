export interface City {
  name: string;
  peakSunHours: number;
  netMeteringAvailable: boolean;
  recommendation?: string;
}

export interface Country {
  name: string;
  currency: string;
  currencySymbol: string;
  gridTerm: string;
  exchangeRateToPKR: number; // For proportional cost adjustment
  cities: City[];
}

export const countries: Country[] = [
  {
    name: "Pakistan",
    currency: "PKR",
    currencySymbol: "Rs.",
    gridTerm: "WAPDA",
    exchangeRateToPKR: 1,
    cities: [
      { name: "Karachi", peakSunHours: 5.5, netMeteringAvailable: true, recommendation: "High heat load — inverter AC strongly recommended" },
      { name: "Lahore", peakSunHours: 5.2, netMeteringAvailable: true, recommendation: "Smog in winter reduces output, plan for 10% extra panels" },
      { name: "Islamabad", peakSunHours: 5.0, netMeteringAvailable: true, recommendation: "Good year-round performance, net metering highly recommended" },
      { name: "Rawalpindi", peakSunHours: 5.0, netMeteringAvailable: true },
      { name: "Faisalabad", peakSunHours: 5.3, netMeteringAvailable: true },
      { name: "Multan", peakSunHours: 5.6, netMeteringAvailable: true, recommendation: "Extreme summer heat — ensure proper ventilation for inverters" },
      { name: "Hyderabad", peakSunHours: 5.7, netMeteringAvailable: true },
      { name: "Gujranwala", peakSunHours: 5.1, netMeteringAvailable: true },
      { name: "Peshawar", peakSunHours: 5.1, netMeteringAvailable: true },
      { name: "Quetta", peakSunHours: 6.0, netMeteringAvailable: true, recommendation: "Cold winters reduce AC load but panels perform exceptionally well" },
      { name: "Sargodha", peakSunHours: 5.2, netMeteringAvailable: true },
      { name: "Sialkot", peakSunHours: 5.1, netMeteringAvailable: true },
      { name: "Bahawalpur", peakSunHours: 5.8, netMeteringAvailable: true },
      { name: "Sukkur", peakSunHours: 5.9, netMeteringAvailable: true },
      { name: "Jhang", peakSunHours: 5.3, netMeteringAvailable: true },
      { name: "Sheikhupura", peakSunHours: 5.1, netMeteringAvailable: true },
      { name: "Larkana", peakSunHours: 5.7, netMeteringAvailable: true },
      { name: "Mardan", peakSunHours: 5.0, netMeteringAvailable: true },
      { name: "Gujrat", peakSunHours: 5.1, netMeteringAvailable: true },
      { name: "Rahim Yar Khan", peakSunHours: 5.7, netMeteringAvailable: true },
      { name: "Sahiwal", peakSunHours: 5.3, netMeteringAvailable: true },
      { name: "Okara", peakSunHours: 5.2, netMeteringAvailable: true },
      { name: "Wah Cantonment", peakSunHours: 5.0, netMeteringAvailable: true },
      { name: "Dera Ghazi Khan", peakSunHours: 5.6, netMeteringAvailable: true },
    ],
  },
];
