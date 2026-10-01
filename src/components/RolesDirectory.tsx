import React, { useState } from 'react';
import { 
  TARGET_ROLES, 
  RoleInfo 
} from '../data/placementData';
import { 
  Briefcase, 
  ArrowRight, 
  Building2, 
  Code2, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  CheckCircle 
} from 'lucide-react';

interface RolesDirectoryProps {
  onSelectRole: (roleName: string) => void;
}

export const RolesDirectory: React.FC<RolesDirectoryProps> = ({ onSelectRole }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedRoleDetail, setSelectedRoleDetail] = useState<RoleInfo>(TARGET_ROLES[0]);

  const categories = ['All', 'Core Engineering', 'Web Engineering', 'Applied Intelligence', 'Analytics & Insights', 'Cloud & Infrastructure'];

  const filteredRoles = filterCategory === 'All' 
    ? TARGET_ROLES 
    : TARGET_ROLES.filter(r => {
        if (filterCategory === 'Core Engineering') return r.category.includes('Core') || r.category.includes('Server');
        if (filterCategory === 'Web Engineering') return r.category.includes('Web') || r.category.includes('Client');
        if (filterCategory === 'Applied Intelligence') return r.category.includes('Applied') || r.category.includes('Data Platform');
        if (filterCategory === 'Analytics & Insights') return r.category.includes('Analytics');
        if (filterCategory === 'Cloud & Infrastructure') return r.category.includes('Cloud');
        return true;
      });

  return (
    <section id="roles" className="py-16 sm:py-24 bg-slate-900/40 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>TARGET CURRICULUM & PATHWAYS</span>
              <span>·</span>
              <span>8 SUPPORTED ROLES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Engineering Track Matrix
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Explore the required competencies, average placement CTCs, top recruiters, and interview
              structures for every role available in the n8n intake system.
            </p>
          </div>

          {/* Interactive filter control buttons (button elements as allowed by constitution) */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-black/30"
            >
              <div>
                {/* Unboxed category and CTC metadata with dot separator */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800/80">
                  <span className="font-mono text-emerald-400">{role.category}</span>
                  <span className="text-slate-200 font-semibold">{role.averagePackage}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {role.name}
                </h3>
                
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {role.description}
                </p>

                {/* Primary Skills */}
                <div className="mt-4">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Core Skills
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {role.primarySkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800/90 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {role.primarySkills.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                        +{role.primarySkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hiring Partners (Unboxed) */}
                <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-slate-400">
                  <span className="text-slate-400 block mb-1 text-[11px] font-mono">Top Recruiters</span>
                  <span className="text-slate-300 truncate block">
                    {role.topCompanies.slice(0, 3).join(' · ')}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => onSelectRole(role.name)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all border border-slate-800 hover:border-emerald-400 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Select & Apply in Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
