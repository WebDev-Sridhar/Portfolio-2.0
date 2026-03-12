import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { motion } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import { Pencil, Mail, Phone, X } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

export default function Contact() {
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [showModal, setShowModal] = useState(false);
  const [temp, setTemp] = useState({ email: "", phone: "" });
  const { isAdmin } = useAdmin();

  // Fetch Contact Details
  useEffect(() => {
    (async () => {
      const ref = doc(db, "settings", "contact");
      const snap = await getDoc(ref);
      if (snap.exists()) setContact(snap.data());
    })();
  }, []);

  // Save updated contact data
  const saveContact = async () => {
    const ref = doc(db, "settings", "contact");
    await updateDoc(ref, temp);
    setContact(temp);
    setShowModal(false);
  };

  return (
    <section id="contact-section" className="py-24 bg-(--color-bg)">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Admin Edit Button */}
        {isAdmin && (
          <motion.button
            onClick={() => { setTemp(contact); setShowModal(true); }}
            className="absolute top-0 right-0 p-1.5 rounded-lg text-(--color-text-light)
                       hover:text-(--color-text) hover:bg-(--card-bg) transition"
            whileHover={{ scale: 1.1 }}
          >
            <Pencil size={16} />
          </motion.button>
        )}

        <SectionHeading
          title="Let's Work Together"
          subtitle="Have a project in mind? Reach out and let's build something great."
        />

        {/* Contact Cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          {/* Email */}
          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 bg-(--card-bg) border border-(--color-border)
                       rounded-xl px-6 py-4 hover:border-(--color-accent) transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-(--color-accent)/10 flex items-center
                            justify-center text-(--color-accent) shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <div className="text-xs text-(--color-text-light) mb-0.5">Email</div>
              <div className="text-sm font-medium text-(--color-text) group-hover:text-(--color-accent) transition">
                {contact.email || "your@email.com"}
              </div>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 bg-(--card-bg) border border-(--color-border)
                       rounded-xl px-6 py-4 hover:border-(--color-accent) transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-lg bg-(--color-accent)/10 flex items-center
                            justify-center text-(--color-accent) shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <div className="text-xs text-(--color-text-light) mb-0.5">Phone</div>
              <div className="text-sm font-medium text-(--color-text)">
                {contact.phone || "+91 00000 00000"}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center mt-8">
          {/* GitHub */}
          <a
            href="https://github.com/WebDev-Sridhar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-(--color-border) text-(--color-text-light)
                       hover:border-(--color-accent) hover:text-(--color-accent) transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.6 9.6 0 0 1 2.496-.336 9.6 9.6 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2" clipRule="evenodd" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sridhar-front-end-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-(--color-border) text-(--color-text-light)
                       hover:border-(--color-accent) hover:text-(--color-accent) transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M8.339 18.337H5.667v-8.59h2.672zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096m11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-(--card-bg) border border-(--color-border) p-6 w-[90%] max-w-md rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-(--color-text)">Edit Contact</h3>
              <button onClick={() => setShowModal(false)} className="text-(--color-text-light) hover:text-(--color-text)">
                <X size={18} />
              </button>
            </div>

            <input
              className="w-full mb-3 p-2 bg-transparent border-b border-(--color-border) outline-none
                         text-(--color-text) text-sm"
              placeholder="Email"
              value={temp.email}
              onChange={(e) => setTemp({ ...temp, email: e.target.value })}
            />

            <input
              className="w-full mb-4 p-2 bg-transparent border-b border-(--color-border) outline-none
                         text-(--color-text) text-sm"
              placeholder="Phone"
              value={temp.phone}
              onChange={(e) => setTemp({ ...temp, phone: e.target.value })}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded-full border border-(--color-border) text-sm
                           text-(--color-text-light) hover:text-(--color-text) transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-full bg-(--btn-bg) text-(--btn-text) text-sm font-medium hover:opacity-90 transition"
                onClick={saveContact}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
