import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/init";
import { useAdmin } from "../context/AdminContext";
import { Pencil, Plus, X } from "lucide-react";
import IconMap from "../icons/IconMap.jsx";
import SectionHeading from "../components/SectionHeading";

export default function Skills() {
  const { isAdmin } = useAdmin();
  const [editMode, setEditMode] = useState(false);
  const [editSkill, setEditSkill] = useState(null);
  const [skills, setSkills] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "", icon: "" });

  const updateSkill = async () => {
    if (!editSkill.name.trim() || !editSkill.level.trim()) return;
    await updateDoc(doc(db, "skills", editSkill.id), {
      name: editSkill.name,
      level: editSkill.level,
      icon: editSkill.icon,
    });
    setEditMode(false);
    setEditSkill(null);
    loadSkills();
  };

  const loadSkills = async () => {
    const q = await getDocs(collection(db, "skills"));
    setSkills(q.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const saveSkill = async () => {
    if (!newSkill.name.trim() || !newSkill.level.trim()) return;
    await addDoc(collection(db, "skills"), newSkill);
    setAddMode(false);
    setNewSkill({ name: "", level: "", icon: "⭐" });
    loadSkills();
  };

  const deleteSkill = async (id) => {
    await deleteDoc(doc(db, "skills", id));
    loadSkills();
  };

  return (
    <section id="skills" className="py-24 bg-(--color-bg) overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="relative mb-12">
          <SectionHeading
            title="Skills"
            subtitle="Technologies I work with"
          />

          {isAdmin && (
            <button
              onClick={() => setAddMode(true)}
              className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 text-sm rounded-full border
                         border-(--color-border) text-(--color-text-light) hover:border-(--color-accent)
                         hover:text-(--color-accent) transition-all duration-200"
            >
              <Plus size={15} /> Add Skill
            </button>
          )}
        </div>

        {/* SKILLS GRID */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.length ? (
            skills.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative group bg-(--card-bg) border border-(--color-border) rounded-xl p-5
                           shadow-sm hover:shadow-md hover:border-(--color-accent)/40
                           transition-all duration-200 flex flex-col items-center gap-3"
              >
                {/* ADMIN BUTTONS */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0
                                   group-hover:opacity-100 transition">
                    <button
                      onClick={() => { setEditSkill(s); setEditMode(true); }}
                      className="p-1.5 rounded-md bg-(--color-bg) border border-(--color-border)
                                 hover:border-(--color-accent) transition text-(--color-text-light)"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => deleteSkill(s.id)}
                      className="p-1.5 rounded-md bg-red-500/10 border border-red-500/30
                                 text-red-500 hover:bg-red-500/20 transition"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                {/* ICON */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {s.icon?.trim().startsWith("<svg") ? (
                    <div dangerouslySetInnerHTML={{ __html: s.icon }} className="w-12 h-12" />
                  ) : (
                    <div className="text-4xl drop-shadow-md">{IconMap[s.icon] ?? "🔧"}</div>
                  )}
                </motion.div>

                {/* NAME */}
                <div className="font-semibold text-sm text-(--color-text) text-center tracking-wide">
                  {s.name}
                </div>

                {/* LEVEL BADGE */}
                <span className="text-xs px-2 py-0.5 rounded-full bg-(--color-accent)/10 text-(--color-accent) font-medium">
                  {s.level}
                </span>
              </motion.div>
            ))
          ) : (
            <div className="text-sm text-(--color-text-light) col-span-full">
              No skills yet. Add via Admin.
            </div>
          )}
        </motion.div>
      </div>

      {/* ADD SKILL MODAL */}
      {addMode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-(--card-bg) border border-(--color-border) rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-(--color-text)">Add Skill</h4>
              <button onClick={() => setAddMode(false)} className="text-(--color-text-light) hover:text-(--color-text)">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Skill Name"
                className="p-2 bg-transparent border-b border-(--color-border) outline-none
                           text-(--color-text) text-sm"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
              <select
                className="p-2 border-b border-(--color-border) bg-transparent outline-none text-(--color-text) text-sm"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
              >
                <option value="" disabled className="text-black">Select Level</option>
                <option value="Beginner" className="text-black">Beginner</option>
                <option value="Intermediate" className="text-black">Intermediate</option>
                <option value="Advanced" className="text-black">Advanced</option>
                <option value="Expert" className="text-black">Expert</option>
              </select>
              <input
                placeholder="Icon (Emoji or SVG)"
                className="p-2 bg-transparent border-b border-(--color-border) outline-none
                           text-(--color-text) text-sm"
                value={newSkill.icon}
                onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
              />
              <button
                onClick={saveSkill}
                className="w-full py-2 bg-(--btn-bg) text-(--btn-text) rounded-full mt-2 text-sm
                           font-medium hover:opacity-90 transition"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SKILL MODAL */}
      {editMode && editSkill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-(--card-bg) border border-(--color-border) rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-(--color-text)">Edit Skill</h4>
              <button onClick={() => { setEditMode(false); setEditSkill(null); }}
                className="text-(--color-text-light) hover:text-(--color-text)">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Skill Name"
                className="p-2 bg-transparent border-b border-(--color-border) outline-none
                           text-(--color-text) text-sm"
                value={editSkill.name}
                onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
              />
              <input
                placeholder="Level"
                className="p-2 bg-transparent border-b border-(--color-border) outline-none
                           text-(--color-text) text-sm"
                value={editSkill.level}
                onChange={(e) => setEditSkill({ ...editSkill, level: e.target.value })}
              />
              <input
                placeholder="Icon (Emoji or SVG)"
                className="p-2 bg-transparent border-b border-(--color-border) outline-none
                           text-(--color-text) text-sm"
                value={editSkill.icon}
                onChange={(e) => setEditSkill({ ...editSkill, icon: e.target.value })}
              />
              <button
                onClick={updateSkill}
                className="w-full py-2 bg-(--btn-bg) text-(--btn-text) rounded-full mt-2 text-sm
                           font-medium hover:opacity-90 transition"
              >
                Update Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
