import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-(--color-bg)">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="What I Build"
          subtitle="Services tailored for developers, founders, and businesses who want clean, fast, and functional web products."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((s) => (
            <motion.div key={s.id} variants={item}>
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
