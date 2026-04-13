import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { QUESTIONS, calculateScores, getTopResults, RESULTS } from "../lib/quizData";

const STAGES = {
  INTRO: "intro",
  QUIZ: "quiz",
  LEAD: "lead",
  RESULTS: "results",
};

const STORAGE_KEY = "soul_quiz_progress";

export default function Home() {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [animKey, setAnimKey] = useState(0);
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [topResults, setTopResults] = useState([]);
  const [scoreBars, setScoreBars] = useState({});
  const [barAnimate, setBarAnimate] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const progress = stage === STAGES.QUIZ ? ((currentIndex) / totalQuestions) * 100 : stage === STAGES.LEAD ? 95 : stage === STAGES.RESULTS ? 100 : 0;

  // Restore saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.stage === STAGES.QUIZ || data.stage === STAGES.LEAD) {
          setAnswers(data.answers || []);
          setCurrentIndex(data.currentIndex || 0);
          setStage(data.stage);
        }
      }
    } catch {}
  }, []);

  // Save progress
  useEffect(() => {
    if (stage === STAGES.QUIZ || stage === STAGES.LEAD) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ stage, answers, currentIndex }));
      } catch {}
    }
    if (stage === STAGES.RESULTS) {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }, [stage, answers, currentIndex]);

  // Trigger score bar animation after results render
  useEffect(() => {
    if (stage === STAGES.RESULTS) {
      const t = setTimeout(() => setBarAnimate(true), 100);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === currentQuestion?.id);
  };

  const getCurrentSelected = () => {
    const ans = getCurrentAnswer();
    if (!ans) return [];
    return Array.isArray(ans.selected) ? ans.selected : [ans.selected];
  };

  const handleOptionSelect = (optionText) => {
    const q = currentQuestion;
    if (q.type === "single") {
      setAnswers((prev) => {
        const filtered = prev.filter((a) => a.questionId !== q.id);
        return [...filtered, { questionId: q.id, selected: [optionText] }];
      });
    } else {
      const current = getCurrentSelected();
      const alreadySelected = current.includes(optionText);
      let newSelected;
      if (alreadySelected) {
        newSelected = current.filter((o) => o !== optionText);
      } else if (current.length < q.maxSelect) {
        newSelected = [...current, optionText];
      } else {
        // Replace oldest selection
        newSelected = [...current.slice(1), optionText];
      }
      setAnswers((prev) => {
        const filtered = prev.filter((a) => a.questionId !== q.id);
        return [...filtered, { questionId: q.id, selected: newSelected }];
      });
    }
  };

  const isAnswerValid = () => {
    const q = currentQuestion;
    if (!q) return false;
    const selected = getCurrentSelected();
    if (q.type === "single") return selected.length === 1;
    return selected.length >= q.minSelect;
  };

  const goNext = useCallback(() => {
    if (!isAnswerValid()) return;
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Last question done — go to lead capture
      setStage(STAGES.LEAD);
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentIndex, totalQuestions, isAnswerValid]);

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStage(STAGES.INTRO);
      setAnimKey((k) => k + 1);
    }
  };

  const startQuiz = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setStage(STAGES.QUIZ);
    setAnimKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "Please enter your first name.";
    if (!formData.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);
    setSubmitError("");

    const scores = calculateScores(answers);
    const results = getTopResults(scores, 2);
    const primaryResult = results[0]?.type || "creator";

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          email: formData.email.trim(),
          result: primaryResult,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Subscription failed");
      }
    } catch (err) {
      // Don't block results on API error — log and continue
      console.error("Subscribe error:", err.message);
    }

    setTopResults(results);
    setScoreBars(scores);
    setStage(STAGES.RESULTS);
    setAnimKey((k) => k + 1);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const maxScore = Math.max(...Object.values(scoreBars), 1);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (stage === STAGES.QUIZ && e.key === "Enter" && isAnswerValid()) {
        goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, isAnswerValid, goNext]);

  return (
    <>
      <Head>
        <title>What Is Your Soul's Energy Type? | 7 Energies Quiz</title>
        <meta name="description" content="Discover which of the 7 soul energy archetypes is most alive in you — Creator, Healer, Warrior, Lover, Artist, Explorer, or Master." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="quiz-wrapper">
        <div className="quiz-container">

          {/* INTRO */}
          {stage === STAGES.INTRO && (
            <div className="fade-in-up" key="intro">
              <div className="card">
                <div className="intro-hero">
                  <div className="intro-badge">David Gandelman · Meditation School</div>
                  <h1 className="intro-title">
                    What Is Your<br /><span>Soul's Energy Type?</span>
                  </h1>
                  <p className="intro-description">
                    The 7 Energies of the Soul offers a powerful guide to access and balance the seven archetypal energies of your unique soul. Take this quiz to discover which archetypal energies are most alive and balanced within you.
                  </p>
                </div>

                <div className="intro-stats">
                  <div className="stat-item">
                    <span className="stat-number">28</span>
                    <span className="stat-label">Questions</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">~5</span>
                    <span className="stat-label">Minutes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">7</span>
                    <span className="stat-label">Archetypes</span>
                  </div>
                </div>

                <div className="energy-types-grid">
                  {[
                    { label: "Creator", emoji: "🔥" },
                    { label: "Healer", emoji: "💚" },
                    { label: "Warrior", emoji: "⚔️" },
                    { label: "Lover", emoji: "❤️" },
                    { label: "Artist", emoji: "🎨" },
                    { label: "Explorer", emoji: "🧭" },
                    { label: "Master", emoji: "🌟" },
                  ].map((e) => (
                    <span key={e.label} className="energy-pill">
                      {e.emoji} {e.label}
                    </span>
                  ))}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button className="btn-gold" onClick={startQuiz}>
                    Take the Quiz →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QUIZ */}
          {stage === STAGES.QUIZ && currentQuestion && (
            <div key={`q-${animKey}`} className="fade-in-up">
              <div className="progress-label">
                Question {currentIndex + 1} of {totalQuestions}
              </div>
              <div className="progress-bar-outer">
                <div
                  className="progress-bar-inner"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="card">
                <div className="question-number">Question {currentIndex + 1}</div>
                <h2 className="question-text">{currentQuestion.text}</h2>
                {currentQuestion.type === "multi" && (
                  <p className="question-hint">
                    Choose {currentQuestion.minSelect === currentQuestion.maxSelect
                      ? currentQuestion.minSelect
                      : `${currentQuestion.minSelect}–${currentQuestion.maxSelect}`}{" "}
                    {currentQuestion.minSelect === 1 ? "option" : "options"}
                    {getCurrentSelected().length > 0
                      ? ` · ${getCurrentSelected().length} selected`
                      : ""}
                  </p>
                )}

                <div className="options-list">
                  {currentQuestion.options.map((option) => {
                    const selected = getCurrentSelected().includes(option.text);
                    return (
                      <button
                        key={option.text}
                        className={`option-btn${selected ? " selected" : ""}`}
                        onClick={() => handleOptionSelect(option.text)}
                        aria-pressed={selected}
                      >
                        <span
                          className={`option-indicator${currentQuestion.type === "multi" ? " multi" : ""}`}
                        />
                        <span>{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="nav-row">
                  <button className="btn-secondary" onClick={goBack}>
                    ← Back
                  </button>
                  <button
                    className="btn-primary"
                    onClick={goNext}
                    disabled={!isAnswerValid()}
                  >
                    {currentIndex === totalQuestions - 1 ? "See My Results" : "Next"} →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LEAD CAPTURE */}
          {stage === STAGES.LEAD && (
            <div key={`lead-${animKey}`} className="fade-in-up">
              <div className="progress-label">Almost there...</div>
              <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{ width: "95%" }} />
              </div>

              <div className="card">
                <div style={{ textAlign: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "48px" }}>✨</span>
                </div>
                <h2 className="form-title">You're almost there!</h2>
                <p className="form-subtitle">
                  Enter your details below to reveal your soul's energy type and receive personalized insights from David Gandelman.
                </p>

                <div className="form-field">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-input"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, firstName: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoComplete="given-name"
                  />
                  {formErrors.firstName && (
                    <p className="form-error">{formErrors.firstName}</p>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, email: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoComplete="email"
                  />
                  {formErrors.email && (
                    <p className="form-error">{formErrors.email}</p>
                  )}
                </div>

                {submitError && (
                  <p className="form-error" style={{ marginBottom: "12px", textAlign: "center" }}>
                    {submitError}
                  </p>
                )}

                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <button
                    className="btn-gold"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{ width: "100%", maxWidth: "320px" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner" />
                        Revealing your type...
                      </>
                    ) : (
                      "Reveal My Soul Type →"
                    )}
                  </button>
                </div>

                <p className="form-privacy">
                  🔒 Your information is safe. We respect your privacy and you can unsubscribe at any time.
                </p>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button className="btn-secondary" onClick={() => { setStage(STAGES.QUIZ); setAnimKey(k => k + 1); }}>
                    ← Review my answers
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {stage === STAGES.RESULTS && topResults.length > 0 && (
            <div key={`results-${animKey}`} className="fade-in-up">
              <div className="card">
                <div className="results-header">
                  <div className="results-badge">Your Soul's Energy Type</div>
                  <span className="results-emoji">{topResults[0].result.emoji}</span>
                  <h1 className="results-title">{topResults[0].result.title}</h1>
                  <p className="results-tagline">{topResults[0].result.tagline}</p>
                  <div className="results-divider" />
                </div>

                <p className="results-description">{topResults[0].result.description}</p>

                <h3 className="traits-title">Your Balanced {topResults[0].result.title} Energy</h3>
                <div className="traits-grid">
                  {topResults[0].result.traits.map((trait) => (
                    <div key={trait} className="trait-item">
                      <span className="trait-dot" />
                      <span className="trait-text">{trait}</span>
                    </div>
                  ))}
                </div>

                {/* Secondary archetype */}
                {topResults[1] && (
                  <div className="secondary-result">
                    <span className="secondary-emoji">{topResults[1].result.emoji}</span>
                    <div className="secondary-info">
                      <h4>Your Secondary Energy: {topResults[1].result.title}</h4>
                      <p>{topResults[1].result.tagline}</p>
                    </div>
                  </div>
                )}

                {/* Score breakdown */}
                <div className="score-bars">
                  <h3 className="traits-title" style={{ marginBottom: "16px" }}>Your Energy Breakdown</h3>
                  {Object.entries(scoreBars)
                    .sort(([, a], [, b]) => b - a)
                    .map(([type, score]) => (
                      <div key={type} className="score-bar-row">
                        <span className="score-bar-label">
                          {RESULTS[type]?.emoji} {RESULTS[type]?.title.replace("The ", "")}
                        </span>
                        <div className="score-bar-track">
                          <div
                            className={`score-bar-fill${type === topResults[0]?.type ? "" : " navy"}`}
                            style={{
                              width: barAnimate ? `${(score / maxScore) * 100}%` : "0%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="cta-block">
                  <p>{topResults[0].result.cta}</p>
                  <a
                    href="https://meditationschool.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Go Deeper with Meditation School →
                  </a>
                </div>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setStage(STAGES.INTRO);
                      setAnswers([]);
                      setCurrentIndex(0);
                      setTopResults([]);
                      setScoreBars({});
                      setBarAnimate(false);
                      setFormData({ firstName: "", email: "" });
                      setAnimKey((k) => k + 1);
                    }}
                  >
                    ↺ Retake the Quiz
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
