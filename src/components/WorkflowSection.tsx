import React, { useState } from 'react';
import { 
  GitBranch, 
  Database, 
  Cpu, 
  Send, 
  FileCheck2, 
  Sparkles, 
  Code, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'step-1',
      title: 'n8n Form Trigger Webhook',
      nodeType: 'Trigger Node',
      icon: GitBranch,
      color: 'emerald',
      description: 'Listens for student submissions on https://laharika.app.n8n.cloud/form/5fb2f121-102b-435a-80b6-40777bd2a16c.',
      details: [
        'Ingests fields: Full Name, Email, College, Degree, Branch, Graduation Year, CGPA, Preferred Role, Skills',
        'Validates PDF file binary from multipart/form-data',
        'Generates unified execution context & student payload'
      ],
      sampleOutput: `{
  "field-0": "Laharika Rayudu",
  "field-1": "rayudulaharika@gmail.com",
  "field-2": "VIT",
  "field-7": "Software Development Engineer",
  "field-9": "[Binary PDF: 1.4 MB]"
}`,
    },
    {
      id: 'step-2',
      title: 'ATS Resume Binary Extraction',
      nodeType: 'Transform Node',
      icon: FileCheck2,
      color: 'indigo',
      description: 'Extracts full plain text and structural sections from the uploaded PDF resume.',
      details: [
        'Extracts education, certifications, open-source projects, and internship history',
        'Evaluates ATS score and keyword density for the specified role',
        'Highlights top 5 candidate strengths and formatting risks'
      ],
      sampleOutput: `{
  "atsScore": 92,
  "detectedLanguages": ["C++", "Java", "TypeScript", "SQL"],
  "projectsCount": 4,
  "experienceMonths": 6
}`,
    },
    {
      id: 'step-3',
      title: 'Skill Gap & Role Benchmarking',
      nodeType: 'AI Evaluation Node',
      icon: Cpu,
      color: 'teal',
      description: 'Compares student technical stack against current engineering hiring bars at top firms.',
      details: [
        'Benchmarks profile against SDE, Full Stack, AI/ML, and 5 other engineering tracks',
        'Identifies missing competencies (e.g. Distributed Caching, Concurrency, Microservices)',
        'Calculates eligibility for Tier-1 Product vs. Tier-2 IT recruitment drives'
      ],
      sampleOutput: `{
  "targetRole": "Software Development Engineer",
  "matchScore": "88%",
  "missingHighYieldSkills": ["System Design Basics", "Kafka"],
  "recommendedFocus": "Graph Algorithms & Dynamic Programming"
}`,
    },
    {
      id: 'step-4',
      title: 'Interview Kit & Automated Dispatch',
      nodeType: 'Delivery Node',
      icon: Send,
      color: 'amber',
      description: 'Generates a tailored interview roadmap and delivers it directly to the student inbox.',
      details: [
        '10 high-probability coding problem suggestions customized to candidate CGPA & role',
        '5 role-specific behavioral interview prompts',
        'Automated email notification sent via SMTP/SendGrid node'
      ],
      sampleOutput: `{
  "dispatchStatus": "DELIVERED",
  "recipient": "rayudulaharika@gmail.com",
  "studyKitGenerated": true,
  "executionTime": "1.24s"
}`,
    },
  ];

  return (
    <section id="workflow" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <span>PIPELINE ARCHITECTURE</span>
            <span>·</span>
            <span>AUTONOMOUS N8N WORKFLOW</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            How the Placement Engine Processes Your Profile
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Every submission triggers a multi-stage automation workflow in n8n Cloud that verifies
            credentials, extracts ATS keywords, diagnoses skill gaps, and prepares candidates for interviews.
          </p>
        </div>

        {/* Workflow Diagram & Interactive Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Step selection list */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        Stage 0{index + 1} · {step.nodeType}
                      </span>
                    </div>
                    <h3 className={`text-sm font-semibold truncate mt-0.5 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Step Deep Dive Inspector */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">
                  Node Inspector · Stage 0{activeStep + 1}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded">
                n8n Cloud Managed
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white">
                  {steps[activeStep].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Functional details checklist */}
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Node Operations & Validations
                </p>
                <div className="space-y-2">
                  {steps[activeStep].details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-indigo-400 font-bold">›</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live JSON Payload Inspector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Node Data Payload Representation
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">application/json</span>
                </div>
                <pre className="bg-slate-950 border border-slate-800/80 rounded-lg p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto">
                  {steps[activeStep].sampleOutput}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
