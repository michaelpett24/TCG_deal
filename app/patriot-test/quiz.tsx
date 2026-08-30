"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AGES, GENDERS, MAX_SCORE, QUESTIONS } from "./data";
import { AGE_ROAST, GENDER_ROAST, tierFor } from "./results";
import s from "./patriot.module.css";

type Screen = "intro" | "demo" | "quiz" | "analyzing" | "results";

const ANALYSIS_STEPS = [
  "Establishing secure connection to the Founding Fathers…",
  "Scanning submission for Soros funding…",
  "Cross-referencing answers against Truth Social…",
  "Measuring flag-to-square-foot ratio…",
  "Consulting a guy named Big Mike who knows a guy…",
  "Auditing your bloodline for RINO markers…",
  "Compiling certificate. Do not close this window, patriot.",
];

const BASE_TESTED = 2847113;

export function Quiz() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qIndex, setQIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [tested, setTested] = useState(BASE_TESTED);
  const [shared, setShared] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Ticker only starts after mount so server and client markup agree.
  useEffect(() => {
    const id = setInterval(() => setTested(n => n + 1 + Math.floor(Math.random() * 3)), 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [screen, qIndex]);

  // Fake analysis reel, then the verdict.
  useEffect(() => {
    if (screen !== "analyzing") return;
    const tick = setInterval(() => setStep(i => i + 1), 520);
    const done = setTimeout(() => setScreen("results"), ANALYSIS_STEPS.length * 520 + 400);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [screen]);

  const score = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );
  const tier = useMemo(() => tierFor(score), [score]);

  // Live readout during the quiz: points earned out of points available so far,
  // so answering "D" every time reads 100% rather than creeping up from zero.
  const livePct = useMemo(() => {
    const answered = QUESTIONS.filter(q => q.id in answers);
    if (answered.length === 0) return 0;
    const possible = answered.reduce(
      (sum, q) => sum + Math.max(...q.choices.map(c => c.points)),
      0,
    );
    return Math.round((score / possible) * 100);
  }, [answers, score]);

  const resultTitle =
    (gender && tier.titleByGender?.[gender]) || tier.title;

  const question = QUESTIONS[qIndex];

  const pick = useCallback(
    (points: number) => {
      const id = QUESTIONS[qIndex].id;
      setAnswers(prev => ({ ...prev, [id]: points }));
      if (qIndex + 1 < QUESTIONS.length) {
        setQIndex(i => i + 1);
      } else {
        setStep(0);
        setScreen("analyzing");
      }
    },
    [qIndex],
  );

  const back = useCallback(() => {
    if (qIndex === 0) setScreen("demo");
    else setQIndex(i => i - 1);
  }, [qIndex]);

  const restart = useCallback(() => {
    setAnswers({});
    setQIndex(0);
    setGender(null);
    setAge(null);
    setShared(false);
    setScreen("intro");
  }, []);

  const share = useCallback(async () => {
    const text = `I scored ${score}/${MAX_SCORE} on the Official Patriot Purity Test.\n\nOfficial rank: ${resultTitle.toUpperCase()} (${tier.rank}). ${tier.percentile}.\n\nLet's see you beat that.`;
    const url = typeof window === "undefined" ? "" : window.location.href;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Patriot Purity Test", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2600);
    } catch {
      /* user dismissed the sheet — nothing to do */
    }
  }, [score, resultTitle, tier.rank, tier.percentile]);

  return (
    <div className={s.shell}>
      <div ref={topRef} className={s.anchor} />
      <div className={s.stripes} aria-hidden="true" />

      {screen === "intro" && (
        <section className={s.card}>
          <div className={s.eyebrow}>American Institute for Freedom Metrics</div>
          <h1 className={s.megaTitle}>
            The Official<br />
            <span className={s.titleRed}>Patriot Purity</span><br />
            Test
          </h1>
          <p className={s.lede}>
            A rigorous, non-partisan assessment of your Personal Patriotism Quotient™.
            Fifteen questions. Three minutes. One number that finally settles it.
          </p>

          <ul className={s.badges}>
            <li>🇺🇸 100% American-made server</li>
            <li>🚫 No woke algorithms</li>
            <li>⚖️ Results not valid in California</li>
          </ul>

          <button className={s.cta} onClick={() => setScreen("demo")}>
            Begin the Test
          </button>

          <p className={s.counter}>
            <strong>{tested.toLocaleString("en-US")}</strong> patriots certified and counting
          </p>
          <p className={s.microcopy}>
            By continuing you affirm that you are a real American and not a bot, a bureaucrat,
            or somebody&apos;s nephew doing research for a podcast.
          </p>
        </section>
      )}

      {screen === "demo" && (
        <section className={s.card}>
          <div className={s.eyebrow}>Section 0 — Mandatory Intake</div>
          <h2 className={s.sectionTitle}>Demographic Information</h2>
          <p className={s.lede}>
            Collected strictly for statistical calibration. We are absolutely not selling this.
            (We are not selling this because nobody has offered.)
          </p>

          <fieldset className={s.field}>
            <legend className={s.legend}>Gender</legend>
            <div className={s.demoGrid}>
              {GENDERS.map(g => (
                <button
                  key={g.value}
                  className={`${s.demoBtn} ${gender === g.value ? s.demoOn : ""}`}
                  onClick={() => setGender(g.value)}
                  aria-pressed={gender === g.value}
                >
                  <span className={s.demoLabel}>{g.label}</span>
                  <span className={s.demoNote}>{g.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className={s.field}>
            <legend className={s.legend}>Age Bracket</legend>
            <div className={s.demoGrid}>
              {AGES.map(a => (
                <button
                  key={a.value}
                  className={`${s.demoBtn} ${age === a.value ? s.demoOn : ""}`}
                  onClick={() => setAge(a.value)}
                  aria-pressed={age === a.value}
                >
                  <span className={s.demoLabel}>{a.label}</span>
                  <span className={s.demoNote}>{a.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <button
            className={s.cta}
            disabled={!gender || !age}
            onClick={() => setScreen("quiz")}
          >
            {gender && age ? "Proceed to Questioning" : "Answer Both to Continue"}
          </button>
        </section>
      )}

      {screen === "quiz" && (
        <section className={s.card}>
          <div className={s.progressHead}>
            <span>
              Question {qIndex + 1} of {QUESTIONS.length}
            </span>
            <span className={s.progressPct}>Patriotism detected: {livePct}%</span>
          </div>
          <div
            className={s.progressBar}
            role="progressbar"
            aria-valuenow={qIndex + 1}
            aria-valuemin={1}
            aria-valuemax={QUESTIONS.length}
          >
            <div
              className={s.progressFill}
              style={{ width: `${((qIndex + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h2 className={s.question}>{question.prompt}</h2>

          <div className={s.choices}>
            {question.choices.map((c, i) => (
              <button key={i} className={s.choice} onClick={() => pick(c.points)}>
                <span className={s.choiceLetter}>{"ABCD"[i]}</span>
                <span>{c.text}</span>
              </button>
            ))}
          </div>

          <button className={s.backBtn} onClick={back}>
            ← Back
          </button>
        </section>
      )}

      {screen === "analyzing" && (
        <section className={`${s.card} ${s.analyzing}`}>
          <div className={s.spinner} aria-hidden="true">★</div>
          <h2 className={s.sectionTitle}>Analyzing Your Patriotism</h2>
          <ul className={s.steps} aria-live="polite">
            {ANALYSIS_STEPS.slice(0, step + 1).map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {screen === "results" && (
        <section className={`${s.card} ${s.certificate}`}>
          <div className={s.certFrame}>
            <div className={s.eyebrow}>Certificate of Patriotic Standing</div>

            <div className={s.scoreRow}>
              <div className={s.scoreBig}>
                {score}
                <span className={s.scoreMax}>/{MAX_SCORE}</span>
              </div>
              <div className={s.scoreMeta}>
                <div className={s.rankClass}>{tier.rank}</div>
                <div className={s.percentile}>{tier.percentile}</div>
              </div>
            </div>

            <h2 className={s.resultTitle}>{resultTitle}</h2>
            <div className={s.stamp}>{tier.stamp}</div>

            <p className={s.verdict}>{tier.verdict}</p>

            {tier.body.map((p, i) => (
              <p key={i} className={s.para}>
                {p}
              </p>
            ))}

            <h3 className={s.subhead}>Supplemental Findings</h3>
            <p className={s.para}>{gender ? GENDER_ROAST[gender] : ""}</p>
            <p className={s.para}>{age ? AGE_ROAST[age] : ""}</p>

            <h3 className={s.subhead}>{tier.findingsLabel}</h3>
            <ul className={s.findings}>
              {tier.findings.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <h3 className={s.subhead}>Prescribed Treatment</h3>
            <p className={s.para}>{tier.prescription}</p>

            <div className={s.seal} aria-hidden="true">
              <span>A.I.F.M.</span>
            </div>
          </div>

          <div className={s.actions}>
            <p className={s.nudge}>{tier.shareNudge}</p>
            <button className={s.cta} onClick={share}>
              {shared ? "Copied — go ruin a group chat" : "Share My Score"}
            </button>
            <button className={s.ghost} onClick={restart}>
              Take It Again
            </button>
          </div>

          <p className={s.disclaimer}>
            This is a work of satire. The American Institute for Freedom Metrics does not exist,
            has never existed, and is not accepting applications. No score is recorded, stored,
            or transmitted anywhere — your answers never leave this browser, which is more than
            you can say for most things you&apos;ve clicked this week. Any resemblance to persons
            living, deceased, or under indictment is entirely intentional and fully protected.
          </p>
        </section>
      )}
    </div>
  );
}
