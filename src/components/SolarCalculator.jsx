import React, { useState, useEffect } from 'react';
import { STATE_DATA } from '../data/solarData';
import { IndianRupee, Zap, Home, MapPin, Building, Tag, Calculator, Info, ChevronRight } from 'lucide-react';

export default function SolarCalculator({ onCalculate, calcRef }) {
  const [method, setMethod] = useState('bill'); // 'bill' | 'units' | 'area'
  
  // Inputs
  const [bill, setBill] = useState(5000);
  const [units, setUnits] = useState(600);
  const [area, setArea] = useState(500);
  const [areaUnit, setAreaUnit] = useState('sqft'); // 'sqft' | 'sqm'
  const [areaPct, setAreaPct] = useState(70);

  // Step 2 Inputs
  const [stateId, setStateId] = useState(33); // Default: Tamil Nadu (33)
  const [customerType, setCustomerType] = useState('2'); // '2': Residential, '1': Commercial, '3': Industrial
  const [isSubsidy, setIsSubsidy] = useState(true); // Default: DCR with Subsidy

  // Step 3 Inputs
  const [tariff, setTariff] = useState(5.50);

  // Errors
  const [errorMsg, setErrorMsg] = useState('');

  // Update tariff when state changes
  useEffect(() => {
    if (stateId && STATE_DATA[stateId]) {
      setTariff(STATE_DATA[stateId].tariff);
    }
  }, [stateId]);

  // Handle Customer Type Change
  const handleCustomerTypeChange = (e) => {
    const val = e.target.value;
    setCustomerType(val);
    if (val !== '2') {
      setIsSubsidy(false); // Commercial/Industrial has no PM Surya Ghar subsidy
    } else {
      setIsSubsidy(true);
    }
  };

  const handleCalculateTrigger = () => {
    setErrorMsg('');
    if (!stateId || !STATE_DATA[stateId]) {
      setErrorMsg('Please select your state.');
      return;
    }

    let plantKW = 0;
    const sd = STATE_DATA[stateId];

    if (method === 'bill') {
      if (!bill || bill < 100) {
        setErrorMsg('Please enter a valid monthly electricity bill (Min ₹100).');
        return;
      }
      const dailyUnits = (bill / tariff) / 30;
      plantKW = dailyUnits / sd.gen;
    } else if (method === 'units') {
      if (!units || units < 1) {
        setErrorMsg('Please enter valid monthly units (kWh).');
        return;
      }
      const dailyUnits = units / 30;
      plantKW = dailyUnits / sd.gen;
    } else if (method === 'area') {
      if (!area || area < 1) {
        setErrorMsg('Please enter a valid rooftop area.');
        return;
      }
      const totalSqFt = areaUnit === 'sqm' ? area * 10.764 : area;
      const usableSqFt = totalSqFt * (areaPct / 100);
      plantKW = usableSqFt / 85; // ~85 sq ft per kW
    }

    if (plantKW <= 0) {
      setErrorMsg('Calculated plant capacity is too small. Please increase your inputs.');
      return;
    }

    // Call parent calculation callback
    onCalculate({
      method,
      bill,
      units,
      area,
      areaUnit,
      areaPct,
      stateId,
      customerType,
      isSubsidy,
      tariff,
      plantKW
    });
  };

  return (
    <div ref={calcRef} className="max-w-4xl mx-auto -mt-8 px-4 relative z-20 mb-16">
      <div className="bg-white rounded-3xl shadow-xl shadow-blue-950/5 border border-slate-200/80 overflow-hidden">
        
        {/* Card Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 px-6 py-6 sm:px-8 sm:py-7 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-800/50">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-400/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              JESUANS Solar Savings Calculator
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white tracking-tight">
              Estimate Your Solar Rooftop Potential
            </h2>
          </div>
          <p className="text-blue-200 text-xs sm:text-sm max-w-xs leading-relaxed font-medium">
            Pre-configured with <strong>TANGEDCO (Tamil Nadu)</strong> & Indian DISCOM rates.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* STEP 1: Calculation Method */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-sm flex items-center justify-center border border-blue-200 shrink-0">
                1
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">
                  Select Estimation Method
                </h3>
                <p className="text-xs text-slate-500 font-medium">How would you like to calculate your required plant capacity?</p>
              </div>
            </div>

            {/* Method Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setMethod('bill')}
                className={`p-4 rounded-2xl border-2 text-left transition relative ${
                  method === 'bill'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${method === 'bill' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  {method === 'bill' && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </div>
                <div className="font-extrabold text-sm text-slate-900">Monthly Bill</div>
                <div className="text-xs text-slate-500 mt-0.5">Enter average bill amount (₹)</div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('units')}
                className={`p-4 rounded-2xl border-2 text-left transition relative ${
                  method === 'units'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${method === 'units' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  {method === 'units' && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </div>
                <div className="font-extrabold text-sm text-slate-900">Monthly Units</div>
                <div className="text-xs text-slate-500 mt-0.5">Enter power units (kWh)</div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('area')}
                className={`p-4 rounded-2xl border-2 text-left transition relative ${
                  method === 'area'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${method === 'area' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Home className="w-4 h-4" />
                  </div>
                  {method === 'area' && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </div>
                <div className="font-extrabold text-sm text-slate-900">Rooftop Area</div>
                <div className="text-xs text-slate-500 mt-0.5">Enter available roof space</div>
              </button>
            </div>

            {/* Input Surface */}
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80">
              {method === 'bill' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Average Monthly Electricity Bill (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                    <input
                      type="number"
                      min="0"
                      value={bill}
                      onChange={(e) => setBill(Math.max(0, Number(e.target.value)))}
                      placeholder="e.g. 5000"
                      className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-24 py-3.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase tracking-wider">/ month</span>
                  </div>
                </div>
              )}

              {method === 'units' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Average Monthly Consumption (kWh / Units)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={units}
                      onChange={(e) => setUnits(Math.max(0, Number(e.target.value)))}
                      placeholder="e.g. 600"
                      className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-28 py-3.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase tracking-wider">kWh / month</span>
                  </div>
                </div>
              )}

              {method === 'area' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Total Rooftop Area
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          value={area}
                          onChange={(e) => setArea(Math.max(0, Number(e.target.value)))}
                          placeholder="e.g. 500"
                          className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-24 py-3.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex bg-slate-100 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => setAreaUnit('sqft')}
                            className={`px-2 py-1 text-xs font-bold rounded ${areaUnit === 'sqft' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Sq.Ft
                          </button>
                          <button
                            type="button"
                            onClick={() => setAreaUnit('sqm')}
                            className={`px-2 py-1 text-xs font-bold rounded ${areaUnit === 'sqm' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Sq.M
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Usable Rooftop Area
                        </label>
                        <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{areaPct}% usable</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={areaPct}
                        onChange={(e) => setAreaPct(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer mt-3"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                        <span>20%</span>
                        <span>50%</span>
                        <span>70%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* STEP 2: State & Consumer Category */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-sm flex items-center justify-center border border-blue-200 shrink-0">
                2
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">
                  Location & Category
                </h3>
                <p className="text-xs text-slate-500 font-medium">Select state solar irradiation profile & installation type</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* State Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  State / Union Territory
                </label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                >
                  {Object.values(STATE_DATA).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.sunHrs} Sun Hrs/day)
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  Consumer Category
                </label>
                <select
                  value={customerType}
                  onChange={handleCustomerTypeChange}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                >
                  <option value="2">Residential Rooftop</option>
                  <option value="1">Commercial Establishment</option>
                  <option value="3">Industrial Unit</option>
                </select>
              </div>
            </div>

            {/* PM Surya Ghar Subsidy Toggle (Residential only) */}
            {customerType === '2' && (
              <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-blue-950">PM Surya Ghar Subsidy Scheme</div>
                    <div className="text-xs text-blue-800/90 font-medium">
                      National Rooftop Solar Subsidy (Up to ₹78,000 credit)
                    </div>
                  </div>
                </div>

                <div className="flex items-center bg-white rounded-xl p-1 border border-blue-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsSubsidy(true)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${isSubsidy ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-600 hover:text-blue-900'}`}
                  >
                    With Subsidy (DCR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSubsidy(false)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${!isSubsidy ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-600 hover:text-blue-900'}`}
                  >
                    No Subsidy
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* STEP 3: DISCOM Tariff Rate */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-sm flex items-center justify-center border border-blue-200 shrink-0">
                3
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">
                  Electricity Tariff Rate
                </h3>
                <p className="text-xs text-slate-500 font-medium">DISCOM per unit cost (Pre-filled for {STATE_DATA[stateId]?.name || 'Tamil Nadu'})</p>
              </div>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-blue-900 font-outfit">
                    ₹{tariff.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 ml-1.5">/ kWh (unit)</span>
                </div>
                <div className="w-28">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      step="0.25"
                      min="0.1"
                      max="30"
                      value={tariff}
                      onChange={(e) => setTariff(Math.max(0.1, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-6 pr-2 py-1.5 text-sm font-bold text-slate-900 text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="30"
                step="0.25"
                value={tariff}
                onChange={(e) => setTariff(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>₹1</span>
                <span>₹8</span>
                <span>₹15</span>
                <span>₹22</span>
                <span>₹30</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-blue-900 bg-blue-100/60 p-3 rounded-xl border border-blue-200/50">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Defaulted to <strong>{STATE_DATA[stateId]?.name}</strong> grid rate. You can fine-tune this to match your exact bill slab.
                </span>
              </div>
            </div>
          </div>

          {/* Validation Error */}
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-sm font-semibold p-4 rounded-xl border border-red-200 flex items-center gap-2">
              <Info className="w-4 h-4 text-red-500 shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* CALCULATE BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCalculateTrigger}
              className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-950 hover:from-blue-800 hover:to-slate-950 text-white py-4 px-8 rounded-2xl font-extrabold text-base sm:text-lg shadow-lg shadow-blue-900/25 transition hover:shadow-xl hover:shadow-blue-900/35 active:scale-[0.99] flex items-center justify-center gap-3 group"
            >
              <Zap className="w-5 h-5 text-blue-300 group-hover:scale-110 transition" />
              Calculate My JESUANS Solar Savings Now
              <ChevronRight className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
