import React, { useState } from "react";
import type { LandingPageData, Feature } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface FeaturesProps {
  data: LandingPageData;
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  const { features_head, features_introduction, features } = data;
  const [activePhase, setActivePhase] = useState(1);

  const phases = [
    { id: 1, title: "Phase 1: Core Foundation (MVP)", range: [0, 4] },
    { id: 2, title: "Phase 2: Wealth Advantage", range: [5, 9] },
    { id: 3, title: "Phase 3: Operational Efficiency", range: [10, 14] },
    { id: 4, title: "Phase 4: Scaling & Compliance", range: [15, 19] },
  ];

  const getPhaseFeatures = (phaseId: number) => {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase || !features) return [];
    return features.slice(phase.range[0], phase.range[1] + 1);
  };

  if (!features_head && !features_introduction && (!features || features.length === 0)) {
    return null;
  }

  return (
    <section id="features" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          {features_head && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                FEATURES ROADMAP
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
                {features_head}
              </h2>
            </div>
          )}
          {features_introduction && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-slate-600 font-medium">
              {features_introduction}
            </p>
          )}
        </div>

        {/* Phase Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-5xl mx-auto">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activePhase === phase.id
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400 hover:shadow-md"
              }`}
            >
              {phase.title}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {getPhaseFeatures(activePhase).map((feature: Feature) => (
            <div
              key={feature.id}
              className="relative p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />
              
              {feature.icon && (
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform">
                  <EasyIcon icon={feature.icon} size={24} color="#FFFFFF" />
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight">
                {feature.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
              
              {feature.image && (
                <div className="mt-4 rounded-lg overflow-hidden border-2 border-slate-100">
                  <img
                    src={`https://esign-admin.signmary.com${feature.image.url}`}
                    alt={feature.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
