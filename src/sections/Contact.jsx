import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { motion } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import { Pencil, Github, Linkedin} from "lucide-react";
import AnimeFaceTracker from "../components/AnimatedPortrait";
import { useMyContext } from "../context/MyContext";

export default function Contact() {
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [showModal, setShowModal] = useState(false);
  const [temp, setTemp] = useState({ email: "", phone: "" });
    const { isAdmin } = useAdmin();
    const { dark } = useMyContext();
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
    <section id="contact-section" className="py-5 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2  items-center">
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
           <div className="flex gap-6 justify-center mt-6">
      {/* GitHub */}

          <a
        href="https://github.com/WebDev-Sridhar"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
      {dark ? (
  
      
    
            <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="#000" viewBox="0 0 24 24" >
<path fill-rule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.6 9.6 0 0 1 2.496-.336 9.6 9.6 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2" clip-rule="evenodd"></path>
</svg>

      ) : (

      
    
            <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="#fff" viewBox="0 0 24 24" >
<path fill-rule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.6 9.6 0 0 1 2.496-.336 9.6 9.6 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2" clip-rule="evenodd"></path>
</svg>

      )}
    </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/sridhar-front-end-developer/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        {dark ? (
             <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="#000" viewBox="0 0 24 24" >
<path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M8.339 18.337H5.667v-8.59h2.672zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096m11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
</svg>
      ) : (
                 <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="#fff" viewBox="0 0 24 24" >
<path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M8.339 18.337H5.667v-8.59h2.672zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096m11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
</svg>

        )}

      </a>
    </div>
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
