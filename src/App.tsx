import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlacementForm, SubmissionResult } from './components/PlacementForm';
import { SubmissionSuccess } from './components/SubmissionSuccess';
import { WorkflowSection } from './components/WorkflowSection';
import { RolesDirectory } from './components/RolesDirectory';
import { ReadinessCalculator } from './components/ReadinessCalculator';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { N8nConnectionModal } from './components/N8nConnectionModal';

export default function App() {
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('Software Development Engineer');
  const [isN8nModalOpen, setIsN8nModalOpen] = useState<boolean>(false);

  const scrollToPortal = () => {
    const el = document.getElementById('portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWorkflow = () => {
    const el = document.getElementById('workflow');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRole = (roleName: string) => {
    setSelectedRole(roleName);
    scrollToPortal();
  };

  const handleApplyPresetFromCalculator = (_cgpa: number, role: string) => {
    if (role) setSelectedRole(role);
    scrollToPortal();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenN8nModal={() => setIsN8nModalOpen(true)}
        onScrollToPortal={scrollToPortal}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToPortal={scrollToPortal}
          onScrollToWorkflow={scrollToWorkflow}
        />

        {/* Central Intake Form / Success Screen */}
        <div id="portal">
          {submissionResult ? (
            <SubmissionSuccess
              result={submissionResult}
              onReset={() => setSubmissionResult(null)}
              onExploreRole={(role) => {
                const rolesEl = document.getElementById('roles');
                if (rolesEl) rolesEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ) : (
            <PlacementForm
              selectedRoleFromMatrix={selectedRole}
              onSuccess={(result) => setSubmissionResult(result)}
            />
          )}
        </div>

        {/* n8n Workflow Architecture Visualization */}
        <WorkflowSection />

        {/* 8 Supported Roles Directory & Competency Matrix */}
        <RolesDirectory onSelectRole={handleSelectRole} />

        {/* Placement Readiness Index Calculator */}
        <ReadinessCalculator onApplyPreset={handleApplyPresetFromCalculator} />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenN8nModal={() => setIsN8nModalOpen(true)} />

      {/* n8n Diagnostics & Webhook Details Modal */}
      <N8nConnectionModal
        isOpen={isN8nModalOpen}
        onClose={() => setIsN8nModalOpen(false)}
      />
    </div>
  );
}
