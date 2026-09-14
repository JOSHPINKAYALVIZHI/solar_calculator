import React from 'react';
import { RECOMMENDED_PRODUCTS, COMPANY_DETAILS } from '../data/solarData';
import { ExternalLink, PhoneCall, Award, Zap } from 'lucide-react';

export default function ProductCatalog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-16 space-y-8">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/5 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-blue-700" />
            JESUANS Divisions & EPC Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
            End-to-End Solar Solutions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Rooftop Solar EPC, Ground Mounted Plants, BESS Storage, EV Chargers & Solar Pumps.
          </p>
        </div>

        <a
          href={COMPANY_DETAILS.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Visit jesuans.com
        </a>
      </div>

      {/* Product & Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {RECOMMENDED_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-3xl border border-blue-100 shadow-md shadow-blue-950/5 overflow-hidden hover:border-blue-300 hover:shadow-xl transition flex flex-col justify-between group"
          >
            <div>
              {/* Product Image Wrapper */}
              <div className="h-44 bg-gradient-to-br from-slate-900 to-blue-950 p-6 flex flex-col items-center justify-center relative border-b border-slate-100 text-center">
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {prod.badge}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white mb-2">
                  <Zap className="w-7 h-7 text-blue-300" />
                </div>
                <div className="text-xs font-black tracking-widest text-white uppercase font-outfit">JESUANS SOLAR</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Coimbatore, India</div>
              </div>

              {/* Info */}
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest">
                  {prod.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                  {prod.name}
                </h3>
              </div>
            </div>

            {/* CTA Link */}
            <div className="p-5 pt-0">
              <a
                href={prod.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 py-2.5 rounded-xl font-bold text-xs transition"
              >
                <span>Book Consultation</span>
                <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
