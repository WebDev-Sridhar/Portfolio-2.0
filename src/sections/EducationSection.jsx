import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { education } from "../data/experience";

export default function EducationSection() {
  return (
    <section id="education" className="py-24 bg-(--color-muted)">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Education" />

        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {education.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-(--card-bg) border border-(--color-border) rounded-xl p-5"
            >
              <div className="text-xs text-(--color-accent) font-medium mb-1">
                {e.period}
              </div>
              <div className="font-semibold text-(--color-text) text-base">
                {e.degree}
              </div>
              <div className="text-sm text-(--color-text-light) mt-0.5">
                {e.institution}
              </div>
              {e.note && (
                <div className="text-xs text-(--color-text-light) mt-2 opacity-75">
                  {e.note}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
