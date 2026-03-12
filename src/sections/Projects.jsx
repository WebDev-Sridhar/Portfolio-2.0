import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/init";
import { useAdmin } from "../context/AdminContext";
import { Pencil, Plus, X, Trash2, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

export default function Projects() {
  const { isAdmin } = useAdmin();

  const [projects, setProjects] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const emptyForm = { title: "", description: "", imageUrl: "", projectUrl: "" };
  const [form, setForm] = useState(emptyForm);

  const [openProject, setOpenProject] = useState(null);

  const loadProjects = async () => {
    const q = await getDocs(collection(db, "projects"));
    setProjects(q.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const saveProject = async () => {
    await addDoc(collection(db, "projects"), form);
    setAddMode(false);
    setForm(emptyForm);
    loadProjects();
  };

  const updateProjectData = async () => {
    await updateDoc(doc(db, "projects", editMode), form);
    setEditMode(null);
    setForm(emptyForm);
    loadProjects();
  };

  const removeProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    loadProjects();
  };

  return (
    <section id="projects" className="py-24 bg-(--color-bg)">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <div className="relative mb-12">
          <SectionHeading
            title="Projects"
            subtitle="A selection of things I've built"
          />

          {isAdmin && (
            <button
              onClick={() => setAddMode(true)}
              className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 text-sm rounded-full border
                         border-(--color-border) text-(--color-text-light) hover:border-(--color-accent)
                         hover:text-(--color-accent) transition-all duration-200"
            >
              <Plus size={15} /> Add Project
            </button>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              onClick={() => setOpenProject(p)}
              className="relative group bg-(--card-bg) border border-(--color-border) rounded-xl
                         overflow-hidden cursor-pointer shadow-md hover:shadow-lg
                         hover:scale-[1.02] transition-all duration-200"
              whileHover={{ scale: 1.02 }}
            >
              {/* ADMIN BUTTONS */}
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0
                                 group-hover:opacity-100 z-10 transition">
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditMode(p.id); setForm(p); }}
                    className="p-2 rounded-full bg-(--card-bg) border border-(--color-border) shadow-sm"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeProject(p.id); }}
                    className="p-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}

              {/* IMAGE */}
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-44 object-cover"
                />
              )}

              {/* CONTENT */}
              <div className="p-5">
                <h4 className="font-semibold text-base text-(--color-text) mb-2">
                  {p.title}
                </h4>
                {p.description && (
                  <p className="text-sm text-(--color-text-light) line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                )}
                {p.projectUrl && (
                  <div className="flex items-center gap-1 mt-3 text-xs text-(--color-accent)
                                   font-medium group-hover:gap-2 transition-all">
                    View Project <ArrowUpRight size={13} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ADD MODAL */}
        {addMode && (
          <Modal title="Add Project" onClose={() => setAddMode(false)}>
            <ProjectForm form={form} setForm={setForm} onSave={saveProject} submitText="Save" />
          </Modal>
        )}

        {/* EDIT MODAL */}
        {editMode && (
          <Modal title="Edit Project" onClose={() => { setEditMode(null); setForm(emptyForm); }}>
            <ProjectForm form={form} setForm={setForm} onSave={updateProjectData} submitText="Update" />
          </Modal>
        )}

        {/* FULL PROJECT VIEW MODAL */}
        <AnimatePresence>
          {openProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-(--card-bg) border border-(--color-border) rounded-2xl p-6
                           w-full h-3/4 md:h-auto md:max-w-4xl shadow-2xl mx-2 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-(--color-text)">{openProject.title}</h3>
                  <button
                    onClick={() => setOpenProject(null)}
                    className="text-(--color-text-light) hover:text-(--color-text) transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                {openProject.imageUrl && (
                  <img
                    src={openProject.imageUrl}
                    alt={openProject.title}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                )}

                <p className="text-(--color-text-light) leading-relaxed mb-4 text-sm">
                  {openProject.description}
                </p>

                {openProject.projectUrl && (
                  <a
                    href={openProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-(--color-border)
                               rounded-full text-sm hover:border-(--color-accent) hover:text-(--color-accent)
                               transition-all duration-200"
                  >
                    Visit Project <ArrowUpRight size={14} />
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------------- MODAL ---------------------- */
function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-(--card-bg) border border-(--color-border) rounded-xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-(--color-text)">{title}</h4>
          <button onClick={onClose} className="text-(--color-text-light) hover:text-(--color-text)">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------------------- PROJECT FORM ---------------------- */
function ProjectForm({ form, setForm, onSave, submitText }) {
  return (
    <div className="flex flex-col gap-3">
      <input
        placeholder="Project Title"
        className="p-2 bg-transparent border-b border-(--color-border) outline-none
                   text-(--color-text) text-sm"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        rows={3}
        className="p-2 bg-transparent border-b border-(--color-border) outline-none
                   text-(--color-text) text-sm"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Image URL"
        className="p-2 bg-transparent border-b border-(--color-border) outline-none
                   text-(--color-text) text-sm"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />
      <input
        placeholder="Project Link (Optional)"
        className="p-2 bg-transparent border-b border-(--color-border) outline-none
                   text-(--color-text) text-sm"
        value={form.projectUrl}
        onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
      />
      <button
        onClick={onSave}
        className="w-full py-2 mt-2 bg-(--btn-bg) text-(--btn-text) rounded-full text-sm
                   font-medium hover:opacity-90 transition"
      >
        {submitText}
      </button>
    </div>
  );
}
