import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-(--color-border) py-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left gap-4 cursor-pointer group"
      >
        <span className="text-sm md:text-base font-medium text-(--color-text)">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-(--color-text-light) shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pt-3 pb-1 text-sm text-(--color-text-light) leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
