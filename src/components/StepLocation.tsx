"use client";

import { countries, Country, City } from "@/lib/data/locations";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Sun } from "lucide-react";

interface StepLocationProps {
    selectedCountry: Country | null;
    selectedCity: City | null;
    onCountryChange: (country: Country) => void;
    onCityChange: (city: City) => void;
}

export function StepLocation({
    selectedCountry,
    selectedCity,
    onCountryChange,
    onCityChange,
}: StepLocationProps) {
    return (
        <Card className="border-zinc-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50/50 mt-4 border-b border-zinc-100 pb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-100 p-2.5 rounded-xl">
                        <MapPin className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-zinc-900">Where are you located?</CardTitle>
                        <CardDescription className="text-zinc-500 text-base mt-1">
                            Your location helps us calculate peak sun hours and local energy costs.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="country" className="text-sm font-bold text-zinc-700 ml-1 uppercase tracking-wider">Select Country</Label>
            <Select
              value={selectedCountry?.name}
              onValueChange={(value) => {
                const country = countries.find((c) => c.name === value);
                if (country) onCountryChange(country);
              }}
              disabled={countries.length <= 1}
            >
              <SelectTrigger id="country" size="lg" className="rounded-2xl">
                <SelectValue placeholder="Choose your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="city" className="text-sm font-bold text-zinc-700 ml-1 uppercase tracking-wider">Select City</Label>
            <Select
              value={selectedCity?.name}
              onValueChange={(value) => {
                const city = selectedCountry?.cities.find((c) => c.name === value);
                if (city) onCityChange(city);
              }}
              disabled={!selectedCountry}
            >
              <SelectTrigger id="city" size="lg" className="rounded-2xl">
                <SelectValue placeholder={selectedCountry ? "Choose your city" : "Select a country first"} />
              </SelectTrigger>
              <SelectContent>
                {selectedCountry?.cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
                </div>

                {selectedCity && (
                    <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-emerald-100">
                            <Sun className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-zinc-800 leading-relaxed">
                                <span className="font-bold text-emerald-900">{selectedCity.name}</span> receives an average of{" "}
                                <span className="font-bold text-emerald-900">{selectedCity.peakSunHours} peak sun hours</span> per day.
                            </p>
                            {selectedCity.netMeteringAvailable && (
                                <div className="flex items-center gap-1.5 mt-2 text-emerald-700 font-medium text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Net metering is available in this location.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
