import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { motion } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import { Pencil } from "lucide-react";
import AnimeFaceTracker from "../components/AnimatedPortrait";

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
    <section id="contact-section" className="py-16">
      <div className="container">
     <AnimeFaceTracker/>
        <div className="card text-center p-8 relative" >

          {/* Admin Edit Icon */}
          {isAdmin && (
            <motion.button
              onClick={() => {
                setTemp(contact);
                setShowModal(true);
              }}
              className="absolute top-4 right-4 text-accent"
              whileHover={{ scale: 1.2 }}
            >
              <Pencil size={18} />
            </motion.button>
          )}

          <h3 className="text-3xl font-semibold mb-4">Contact Me</h3>

          <p className="text-[--color-text-light] mb-2">
            <span className="font-medium">Email:</span>{" "}
            <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
              {contact.email}
            </a>
          </p>

          <p className="text-[--color-text-light]">
            <span className="font-medium">Phone:</span> {contact.phone}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card bg-(--color-bg) p-6 w-[90%] max-w-md rounded">
            <h3 className="text-xl mb-4 text-center">Edit Contact Details</h3>

            <input
              className="w-full mb-3 p-2  bg-transparent border-b border-(--color-border) outline-none text-(--color-text)"
              placeholder="Email"
              value={temp.email}
              onChange={(e) => setTemp({ ...temp, email: e.target.value })}
            />

            <input
              className="w-full mb-4 p-2  bg-transparent border-b border-(--color-border) outline-none text-(--color-text)"
              placeholder="Phone"
              value={temp.phone}
              onChange={(e) => setTemp({ ...temp, phone: e.target.value })}
            />

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-(--btn-bg) text-(--btn-text) rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded bg-(--btn-bg) text-(--btn-text)"
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
