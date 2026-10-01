import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Network, 
  Copy, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

interface N8nConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const N8nConnectionModal: React.FC<N8nConnectionModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{ status: number | string; ok: boolean; latencyMs?: number } | null>(null);

  if (!isOpen) return null;

  const targetUrl = 'https://laharika.app.n8n.cloud/form/5fb2f121-102b-435a-80b6-40777bd2a16c';

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePing = async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      const latency = Math.round(performance.now() - start);
      setPingResult({
        status: data.n8nEndpointStatus,
        ok: data.n8nEndpointOk,
        latencyMs: latency,
      });
    } catch {
      setPingResult({
        status: 'Error',
        ok: false,
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">n8n Cloud Workflow Integration</h3>
              <p className="text-[11px] text-slate-400 font-mono">Instance: laharika.app.n8n.cloud</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Target Endpoint */}
          <div>
            <span className="text-slate-400 font-mono uppercase text-[11px] block mb-1">
              Live n8n Form Webhook URL
            </span>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-mono text-emerald-400 truncate flex-1 text-[11px]">
                {targetUrl}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Health & Ping Diagnostic */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Endpoint Connectivity</span>
              {pingResult ? (
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${pingResult.ok ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className="font-semibold text-slate-200">
                    Status: {pingResult.status} {pingResult.latencyMs && `(${pingResult.latencyMs}ms)`}
                  </span>
                </div>
              ) : (
                <span className="text-slate-400">Ready to test connection</span>
              )}
            </div>
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Pinging...' : 'Ping Test'}</span>
            </button>
          </div>

          {/* Form Schema Field Mapping Table */}
          <div>
            <span className="text-slate-400 font-mono uppercase text-[11px] block mb-1.5">
              Mapped n8n Form Fields (Multipart / Form-Data)
            </span>
            <div className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60 font-mono">
                    <th className="p-2">Field ID</th>
                    <th className="p-2">Form Label</th>
                    <th className="p-2">Data Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 font-mono text-slate-300">
                  <tr>
                    <td className="p-2 text-indigo-400">field-0</td>
                    <td className="p-2">Full Name</td>
                    <td className="p-2 text-slate-400">string</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-1</td>
                    <td className="p-2">Email</td>
                    <td className="p-2 text-slate-400">email</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-2</td>
                    <td className="p-2">College</td>
                    <td className="p-2 text-slate-400">string</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-3</td>
                    <td className="p-2">Degree</td>
                    <td className="p-2 text-slate-400">string</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-4</td>
                    <td className="p-2">Branch</td>
                    <td className="p-2 text-slate-400">string</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-5</td>
                    <td className="p-2">Graduation Year</td>
                    <td className="p-2 text-slate-400">number</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-6</td>
                    <td className="p-2">CGPA</td>
                    <td className="p-2 text-slate-400">number</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-7</td>
                    <td className="p-2">Preferred Role</td>
                    <td className="p-2 text-slate-400">select (8 roles)</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-8</td>
                    <td className="p-2">Skills</td>
                    <td className="p-2 text-slate-400">textarea</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-indigo-400">field-9</td>
                    <td className="p-2">Resume</td>
                    <td className="p-2 text-slate-400">binary (.pdf)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Automated pipeline execution enabled
          </span>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>Open Original n8n Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
