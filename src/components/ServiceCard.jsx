import React from "react";
import { motion } from "framer-motion";

export default function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-(--card-bg) border border-(--color-border) rounded-xl p-6 shadow-md
                 hover:shadow-lg flex flex-col gap-4 h-full"
    >
      <h3 className="text-lg font-semibold text-(--color-text)">{service.title}</h3>

      <p className="text-sm text-(--color-text-light) leading-relaxed">
        {service.description}
      </p>

      <ul className="flex flex-col gap-1.5">
        {service.bullets.map((b, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-(--color-text-light)">
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-(--color-border) flex flex-col gap-1">
        <span className="text-xs text-(--color-accent) font-medium">
          ⏱ {service.timeline}
        </span>
        <span className="text-xs text-(--color-text-light)">
          Best for: {service.bestFit}
        </span>
      </div>
    </motion.div>
  );
}
