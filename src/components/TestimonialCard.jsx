import React from "react";
import { motion } from "framer-motion";

export default function TestimonialCard({ testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-(--card-bg) border border-(--color-border) rounded-xl p-6 shadow-md
                 flex flex-col gap-4"
    >
      <span className="text-4xl text-(--color-accent) font-serif leading-none select-none">
        "
      </span>

      <p className="text-sm text-(--color-text-light) leading-relaxed italic flex-1">
        {testimonial.text}
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-(--color-border)">
        <div className="w-9 h-9 rounded-full bg-(--color-accent)/20 flex items-center
                        justify-center text-(--color-accent) text-sm font-bold shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-(--color-text)">{testimonial.name}</div>
          <div className="text-xs text-(--color-text-light)">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}
