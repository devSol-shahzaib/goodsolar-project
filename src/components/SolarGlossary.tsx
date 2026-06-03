"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Sun, Battery, Settings2, ShieldCheck, TrendingUp, Info, LucideIcon } from "lucide-react";

interface GlossaryItem {
  term: string;
  definition: string;
  icon?: LucideIcon;
  expense?: string;
  benefit?: string;
}

interface GlossarySection {
  title: string;
  icon: LucideIcon;
  items: GlossaryItem[];
}

export function SolarGlossary() {
  const sections: GlossarySection[] = [
    {
      title: "Core Concepts",
      icon: Info,
      items: [
        {
          term: "1 Unit (kWh)",
          definition: "1 Unit = Running a 1000W appliance (like a large iron or toaster) for 1 hour.",
          icon: Zap,
        },
        {
          term: "kW (Kilowatt)",
          definition: "The 'size' or 'power' of your system. Like the horsepower of a car.",
          icon: TrendingUp,
        },
        {
          term: "kWh (Kilowatt-hour)",
          definition: "The 'amount' of energy used over time. Like the fuel in your tank.",
          icon: Battery,
        },
      ],
    },
    {
      title: "System Types",
      icon: Settings2,
      items: [
        {
          term: "On-Grid / WAPDA-Connected",
          definition: "Connected to the main power lines. You can sell extra electricity back to WAPDA.",
        },
        {
          term: "Off-Grid",
          definition: "Completely independent. No connection to WAPDA. Uses batteries for all power.",
        },
        {
          term: "Hybrid",
          definition: "Connected to WAPDA but also has batteries. Best for areas with frequent power cuts.",
        },
      ],
    },
    {
      title: "Solar Panel Types",
      icon: Sun,
      items: [
        {
          term: "Monocrystalline",
          definition: "High efficiency, works better in low light.",
          expense: "$$$",
          benefit: "High efficiency & durability",
        },
        {
          term: "Polycrystalline",
          definition: "Older tech, cheaper but needs more space.",
          expense: "$",
          benefit: "Budget friendly",
        },
        {
          term: "Bifacial",
          definition: "Modern panels that catch light from both sides. Best for rooftops.",
          expense: "$$$$",
          benefit: "Maximum power generation",
        },
      ],
    },
    {
      title: "Battery Types",
      icon: Battery,
      items: [
        {
          term: "Lead-Acid (Deep Cycle)",
          definition: "Traditional, heavy batteries.",
          expense: "$",
          benefit: "Low upfront cost",
        },
        {
          term: "Tubular",
          definition: "Very common in Pakistan, reliable for UPS.",
          expense: "$$",
          benefit: "Durable for long power cuts",
        },
        {
          term: "Lithium-Ion (LiFePO4)",
          definition: "Modern, light, fast charging.",
          expense: "$$$$",
          benefit: "Lasts 10+ years, no maintenance",
        },
      ],
    },
    {
      title: "Installation & Mounting",
      icon: ShieldCheck,
      items: [
        {
          term: "L2 Frame",
          definition: "A standard mounting structure that holds 2 panels side-by-side. Most common for flat roofs.",
        },
        {
          term: "L3 / L4 Frame",
          definition: "Larger structures for 3 or 4 panels. Used to maximize space on smaller roofs.",
        },
        {
          term: "Elevated Structure",
          definition: "A 'raised' frame (usually 6-10 feet high) that lets you use the roof space underneath for sitting or storage.",
        },
        {
          term: "Earthing (Grounding)",
          definition: "A safety wire buried in the ground to protect your expensive solar equipment from lightning and surges.",
        },
      ],
    },
    {
      title: "Net Metering",
      icon: TrendingUp,
      items: [
        {
          term: "Net Metering",
          definition: "A special meter that tracks how much electricity you give to WAPDA and subtracts it from your bill.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-zinc-900 tracking-tight font-heading">Solar Information</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
          Learn the common terms used in the solar industry in simple, everyday language.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <Card key={idx} className="border-zinc-200 shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <section.icon className="w-5 h-5 text-emerald-700" />
                </div>
                <CardTitle className="text-xl font-bold text-zinc-900">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow space-y-6">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-bold text-zinc-900 flex items-center gap-2">
                      {item.icon && <item.icon className="w-4 h-4 text-emerald-600" />}
                      {item.term}
                    </h4>
                    {item.expense && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-bold">
                        Expense: {item.expense}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">{item.definition}</p>
                  {item.benefit && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
                      <ShieldCheck className="w-3 h-3" />
                      Benefit: {item.benefit}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
