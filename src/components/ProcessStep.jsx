import React from "react";
import { motion } from "framer-motion";

export default function ProcessStep({ step, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex gap-6 relative"
    >
      {/* Vertical connector line */}
      {!isLast && (
        <div className="absolute left-7 top-12 w-px h-full bg-(--color-border)" />
      )}

      {/* Step number */}
      <div className="text-5xl font-bold text-(--color-accent) opacity-20 w-14 shrink-0 leading-none select-none">
        {step.step}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1">
        <h3 className="text-lg font-semibold text-(--color-text) mb-2">{step.title}</h3>
        <p className="text-sm text-(--color-text-light) leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
