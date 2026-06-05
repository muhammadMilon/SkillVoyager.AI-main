import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_URL || 'https://backend-skill-voyager-ai.vercel.app';

const QuizSession = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const quiz = location.state?.quiz;

  const [answers, setAnswers] = useState(Array(quiz?.questions?.length || 0).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!quiz) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(150deg, #071320 0%, #0b1d2e 55%, #060f1a 100%)',
        fontFamily: 'system-ui, sans-serif', padding: '0 16px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(18px,4vw,24px)', fontWeight: 700, marginBottom: 16 }}>
            Quiz Session Not Found
          </h2>
          <Link to="/quiz/generate" style={{ color: '#17B6A8', textDecoration: 'underline', fontSize: 16 }}>
            Go generate a new quiz
          </Link>
        </div>
      </div>
    );
  }

  const handleOptionChange = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.includes('')) {
      toast.warning('Please answer all questions before submitting.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user?.email || 'anonymous',
          uid: user?.uid,
          quizId,
          answers
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit quiz');
      toast.success('Quiz submitted successfully!');
      navigate(`/quiz/result`, { state: { result, quizInfo: { topic: quiz.topic, skillLevel: quiz.skillLevel } } });
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Error submitting quiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const answered = answers.filter(a => a !== '').length;
  const total = quiz.questions.length;
  const progress = (answered / total) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(150deg, #071320 0%, #0b1d2e 55%, #060f1a 100%)',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <style>{`
        .quiz-bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(23,182,168,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,182,168,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* ── Navbar ── */
        .quiz-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(7,19,32,0.93);
          border-bottom: 1px solid rgba(23,182,168,0.18);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .quiz-nav-inner {
          max-width: 860px; margin: 0 auto;
          padding: 14px 32px;
          display: flex; justify-content: space-between; align-items: center; gap: 12px;
        }
        .quiz-nav-left {
          display: flex; align-items: center; gap: 12px; min-width: 0;
        }
        .quiz-nav-title {
          color: #fff; font-size: clamp(14px, 2vw, 18px);
          font-weight: 700; margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 55vw;
        }
        .quiz-nav-right {
          display: flex; align-items: center; gap: 12px; flex-shrink: 0;
        }
        .quiz-nav-counter {
          font-size: 12px; color: rgba(255,255,255,0.45); white-space: nowrap;
        }
        .quiz-nav-badge {
          background: rgba(23,182,168,0.10);
          border: 1px solid rgba(23,182,168,0.28);
          color: #17B6A8;
          padding: 5px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap;
        }
        .quiz-progress-wrap {
          height: 3px; background: rgba(23,182,168,0.12); overflow: hidden;
        }

        @media (max-width: 768px) {
          .quiz-nav-inner  { padding: 13px 20px; }
          .quiz-nav-title  { max-width: 44vw; }
          .quiz-nav-counter { display: none; }
        }
        @media (max-width: 480px) {
          .quiz-nav-inner  { padding: 11px 14px; gap: 8px; }
          .quiz-nav-title  { font-size: 13px; max-width: 38vw; }
          .quiz-nav-badge  { padding: 4px 10px; font-size: 10px; }
        }
        @media (max-width: 360px) {
          .quiz-nav-title  { max-width: 30vw; }
        }

        /* ── Main ── */
        .quiz-main {
          max-width: 760px; margin: 0 auto;
          padding: 32px 32px 64px;
          display: flex; flex-direction: column; gap: 24px;
          position: relative; z-index: 1;
        }
        @media (max-width: 768px) {
          .quiz-main { padding: 24px 20px 56px; gap: 20px; }
        }
        @media (max-width: 480px) {
          .quiz-main { padding: 18px 14px 48px; gap: 16px; }
        }

        /* ── Card ── */
        .quiz-card {
          background: rgba(11,29,46,0.82);
          border: 1px solid rgba(23,182,168,0.18);
          border-radius: 20px; padding: 28px 32px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .quiz-card:hover {
          border-color: rgba(23,182,168,0.30);
          box-shadow: 0 0 28px rgba(23,182,168,0.07);
        }
        @media (max-width: 768px) {
          .quiz-card { padding: 22px 22px; border-radius: 16px; }
        }
        @media (max-width: 480px) {
          .quiz-card { padding: 16px 14px; border-radius: 14px; }
        }

        /* ── Question text ── */
        .quiz-q-text {
          color: #fff; font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 600; margin: 0 0 18px; line-height: 1.55;
        }
        @media (max-width: 480px) {
          .quiz-q-text { margin-bottom: 14px; }
        }

        /* ── Option ── */
        .quiz-option {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 18px; border-radius: 12px;
          border: 1.5px solid rgba(23,182,168,0.15);
          background: rgba(7,19,32,0.50);
          cursor: pointer; transition: all 0.22s ease;
          margin-bottom: 10px; word-break: break-word;
        }
        .quiz-option:last-child { margin-bottom: 0; }
        .quiz-option:hover {
          border-color: rgba(23,182,168,0.38);
          background: rgba(23,182,168,0.06);
        }
        .quiz-option.selected {
          border-color: #17B6A8;
          background: rgba(23,182,168,0.12);
          box-shadow: 0 0 0 1px rgba(23,182,168,0.22), 0 4px 14px rgba(23,182,168,0.10);
          transform: scale(1.01);
        }
        @media (max-width: 768px) {
          .quiz-option { padding: 12px 16px; gap: 10px; }
        }
        @media (max-width: 480px) {
          .quiz-option { padding: 11px 12px; border-radius: 10px; margin-bottom: 8px; }
          .quiz-option.selected { transform: none; }
        }

        /* ── Option text ── */
        .quiz-opt-text {
          font-size: clamp(13px, 1.4vw, 15px);
          line-height: 1.5; transition: color 0.2s; flex: 1;
        }

        /* ── Radio ── */
        .quiz-radio {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid rgba(23,182,168,0.38);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
        }
        .quiz-radio.checked { border-color: #17B6A8; background: #17B6A8; }
        .quiz-radio.checked::after {
          content: ''; width: 7px; height: 7px;
          border-radius: 50%; background: #fff;
        }
        @media (max-width: 480px) {
          .quiz-radio { width: 18px; height: 18px; }
          .quiz-radio.checked::after { width: 6px; height: 6px; }
        }

        /* ── Submit row ── */
        .quiz-submit-row {
          padding-top: 8px;
          display: flex; justify-content: flex-end;
        }
        @media (max-width: 600px) {
          .quiz-submit-row { justify-content: stretch; }
        }

        /* ── Submit button ── */
        .quiz-submit {
          padding: 15px 48px; border-radius: 14px; border: none;
          font-size: 15px; font-weight: 700; color: #fff;
          background: linear-gradient(135deg, #17B6A8, #0d9e92);
          box-shadow: 0 8px 28px rgba(23,182,168,0.35);
          cursor: pointer; transition: all 0.25s;
          font-family: system-ui, sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .quiz-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(23,182,168,0.45);
        }
        .quiz-submit:active:not(:disabled) { transform: translateY(0); }
        .quiz-submit:disabled {
          opacity: 0.6; cursor: not-allowed;
          background: rgba(23,182,168,0.40); box-shadow: none; transform: none;
        }
        @media (max-width: 600px) {
          .quiz-submit { width: 100%; padding: 15px 0; }
        }
        @media (max-width: 380px) {
          .quiz-submit { font-size: 14px; border-radius: 12px; }
        }

        @keyframes spinLoader { to { transform: rotate(360deg); } }
      `}</style>

      {/* BG grid */}
      <div className="quiz-bg-grid" />

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: 'clamp(260px,45vw,600px)', height: 'clamp(260px,45vw,600px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(23,182,168,0.10) 0%, transparent 65%)' }} />
      <div style={{ position: 'fixed', bottom: '-8%', right: '-8%', width: 'clamp(200px,38vw,500px)', height: 'clamp(200px,38vw,500px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(23,182,168,0.06) 0%, transparent 65%)' }} />

      {/* ── Navbar ── */}
      <nav className="quiz-nav">
        <div className="quiz-nav-inner">
          <div className="quiz-nav-left">
            <div style={{ width: 4, height: 26, borderRadius: 2, background: 'linear-gradient(180deg, #17B6A8, #0d9e92)', flexShrink: 0 }} />
            <h1 className="quiz-nav-title">
              {quiz.topic} <span style={{ color: '#17B6A8' }}>Quiz</span>
            </h1>
          </div>
          <div className="quiz-nav-right">
            <span className="quiz-nav-counter">{answered}/{total} answered</span>
            <span className="quiz-nav-badge">{quiz.skillLevel}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="quiz-progress-wrap">
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #17B6A8, #0fd4c4)',
            transition: 'width 0.4s ease', borderRadius: 2,
          }} />
        </div>
      </nav>

      {/* ── Questions ── */}
      <main className="quiz-main">
        {quiz.questions.map((q, index) => (
          <div key={index} className="quiz-card">
            <h3 className="quiz-q-text">
              <span style={{ color: '#17B6A8', marginRight: 8, fontWeight: 800 }}>Q{index + 1}.</span>
              {q.question}
            </h3>
            <div>
              {q.options.map((opt, oIndex) => {
                const isSelected = answers[index] === opt;
                return (
                  <label
                    key={oIndex}
                    className={`quiz-option${isSelected ? ' selected' : ''}`}
                    onClick={() => handleOptionChange(index, opt)}
                  >
                    <div className={`quiz-radio${isSelected ? ' checked' : ''}`} />
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={opt}
                      checked={isSelected}
                      onChange={() => handleOptionChange(index, opt)}
                      style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
                    />
                    <span className="quiz-opt-text" style={{ color: isSelected ? '#fff' : 'rgba(255,255,255,0.75)' }}>
                      {opt}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Submit */}
        <div className="quiz-submit-row">
          <button onClick={handleSubmit} disabled={isSubmitting} className="quiz-submit">
            {isSubmitting ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spinLoader 0.7s linear infinite', flexShrink: 0 }} />
                Evaluating...
              </>
            ) : 'Submit Answers'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizSession;