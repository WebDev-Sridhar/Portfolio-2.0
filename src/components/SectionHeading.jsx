import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, center = true, size = "lg" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${center ? "text-center" : ""}`}
    >
      <h2 className={`font-bold text-(--color-text) mb-4 tracking-tight leading-tight ${
        size === "sm" ? "text-3xl md:text-4xl" :
        size === "md" ? "text-3xl md:text-5xl" :
        "text-4xl md:text-6xl"
      }`}>
        {title}
      </h2>
      <div
        className={`h-1.5 w-16 rounded-full bg-(--color-accent) ${
          center ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p
          className={`lead mt-5 text-lg md:text-xl ${
            center ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
