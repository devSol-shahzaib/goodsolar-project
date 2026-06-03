"use client";

import { CalculationResult, CalculationInput } from "@/lib/calculations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Zap, Sun, DollarSign, TrendingUp, RefreshCcw, CheckCircle2 } from "lucide-react";

interface ResultsBreakdownProps {
  result: CalculationResult;
  input: CalculationInput;
  onRecalculate: () => void;
}

export function ResultsBreakdown({
  result,
  input,
  onRecalculate,
}: ResultsBreakdownProps) {
  const { country, city } = input;
  const currencySymbol = country.currencySymbol;
  const gridTerm = country.gridTerm || "Grid";

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      {/* 1. Load Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Zap, label: "Connected Load", value: `${result.totalLoadW} W`, color: "emerald" },
          { icon: Sun, label: "Daily Consumption", value: `${result.dailyConsumptionKWh.toFixed(1)} kWh`, color: "amber" },
          { icon: TrendingUp, label: "Monthly Units", value: `${result.monthlyUnits.toFixed(0)} kWh`, color: "blue" }
        ].map((item, i) => (
          <Card key={i} className="border-zinc-200 shadow-sm overflow-hidden group hover:border-zinc-300 transition-colors">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <CardDescription className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">{item.label}</CardDescription>
              </div>
              <CardTitle className="text-3xl font-bold text-zinc-900 font-number tracking-tight">{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* 2. Recommended System */}
      <Card className="border-zinc-200 shadow-xl shadow-zinc-200/50 overflow-hidden rounded-3xl">
        <div className="bg-zinc-900 px-8 py-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] mb-3">Professional Recommendation</p>
            <h3 className="text-4xl font-bold flex items-center gap-4 font-heading tracking-tight">
              {result.systemSizeKW.toFixed(1)} kW System
            </h3>
            <p className="text-zinc-400 mt-4 max-w-lg leading-relaxed">
              Based on your {city.name} location and appliance load, this configuration offers the best balance of performance and ROI.
            </p>
          </div>
          <Sun className="absolute -right-12 -top-12 w-64 h-64 text-white/5 sun-rays" />
        </div>
        <CardContent className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { label: "Solar Panels", value: `${result.numPanels} Panels`, sub: "550W Tier-1 Mono PERC" },
              { label: "Inverter Size", value: `${result.inverterSizeKW} kW`, sub: `${input.systemType === 'on-grid' ? 'On-' + gridTerm : input.systemType === 'off-grid' ? 'Off-' + gridTerm : 'Hybrid'} Inverter` },
              { label: "Battery Bank", value: result.numBatteries > 0 ? `${result.numBatteries} Batteries` : "None", sub: result.numBatteries > 0 ? `${result.batteryKWh.toFixed(1)} kWh Total Backup` : `On-${gridTerm} system` }
            ].map((spec, i) => (
              <div key={i} className="space-y-3">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{spec.label}</p>
                <p className="text-2xl font-bold text-zinc-900 font-heading">{spec.value}</p>
                <p className="text-sm font-medium text-zinc-500">{spec.sub}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Cost Estimate Table */}
      <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-2xl">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 p-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-700" />
                </div>
                Investment Breakdown
              </CardTitle>
              <CardDescription className="mt-2 text-zinc-500">
                Estimated market rates in {country.name} ({currencySymbol}).
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-zinc-100">
                <TableHead className="px-8 py-4 font-bold text-zinc-400 uppercase text-[10px] tracking-widest">Component</TableHead>
                <TableHead className="px-8 py-4 font-bold text-zinc-400 uppercase text-[10px] tracking-widest">Specification</TableHead>
                <TableHead className="px-8 py-4 font-bold text-zinc-400 uppercase text-[10px] tracking-widest text-right">Estimated Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.costs.map((item, index) => (
                <TableRow key={index} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <TableCell className="px-8 py-5 font-bold text-zinc-900">{item.name}</TableCell>
                  <TableCell className="px-8 py-5 text-zinc-500 font-medium">{item.spec}</TableCell>
                  <TableCell className="px-8 py-5 text-right font-number font-bold text-zinc-900">
                    {item.min.toLocaleString()} - {item.max.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-emerald-50/50 hover:bg-emerald-50 border-t-2 border-emerald-100">
                <TableCell colSpan={2} className="px-8 py-6 text-lg font-bold text-emerald-900 font-heading">Total Investment</TableCell>
                <TableCell className="px-8 py-6 text-right font-number text-2xl font-bold text-emerald-700 tracking-tighter">
                  {result.totalCost.min.toLocaleString()} - {result.totalCost.max.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 4. Payback & Savings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-zinc-200 shadow-sm overflow-hidden group hover:border-emerald-200 transition-all">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold text-zinc-900">Monthly Savings</CardTitle>
            </div>
            <p className="text-4xl font-bold text-emerald-700 font-number tracking-tighter">
              {currencySymbol} {result.monthlySavings.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-zinc-400 mt-3 uppercase tracking-wider">
              Based on {country.name} avg. rate
            </p>
          </CardHeader>
        </Card>
        
        <Card className="border-zinc-200 shadow-sm overflow-hidden group hover:border-amber-200 transition-all">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-xl text-amber-700 group-hover:scale-110 transition-transform">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <CardTitle className="text-base font-bold text-zinc-900">Payback Period</CardTitle>
            </div>
            <p className="text-4xl font-bold text-amber-700 font-number tracking-tighter">
              {result.paybackYears.toFixed(1)} Years
            </p>
            <p className="text-xs font-medium text-zinc-400 mt-3 uppercase tracking-wider">
              Estimated ROI timeline
            </p>
          </CardHeader>
        </Card>
      </div>

      {/* 5. Key Recommendations */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-white font-heading text-xl">Expert Recommendations for {city.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              city.recommendation || "Optimal panel tilt for this region is 25-30 degrees facing South.",
              "Tier-1 panels are recommended for long-term durability (25+ years).",
              input.systemType === "on-grid" ? `Consider a hybrid system if you experience frequent ${gridTerm} power outages.` : "Ensure your battery bank is kept in a ventilated, cool area.",
              "Regular cleaning of panels can increase efficiency by up to 15%."
            ].map((rec, i) => (
              <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-emerald-500/20 p-1.5 rounded-lg shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm text-zinc-300 leading-relaxed font-medium">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={onRecalculate} 
          variant="ghost" 
          className="flex items-center gap-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-8 py-6 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all"
        >
          <RefreshCcw className="w-4 h-4" /> Start Over / Recalculate
        </Button>
      </div>
    </div>
  );
}
