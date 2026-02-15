import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { Pencil, Check, X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";


export default function HeroAnimated({callParent, setPanel}) {
  const { isAdmin } = useAdmin();

  const [data, setData] = useState({
    name: "Sridhar",
    role: "Full Stack Developer",
    subtitle: "Building modern web apps",
  });
  const [draft, setDraft] = useState(data);
  const [editMode, setEditMode] = useState(false);

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
      // optionally show toast
    }
  };

  const cancelChanges = () => {
    setDraft(data);
    setEditMode(false);
  };

  return (
    <section className=" min-h-[85vh] flex items-center ">

      {/* Particles canvas (behind content but above video) */}
      <ParticlesCanvas count={18} interactive={true} />

      {/* Content container */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center md:ml-25 px-10 py-50 md:py-20 z-10">
          {/* TEXT BLOCK */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Admin edit icon */}
            {isAdmin && !editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="absolute top-0 right-1/3 opacity-80 hover:opacity-100 transition transform hover:scale-105"
                aria-label="Edit hero"
              >
                <Pencil size={20} />
              </button>
            )}

            {editMode ? (
              <>
                <input
                  className="text-4xl md:text-5xl font-bold mb-3 w-full bg-transparent border-b border-(--color-border) outline-none py-1"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />

                <input
                  className="text-2xl mb-4 w-full bg-transparent border-b border-(--color-border) outline-none py-1"
                  value={draft.role}
                  onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                />

                <textarea
                  className="opacity-90 mb-6 max-w-xl w-full bg-transparent border border-(--color-border) rounded p-2 z-5 "
                  value={draft.subtitle}
                  onChange={(e) =>
                    setDraft({ ...draft, subtitle: e.target.value })
                  }
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={saveChanges}
                    className="px-4 py-2 rounded bg-(--btn-bg) text-(--btn-text) flex items-center gap-2"
                  >
                    <Check size={16} /> Save
                  </button>
                  <button
                    onClick={cancelChanges}
                    className="px-4 py-2 rounded bg-(--btn-bg) text-(--btn-text) flex items-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold mb-3" >
                  Hi, I'm <span className="text-(--color-text)">{data.name}</span>
                </h1>

                <h2 className="text-2xl md:text-3xl opacity-90 mb-4">
                  {data.role}
                </h2>

                <p className="max-w-xl mb-6 opacity-90">{data.subtitle}</p>

                <a
                  onClick={callParent}
                  className="inline-block px-6 py-3 rounded bg-(--btn-bg) text-(--btn-text) font-semibold shadow hover:scale-[1.03] transition-transform"
                >
                  Reach Me
                </a>
              </>
            )}
          </motion.div>

          {/* AVATAR BLOCK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center z-5"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-120 md:w-150 md:h-150 md:rounded-b-full overflow-hidden md:shadow-2xl md:border-2  md:border-t-0 md:border-(--color-border) "
            >
              {/* Avatar: use public/img/Avatar.png */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url("/img/Avatar.png")`}}
                role="img"
                aria-label="Avatar"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------
   ParticlesCanvas component
   (Canvas-based for performance)
   ----------------------------- */
function ParticlesCanvas({ count = 30, interactive = true, color = "#62078C" }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, down: false });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let DPR = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * DPR);
      canvas.height = Math.floor(canvas.clientHeight * DPR);
    };
    resize();

    const spawnParticles = () => {
      const particles = [];
      const w = canvas.width;
      const h = canvas.height;
      const n = Math.max(12, Math.min(60, count));
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          alpha: 0.25 + Math.random() * 0.6,
        });
      }
      particlesRef.current = particles;
    };
    spawnParticles();

    let raf = null;
    const step = () => {
      raf = requestAnimationFrame(step);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw connections & particles
      const p = particlesRef.current;
      for (let i = 0; i < p.length; i++) {
        const pi = p[i];
        // movement influenced by mouse
        if (interactive && mouse.current.x > -1) {
          const dx = (mouse.current.x * DPR - pi.x);
          const dy = (mouse.current.y * DPR - pi.y);
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
          const force = Math.min(25 / dist, 0.12);
          pi.vx += (dx / dist) * force * 0.1;
          pi.vy += (dy / dist) * force * 0.1;
        }

        // friction
        pi.vx *= 0.98;
        pi.vy *= 0.98;
        pi.x += pi.vx;
        pi.y += pi.vy;

        // wrap edges
        if (pi.x < 0) pi.x = canvas.width;
        if (pi.x > canvas.width) pi.x = 0;
        if (pi.y < 0) pi.y = canvas.height;
        if (pi.y > canvas.height) pi.y = 0;

        // draw particle
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(color, pi.alpha);
        ctx.arc(pi.x, pi.y, pi.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw subtle connecting lines for close particles (tech mesh feel)
      ctx.lineWidth = 1 * DPR;
      ctx.strokeStyle = hexToRgba(color, 0.08);
      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x;
          const dy = p[i].y - p[j].y;
          const d2 = dx * dx + dy * dy;
          const maxDist = (canvas.width / 6) * (canvas.height / 400);
          if (d2 < (maxDist * DPR) ** 2) {
            const alpha = 0.12 * (1 - Math.sqrt(d2) / (maxDist * DPR));
            ctx.strokeStyle = hexToRgba(color, alpha);
            ctx.beginPath();
            ctx.moveTo(p[i].x, p[i].y);
            ctx.lineTo(p[j].x, p[j].y);
            ctx.stroke();
          }
        }
      }
    };

    step();

    // resize handler
    let resizeObserver = new ResizeObserver(() => {
      DPR = window.devicePixelRatio || 1;
      resize();
      spawnParticles();
    });
    resizeObserver.observe(canvas);

    // mouse handlers
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvas.clientWidth;
      const y = ((e.clientY - rect.top) / rect.height) * canvas.clientHeight;
      mouse.current.x = x;
      mouse.current.y = y;
    };
    const handleLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMove, { passive: true });
      window.addEventListener("mouseout", handleLeave);
      window.addEventListener("mouseleave", handleLeave);
      window.addEventListener("touchmove", (ev) => {
        if (ev.touches && ev.touches[0]) handleMove(ev.touches[0]);
      }, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseout", handleLeave);
        window.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [count, interactive, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0  w-full h-dvh pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}



/* -----------------------------
   Small helper: convert hex to rgba string (opacity)
   ----------------------------- */
function hexToRgba(hex, alpha = 1) {
  // accepts '#rrggbb' or '#rgb'
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  }
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
