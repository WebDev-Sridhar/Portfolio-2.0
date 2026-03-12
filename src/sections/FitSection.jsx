import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const goodFit = [
  "You want a clean, fast React web app",
  "You have a clear goal and some requirements",
  "You value direct, async-friendly communication",
  "You're open to design input and suggestions",
  "You want to own and edit your content easily",
  "You're building for the long term, not a quick hack",
];

const notFit = [
  "You need a WordPress or no-code solution",
  "Timeline is under 1 week with no flexibility",
  "You need a large agency or team of 10+",
  "You want someone to figure out the idea for you",
  "You expect unlimited revisions at a flat rate",
  "You're looking for the cheapest possible option",
];

export default function FitSection() {
  return (
    <section id="fit" className="py-24 bg-(--color-muted)">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Is This a Good Fit?"
          subtitle="I work best with clients who value quality, clear communication, and a collaborative process."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Good Fit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-(--card-bg) border border-(--color-accent)/30 rounded-xl p-6"
          >
            <h3 className="text-base font-semibold text-(--color-accent) mb-4 flex items-center gap-2">
              <Check size={16} /> Good Fit
            </h3>
            <ul className="flex flex-col gap-3">
              {goodFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-(--color-text-light)">
                  <Check size={15} className="text-(--color-accent) shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not a Good Fit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-(--card-bg) border border-(--color-border) rounded-xl p-6"
          >
            <h3 className="text-base font-semibold text-(--color-text-light) mb-4 flex items-center gap-2">
              <X size={16} /> Not a Good Fit
            </h3>
            <ul className="flex flex-col gap-3">
              {notFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-(--color-text-light)">
                  <X size={15} className="text-(--color-text-light) shrink-0 mt-0.5 opacity-50" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
