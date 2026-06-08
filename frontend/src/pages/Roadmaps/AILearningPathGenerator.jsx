import React, { useState } from "react";

const AILearningPathGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState([]);

  const generatePath = () => {
    setLoading(true);
    setPath([]);

    setTimeout(() => {
      setPath([
        "Master Advanced React Patterns",
        "Learn System Design Basics",
        "Build 2 Full Stack Projects",
        "Learn Testing (Jest + Cypress)",
        "Deploy with Docker & CI/CD",
      ]);
      setLoading(false);
    }, 1600);
  };

  return (
    <div className="p-6 rounded-xl border bg-white dark:bg-slate-900">
      <h2 className="text-lg font-bold mb-2">AI Learning Path Generator</h2>

      <button
        onClick={generatePath}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Generate Path
      </button>

      {loading && <p className="mt-3 text-indigo-500">Generating roadmap...</p>}

      {path.length > 0 && (
        <ol className="mt-4 list-decimal ml-5 text-sm space-y-1">
          {path.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default AILearningPathGenerator;