import React, { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import FAQItem from "../components/FAQItem";
import { faqs } from "../data/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-(--color-bg)">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Common Questions"
          subtitle="Answers to things people usually ask before we start working together."
        />

        <div className="max-w-2xl mx-auto">
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              question={f.q}
              answer={f.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
