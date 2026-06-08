import React, { useState } from "react";

const AICareerAdvisor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        role: "Full Stack Developer (Next.js Focus)",
        match: "92%",
        strengths: [
          "Strong React & Next.js foundation",
          "Good backend understanding (Node.js, Express)",
          "Consistent project-based learning"
        ],
        improvements: [
          "System Design fundamentals",
          "Advanced backend scaling concepts",
          "Testing (Jest / Cypress)"
        ],
        nextStep:
          "Build 1 production-level SaaS project with authentication + payments"
      });

      setLoading(false);
    }, 1800);
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        AI Career Advisor
      </h2>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Get AI-powered roadmap suggestions based on your progress
      </p>

      <button
        onClick={handleGenerate}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Generate Insights
      </button>

      {/* Loading state */}
      {loading && (
        <p className="mt-4 text-sm text-indigo-500 animate-pulse">
          Analyzing your skills...
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-5 space-y-3">

          <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950">
            <p className="font-semibold text-indigo-700 dark:text-indigo-300">
              Recommended Role: {result.role}
            </p>
            <p className="text-sm text-indigo-500">
              Match Score: {result.match}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Strengths
            </h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc ml-5">
              {result.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Improvements
            </h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc ml-5">
              {result.improvements.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Next Step:</span> {result.nextStep}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default AICareerAdvisor;