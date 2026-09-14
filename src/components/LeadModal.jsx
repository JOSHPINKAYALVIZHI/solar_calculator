import React, { useState } from 'react';
import { Sun, User, Phone, Mail, Lock, CheckCircle2, X, Loader2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/solarData';

export default function LeadModal({ isOpen, onClose, onSubmitSuccess, currentCalcResults }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[6-9][0-9]{9}$/.test(mobile.trim())) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Submit lead to Express Backend API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          email: email.trim(),
          plantKW: currentCalcResults?.plantKW || 0,
          state: currentCalcResults?.stateName || 'Tamil Nadu',
          method: currentCalcResults?.method || 'bill'
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      setLoading(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        onSubmitSuccess({ name, mobile, email });
      }, 1000);

    } catch (err) {
      console.warn('[API Warning] Express API unreachable, proceeding with client state:', err);
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onSubmitSuccess({ name, mobile, email });
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-blue-100 relative overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-outfit">Report Generated!</h3>
            <p className="text-sm text-slate-600">Redirecting to your JESUANS Solar savings report...</p>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-700/20">
              <Sun className="w-7 h-7 text-blue-200" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-outfit mb-1">
              Your Solar Savings Report is Ready!
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter your details to view your custom ROI report & claim {COMPANY_DETAILS.brandName} solar consultation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Swaminathan"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-slate-950 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md shadow-blue-800/20 transition active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Submitting Lead...
                  </>
                ) : (
                  'View JESUANS Solar Report'
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
                <Lock className="w-3 h-3 text-blue-600" />
                Your information is 100% secure & never shared.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
