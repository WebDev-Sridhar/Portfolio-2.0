import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { Pencil, Check, X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import SectionHeading from "../components/SectionHeading";

export default function About() {
  const { isAdmin } = useAdmin();
  const [about, setAbout] = useState({
    aboutText: "",
    profileImage: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(about);

  useEffect(() => {
    (async () => {
      const d = await getDoc(doc(db, "settings", "about"));
      if (d.exists()) {
            console.log(d.data());
        setAbout(d.data());
        setDraft(d.data());
      }
    })();
  }, []);

  const saveChanges = async () => {
    await setDoc(doc(db, "settings", "about"), draft);
    setAbout(draft);

    setEditMode(false);
  };

  const cancelChanges = () => {
    setDraft(about);
    setEditMode(false);
  };

  return (
    <section id="about" className="py-24 bg-(--color-muted)">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative blob behind image */}
          <div className="absolute -inset-4 rounded-2xl bg-(--color-accent)/5 blur-xl" />

          <div
            className="relative rounded-2xl overflow-hidden shadow-xl border border-(--color-border)"
            style={{ aspectRatio: "4/5" }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url("${draft.profileImage || "/img/profile2.jpg"}")`,
              }}
              role="img"
              aria-label="Sridhar — Full Stack Developer profile photo"
            />
            {/* Subtle overlay to tone down brightness */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {isAdmin && !editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="absolute -top-8 right-0 p-1.5 rounded-lg text-(--color-text-light)
                         hover:text-(--color-text) hover:bg-(--card-bg) transition"
            >
              <Pencil size={16} />
            </button>
          )}

          <SectionHeading title="About Me" center={false} />

          {editMode ? (
            <motion.textarea
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full min-h-40 bg-transparent p-3 border border-(--color-border)
                         rounded-lg outline-none text-(--color-text) text-sm leading-relaxed resize-none"
              value={draft.aboutText}
              onChange={(e) => setDraft({ ...draft, aboutText: e.target.value })}
            />
          ) : (
            <motion.p
              className="text-(--color-text-light) leading-relaxed text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {about.aboutText ||
                "Hi, I'm Sridhar — a Full Stack Developer specializing in modern frontend and cloud integrations."}
            </motion.p>
          )}

          {/* Image URL input (edit mode) */}
          {editMode && (
            <motion.input
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              type="text"
              placeholder="Profile image URL"
              className="mt-3 w-full px-3 py-2 bg-transparent border border-(--color-border)
                         rounded-lg outline-none text-(--color-text) text-sm"
              value={draft.profileImage}
              onChange={(e) => setDraft({ ...draft, profileImage: e.target.value })}
            />
          )}

          {/* Edit mode buttons */}
          {editMode && (
            <motion.div
              className="flex gap-3 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={saveChanges}
                className="px-5 py-2 rounded-full bg-(--btn-bg) text-(--btn-text) flex items-center
                           gap-2 text-sm font-medium hover:scale-105 transition-all"
              >
                <Check size={15} /> Save
              </button>
              <button
                onClick={cancelChanges}
                className="px-5 py-2 rounded-full border border-(--color-border) flex items-center
                           gap-2 text-sm text-(--color-text-light) hover:scale-105 transition-all"
              >
                <X size={15} /> Cancel
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
