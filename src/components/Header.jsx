import React, { useState } from 'react';
import { Phone, Mail, Sun, Menu, X, ShieldCheck, Award, Zap, Calculator, Cpu, BookOpen, Layers, Sparkles } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/solarData';

export default function Header({ onTabChange, activeTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-sm border-b border-blue-100">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('calculator')}>
          <div className="h-11 flex items-center">
            <img 
              src={COMPANY_DETAILS.logoUrl} 
              alt="JESUANS Solar Logo" 
              className="h-10 sm:h-11 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="border-l border-slate-200 pl-3 hidden xs:block sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-wider text-blue-950 font-outfit">JESUANS</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-extrabold tracking-wide uppercase">
                SOLAR
              </span>
            </div>
            <p className="text-[10px] text-blue-700 font-extrabold tracking-wider uppercase">Solar Makes Reliable</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shrink-0">
          <button
            onClick={() => onTabChange('calculator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'calculator'
                ? 'bg-blue-700 text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-slate-200/60 hover:text-blue-900'
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span>Solar Calculator</span>
          </button>
          <button
            onClick={() => onTabChange('appliances')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'appliances'
                ? 'bg-blue-700 text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-slate-200/60 hover:text-blue-900'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span>Appliance Estimator</span>
          </button>
          <button
            onClick={() => onTabChange('tips')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'tips'
                ? 'bg-blue-700 text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-slate-200/60 hover:text-blue-900'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Readiness Guide</span>
          </button>
          <button
            onClick={() => onTabChange('products')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeTab === 'products'
                ? 'bg-blue-700 text-white shadow-sm font-bold'
                : 'text-slate-700 hover:bg-slate-200/60 hover:text-blue-900'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Solar EPC Divisions</span>
          </button>
        </nav>

        {/* CTA Helpline Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200/80 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-100 transition whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Consult Us</span>
          </a>
          <button
            onClick={() => onTabChange('calculator')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white px-5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-900/20 transition hover:shadow-lg active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-blue-300 shrink-0" />
            <span>Free Quote</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-blue-950 rounded-lg hover:bg-blue-50"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-100 bg-white px-4 py-3 space-y-2">
          <button
            onClick={() => { onTabChange('calculator'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeTab === 'calculator' ? 'bg-blue-100 text-blue-900' : 'text-slate-700'}`}
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Solar Calculator</span>
          </button>
          <button
            onClick={() => { onTabChange('appliances'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeTab === 'appliances' ? 'bg-blue-100 text-blue-900' : 'text-slate-700'}`}
          >
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Appliance Load Estimator</span>
          </button>
          <button
            onClick={() => { onTabChange('tips'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeTab === 'tips' ? 'bg-blue-100 text-blue-900' : 'text-slate-700'}`}
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Solar Readiness Guide</span>
          </button>
          <button
            onClick={() => { onTabChange('products'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeTab === 'products' ? 'bg-blue-100 text-blue-900' : 'text-slate-700'}`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Solar EPC Divisions</span>
          </button>
        </div>
      )}
    </header>
  );
}
