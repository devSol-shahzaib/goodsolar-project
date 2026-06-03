"use client";

import { appliances } from "@/lib/data/appliances";
import { UserAppliance } from "@/lib/calculations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Zap, Clock } from "lucide-react";

interface StepAppliancesProps {
  selectedAppliances: UserAppliance[];
  onApplianceChange: (appliances: UserAppliance[]) => void;
}

export function StepAppliances({
  selectedAppliances,
  onApplianceChange,
}: StepAppliancesProps) {
  const updateAppliance = (appId: string, quantity: number, hoursPerDay: number) => {
    const existingIndex = selectedAppliances.findIndex((a) => a.id === appId);
    const newAppliances = [...selectedAppliances];

    if (quantity <= 0) {
      if (existingIndex > -1) {
        newAppliances.splice(existingIndex, 1);
      }
    } else {
      if (existingIndex > -1) {
        newAppliances[existingIndex] = {
          ...newAppliances[existingIndex],
          quantity,
          hoursPerDay,
        };
      } else {
        const baseApp = appliances.find((a) => a.id === appId);
        if (baseApp) {
          newAppliances.push({
            ...baseApp,
            quantity,
            hoursPerDay,
          });
        }
      }
    }
    onApplianceChange(newAppliances);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appliances.map((app) => {
          const userApp = selectedAppliances.find((a) => a.id === app.id);
          const quantity = userApp?.quantity || 0;
          const hours = userApp?.hoursPerDay || app.defaultHours;

          return (
            <Card key={app.id} className={`transition-all duration-300 overflow-hidden ${quantity > 0 ? "border-emerald-500 bg-emerald-50/20 shadow-sm shadow-emerald-100/50" : "border-zinc-200 hover:border-zinc-300"}`}>
              <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${quantity > 0 ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-zinc-900">{app.name}</CardTitle>
                      <CardDescription className="text-xs font-medium text-zinc-500">{app.wattage}W per unit</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white border border-zinc-200 p-1 rounded-full shadow-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-zinc-100 text-zinc-600"
                      onClick={() => updateAppliance(app.id, quantity - 1, hours)}
                      disabled={quantity === 0}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-5 text-center font-bold text-sm text-zinc-900">{quantity}</span>
                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                      onClick={() => updateAppliance(app.id, quantity + 1, hours)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {quantity > 0 && (
                <CardContent className="p-5 pt-0 space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" /> Usage Hours/Day
                      </Label>
                      <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">{hours}h</span>
                    </div>
                    <Slider
                      value={[hours]}
                      min={0.5}
                      max={24}
                      step={0.5}
                      onValueChange={(vals) =>
                        updateAppliance(app.id, quantity, Array.isArray(vals) ? vals[0] : vals)
                      }
                      className="py-2"
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider">
                      Daily Consumption
                    </span>
                    <span className="text-sm font-number tracking-tight">{((app.wattage * quantity * hours) / 1000).toFixed(2)} kWh</span>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
