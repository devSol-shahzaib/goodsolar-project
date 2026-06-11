export interface Appliance {
  id: string;
  name: string;
  wattage: number;
  defaultHours: number;
  icon?: string;
}

export const appliances: Appliance[] = [
  {
    id: "ac-1",
    name: "AC (1-ton)",
    wattage: 1300,
    defaultHours: 8,
  },
  {
    id: "ac-1.5",
    name: "AC (1.5-ton)",
    wattage: 1800,
    defaultHours: 8,
  },
  {
    id: "ac-2",
    name: "Air Conditioner (2-ton)",
    wattage: 2400,
    defaultHours: 8,
  },
  { id: "fan", name: "Ceiling Fan", wattage: 75, defaultHours: 12 },
  {
    id: "led-light",
    name: "LED Light (per room)",
    wattage: 20,
    defaultHours: 6,
  },
  { id: "fridge", name: "Refrigerator", wattage: 150, defaultHours: 24 },
  { id: "tv", name: "LED TV", wattage: 100, defaultHours: 4 },
  {
    id: "washing-machine",
    name: "Washing Machine",
    wattage: 500,
    defaultHours: 1,
  },
  { id: "water-pump", name: "Water Pump", wattage: 750, defaultHours: 1 },
  { id: "microwave", name: "Microwave", wattage: 1000, defaultHours: 0.5 },
  { id: "ups", name: "Inverter/UPS Overhead", wattage: 200, defaultHours: 24 },
];
