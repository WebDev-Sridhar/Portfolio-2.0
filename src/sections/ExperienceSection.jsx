import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { experience } from "../data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-(--color-bg)">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Experience"
          subtitle="Where I've worked and what I've built."
        />

        <div className="max-w-2xl mx-auto flex flex-col">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-6 pb-10 last:pb-0 border-l-2 border-(--color-border)"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-(--color-accent)" />

              {/* Period badge */}
              <span className="text-xs text-(--color-accent) font-medium mb-1 block">
                {item.period}
              </span>

              {/* Role */}
              <h3 className="text-base font-semibold text-(--color-text) leading-snug">
                {item.role}
              </h3>

              {/* Company */}
              <p className="text-sm text-(--color-text-light) mt-0.5 mb-2">
                {item.company}
              </p>

              {/* Description */}
              <p className="text-sm text-(--color-text-light) leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
