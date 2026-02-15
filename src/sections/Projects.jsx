import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/init";
import { useAdmin } from "../context/AdminContext";
import { Pencil, Plus, X, Trash2 } from "lucide-react";

export default function Projects() {
  const { isAdmin } = useAdmin();

  const [projects, setProjects] = useState([]);

  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const emptyForm = { title: "", description: "", imageUrl: "", projectUrl: "" };
  const [form, setForm] = useState(emptyForm);

  const [openProject, setOpenProject] = useState(null); // NEW → full card view

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
    <section id="projects" className="py-16 relative">
      <div className="container">

        {/* TITLE */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-(--color-text)">Projects</h3>

          {isAdmin && (
            <button
              onClick={() => setAddMode(true)}
              className="px-4 py-2 rounded flex items-center gap-2 hover:opacity-90"
            >
              <Plus size={18} /> Add Project
            </button>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              onClick={() => setOpenProject(p)}   // NEW FULL VIEW
              className="relative group rounded-xl overflow-hidden cursor-pointer 
                         shadow-sm hover:shadow-xl transition-all
                          hover:shadow-[#7c3ca1]/20"
              whileHover={{ scale: 1.02 }}
            >

              {/* ADMIN BUTTONS */}
              {isAdmin && (
                <div
                  className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 
                             group-hover:opacity-100 z-10 transition"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditMode(p.id);
                      setForm(p);
                    }}
                    className="p-2 rounded-full bg-(--color-bg)"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(p.id);
                    }}
                    className="p-2 rounded-full bg-red-600 text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              {/* IMAGE */}
              {p.imageUrl && (
                <motion.img
                  src={p.imageUrl}
                  className="w-full h-40 object-cover  transition-all duration-700"
                />
              )}

              {/* CONTENT */}
              <div className="p-4">
                <h4 className="font-semibold text-lg text-(--color-text)">
                  {p.title}
                </h4>

                {/* Tech stack extracted automatically from description first line */}
                {p.description && (
                  <p className="text-sm opacity-70 mt-2 line-clamp-1">
                    {p.description.split(".")[0]}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ADD MODAL */}
        {addMode && (
          <Modal title="Add Project" onClose={() => setAddMode(false)}>
            <ProjectForm
              form={form}
              setForm={setForm}
              onSave={saveProject}
              submitText="Save"
            />
          </Modal>
        )}

        {/* EDIT MODAL */}
        {editMode && (
          <Modal
            title="Edit Project"
            onClose={() => {
              setEditMode(null);
              setForm(emptyForm);
            }}
          >
            <ProjectForm
              form={form}
              setForm={setForm}
              onSave={updateProjectData}
              submitText="Update"
            />
          </Modal>
        )}

        {/* FULL PROJECT VIEW MODAL */}
        <AnimatePresence>
          {openProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md 
                         flex justify-center items-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                className=" bg-(--color-bg)
                           rounded-2xl p-6  w-full h-3/4 md:h-auto md:max-w-4xl shadow-xl mx-2"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{openProject.title}</h3>

                  <button onClick={() => setOpenProject(null)}>
                    <X size={22} className="opacity-70 hover:opacity-100" />
                  </button>
                </div>

                {/* Big Image */}
                {openProject.imageUrl && (
                  <img
                    src={openProject.imageUrl}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                )}

                <p className=" leading-relaxed mb-4">
                  {openProject.description}
                </p>

                {openProject.projectUrl && (
                  <a
                    href={openProject.projectUrl}
                    target="_blank"
                    className="inline-block px-4 py-2 border rounded-lg hover:bg-white/10"
                  >
                    Visit Project →
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
      <div className="bg-(--card-bg)  rounded p-6 w-full max-w-sm shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold text-(--color-text)">{title}</h4>
          <button onClick={onClose}>
            <X size={20} className="opacity-70 hover:opacity-100" />
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
        className="p-2 bg-transparent border-b border-(--color-border) outline-none"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        rows={3}
        className="p-2 bg-transparent border-b border-(--color-border) outline-none"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Image URL"
        className="p-2 bg-transparent border-b border-(--color-border) outline-none"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />

      <input
        placeholder="Project Link (Optional)"
        className="p-2 bg-transparent border-b border-(--color-border) outline-none"
        value={form.projectUrl}
        onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
      />

      <button onClick={onSave} className="w-full py-2 mt-3 bg-(--btn-bg) text-(--btn-text) rounded">
        {submitText}
      </button>
    </div>
  );
}
