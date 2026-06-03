"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Settings2, Battery, Wallet } from "lucide-react";
import { Country } from "@/lib/data/locations";

type SystemType = "on-grid" | "off-grid" | "hybrid";

interface StepPreferencesProps {
    country: Country | null;
    systemType: SystemType;
    batteryBackupHours: number;
    budgetRange: [number, number];
    onSystemTypeChange: (type: SystemType) => void;
    onBatteryBackupChange: (hours: number) => void;
    onBudgetChange: (range: [number, number]) => void;
}

export function StepPreferences({
    country,
    systemType,
    batteryBackupHours,
    budgetRange,
    onSystemTypeChange,
    onBatteryBackupChange,
    onBudgetChange,
}: StepPreferencesProps) {
    const currencySymbol = country?.currencySymbol || "Rs.";
    const exchangeRate = country?.exchangeRateToPKR || 1;
    const gridTerm = country?.gridTerm || "Grid";

    // Adjust budget slider based on country
    const minBudget = 200000 / exchangeRate;
    const maxBudget = 3000000 / exchangeRate;
    const step = 50000 / exchangeRate;

    return (
        <div className="space-y-8">
            <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-zinc-50/50 border-b mt-4 border-zinc-100 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-emerald-100 p-2.5 rounded-xl">
                            <Settings2 className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-zinc-900">System Type</CardTitle>
                            <CardDescription className="text-zinc-500 text-base mt-1">
                                Choose how your system interacts with the {gridTerm.toUpperCase()}.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <RadioGroup
                        value={systemType}
                        onValueChange={(val) => onSystemTypeChange(val as SystemType)}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { id: "on-grid", title: `On-Grid`, desc: `No batteries. Sells excess power to ${gridTerm.toLowerCase()}.` },
                            { id: "hybrid", title: "Hybrid", desc: `Batteries + ${gridTerm.toUpperCase()}. Most common & reliable.` },
                            { id: "off-grid", title: `Off-Grid`, desc: `100% Battery. No ${gridTerm.toUpperCase()} connection needed.` }
                        ].map((type) => (
                            <div key={type.id}>
                                <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                                <Label
                                    htmlFor={type.id}
                                    className="flex flex-col items-center justify-center text-center h-full rounded-2xl border-2 border-zinc-100 bg-white p-6 transition-all hover:border-emerald-200 hover:bg-emerald-50/30 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50/50 peer-data-[state=checked]:shadow-sm cursor-pointer group"
                                >
                                    <span className="text-base font-bold text-zinc-900 group-hover:text-emerald-900 transition-colors">{type.title}</span>
                                    <span className="text-xs text-zinc-500 mt-2 leading-relaxed">
                                        {type.desc}
                                    </span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-8 mt-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-emerald-100 p-2.5 rounded-xl">
                            <Battery className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-zinc-900">Battery Backup</CardTitle>
                            <CardDescription className="text-zinc-500 text-base mt-1">
                                How many hours of backup do you need during the night or outages?
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <Label className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Backup Duration</Label>
                            <p className="text-xs text-zinc-500">Slide to adjust hours</p>
                        </div>
                        <span className="text-2xl font-bold text-emerald-700 font-number tracking-tight">
                            {batteryBackupHours === 0 ? "None" : batteryBackupHours === 24 ? "24h (Full Day)" : `${batteryBackupHours} Hours`}
                        </span>
                    </div>
                    <div className="px-2">
                        <Slider
                            value={[batteryBackupHours]}
                            min={0}
                            max={24}
                            step={4}
                            onValueChange={(vals) => onBatteryBackupChange(Array.isArray(vals) ? vals[0] : vals)}
                            disabled={systemType === "on-grid"}
                            className="py-4"
                        />
                    </div>
                    {systemType === "on-grid" && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-sm">
                            <div className="bg-amber-100 p-1.5 rounded-lg">
                                <Settings2 className="w-4 h-4 text-amber-700" />
                            </div>
                            <p className="font-medium">
                                On-grid systems do not use batteries. Switch to <span className="font-bold">Hybrid</span> or <span className="font-bold">Off-grid</span> for backup.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="border-zinc-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-8 mt-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-emerald-100 p-2.5 rounded-xl">
                            <Wallet className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-zinc-900">Budget Range</CardTitle>
                            <CardDescription className="text-zinc-500 text-base mt-1">
                                Help us recommend the best components within your budget.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <Label className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Estimated Budget</Label>
                            <p className="text-xs text-zinc-500">Adjust range in {currencySymbol}</p>
                        </div>
                        <span className="text-2xl font-bold text-emerald-700 font-number tracking-tight">
                            {currencySymbol} {budgetRange[0].toLocaleString()} - {budgetRange[1].toLocaleString()}
                        </span>
                    </div>
                    <div className="px-2">
                        <Slider
                            value={budgetRange}
                            min={minBudget}
                            max={maxBudget}
                            step={step}
                            onValueChange={(vals) => onBudgetChange(vals as [number, number])}
                            className="py-4"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
