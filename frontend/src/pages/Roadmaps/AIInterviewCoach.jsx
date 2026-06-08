import React, { useState } from "react";

const AIInterviewCoach = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const generateQuestions = () => {
    setLoading(true);
    setQuestions([]);

    setTimeout(() => {
      setQuestions([
        "Explain React Virtual DOM.",
        "How does Node.js handle concurrency?",
        "Difference between REST and GraphQL?",
        "How do you optimize a Next.js app?",
      ]);
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="p-6 rounded-xl border bg-white dark:bg-slate-900">
      <h2 className="text-lg font-bold mb-2">AI Interview Coach</h2>

      <button
        onClick={generateQuestions}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Generate Questions
      </button>

      {loading && (
        <p className="mt-3 text-indigo-500">Preparing interview questions...</p>
      )}

      {questions.length > 0 && (
        <ul className="mt-4 list-disc ml-5 text-sm space-y-1">
          {questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AIInterviewCoach;