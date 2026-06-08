import React, { useState } from "react";

const AISkillAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const analyzeSkills = () => {
    setLoading(true);
    setData(null);

    setTimeout(() => {
      setData({
        strengths: ["React", "Next.js", "Node.js"],
        gaps: ["System Design", "Testing", "DevOps basics"],
        level: "Intermediate Full Stack Developer",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 rounded-xl border bg-white dark:bg-slate-900">
      <h2 className="text-lg font-bold mb-2">AI Skill Analyzer</h2>

      <button
        onClick={analyzeSkills}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Analyze Skills
      </button>

      {loading && <p className="mt-3 text-indigo-500">Analyzing...</p>}

      {data && (
        <div className="mt-4 space-y-2">
          <p className="font-semibold">Level: {data.level}</p>

          <div>
            <h3 className="font-semibold">Strengths</h3>
            <ul className="list-disc ml-5 text-sm">
              {data.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Gaps</h3>
            <ul className="list-disc ml-5 text-sm">
              {data.gaps.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISkillAnalyzer;