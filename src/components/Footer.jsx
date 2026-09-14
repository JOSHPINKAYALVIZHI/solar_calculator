import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ExternalLink, Heart, Award, Zap } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/solarData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-blue-100 pt-12 pb-8 border-t border-blue-900 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-blue-900/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src={COMPANY_DETAILS.logoUrl} 
                alt="JESUANS Logo" 
                className="h-10 w-auto bg-white/90 p-1 rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <span className="text-2xl font-black tracking-wider text-white font-outfit">JESUANS</span>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Solar Makes Reliable</p>
              </div>
            </div>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              {COMPANY_DETAILS.name} — End-to-End Solar EPC Solutions for Residential, Commercial, Industrial & Agricultural rooftops.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Coimbatore, Tamil Nadu • Inc. 2017
            </div>
          </div>

          {/* Leadership & Directors */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">Leadership & Founders</h4>
            <ul className="space-y-2 text-xs text-blue-200/80 font-medium">
              {COMPANY_DETAILS.directors.map((dir, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span><strong>{dir.name}</strong> ({dir.title})</span>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-blue-300">
                Turnkey Solar EPC & TANGEDCO Net Metering Specialists.
              </li>
            </ul>
          </div>

          {/* Solar Divisions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">Solar Divisions</h4>
            <ul className="space-y-2 text-xs text-blue-200/80 font-medium">
              <li><a href="https://jesuans.com/epc-projects.php" target="_blank" rel="noreferrer" className="hover:text-white transition">Solar EPC Projects</a></li>
              <li><a href="https://jesuans.com/solar-rooftops.php" target="_blank" rel="noreferrer" className="hover:text-white transition">Residential & Commercial Rooftops</a></li>
              <li><a href="https://jesuans.com/ev-division.php" target="_blank" rel="noreferrer" className="hover:text-white transition">EV Charging Station Division</a></li>
              <li><a href="https://jesuans.com/power-trading.php" target="_blank" rel="noreferrer" className="hover:text-white transition">BESS Storage & Power Trading</a></li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">Headquarters Address</h4>
            <div className="space-y-2 text-xs text-blue-200/80 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.registeredAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-white transition font-bold">{COMPANY_DETAILS.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition">{COMPANY_DETAILS.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-400/80 font-medium">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved. Custom Solar Application.
          </div>
          <div className="flex items-center gap-1">
            <span>Powering A Sustainable Future</span>
            <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          </div>
        </div>

      </div>
    </footer>
  );
}
