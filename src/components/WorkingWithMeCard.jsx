import React from "react";
import { motion } from "framer-motion";

export default function WorkingWithMeCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="bg-(--card-bg) border border-(--color-border) rounded-xl p-5 shadow-sm
                 flex flex-col gap-3"
    >
      <div className="w-10 h-10 rounded-lg bg-(--color-accent)/10 flex items-center
                      justify-center text-(--color-accent)">
        {icon}
      </div>
      <div className="text-sm font-medium text-(--color-text-light)">{title}</div>
      <div className="text-base font-semibold text-(--color-text)">{value}</div>
    </motion.div>
  );
}
