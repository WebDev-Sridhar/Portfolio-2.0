import React, { useRef, useEffect, useState} from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMyContext } from "../context/MyContext";

export default function AnimeFaceTracker() {
    const { dark, setDark } = useMyContext();
  // track mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [rect, setRect] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);
  

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setRect(r);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = (e) => {
    if (!rect.width) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

const eyeX = useTransform(mouseX, [-200, 200], [-4, 4]);
const eyeY = useTransform(mouseY, [-200, 200], [-4, 4]);

const headTiltX = useTransform(mouseX, [-200, 200], [-12, 12]);
const headTiltY = useTransform(mouseY, [-200, 200], [-8, 8]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-[340px] mx-auto select-none"
    >
      {/* HEAD */}
      <motion.img
       {...dark ? {src: "src/img/vector.png"} : {src: "src/img/vector1.png", backgroundColor: "black"}}
        alt="anime-face"
        className="w-full h-auto pointer-events-none"
        style={{
          rotateX: headTiltY,
          rotateY: headTiltX,
        }}
      />

      {/* LEFT EYE */}
      <motion.div
        className="absolute w-4 h-4 rounded-full z-1"
        style={{
          background: "black",
          x: eyeX,
          y: eyeY,
          top: "146px",   // adjust based on your image
          left: "126px",  // adjust based on your image
        }}
      />

      {/* RIGHT EYE */}
      <motion.div
        className="absolute w-4 h-4 rounded-full  z-1"
        style={{
          background: "black",
          x: eyeX,
          y: eyeY,
          top: "146px",   // adjust based on your image
          left: "210px",  // adjust based on your image
        }}
      />
            <motion.div
        className="absolute w-1 h-2 rounded-full z-1"
        style={{
          background: "white",
          x: eyeX,
          y: eyeY,
          top: "148px",   // adjust based on your image
          left: "128px",  // adjust based on your image
        }}
      />

      {/* RIGHT EYE */}
      <motion.div
        className="absolute w-1 h-2 rounded-full  z-1 "
        style={{
          background: "white",
          x: eyeX,
          y: eyeY,
          top: "148px",   // adjust based on your image
          left: "212px",  // adjust based on your image
        }}
      />
       <motion.div
        className="absolute w-5 h-4 rounded-full"
        style={{
          background: "white",
          top: "146px",   // adjust based on your image
          left: "126px",  // adjust based on your image
        }}
      />

      {/* RIGHT EYE */}
      <motion.div
        className="absolute w-5 h-4 rounded-full"
        style={{
          background: "white",
          top: "146px",   // adjust based on your image
          left: "210px",  // adjust based on your image
        }}
      />
    </div>
  );
}