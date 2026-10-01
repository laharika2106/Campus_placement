import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Target, 
  Trophy,
  BarChart3
} from 'lucide-react';

interface ReadinessCalculatorProps {
  onApplyPreset: (cgpa: number, role: string) => void;
}

export const ReadinessCalculator: React.FC<ReadinessCalculatorProps> = ({ onApplyPreset }) => {
  const [cgpa, setCgpa] = useState<number>(8.4);
  const [dsaProblems, setDsaProblems] = useState<number>(180);
  const [projectsCount, setProjectsCount] = useState<number>(3);
  const [internshipMonths, setInternshipMonths] = useState<number>(3);
  const [targetTrack, setTargetTrack] = useState<string>('Software Development Engineer');

  // Compute composite readiness score
  // CGPA: max 25 pts (10 CGPA = 25)
  // DSA: max 35 pts (300+ problems = 35)
  // Projects: max 20 pts (4+ projects = 20)
  // Internship: max 20 pts (6+ months = 20)
  const cgpaScore = Math.min(25, (cgpa / 10) * 25);
  const dsaScore = Math.min(35, (dsaProblems / 300) * 35);
  const projectsScore = Math.min(20, (projectsCount / 4) * 20);
  const internScore = Math.min(20, (internshipMonths / 6) * 20);

  const totalScore = Math.round(cgpaScore + dsaScore + projectsScore + internScore);

  let band = 'Tier-2 IT Services (4 - 7 LPA)';
  let bandColor = 'text-amber-400';
  let advice = 'Focus on increasing your LeetCode problem count to at least 150+ and building 1 end-to-end full stack project.';

  if (totalScore >= 82) {
    band = 'Tier-1 Super Dream / Product (18 - 35+ LPA)';
    bandColor = 'text-emerald-400';
    advice = 'Your profile is highly competitive for top tier product companies. Refine high-level system design and behavioral STAR responses.';
  } else if (totalScore >= 65) {
    band = 'Tier-1 Dream Tech (9 - 18 LPA)';
    bandColor = 'text-indigo-400';
    advice = 'Solid foundational profile. Sharpen dynamic programming, tree/graph algorithms, and prepare mock machine coding rounds.';
  } else if (totalScore >= 45) {
    band = 'High Growth Startups & Mid-Tier Tech (6 - 10 LPA)';
    bandColor = 'text-teal-400';
    advice = 'Good baseline. Emphasize your strongest projects with live deployment URLs and practice standard CS fundamentals (OS, DBMS, Networks).';
  }

  return (
    <section id="assessment" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <span>PRE-SCREENING DIAGNOSTIC</span>
            <span>·</span>
            <span>BENCHMARK YOUR PROFILE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Placement Readiness Index
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Simulate how top hiring committees and automated ATS filters benchmark your academic
            and technical portfolio before campus season.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Controls Box */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>College CGPA</span>
                <span className="font-mono text-emerald-400 text-sm font-bold">{cgpa.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="10.0"
                step="0.05"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5.0</span>
                <span>7.5</span>
                <span>10.0</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>DSA / Problem Solving Questions Solved</span>
                <span className="font-mono text-indigo-400 text-sm font-bold">{dsaProblems}+</span>
              </div>
              <input
                type="range"
                min="0"
                max="450"
                step="10"
                value={dsaProblems}
                onChange={(e) => setDsaProblems(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>0 (Beginner)</span>
                <span>150 (Intermediate)</span>
                <span>400+ (Advanced)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Major Projects Built</span>
                  <span className="font-mono text-teal-400 text-sm font-bold">{projectsCount}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={projectsCount}
                  onChange={(e) => setProjectsCount(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Internship Experience</span>
                  <span className="font-mono text-amber-400 text-sm font-bold">{internshipMonths} mos</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={internshipMonths}
                  onChange={(e) => setInternshipMonths(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Readiness Diagnostic
                </span>
                <span className="text-xs text-emerald-400 font-mono">Real-time Model</span>
              </div>

              {/* Big Score Gauge */}
              <div className="text-center py-4">
                <div className="inline-block relative">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-white font-mono">
                    {totalScore}
                  </span>
                  <span className="text-slate-400 text-xl font-bold font-mono">/100</span>
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                  Composite Placement Index
                </p>
              </div>

              {/* Target Band (Unboxed) */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Projected Placement Tier
                </span>
                <p className={`text-sm font-bold ${bandColor}`}>
                  {band}
                </p>
              </div>

              {/* Advice */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
                <span className="font-semibold text-slate-200 block mb-0.5">Automated Recommendation:</span>
                {advice}
              </div>
            </div>

            {/* Transfer to form button */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onApplyPreset(cgpa, targetTrack)}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <span>Transfer CGPA to Application Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
