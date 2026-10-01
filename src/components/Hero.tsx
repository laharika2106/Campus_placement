import React from 'react';
import { ArrowRight, FileCheck, CheckCircle2, Cpu, Sparkles, ExternalLink, Network, Building2 } from 'lucide-react';

interface HeroProps {
  onScrollToPortal: () => void;
  onScrollToWorkflow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToPortal, onScrollToWorkflow }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Unboxed live status strip */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400">n8n Workflow Active</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Targeting Campus Batch 2024 – 2028</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            AI Campus Placement <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Assistant & Evaluation Engine
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and academic credentials to our automated n8n cloud workflow.
            Discover high-fit engineering roles, pinpoint critical skill gaps, and receive tailored
            placement interview readiness kits.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onScrollToPortal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Profile to n8n Engine</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={onScrollToWorkflow}
              className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Network className="w-4 h-4 text-indigo-400" />
              <span>See How the Workflow Works</span>
            </button>
          </div>

          {/* Key Features Metas (No Pills: Clean unboxed text with separators) */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <FileCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Resume Ingestion</span>
              </div>
              <p className="text-xs text-slate-400">PDF ATS extraction & project keyword matching</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Skill Gap Diagnosis</span>
              </div>
              <p className="text-xs text-slate-400">Benchmarks skills against tier-1 engineering bars</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-teal-400 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">8 Tech Tracks</span>
              </div>
              <p className="text-xs text-slate-400">From SDE & Full Stack to AI/ML & DevOps</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Interview Prep</span>
              </div>
              <p className="text-xs text-slate-400">Personalized coding topics & mock rounds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
