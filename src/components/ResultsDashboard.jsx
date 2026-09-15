import React from 'react';
import { STATE_DATA, COMPANY_DETAILS } from '../data/solarData';
import { 
  Sun, Zap, IndianRupee, Share2, Printer, Send, 
  TrendingUp, Clock, Leaf, Trees, CheckCircle, Info, Sparkles, Tag, ArrowRight, FileText, Calculator, PiggyBank, BarChart3
} from 'lucide-react';

export default function ResultsDashboard({ results, resultsRef }) {
  if (!results) return null;

  const {
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
  } = results;

  const sd = STATE_DATA[stateId] || STATE_DATA[33];
  const roundedKW = Math.max(0.5, Math.round(plantKW * 100) / 100);

  // Exact Mathematical Calculations
  const dailyGen = roundedKW * sd.gen;
  const monthlyGen = Math.round(dailyGen * 30);
  const annualGen = Math.round(roundedKW * sd.gen * 365 * 0.98); // 2% system losses year 1
  const lifetimeGen = Math.round(annualGen * 30 * 0.93); // avg degradation over 30 yrs

  // Financial Savings
  const saveMonthly = Math.round(monthlyGen * tariff);
  const saveAnnual = Math.round(annualGen * tariff);
  const saveLifetime = Math.round(saveAnnual * 30);

  // Cost Tiers
  const getCostPerKW = (kw, isSub) => {
    if (customerType !== '2') {
      if (sd.commercial > 0) return sd.commercial;
      const ns = sd.nonSub;
      if (kw < 3.5) return ns[0];
      if (kw < 5.3) return ns[1];
      if (kw < 8.1) return ns[2];
      return ns[3];
    }
    const prices = isSub ? sd.sub : sd.nonSub;
    if (kw < 3.5) return prices[0];
    if (kw < 5.3) return prices[1];
    if (kw < 8.1) return prices[2];
    return prices[3];
  };

  // PM Surya Ghar Government Subsidy Tier Formula
  const getGovSubsidy = (kw) => {
    if (customerType !== '2' || !isSubsidy) return 0;
    const [r1, r2, r3] = sd.govSub;
    let sub = 0;
    sub += Math.min(kw, 1) * r1;
    if (kw > 1) sub += Math.min(Math.max(kw - 1, 0), 1) * r2;
    if (kw > 2) sub += Math.min(Math.max(kw - 2, 0), 1) * r3;
    return Math.round(sub);
  };

  const costPerKW = getCostPerKW(roundedKW, isSubsidy);
  const grossCost = Math.round(costPerKW * roundedKW);
  const subsidyAmount = getGovSubsidy(roundedKW);
  const netInvestment = Math.max(0, grossCost - subsidyAmount);

  // Payback & ROI
  const paybackYears = saveAnnual > 0 ? (netInvestment / saveAnnual).toFixed(1) : '0';
  const roiPct = netInvestment > 0 ? ((saveAnnual / netInvestment) * 100).toFixed(1) : '0';

  // Environmental Impact
  const co2MitigatedTonnes = Math.round((lifetimeGen * 0.82) / 1000);
  const treesPlanted = Math.round((lifetimeGen * 0.82) / 625);

  // Format Helper
  const fmt = (num) => Math.round(num).toLocaleString('en-IN');
  const fmtLakh = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${Math.round(num).toLocaleString('en-IN')}`;
  };

  // Share Handlers
  const handleWhatsAppShare = () => {
    const text = `☀️ JESUANS Solar Savings Report:\n` +
      `📍 State: ${sd.name}\n` +
      `⚡ Recommended System: ${roundedKW} kWp\n` +
      `💰 Monthly Savings: ₹${fmt(saveMonthly)}\n` +
      `🌿 30-Yr Total Savings: ${fmtLakh(saveLifetime)}\n` +
      `🎁 PM Surya Ghar Subsidy: ₹${fmt(subsidyAmount)}\n` +
      `Contact JESUANS Engineering: ${COMPANY_DETAILS.phone} | ${COMPANY_DETAILS.website}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = `JESUANS Solar Savings Report - ${roundedKW} kW System Estimation`;
    const body = `Hi,\n\nHere is my solar rooftop savings report by JESUANS Engineering India Pvt. Ltd.:\n` +
      `Recommended System Size: ${roundedKW} kWp\n` +
      `Estimated Daily Generation: ${dailyGen.toFixed(1)} kWh\n` +
      `Monthly Bill Savings: ₹${fmt(saveMonthly)}\n` +
      `Gross System Cost: ${fmtLakh(grossCost)}\n` +
      `PM Surya Ghar Subsidy: ₹${fmt(subsidyAmount)}\n` +
      `Net Investment: ₹${fmt(netInvestment)}\n` +
      `Simple Payback Period: ${paybackYears} Years\n` +
      `Annual ROI: ${roiPct}%\n\n` +
      `Consult JESUANS Engineering: ${COMPANY_DETAILS.phone} | ${COMPANY_DETAILS.email}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div ref={resultsRef} className="max-w-4xl mx-auto px-4 mb-20 space-y-8 animate-fade-in">
      
      {/* Printable Header (Visible only when printing) */}
      <div className="hidden print-only border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={COMPANY_DETAILS.logoUrl} alt="JESUANS Logo" className="h-12 w-auto object-contain" />
            <div>
              <h1 className="text-2xl font-black text-blue-950 font-outfit">JESUANS ENGINEERING INDIA PVT. LTD.</h1>
              <p className="text-xs font-bold text-blue-700 tracking-wider uppercase">Solar Makes Reliable • Coimbatore, Tamil Nadu</p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div>{COMPANY_DETAILS.phone} • {COMPANY_DETAILS.email}</div>
          </div>
        </div>
      </div>

      {/* TOP STATE PILL BADGE & REPORT TITLE HEADER */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-blue-700 text-white rounded-full px-4 py-1 text-xs font-extrabold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          <span>📍 {sd.name}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
          Your Solar Feasibility Report
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-medium">
          Detailed technical and financial analysis for your property
        </p>
      </div>

      {/* TOP SHARE ACTION TOOLBAR */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 card-print">
        <div className="flex items-center gap-2 text-slate-700 text-xs font-bold uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-blue-600" />
          <span>Share or Export Report</span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto no-print">
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={handleEmailShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-4 py-2 rounded-xl font-bold text-xs transition"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Email</span>
          </button>
          <button
            onClick={handlePrintPDF}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* RECOMMENDED PLANT SIZE HERO CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-950/10 relative overflow-hidden card-print">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
          <div className="md:col-span-2 space-y-2">
            <div className="text-blue-300 text-xs font-extrabold tracking-widest uppercase">
              RECOMMENDED PLANT SIZE
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-extrabold font-outfit tracking-tight text-white">
                {roundedKW}
              </span>
              <span className="text-2xl font-bold text-blue-200">kWp</span>
            </div>
            <p className="text-blue-200/90 text-xs sm:text-sm font-medium pt-1">
              Estimated based on your {method === 'bill' ? 'monthly bill' : method === 'units' ? 'monthly consumption' : 'rooftop area'}
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase text-blue-200 tracking-wider">DAILY GENERATION</div>
                <div className="text-lg font-extrabold text-white font-outfit">{dailyGen.toFixed(1)} kWh</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase text-blue-200 tracking-wider">PEAK SUN HOURS</div>
                <div className="text-lg font-extrabold text-white font-outfit">{sd.sunHrs} hrs/day</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: ELECTRICITY GENERATION */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Zap className="w-4 h-4 text-blue-600" />
          <span>ELECTRICITY GENERATION TIMELINE</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6 card-print">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base font-outfit">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Power Output Profile (kWh)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> MONTHLY
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
                {fmt(monthlyGen)} kWh
              </div>
              <div className="text-xs text-slate-400 font-medium">per month</div>
            </div>

            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-700" /> ANNUAL
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
                {fmt(annualGen)} kWh
              </div>
              <div className="text-xs text-slate-400 font-medium">per year</div>
            </div>

            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-950" /> 30-YEAR
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
                {fmt(lifetimeGen)} kWh
              </div>
              <div className="text-xs text-slate-400 font-medium">lifetime total</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FINANCIAL SAVINGS */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <IndianRupee className="w-4 h-4 text-blue-600" />
          <span>FINANCIAL SAVINGS SUMMARY</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6 card-print">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base font-outfit">
              <PiggyBank className="w-5 h-5 text-blue-600" />
              <span>Electricity Bill Savings</span>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              @ ₹{tariff}/unit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> MONTHLY
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
                ₹{fmt(saveMonthly)}
              </div>
              <div className="text-xs text-slate-400 font-medium">per month</div>
            </div>

            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-700" /> ANNUAL
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
                ₹{fmt(saveAnnual)}
              </div>
              <div className="text-xs text-slate-400 font-medium">per year</div>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-900" /> 30-YEAR LIFETIME
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-800 font-outfit">
                {fmtLakh(saveLifetime)}
              </div>
              <div className="text-xs text-blue-600 font-semibold">lifetime total</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: ENVIRONMENTAL IMPACT */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>ENVIRONMENTAL IMPACT</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200/60 shadow-sm card-print">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-outfit">{fmt(co2MitigatedTonnes)} Tonnes</div>
                <div className="text-xs font-bold text-slate-500">CO₂ Emissions Mitigated (30 yrs)</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Trees className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 font-outfit">{fmt(treesPlanted)}</div>
                <div className="text-xs font-bold text-slate-500">Trees Planted Equivalent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTNOTE DISCLAIMER BOX */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 flex items-start gap-3 leading-relaxed card-print">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          The computation is indicative in nature. Generation and financial savings may vary based on actual solar irradiation, panel efficiency, shading, and local grid conditions. Subsidy amounts are as per PM Surya Ghar Muft Bijli Yojana guidelines for residential consumers. Consult JESUANS Engineering advisors for a site evaluation.
        </span>
      </div>

    </div>
  );
}
