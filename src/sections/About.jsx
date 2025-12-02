import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { Pencil, Check, X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function About() {
  const { isAdmin } = useAdmin();
  const [about, setAbout] = useState({
    aboutText: "",
    profileImage: "/src/img/profile.png",
  });

  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(about);

  useEffect(() => {
    (async () => {
      const d = await getDoc(doc(db, "settings", "about"));
      if (d.exists()) {
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
    <section className="py-20 text-[--color-text]">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

        {/* LEFT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative col-span-2 md:col-span-1 group"
        >
          {/* Animated image wrapper */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: 0.5 }}
            transition={{ type: "spring", stiffness: 150 }}

            className="rounded-4xl overflow-hidden shadow-xl border-2 border-l-0 border-t-0 
                       border-[--color-border] bg-(--color-bg) relative  md:hover:shadow-[#7c3ca1]/20 active:shadow-[#7c3ca1]/20"
            style={{ height: "22rem" }}

          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${draft.profileImage || "/src/img/profile.png"})`,
              }}
            ></div>
          </motion.div>

          {/* Image URL Input */}
          {editMode && (
            <motion.input
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              type="text"
              className="mt-4 w-full px-3 py-2 bg-transparent border border-slate-700 rounded"
              value={draft.profileImage}
              onChange={(e) =>
                setDraft({ ...draft, profileImage: e.target.value })
              }
            />
          )}
        </motion.div>

        {/* RIGHT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative col-span-2"
        >
          {isAdmin && !editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="absolute -top-7 right-0 opacity-70 hover:opacity-100 transition"
            >
              <Pencil size={22} />
            </button>
          )}

          {/* Title with animation */}
          <motion.h3
            className="text-4xl font-bold mb-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h3>

          {/* Underline Animation */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "110px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-1 rounded bg-[--color-border] mb-6"
          />

          {editMode ? (
            <motion.textarea
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full min-h-40 bg-transparent p-3 border border-slate-700 rounded"
              value={draft.aboutText}
              onChange={(e) =>
                setDraft({ ...draft, aboutText: e.target.value })
              }
            ></motion.textarea>
          ) : (
            <motion.p
              className="opacity-85 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {about.aboutText ||
                "Hi, I'm Sridhar — a Full Stack Developer specializing in modern frontend and cloud integrations."}
            </motion.p>
          )}

          {/* Buttons */}
          {editMode && (
            <motion.div
              className="flex gap-4 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={saveChanges}
                className="px-5 py-2 bg-(--btn-bg) text-(--btn-text) rounded flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Check size={18} /> Save
              </button>

              <button
                onClick={cancelChanges}
                className="px-5 py-2 bg-(--btn-bg) text-(--btn-text) rounded flex items-center gap-2 hover:scale-105 transition-all"
              >
                <X size={18} /> Cancel
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
