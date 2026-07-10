import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { Pencil, Check, X, ArrowDown } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function HeroAnimated({ callParent }) {
  const { isAdmin } = useAdmin();

  const [data, setData] = useState({
    name: "Sridhar",
    role: "Full Stack Developer",
    subtitle: "Building modern web apps",
  });
  const [draft, setDraft] = useState(data);
  const [editMode, setEditMode] = useState(false);

  // ── Responsive sizing ──
  const [winW, setWinW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMd = winW >= 768;
  const wrapW  = isMd ? 520 : Math.min(winW * 0.82, 340);
  const wrapH  = isMd ? 580 : wrapW * 1.12;
  const avatW  = isMd ? 420 : wrapW * 0.82;
  const avatH  = isMd ? 490 : avatW * 1.17;
  const glowW  = isMd ? 380 : wrapW * 0.75;
  const glowH  = isMd ? 430 : glowW * 1.13;

  // Load from Firestore on mount
  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "settings", "hero"));
      if (snap.exists()) {
        setData(snap.data());
        setDraft(snap.data());
      }
    })();
  }, []);

  // Save to Firestore
  const saveChanges = async () => {
    try {
      await updateDoc(doc(db, "settings", "hero"), draft);
      setData(draft);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save hero:", err);
    }
  };

  const cancelChanges = () => {
    setDraft(data);
    setEditMode(false);
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">

      {/* Gradient blob background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-(--color-accent)/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-(--color-accent)/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-(--color-accent)/5 blur-3xl" />
      </div>

      {/* Content grid */}
      <div className="max-w-6xl mx-auto px-6 w-full pt-20 pb-8 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10">

        {/* TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Admin edit icon */}
          {isAdmin && !editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="absolute -top-8 right-0 p-1.5 rounded-lg text-(--color-text-light)
                         hover:text-(--color-text) hover:bg-(--card-bg) transition"
              aria-label="Edit hero"
            >
              <Pencil size={16} />
            </button>
          )}

          {editMode ? (
            <>
              <span className="text-xs uppercase tracking-widest text-(--color-accent) font-medium block mb-3">
                Full Stack Developer
              </span>

              <input
                className="text-4xl md:text-5xl font-bold mb-3 w-full bg-transparent
                           border-b border-(--color-border) outline-none py-1 text-(--color-text)"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />

              <input
                className="text-xl mb-4 w-full bg-transparent border-b border-(--color-border)
                           outline-none py-1 text-(--color-text-light)"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              />

              <textarea
                className="text-sm mb-6 max-w-lg w-full bg-transparent border border-(--color-border)
                           rounded-lg p-3 outline-none text-(--color-text-light) resize-none"
                rows={3}
                value={draft.subtitle}
                onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
              />

              <div className="flex gap-3">
                <button
                  onClick={saveChanges}
                  className="px-5 py-2 rounded-full bg-(--btn-bg) text-(--btn-text) flex items-center
                             gap-2 text-sm font-medium hover:scale-105 transition-transform"
                >
                  <Check size={15} /> Save
                </button>
                <button
                  onClick={cancelChanges}
                  className="px-5 py-2 rounded-full border border-(--color-border) flex items-center
                             gap-2 text-sm text-(--color-text-light) hover:scale-105 transition-transform"
                >
                  <X size={15} /> Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Open to opportunity badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="inline-flex  items-center gap-2 px-3 py-1.5 rounded-full
                           border border-(--color-accent)/40 bg-(--color-accent)/10 mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-(--color-accent) animate-pulse" />
                <span className="text-xs font-medium text-(--color-accent)">
                  Open to Opportunities
                </span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs uppercase tracking-widest text-(--color-accent) font-medium block mb-4"
              >
                Full Stack Developer
              </motion.span>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-(--color-text) mb-4">
                Hi, I'm{" "}
                <span className="text-(--color-accent)">{data.name}</span>
              </h1>

              <h2 className="text-xl md:text-2xl text-(--color-text-light) mb-4">
                {data.role}
              </h2>

              <p className="text-(--color-text-light) max-w-md leading-relaxed mb-8 text-base">
                {data.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="#projects"
                  onClick={callParent}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                             bg-(--btn-bg) text-(--btn-text) font-semibold text-sm
                             hover:scale-105 transition-transform duration-200
                             shadow-lg shadow-(--color-accent)/20"
                >
                  View My Work
                </a>
                <a
                  href="#contact-section"
                  onClick={callParent}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                             border border-(--color-border) text-(--color-text) text-sm font-medium
                             hover:bg-(--card-bg) hover:scale-105 transition-all duration-200"
                >
                  Contact Me
                </a>
              </div>

              {/* Intent links */}
              <div className="flex flex-col gap-2 mb-8">
                <a
                  href="#contact-section"
                  className="group text-sm text-(--color-text-light) hover:text-(--color-text)
                             transition-colors flex items-center gap-1.5"
                >
                  <span>Hiring for a team?</span>
                  <span className="text-(--color-accent) group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href="#services"
                  className="group text-sm text-(--color-text-light) hover:text-(--color-text)
                             transition-colors flex items-center gap-1.5"
                >
                  <span>Need project help?</span>
                  <span className="text-(--color-accent) group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-(--color-text-light) uppercase tracking-widest">Find me</span>
                <div className="h-px w-8 bg-(--color-border)" />
                <a
                  href="https://github.com/WebDev-Sridhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-(--color-border) text-(--color-text-light)
                             hover:border-(--color-accent) hover:text-(--color-accent) transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.6 9.6 0 0 1 2.496-.336 9.6 9.6 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/sridhar-front-end-developer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-(--color-border) text-(--color-text-light)
                             hover:border-(--color-accent) hover:text-(--color-accent) transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M8.339 18.337H5.667v-8.59h2.672zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096m11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
                  </svg>
                </a>
              </div>
            </>
          )}
        </motion.div>

        {/* AVATAR BLOCK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center order-first md:order-last"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
            style={{ width: wrapW, height: wrapH }}
          >
            {/* ── Outermost ambient glow ── */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)",
                opacity: 0.12,
                transform: "scale(1.25)",
                filter: "blur(40px)",
              }}
            />

            {/* ── Animated blob SVG (morphs shape) ── */}
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              style={{ animation: "blobSpin 18s linear infinite" }}
            >
              <defs>
                <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.25" />
                </linearGradient>
                <filter id="blobBlur">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>

              {/* Soft blurred glow blob behind */}
              <path
                fill="url(#blobGrad)"
                filter="url(#blobBlur)"
                opacity="0.5"
                style={{ animation: "morphBlob 8s ease-in-out infinite alternate" }}
                d="M47.7,-64.7C60.7,-54.4,69.4,-38.8,74.1,-21.8C78.8,-4.8,79.5,13.6,73.2,29.5C66.9,45.4,53.6,58.8,38.1,67.1C22.5,75.4,4.8,78.7,-13.4,76.4C-31.7,74.1,-50.5,66.2,-62.3,52.4C-74.1,38.6,-78.9,18.8,-76.4,0.7C-73.9,-17.4,-64,-33.9,-51.2,-44.5C-38.3,-55.1,-22.6,-59.8,-5.2,-64.1C12.2,-68.4,34.6,-75,47.7,-64.7Z"
                transform="translate(100 100)"
              />

              {/* Main solid blob */}
              <path
                fill="url(#blobGrad)"
                opacity="0.9"
                style={{ animation: "morphBlob 8s ease-in-out infinite alternate-reverse" }}
                d="M43.2,-58.3C55.3,-49.1,63.1,-34.2,67.5,-18C71.9,-1.7,72.9,15.9,66.8,30.8C60.7,45.7,47.5,57.9,32.4,65.4C17.2,72.9,0.1,75.8,-17.3,73C-34.7,70.2,-52.4,61.8,-63.3,47.8C-74.2,33.9,-78.3,14.4,-75.3,-3.7C-72.3,-21.8,-62.2,-38.6,-48.5,-48.1C-34.8,-57.6,-17.4,-59.8,-0.5,-59.2C16.4,-58.5,31.1,-67.5,43.2,-58.3Z"
                transform="translate(100 100)"
              />
            </svg>

            {/* ── Secondary inner spinning blob (accent border ring) ── */}
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              style={{
                animation: "blobSpinReverse 24s linear infinite",
                opacity: 0.4,
              }}
            >
              <path
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                style={{ animation: "morphBlob2 10s ease-in-out infinite alternate" }}
                d="M38.5,-52.6C49.7,-43.8,58.4,-30.6,62.8,-15.5C67.2,-0.4,67.2,16.6,60.5,30.2C53.8,43.7,40.4,53.8,25.6,60.2C10.8,66.6,-5.4,69.3,-21.1,66C-36.9,62.6,-52.2,53.1,-61.4,39.3C-70.7,25.5,-73.9,7.3,-70.8,-9.4C-67.8,-26.1,-58.4,-41.2,-45.5,-50C-32.6,-58.8,-16.3,-61.3,-0.5,-60.8C15.4,-60.3,27.2,-61.4,38.5,-52.6Z"
                transform="translate(100 100)"
              />
            </svg>

            {/* ── Floating accent particles ── */}
            {[
              { top: "8%",  left: "12%", size: 6,  delay: "0s",   dur: "3.2s" },
              { top: "15%", left: "80%", size: 4,  delay: "0.8s", dur: "4s"   },
              { top: "70%", left: "5%",  size: 5,  delay: "1.4s", dur: "3.5s" },
              { top: "80%", left: "78%", size: 7,  delay: "0.4s", dur: "5s"   },
              { top: "45%", left: "90%", size: 3,  delay: "2s",   dur: "2.8s" },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: "var(--color-accent)",
                  opacity: 0.7,
                  animation: `floatParticle ${p.dur} ease-in-out ${p.delay} infinite alternate`,
                  boxShadow: "0 0 8px var(--color-accent)",
                }}
              />
            ))}

            {/* ── Avatar image clipped to a soft irregular blob shape ── */}
            <div
              className="relative z-10"
              style={{
                width: avatW,
                height: avatH,
                clipPath:
                  "polygon(48% 0%, 82% 4%, 98% 22%, 100% 48%, 92% 72%, 74% 92%, 50% 100%, 24% 96%, 6% 78%, 0% 52%, 4% 26%, 20% 8%)",
                overflow: "hidden",
              }}
            >
              <div
                className="w-full h-full bg-cover"
                style={{
                  backgroundImage: `url("/img/avatar.png")`,
                  backgroundPosition: "top center",
                }}
                role="img"
                aria-label="Sridhar — Full Stack Developer"
              />
            </div>
            {/* Glow underneath the clip (box-shadow doesn't work on clip-path elements) */}
            <div
              className="absolute z-0 rounded-full"
              style={{
                width: glowW,
                height: glowH,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)",
                opacity: 0.18,
                filter: "blur(30px)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                   text-(--color-text-light)"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
