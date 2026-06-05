"use client";

import { useState } from "react";
import { countries, Country, City } from "@/lib/data/locations";
import { UserAppliance, calculateSolarSystem } from "@/lib/calculations";
import { StepLocation } from "@/components/StepLocation";
import { StepAppliances } from "@/components/StepAppliances";
import { StepPreferences } from "@/components/StepPreferences";
import { ResultsBreakdown } from "@/components/ResultsBreakdown";
import { SummarySidebar } from "@/components/SummarySidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sun, ArrowRight, ArrowLeft, Calculator, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
    const [step, setStep] = useState(1);
    const [country, setCountry] = useState<Country>(countries[0]);
    const [city, setCity] = useState<City>(countries[0].cities[0]);
    const [selectedAppliances, setSelectedAppliances] = useState<UserAppliance[]>([]);
    const [systemType, setSystemType] = useState<"on-grid" | "off-grid" | "hybrid">("hybrid");
    const [batteryBackupHours, setBatteryBackupHours] = useState(8);
    const [budgetRange, setBudgetRange] = useState<[number, number]>([500000, 1500000]);

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const input = {
        country,
        city,
        appliances: selectedAppliances,
        systemType,
        batteryBackupHours,
        budgetRange,
    };

    const result = calculateSolarSystem(input);

    const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <main className="min-h-screen bg-zinc-50/50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setStep(1); }}>
                            <div className="bg-emerald-600 p-2 rounded-xl shadow-sm shadow-emerald-200">
                                <Sun className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-zinc-900 tracking-tight font-heading">SolarCalc</span>
                        </div>

                        <Link
                            href="/solar-information"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                                "flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-colors h-8 px-3 text-zinc-400 hover:text-zinc-600"
                            )}
                        >
                            <BookOpen className="w-3.5 h-3.5" />
                            Solar Information
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Step {step} of {totalSteps}</p>
                            <p className="text-sm font-semibold text-zinc-900">
                                {step === 1 && "Location Details"}
                                {step === 2 && "Appliance Inventory"}
                                {step === 3 && "System Preferences"}
                                {step === 4 && "Your Solar Report"}
                            </p>
                        </div>
                        <div className="relative w-24 h-2 bg-zinc-100 rounded-full overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-emerald-500 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-10">
                        {step === 1 && (
                            <StepLocation
                                selectedCountry={country}
                                selectedCity={city}
                                onCountryChange={setCountry}
                                onCityChange={setCity}
                            />
                        )}

                        {step === 2 && (
                            <StepAppliances
                                selectedAppliances={selectedAppliances}
                                onApplianceChange={setSelectedAppliances}
                            />
                        )}

                        {step === 3 && (
                            <StepPreferences
                                country={country}
                                systemType={systemType}
                                batteryBackupHours={batteryBackupHours}
                                budgetRange={budgetRange}
                                onSystemTypeChange={setSystemType}
                                onBatteryBackupChange={setBatteryBackupHours}
                                onBudgetChange={setBudgetRange}
                            />
                        )}

                        {step === 4 && (
                            <ResultsBreakdown
                                result={result}
                                input={input}
                                onRecalculate={() => setStep(1)}
                            />
                        )}

                        {/* Navigation Buttons */}
                        {step < 4 && (
                            <div className="flex justify-between items-center pt-6 border-t border-zinc-200">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 rounded-xl shadow-lg shadow-emerald-100 flex items-center gap-2 text-base font-semibold transition-all hover:translate-x-0.5 active:scale-[0.98]"
                                >
                                    {step === 3 ? "Calculate Results" : "Continue"}
                                    {step === 3 ? <Calculator className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <SummarySidebar input={input} />
                    </div>
                </div>
            </div>
        </main>
    );
}
