import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-(--color-text) mb-3">
        {title}
      </h2>
      <div
        className={`h-1 w-12 rounded-full bg-(--color-accent) ${
          center ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p
          className={`text-(--color-text-light) mt-4 text-base leading-relaxed ${
            center ? "max-w-xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
