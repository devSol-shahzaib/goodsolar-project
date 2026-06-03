"use client";

import { CalculationInput, calculateSolarSystem } from "@/lib/calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Sun, Battery, MapPin, CheckCircle, TrendingUp } from "lucide-react";

interface SummarySidebarProps {
  input: CalculationInput;
}

export function SummarySidebar({ input }: SummarySidebarProps) {
  const result = calculateSolarSystem(input);
  const { country, city } = input;

  return (
    <Card className="sticky top-24 border-zinc-200 shadow-xl shadow-zinc-200/50 hidden lg:block overflow-hidden rounded-2xl">
      <CardHeader className="bg-zinc-900 py-6">
        <CardTitle className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Live Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Location</p>
          <div className="flex items-center gap-3 text-sm font-semibold text-zinc-900">
            <div className="bg-zinc-100 p-1.5 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-zinc-600" />
            </div>
            {city ? `${city.name}, ${country.name}` : "Not selected"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Total Load</p>
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-900">
              <div className="bg-amber-100 p-1.5 rounded-lg">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="font-number">{result.totalLoadW}W</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Daily Energy</p>
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-900">
              <div className="bg-blue-100 p-1.5 rounded-lg">
                <Sun className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="font-number">{result.dailyConsumptionKWh.toFixed(1)}kWh</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold">Recommended System</p>
          <div className="flex items-center gap-3 text-base font-bold text-emerald-900">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-number">{result.systemSizeKW.toFixed(1)} kW</span>
          </div>
        </div>

        {input.batteryBackupHours > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Backup Duration</p>
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-900">
              <div className="bg-purple-100 p-1.5 rounded-lg">
                <Battery className="w-3.5 h-3.5 text-purple-600" />
              </div>
              {input.batteryBackupHours} Hours
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-zinc-100">
          <div className="flex justify-between items-end mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Est. Investment</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-zinc-900 font-number tracking-tighter">
              {country.currencySymbol} {result.totalCost.min.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 font-medium mt-1 uppercase tracking-wider">Starting from</p>
        </div>
      </CardContent>
    </Card>
  );
}
