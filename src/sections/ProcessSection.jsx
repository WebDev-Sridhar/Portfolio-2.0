import React from "react";
import SectionHeading from "../components/SectionHeading";
import ProcessStep from "../components/ProcessStep";
import { process } from "../data/process";

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-(--color-bg)">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="How I Work"
          subtitle="A clear, structured process so you always know what's happening and what's next."
        />

        <div className="max-w-2xl mx-auto">
          {process.map((step, i) => (
            <ProcessStep
              key={step.step}
              step={step}
              isLast={i === process.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
