"use client";

import { SolarGlossary } from "@/components/SolarGlossary";
import { buttonVariants } from "@/components/ui/button";
import { Sun, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function InformationPage() {
  return (
    <main className="min-h-screen bg-zinc-50/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
              <div className="bg-emerald-600 p-2 rounded-xl shadow-sm shadow-emerald-200">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-zinc-900 tracking-tight font-heading">SolarCalc</span>
            </Link>
            
            <Link
              href="/information"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-colors h-8 px-3 text-emerald-700 bg-emerald-50"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Solar Information
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <SolarGlossary />
          <div className="flex justify-center mt-12">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-emerald-100 flex items-center gap-2 text-base font-semibold transition-all h-auto"
              )}
            >
              Back to Calculator <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
