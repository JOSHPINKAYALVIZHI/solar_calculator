import React from 'react';
import { SOLAR_TIPS } from '../data/solarData';
import { Square, Sun, Gauge, Building2, PlugZap, Coins, BatteryCharging, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  Square, Sun, Gauge, Building2, PlugZap, Coins, BatteryCharging
};

export default function SolarTips() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-16 space-y-8">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/5 border border-blue-100">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-xs font-bold mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
          Rooftop Audit Checklist
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
          JESUANS Solar Readiness & Checklist Guide
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Review these essential technical factors before buying or installing solar panels on your property.
        </p>
      </div>

      {/* Grid of Checklist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOLAR_TIPS.map((tip) => {
          const IconComponent = ICON_MAP[tip.icon] || Sun;
          return (
            <div
              key={tip.id}
              className="bg-white p-6 rounded-3xl border border-blue-100/80 shadow-md shadow-blue-950/5 hover:border-blue-300 transition space-y-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 font-outfit">
                  {tip.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
