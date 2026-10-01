import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What does the n8n placement assistant do with my uploaded resume?',
      answer:
        'When you submit your application, our n8n workflow triggers an automated pipeline that extracts raw text from your PDF, evaluates your ATS keyword density, detects foundational strengths, and benchmarks your technical stack against contemporary engineering hiring bars for your selected track.',
    },
    {
      question: 'What file format and size limits apply to resume uploads?',
      answer:
        'The n8n form strictly requires `.pdf` format. PDF files maintain consistent structural formatting for programmatic text extraction. The maximum upload size is 15MB, which is more than sufficient for multi-page resumes.',
    },
    {
      question: 'How do I receive the automated skill gap report and interview preparation kit?',
      answer:
        'The automated workflow routes the parsed insights and role-specific interview preparation kits directly to the candidate email address provided in field-1 of the submission form.',
    },
    {
      question: 'Can I re-submit if I update my resume or complete new projects?',
      answer:
        'Yes. You can re-submit your profile anytime. The workflow assigns each intake a unique reference ID (e.g., PLM-XXXX) so your placement progress and updated skills are tracked over time.',
    },
    {
      question: 'Why are these 8 specific technical roles supported?',
      answer:
        'Software Development Engineer, Full Stack, Frontend, Backend, AI/ML, Data Analyst, Data Engineer, and DevOps Engineer comprise over 92% of all campus technical recruitment demand across tier-1 product companies, unicorns, and enterprise software firms.',
    },
    {
      question: 'Is my data secure and private?',
      answer:
        'All transmissions are piped over encrypted TLS directly to the dedicated n8n Cloud endpoint (https://laharika.app.n8n.cloud). Data is exclusively utilized for placement evaluation and candidate readiness analytics.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-900/50 border-b border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>STUDENT & PLACEMENT CELL GUIDE</span>
            <span>·</span>
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
            Everything you need to know about candidate submission, ATS screening, and automated
            evaluation through the n8n placement assistant.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800/90 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
