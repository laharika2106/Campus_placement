import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  Building, 
  Calendar, 
  Award, 
  Briefcase, 
  Code2, 
  FileText, 
  UploadCloud, 
  Check, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  X,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  TARGET_ROLES, 
  POPULAR_COLLEGES, 
  POPULAR_DEGREES, 
  POPULAR_BRANCHES, 
  QUICK_SKILL_SUGGESTIONS 
} from '../data/placementData';

export interface SubmissionResult {
  referenceId: string;
  fullName: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  preferredRole: string;
  fileName: string;
  submittedAt: string;
  message: string;
}

interface PlacementFormProps {
  selectedRoleFromMatrix?: string;
  onSuccess: (result: SubmissionResult) => void;
}

export const PlacementForm: React.FC<PlacementFormProps> = ({ 
  selectedRoleFromMatrix, 
  onSuccess 
}) => {
  // Form fields matching n8n schema
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [branch, setBranch] = useState('');
  const [graduationYear, setGraduationYear] = useState<number | ''>(2026);
  const [cgpa, setCgpa] = useState<number | ''>(8.5);
  const [preferredRole, setPreferredRole] = useState('Software Development Engineer');
  const [skills, setSkills] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // UI & Submission states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preferred role if passed from parent
  useEffect(() => {
    if (selectedRoleFromMatrix) {
      setPreferredRole(selectedRoleFromMatrix);
      // Auto-suggest skills for that role if skills field is empty
      const roleData = TARGET_ROLES.find(r => r.name === selectedRoleFromMatrix);
      if (roleData && (!skills || skills.trim() === '')) {
        setSkills(roleData.primarySkills.join(', '));
      }
    }
  }, [selectedRoleFromMatrix]);

  // Demo auto-fill helper for instant testing
  const handleFillDemo = () => {
    setFullName('Laharika Rayudu');
    setEmail('rayudulaharika@gmail.com');
    setCollege('Vellore Institute of Technology (VIT)');
    setDegree('B.Tech');
    setBranch('Computer Science and Engineering (CSE)');
    setGraduationYear(2026);
    setCgpa(8.85);
    setPreferredRole('Software Development Engineer');
    setSkills('Data Structures & Algorithms, C++, Java, System Design, React, Node.js, SQL, Git');
    
    // Create a mock PDF blob for demo file if none selected
    if (!resumeFile) {
      const mockPdfContent = '%PDF-1.4\n1 0 obj\n<< /Title (Placement Resume - Laharika Rayudu) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF';
      const mockBlob = new Blob([mockPdfContent], { type: 'application/pdf' });
      const mockFile = new File([mockBlob], 'Laharika_Rayudu_Resume_2026.pdf', { type: 'application/pdf' });
      setResumeFile(mockFile);
    }
    setErrors({});
    setSubmitError(null);
  };

  // Skill chip appender
  const handleAddSkill = (skill: string) => {
    if (!skills) {
      setSkills(skill);
      return;
    }
    const currentSkills = skills.split(',').map(s => s.trim().toLowerCase());
    if (!currentSkills.includes(skill.toLowerCase())) {
      setSkills(`${skills.trim().replace(/,$/, '')}, ${skill}`);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, resume: 'Only PDF documents are supported (.pdf).' }));
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'Resume file size must be under 15MB.' }));
      return;
    }
    setResumeFile(file);
    setErrors(prev => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validation
  const validateForm = () => {
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = 'Full Name is required.';
    if (!email.trim()) {
      err.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = 'Please provide a valid email format.';
    }
    if (!college.trim()) err.college = 'College/University name is required.';
    if (!degree.trim()) err.degree = 'Degree is required.';
    if (!branch.trim()) err.branch = 'Branch/Major is required.';
    if (!graduationYear) err.graduationYear = 'Graduation Year is required.';
    if (cgpa === '' || Number(cgpa) < 0 || Number(cgpa) > 10) {
      err.cgpa = 'Enter a valid CGPA between 0.0 and 10.0';
    }
    if (!preferredRole) err.preferredRole = 'Please select a preferred role.';
    if (!skills.trim()) err.skills = 'Please enter your core technical skills.';
    if (!resumeFile) err.resume = 'Resume PDF is required by the placement workflow.';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      const firstError = document.querySelector('.error-text');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmissionStep('Packaging candidate profile & resume...');

    try {
      // Step 1: Prepare FormData with both n8n schema field-0..field-9 and named keys
      const formData = new FormData();
      formData.append('field-0', fullName.trim());
      formData.append('fullName', fullName.trim());
      formData.append('field-1', email.trim());
      formData.append('email', email.trim());
      formData.append('field-2', college.trim());
      formData.append('college', college.trim());
      formData.append('field-3', degree.trim());
      formData.append('degree', degree.trim());
      formData.append('field-4', branch.trim());
      formData.append('branch', branch.trim());
      formData.append('field-5', String(graduationYear));
      formData.append('graduationYear', String(graduationYear));
      formData.append('field-6', String(cgpa));
      formData.append('cgpa', String(cgpa));
      formData.append('field-7', preferredRole);
      formData.append('preferredRole', preferredRole);
      formData.append('field-8', skills.trim());
      formData.append('skills', skills.trim());
      if (resumeFile) {
        formData.append('field-9', resumeFile, resumeFile.name);
        formData.append('resume', resumeFile, resumeFile.name);
      }

      setSubmissionStep('Transmitting to n8n Cloud Webhook...');

      let isSuccess = false;
      let recordedMessage = 'Your placement profile has been recorded.';
      const refId = `PLM-${Date.now().toString(36).toUpperCase()}`;

      // Primary attempt: Direct POST to n8n form webhook (enabled with CORS)
      try {
        const directRes = await fetch('https://laharika.app.n8n.cloud/form/5fb2f121-102b-435a-80b6-40777bd2a16c', {
          method: 'POST',
          body: formData,
        });

        const directText = await directRes.text();
        let directJson: any = null;
        try {
          directJson = JSON.parse(directText);
        } catch {
          // Response might be HTML or empty
        }

        if (
          directRes.ok ||
          directRes.status === 200 ||
          directJson?.status === 200 ||
          directText.includes('status":200') ||
          directText.includes('response has been recorded') ||
          directText.includes('Form Submitted')
        ) {
          isSuccess = true;
          if (directJson?.formSubmittedText) {
            recordedMessage = directJson.formSubmittedText;
          }
        }
      } catch (directErr) {
        console.warn('Direct n8n submission encountered network error, falling back to server proxy:', directErr);
      }

      // Secondary fallback: Server proxy (/api/submit-application)
      if (!isSuccess) {
        setSubmissionStep('Connecting via backup server proxy...');
        const proxyRes = await fetch('/api/submit-application', {
          method: 'POST',
          body: formData,
        });

        const proxyText = await proxyRes.text();
        let proxyJson: any = null;
        try {
          proxyJson = JSON.parse(proxyText);
        } catch {
          // Not valid JSON
        }

        if (proxyRes.ok || proxyJson?.success || proxyRes.status === 200) {
          isSuccess = true;
          if (proxyJson?.message) {
            recordedMessage = proxyJson.message;
          }
        } else {
          const errMsg = proxyJson?.error || (proxyRes.status ? `Server returned HTTP ${proxyRes.status}` : 'Could not submit profile.');
          throw new Error(errMsg);
        }
      }

      if (isSuccess) {
        setSubmissionStep('Workflow execution confirmed!');
        await new Promise(r => setTimeout(r, 400));
        onSuccess({
          referenceId: refId,
          fullName,
          email,
          college,
          degree,
          branch,
          preferredRole,
          fileName: resumeFile?.name || 'resume.pdf',
          submittedAt: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          message: recordedMessage,
        });
      } else {
        throw new Error('Unable to record application response. Please verify connection and retry.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      // Clean error message without technical JSON syntax clutter
      const cleanMessage =
        err.message?.includes('Unexpected token') || err.message?.includes('is not valid JSON')
          ? 'Network response error during form processing. Please click retry or use the direct n8n link below.'
          : err.message || 'An unexpected error occurred while communicating with n8n. Please try again.';
      setSubmitError(cleanMessage);
    } finally {
      setIsSubmitting(false);
      setSubmissionStep('');
    }
  };

  return (
    <section id="portal" className="py-16 sm:py-20 bg-slate-900/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>OFFICIAL N8N INTAKE PORTAL</span>
            <span>·</span>
            <span>ENDPOINT: /form/5fb2f121...</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Candidate Placement Application
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
            Provide your academic profile and upload your resume. All details are securely piped
            directly into our automated evaluation pipeline.
          </p>

          {/* Quick Demo Fill Bar */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-950/70 border border-indigo-700/60 text-indigo-300 hover:text-white hover:bg-indigo-900/80 text-xs font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Fill Sample Student Data</span>
            </button>
            <span className="text-xs text-slate-400">or enter your own profile below</span>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden relative"
        >
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

          {/* Error Banner */}
          {submitError && (
            <div className="p-4 mx-6 mt-6 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-300">Submission Notice</p>
                <p className="text-red-300/90 mt-0.5">{submitError}</p>
                <div className="mt-2 flex items-center gap-3">
                  <a
                    href="https://laharika.app.n8n.cloud/form/5fb2f121-102b-435a-80b6-40777bd2a16c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium"
                  >
                    <span>Open raw n8n form in new tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-8">
            {/* Step 1: Academic & Contact Profile */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <User className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  1. Candidate & Academic Profile
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="full-name">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Laharika Rayudu"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-rose-400 mt-1 error-text">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="email-address">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email-address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. candidate@university.edu"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-400 mt-1 error-text">{errors.email}</p>}
                </div>

                {/* College */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300" htmlFor="college-input">
                      College / University Name <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Popular presets below</span>
                  </div>
                  <input
                    id="college-input"
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Vellore Institute of Technology (VIT)"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                      errors.college ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {POPULAR_COLLEGES.slice(0, 5).map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setCollege(col)}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {col.split('(')[1]?.replace(')', '') || col.slice(0, 15)}
                      </button>
                    ))}
                  </div>
                  {errors.college && <p className="text-xs text-rose-400 mt-1 error-text">{errors.college}</p>}
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="degree-input">
                    Degree <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="degree-input"
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech / B.E."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                      errors.degree ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {['B.Tech', 'M.Tech', 'MCA', 'BCA', 'B.Sc CS'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDegree(d)}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {errors.degree && <p className="text-xs text-rose-400 mt-1 error-text">{errors.degree}</p>}
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="branch-input">
                    Branch / Department <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="branch-input"
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Computer Science and Engineering"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                      errors.branch ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {['CSE', 'IT', 'AI & DS', 'ECE'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          const match = POPULAR_BRANCHES.find(pb => pb.includes(b));
                          setBranch(match || b);
                        }}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {errors.branch && <p className="text-xs text-rose-400 mt-1 error-text">{errors.branch}</p>}
                </div>

                {/* Graduation Year */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="grad-year-input">
                    Graduation Year <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="grad-year-input"
                    type="number"
                    min="2020"
                    max="2032"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value === '' ? '' : Number(e.target.value))}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                      errors.graduationYear ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  <div className="flex gap-2 mt-1.5">
                    {[2024, 2025, 2026, 2027, 2028].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setGraduationYear(yr)}
                        className={`px-2 py-0.5 rounded text-[11px] border cursor-pointer ${
                          graduationYear === yr
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                  {errors.graduationYear && <p className="text-xs text-rose-400 mt-1 error-text">{errors.graduationYear}</p>}
                </div>

                {/* CGPA */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300" htmlFor="cgpa-input">
                      CGPA (out of 10.0) <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">Scale: 0.0 - 10.0</span>
                  </div>
                  <input
                    id="cgpa-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 8.65"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                      errors.cgpa ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  {errors.cgpa && <p className="text-xs text-rose-400 mt-1 error-text">{errors.cgpa}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Preferred Role & Skills */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  2. Preferred Placement Track & Skills
                </h3>
              </div>

              <div className="space-y-5">
                {/* Preferred Role Select */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="role-select">
                    Preferred Role <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="role-select"
                      value={preferredRole}
                      onChange={(e) => {
                        setPreferredRole(e.target.value);
                        // Suggest default skills for that role
                        const roleObj = TARGET_ROLES.find(r => r.name === e.target.value);
                        if (roleObj && (!skills || skills.trim() === '')) {
                          setSkills(roleObj.primarySkills.join(', '));
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none cursor-pointer"
                    >
                      {TARGET_ROLES.map((role) => (
                        <option key={role.id} value={role.name} className="bg-slate-900 text-slate-100">
                          {role.name} ({role.category})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      ▼
                    </div>
                  </div>
                  {errors.preferredRole && <p className="text-xs text-rose-400 mt-1 error-text">{errors.preferredRole}</p>}
                </div>

                {/* Skills Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300" htmlFor="skills-textarea">
                      Technical Skills & Tools <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Comma-separated or click tags below</span>
                  </div>
                  <textarea
                    id="skills-textarea"
                    rows={3}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. Data Structures & Algorithms, React, Node.js, Python, PostgreSQL, Docker, Git"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors ${
                      errors.skills ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  {/* Skill Tag Click-to-Add Bank */}
                  <div className="mt-2">
                    <p className="text-[11px] text-slate-400 mb-1.5">Quick add trending skills:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_SKILL_SUGGESTIONS.map((skill) => {
                        const isAdded = skills.toLowerCase().includes(skill.toLowerCase());
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleAddSkill(skill)}
                            className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
                              isAdded
                                ? 'bg-emerald-950/60 border border-emerald-700/60 text-emerald-300'
                                : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white'
                            }`}
                          >
                            {isAdded && <Check className="w-3 h-3 text-emerald-400" />}
                            <span>{skill}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {errors.skills && <p className="text-xs text-rose-400 mt-1 error-text">{errors.skills}</p>}
                </div>
              </div>
            </div>

            {/* Step 3: Resume PDF Upload */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <FileText className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  3. Resume Upload (PDF)
                </h3>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                  dragActive
                    ? 'border-emerald-400 bg-emerald-950/20'
                    : resumeFile
                    ? 'border-emerald-500/60 bg-emerald-950/10'
                    : errors.resume
                    ? 'border-rose-500 bg-rose-950/10'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!resumeFile ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-emerald-400">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Click to browse or drag & drop your resume
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Accepts official PDF format only (Max 15MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3 max-w-md mx-auto">
                    <div className="flex items-center gap-3 text-left overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-rose-400 font-bold text-xs flex-shrink-0">
                        PDF
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-medium text-slate-200 truncate">{resumeFile.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB · Ready for n8n ingestion
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {errors.resume && <p className="text-xs text-rose-400 mt-1.5 error-text">{errors.resume}</p>}
            </div>
          </div>

          {/* Form Footer Action */}
          <div className="px-6 sm:px-8 py-5 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Data is forwarded directly to n8n webhook workflow</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Processing Submission...</span>
                </>
              ) : (
                <>
                  <span>Submit Application to n8n Engine</span>
                  <ChevronRight className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </div>

          {/* Animated Overlay during submission */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-emerald-500/40 flex items-center justify-center shadow-xl shadow-emerald-500/10 mb-4">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
              <h4 className="text-lg font-semibold text-white">Transmitting to Placement Engine</h4>
              <p className="text-xs text-emerald-400 font-mono mt-1 animate-pulse">
                {submissionStep}
              </p>
              <p className="text-xs text-slate-400 mt-3 max-w-xs">
                Forwarding student profile and resume PDF to n8n Cloud workflow trigger.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
