import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  RotateCcw, 
  ArrowRight, 
  Briefcase, 
  Mail, 
  Building, 
  FileText, 
  Calendar, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SubmissionResult } from './PlacementForm';

interface SubmissionSuccessProps {
  result: SubmissionResult;
  onReset: () => void;
  onExploreRole: (roleName: string) => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ 
  result, 
  onReset,
  onExploreRole
}) => {
  const handleDownloadReceipt = () => {
    const receiptContent = `
===================================================
AI CAMPUS PLACEMENT ASSISTANT - SUBMISSION RECEIPT
===================================================
Reference ID  : ${result.referenceId}
Submitted At  : ${result.submittedAt}
Status        : INGESTION CONFIRMED (n8n Cloud Workflow)
---------------------------------------------------
CANDIDATE DETAILS:
Full Name     : ${result.fullName}
Email Address : ${result.email}
Institution   : ${result.college}
Degree        : ${result.degree}
Branch        : ${result.branch}
Target Track  : ${result.preferredRole}
Resume File   : ${result.fileName}
---------------------------------------------------
PIPELINE STATUS:
[✓] Step 1: n8n Form Webhook Ingestion Complete
[→] Step 2: ATS Resume Parsing & Skill Benchmarking
[→] Step 3: Targeted Opportunity Alignment
[→] Step 4: Dispatching Personalized Interview Preparation Kit
---------------------------------------------------
Endpoint      : https://laharika.app.n8n.cloud/form/5fb2f121-102b-435a-80b6-40777bd2a16c
===================================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Placement_Receipt_${result.referenceId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-900/60 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-10 relative">
          {/* Top celebration banner */}
          <div className="text-center pb-8 border-b border-slate-800">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>n8n INTAKE RECORDED</span>
              <span>·</span>
              <span>STATUS: 200 OK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Application Ingested Successfully
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
              Your profile and resume have been dispatched to the n8n placement evaluation pipeline.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="my-6 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Reference ID</p>
                <p className="text-sm font-bold font-mono text-emerald-400">{result.referenceId}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Timestamp</p>
                <p className="text-xs text-slate-300">{result.submittedAt}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Candidate Name</span>
                <span className="font-semibold text-slate-100">{result.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Registered Email</span>
                <span className="font-semibold text-slate-100">{result.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Institution & Degree</span>
                <span className="font-semibold text-slate-100">{result.degree} · {result.college}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Target Engineering Role</span>
                <span className="font-semibold text-indigo-300">{result.preferredRole}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block mb-0.5">Resume File Uploaded</span>
                <span className="font-mono text-slate-200 text-[11px] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  {result.fileName}
                </span>
              </div>
            </div>
          </div>

          {/* What Happens Next in n8n */}
          <div className="space-y-3 mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Automated Next Steps (n8n Pipeline)
            </h3>
            
            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-200">ATS Resume Extraction & Tokenization</p>
                  <p className="text-xs text-slate-400">
                    Your PDF text, technical stack, and capstone projects are parsed to assess keyword density for {result.preferredRole}.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-200">Skill Gap Benchmarking</p>
                  <p className="text-xs text-slate-400">
                    The system highlights essential topics you should master before campus placement drives commence.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-200">Dispatch to Email ({result.email})</p>
                  <p className="text-xs text-slate-400">
                    Targeted practice coding questions, mock interview rubrics, and high-frequency company trends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleDownloadReceipt}
              type="button"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Official Receipt (.txt)</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onReset}
                type="button"
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another</span>
              </button>

              <button
                onClick={() => onExploreRole(result.preferredRole)}
                type="button"
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View {result.preferredRole} Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
