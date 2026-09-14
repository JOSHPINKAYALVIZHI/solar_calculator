import React, { useState } from 'react';
import { RESIDENTIAL_APPLIANCES, COMMERCIAL_APPLIANCES } from '../data/solarData';
import { 
  Zap, Plus, Minus, RotateCcw, Home, Building, CheckCircle2, 
  Fan, Lightbulb, Tv, Refrigerator, Shirt, Microwave, Droplets, Wind, Flame, Monitor, Printer, Coffee, Copy, Projector
} from 'lucide-react';

const ICON_MAP = {
  Fan, Lightbulb, Tv, Refrigerator, Shirt, Microwave, Droplets, Zap, Wind, Flame, Monitor, Printer, Coffee, Copy, Projector
};

export default function ApplianceCalculator({ onApplyRecommendedKW }) {
  const [loadType, setLoadType] = useState('residential'); // 'residential' | 'commercial'
  
  const initialResState = RESIDENTIAL_APPLIANCES.reduce((acc, app) => {
    acc[app.id] = app.defaultQty;
    return acc;
  }, {});

  const initialCommState = COMMERCIAL_APPLIANCES.reduce((acc, app) => {
    acc[app.id] = app.defaultQty;
    return acc;
  }, {});

  const [resQuantities, setResQuantities] = useState(initialResState);
  const [commQuantities, setCommQuantities] = useState(initialCommState);

  const appliances = loadType === 'residential' ? RESIDENTIAL_APPLIANCES : COMMERCIAL_APPLIANCES;
  const quantities = loadType === 'residential' ? resQuantities : commQuantities;
  const setQuantities = loadType === 'residential' ? setResQuantities : setCommQuantities;

  const updateQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const applyPreset = (presetType) => {
    if (loadType === 'residential') {
      if (presetType === '2bhk') {
        setResQuantities({ fan: 3, led: 5, tv: 1, fridge: 1, washing: 1, oven: 0, pump: 1, iron: 1, ac1: 1, geyser: 1 });
      } else if (presetType === '3bhk') {
        setResQuantities({ fan: 5, led: 8, tv: 2, fridge: 1, washing: 1, oven: 1, pump: 1, iron: 1, ac1: 2, geyser: 2 });
      } else if (presetType === 'villa') {
        setResQuantities({ fan: 8, led: 12, tv: 3, fridge: 2, washing: 1, oven: 1, pump: 1, iron: 1, ac1: 4, geyser: 3 });
      }
    } else {
      if (presetType === 'small_office') {
        setCommQuantities({ c_fan: 6, c_tube: 10, c_pc: 6, c_print: 1, c_ac15: 2, c_freezer: 1, c_cooler: 1, c_coffee: 1, c_copy: 1, c_projector: 1 });
      } else if (presetType === 'shop') {
        setCommQuantities({ c_fan: 4, c_tube: 12, c_pc: 2, c_print: 1, c_ac15: 2, c_freezer: 2, c_cooler: 1, c_coffee: 0, c_copy: 0, c_projector: 0 });
      }
    }
  };

  const resetAll = () => {
    if (loadType === 'residential') {
      setResQuantities(initialResState);
    } else {
      setCommQuantities(initialCommState);
    }
  };

  const totalAppliancesCount = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPowerKW = appliances.reduce((sum, app) => sum + ((quantities[app.id] || 0) * app.powerkW), 0);
  const recommendedSolarKW = Math.max(1, Math.round((totalPowerKW * 1.25) * 100) / 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-16 space-y-8">
      
      {/* Title Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/5 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 text-blue-700" />
            Appliance Load Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
            Know Your Solar Energy Needs
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Count your household or commercial appliances to determine your exact electrical load.
          </p>
        </div>

        {/* Load Type Toggle */}
        <div className="flex bg-slate-100 rounded-2xl p-1.5 border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setLoadType('residential')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
              loadType === 'residential'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-900'
            }`}
          >
            <Home className="w-4 h-4" />
            Residential
          </button>
          <button
            type="button"
            onClick={() => setLoadType('commercial')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
              loadType === 'commercial'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-blue-900'
            }`}
          >
            <Building className="w-4 h-4" />
            Commercial
          </button>
        </div>
      </div>

      {/* Presets & Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-blue-900 uppercase">Quick Presets:</span>
          {loadType === 'residential' ? (
            <>
              <button
                onClick={() => applyPreset('2bhk')}
                className="px-3 py-1 text-xs font-bold bg-white text-blue-900 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                2 BHK Flat
              </button>
              <button
                onClick={() => applyPreset('3bhk')}
                className="px-3 py-1 text-xs font-bold bg-white text-blue-900 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                3 BHK Home
              </button>
              <button
                onClick={() => applyPreset('villa')}
                className="px-3 py-1 text-xs font-bold bg-white text-blue-900 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                Independent Villa
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => applyPreset('small_office')}
                className="px-3 py-1 text-xs font-bold bg-white text-blue-900 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                Small Office
              </button>
              <button
                onClick={() => applyPreset('shop')}
                className="px-3 py-1 text-xs font-bold bg-white text-blue-900 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                Retail Store
              </button>
            </>
          )}
        </div>

        <button
          onClick={resetAll}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600 transition ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {/* Appliance Load Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {appliances.map((app) => {
          const IconComponent = ICON_MAP[app.icon] || Zap;
          const qty = quantities[app.id] || 0;
          const subtotalKW = (qty * app.powerkW).toFixed(2);

          return (
            <div
              key={app.id}
              className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                qty > 0
                  ? 'bg-white border-blue-200 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200/80 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${qty > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-500'}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{app.name}</div>
                  <div className="text-xs text-slate-500 font-medium">
                    {app.powerkW} kW / unit • <strong className="text-blue-800">{subtotalKW} kW total</strong>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => updateQty(app.id, -1)}
                  className="w-7 h-7 bg-white hover:bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700 shadow-sm active:scale-95 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-extrabold text-sm text-slate-900">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQty(app.id, 1)}
                  className="w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center font-bold shadow-sm active:scale-95 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load Summary Card */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-200">
            Connected Appliance Load Summary
          </div>
          <div className="flex items-baseline justify-center sm:justify-start gap-4">
            <div>
              <span className="text-3xl font-extrabold font-outfit text-white">{totalAppliancesCount}</span>
              <span className="text-xs font-semibold text-blue-200 ml-1">Appliances</span>
            </div>
            <div className="text-blue-400">|</div>
            <div>
              <span className="text-3xl font-extrabold font-outfit text-white">{totalPowerKW.toFixed(2)}</span>
              <span className="text-xs font-semibold text-blue-200 ml-1">kW Connected Load</span>
            </div>
          </div>
          <p className="text-xs text-blue-100">
            Recommended JESUANS Solar Capacity: <strong className="text-white font-extrabold underline text-sm">{recommendedSolarKW} kWp</strong>
          </p>
        </div>

        {onApplyRecommendedKW && (
          <button
            onClick={() => onApplyRecommendedKW(recommendedSolarKW)}
            className="bg-white text-blue-950 hover:bg-blue-50 px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-md transition active:scale-95 shrink-0"
          >
            Apply to Savings Calculator
          </button>
        )}
      </div>

    </div>
  );
}
