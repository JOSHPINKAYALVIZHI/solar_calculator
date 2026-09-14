import React, { useState } from 'react';
import { REVIEWS_DATA, FAQ_DATA, COMPANY_DETAILS } from '../data/solarData';
import { Star, ChevronDown, HelpCircle, MessageSquareQuote, MapPin, UserCheck, ShieldCheck } from 'lucide-react';

export default function ReviewsAndFAQ() {
  const [openFaq, setOpenFaq] = useState(0); // Default open 1st FAQ

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-16 space-y-12">
      
      {/* COMPANY LEADERSHIP CARD */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-outfit">Company Leadership & Management</h3>
            <p className="text-xs text-blue-200">{COMPANY_DETAILS.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMPANY_DETAILS.directors.map((dir, idx) => (
            <div key={idx} className="bg-blue-900/40 rounded-2xl p-4 border border-blue-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                {dir.name.charAt(0)}
              </div>
              <div>
                <div className="font-extrabold text-sm text-white">{dir.name}</div>
                <div className="text-xs text-blue-300 font-medium">{dir.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-blue-200/80 leading-relaxed border-t border-blue-800/80 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>Headquarters: {COMPANY_DETAILS.registeredAddress}</span>
          <span className="font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Active Entity (Inc. 2017)
          </span>
        </div>
      </div>

      {/* CUSTOMER TESTIMONIALS SECTION */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/5 border border-blue-100">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-xs font-bold mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-blue-700" />
            Verified Customer Stories
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
            Trusted Across Tamil Nadu & South India
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Real feedback from residential, commercial, and agricultural clients who installed JESUANS Solar EPC systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-blue-100 shadow-md shadow-blue-950/5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="font-bold text-sm text-slate-900">{rev.name}</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  {rev.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ ACCORDION SECTION */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-950/5 border border-blue-100">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            Clear Your Doubts
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Common questions about TANGEDCO net metering, PM Surya Ghar subsidy application, and JESUANS solar solutions.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-800 transition"
                >
                  <span className="font-outfit">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
