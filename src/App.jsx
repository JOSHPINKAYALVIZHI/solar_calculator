import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SolarCalculator from './components/SolarCalculator';
import LeadModal from './components/LeadModal';
import ResultsDashboard from './components/ResultsDashboard';
import ApplianceCalculator from './components/ApplianceCalculator';
import SolarTips from './components/SolarTips';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'appliances' | 'tips' | 'products'
  // Results start as null by default - report only appears upon clicking Calculate!
  const [results, setResults] = useState(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const calcRef = useRef(null);
  const resultsRef = useRef(null);

  const scrollToCalc = () => {
    setActiveTab('calculator');
    setTimeout(() => {
      calcRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Instant calculation trigger - reveals report dashboard upon clicking Calculate!
  const handleCalculateRequest = (calcData) => {
    setResults(calcData);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLeadSubmitSuccess = (leadData) => {
    setIsLeadModalOpen(false);
  };

  const handleApplyRecommendedKW = (kw) => {
    setActiveTab('calculator');
    const newResults = {
      method: 'units',
      units: Math.round(kw * 30 * 4.48),
      stateId: 33, // Tamil Nadu
      customerType: '2',
      isSubsidy: true,
      tariff: 5.50,
      plantKW: kw
    };
    setResults(newResults);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <div>
        <Header 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            if (tab === 'calculator') {
              scrollToCalc();
            } else {
              setActiveTab(tab);
            }
          }} 
        />
        
        {/* Main Banner */}
        <Hero onScrollToCalc={scrollToCalc} />

        {/* Tab Content Router */}
        <main>
          {activeTab === 'calculator' && (
            <>
              <SolarCalculator calcRef={calcRef} onCalculate={handleCalculateRequest} />
              
              {/* Report Dashboard ONLY shown after clicking Calculate */}
              {results && (
                <ResultsDashboard resultsRef={resultsRef} results={results} />
              )}
            </>
          )}

          {activeTab === 'appliances' && (
            <ApplianceCalculator onApplyRecommendedKW={handleApplyRecommendedKW} />
          )}

          {activeTab === 'tips' && (
            <SolarTips />
          )}

          {activeTab === 'products' && (
            <ProductCatalog />
          )}
        </main>

        {/* Optional Lead Capture Modal */}
        <LeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          onSubmitSuccess={handleLeadSubmitSuccess}
          currentCalcResults={results}
        />
      </div>

      <Footer />
    </div>
  );
}
