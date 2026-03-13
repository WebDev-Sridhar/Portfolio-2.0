import React from "react";
import { Clock, MapPin, MessageSquare, RefreshCw } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import WorkingWithMeCard from "../components/WorkingWithMeCard";

const cards = [
  {
    icon: <Clock size={20} />,
    title: "Response Time",
    value: "Within 24 hours",
  },
  {
    icon: <MapPin size={20} />,
    title: "Location",
    value: "India (IST)",
  },
  {
    icon: <MessageSquare size={20} />,
    title: "Communication",
    value: "WhatsApp / Email / Slack",
  },
  {
    icon: <RefreshCw size={20} />,
    title: "Progress Updates",
    value: "Every 2–3 days",
  },
];

export default function WorkingWithMeSection() {
  return (
    <section className="py-24 bg-(--color-muted)">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Working With Me"
          subtitle="What to expect when we collaborate."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <WorkingWithMeCard key={c.title} icon={c.icon} title={c.title} value={c.value} />
          ))}
        </div>
      </div>
    </section>
  );
}
