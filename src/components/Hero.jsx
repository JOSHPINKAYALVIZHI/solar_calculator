import React from 'react';
import { Sun, ShieldCheck, Coins, Sparkles, ArrowDown, Zap } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/solarData';

export default function Hero({ onScrollToCalc }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Brand Tag Pill */}
        <div className="inline-flex items-center gap-2 bg-blue-900/80 backdrop-blur-md border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 text-blue-200 text-xs font-semibold tracking-wide uppercase shadow-inner">
          <Sparkles className="w-4 h-4 text-blue-400" />
          {COMPANY_DETAILS.name} • Coimbatore
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-outfit text-white mb-6 leading-tight">
          Powering A Sustainable Future with{' '}
          <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-white bg-clip-text text-transparent underline decoration-blue-400/50 underline-offset-8">
            JESUANS Solar
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-blue-100/90 text-base sm:text-xl max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          End-to-end Solar EPC solutions for Domestic, Commercial, Industrial & Agricultural rooftops across Tamil Nadu and South India.
        </p>

        {/* Feature Badges Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <div className="flex items-center gap-2 bg-blue-900/60 backdrop-blur-sm border border-blue-700/50 rounded-2xl px-4 py-2 text-xs sm:text-sm font-semibold text-blue-100">
            <Zap className="w-4 h-4 text-blue-400" />
            Solar Makes Reliable
          </div>
          <div className="flex items-center gap-2 bg-blue-900/60 backdrop-blur-sm border border-blue-700/50 rounded-2xl px-4 py-2 text-xs sm:text-sm font-semibold text-blue-100">
            <Coins className="w-4 h-4 text-blue-400" />
            PM Surya Ghar Subsidy (₹78,000)
          </div>
          <div className="flex items-center gap-2 bg-blue-900/60 backdrop-blur-sm border border-blue-700/50 rounded-2xl px-4 py-2 text-xs sm:text-sm font-semibold text-blue-100">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            TANGEDCO Net Metering Expert
          </div>
        </div>

        {/* Hero Quick Scroll Button */}
        <div>
          <button
            onClick={onScrollToCalc}
            className="inline-flex items-center gap-2.5 bg-white text-blue-950 hover:bg-blue-50 px-8 py-4 rounded-2xl font-extrabold text-base sm:text-lg shadow-xl shadow-blue-950/40 transition hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sun className="w-5 h-5 text-blue-600 animate-spin-slow" />
            Calculate Solar Savings Now
            <ArrowDown className="w-5 h-5 text-blue-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
