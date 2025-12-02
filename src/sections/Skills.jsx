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
import  IconMap  from "../icons/IconMap.jsx";

export default function Skills() {
  const { isAdmin } = useAdmin();
  const [editMode, setEditMode] = useState(false);
  const [editSkill, setEditSkill] = useState(null);

  const [skills, setSkills] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
    icon: "",
  });

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
    <section className="py-24 overflow-hidden">

      <div className="container">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold text-(--color-text)"
          >
            Skills
          </motion.h3>

          {isAdmin && (
            <button
              onClick={() => setAddMode(true)}
              className="px-4 py-2 text-(--color-text) rounded-lg flex items-center gap-2 hover:opacity-90 shadow-sm"
            >
              <Plus size={18} /> Add Skill
            </button>
          )}
        </div>

        {/* SKILLS GRID */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.length ? (
            skills.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative group p-6 rounded-2xl backdrop-blur-lg shadow-lg 
                           hover:shadow-[0_0_20px_var(--color-shadow)] transition-all duration-300 flex flex-col items-center"
              >

                {/* ADMIN BUTTONS */}
                {isAdmin && (
                  <motion.div
                    initial={{  scale: 0.8 }}
                    whileHover={{  scale: 1 }}
                    className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition"
                  >
                    <button
                      onClick={() => {
                        setEditSkill(s);
                        setEditMode(true);
                      }}
                      className="p-1 rounded-md"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      onClick={() => deleteSkill(s.id)}
                      className="p-1 rounded-md "
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )}

                {/* ICON */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="relative"
                >
             
                  {s.icon?.trim().startsWith("<svg") ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: s.icon }}
                      className="w-12 h-12"
                    />
                  ) : (
                    <div className="text-5xl mb-2 drop-shadow-md group-hover:rotate-360 transition">
                      {IconMap[s.icon] ?? "🔧"}
                    </div>
                  )}
                </motion.div>

                {/* TEXT */}
                <div className="font-semibold mt-3 text-(--color-text) tracking-wide">
                  {s.name}
                </div>
                <div className="text-sm opacity-70">{s.level}</div>
              </motion.div>
            ))
          ) : (
            <div className="text-[--color-text-light]">No skills yet. Add via Admin.</div>
          )}
        </motion.div>
      </div>


      {/* ADD SKILL MODAL */}
      {addMode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex justify-center items-center p-4 z-50">
          <div className=" bg-(--color-bg) rounded p-6 w-full max-w-sm shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-(--color-text)">Add Skill</h4>
              <button onClick={() => setAddMode(false)}>
                <X size={20} className="opacity-70 hover:opacity-100" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Skill Name"
                className="p-2 bg-transparent border-0 border-b border-(--color-border) outline-none text-(--color-text)"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
              />

              <select
                className="p-2 border-0 border-b border-(--color-border) bg-transparent outline-none text-(--color-text)"
                value={newSkill.level}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, level: e.target.value })
                }
              >
                <option value="" disabled className="text-black">
                  Select Level
                </option>
                <option value="Beginner" className="text-black">Beginner</option>
                <option value="Intermediate" className="text-black">Intermediate</option>
                <option value="Advanced" className="text-black">Advanced</option>
                <option value="Expert" className="text-black">Expert</option>
              </select>

              <input
                placeholder="Icon (Emoji or SVG)"
                className="p-2 bg-transparent border-0 border-b border-(--color-border) outline-none text-(--color-text)"
                value={newSkill.icon}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, icon: e.target.value })
                }
              />

              <button
                onClick={saveSkill}
                className="w-full py-2 bg-(--btn-bg) text-(--btn-text)  rounded mt-3 hover:opacity-90"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SKILL MODAL */}
      {editMode && editSkill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex justify-center items-center p-4 z-50">
          <div className="bg-(--card-bg) rounded p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-(--color-text)">Edit Skill</h4>
              <button onClick={() => { setEditMode(false); setEditSkill(null); }}>
                <X size={20} className="opacity-70 hover:opacity-100" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Skill Name"
                className="p-2 bg-transparent border-b border-b-(--color-border)  outline-none text-(--color-text)"
                value={editSkill.name}
                onChange={(e) =>
                  setEditSkill({ ...editSkill, name: e.target.value })
                }
              />

              <input
                placeholder="Level"
                className="p-2 bg-transparent border-b border-b-(--color-border)  outline-none text-(--color-text)"
                value={editSkill.level}
                onChange={(e) =>
                  setEditSkill({ ...editSkill, level: e.target.value })
                }
              />

              <input
                placeholder="Icon (Emoji or SVG)"
                className="p-2 bg-transparent border-b border-b-(--color-border)  outline-none text-(--color-text)"
                value={editSkill.icon}
                onChange={(e) =>
                  setEditSkill({ ...editSkill, icon: e.target.value })
                }
              />

              <button
                onClick={updateSkill}
                className="w-full py-2 bg-(--btn-bg) text-(--btn-text) rounded mt-3 hover:opacity-90"
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
