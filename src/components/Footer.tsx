import React from 'react';
import { GraduationCap, ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenN8nModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenN8nModal }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-semibold text-slate-100 text-base">
                AI Campus Placement Assistant
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              An intelligent placement intake and skill gap diagnostic platform integrating
              directly with automated n8n workflows to empower university engineering candidates.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>n8n Cloud Form: /form/5fb2f121-102b-435a-80b6-40777bd2a16c</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </p>
            <ul className="space-y-1.5">
              <li>
                <a href="#portal" className="hover:text-slate-200 transition-colors">
                  Intake Application Form
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-slate-200 transition-colors">
                  n8n Pipeline Architecture
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-slate-200 transition-colors">
                  8 Engineering Tracks
                </a>
              </li>
              <li>
                <a href="#assessment" className="hover:text-slate-200 transition-colors">
                  Readiness Calculator
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-slate-200 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Integration & Compliance */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Workflow Integration
            </p>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenN8nModal}
                  className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>n8n Diagnostics & Schema</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <a
                  href="https://laharika.app.n8n.cloud/form/5fb2f121-102b-435a-80b6-40777bd2a16c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Raw n8n Form Webhook</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                End-to-End Encrypted Transfer
              </li>
              <li className="text-[11px] text-slate-400">
                Batch Support: 2024 · 2025 · 2026 · 2027 · 2028
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© 2026 AI Campus Placement Assistant</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
            <span aria-hidden="true">·</span>
            <span>University Placement Cell</span>
          </div>
          <div>
            <span>Powered by n8n Workflow Automation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
