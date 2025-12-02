import React from "react";
import { motion } from "framer-motion";
/* Tech icons from react-icons (simple-icons pack) */
import {
    SiReact,
    SiJavascript,
    SiPython,
    SiFirebase,
    SiTailwindcss,
    SiNodedotjs,
    SiHtml5,
    SiCss3,
    SiGit,
    SiMongodb,
    SiMysql,
    SiTypescript,
    SiRedux,
  } from "react-icons/si";
  
export function FloatingIcons() {
    // small set of positions and icons (keeps performance good)
    const icons = [
       
            { Icon: SiReact, size: 30, x: "85%", y: "50%" },
            { Icon: SiJavascript, size: 28, x: "78%", y: "30%" },
            { Icon: SiPython, size: 28, x: "62%", y: "18%" },
            { Icon: SiFirebase, size: 26, x: "73%", y: "18%" },
            { Icon: SiTailwindcss, size: 26, x: "73%", y: "30%" },
            { Icon: SiNodedotjs, size: 26, x: "73%", y: "50%" },
            { Icon: SiHtml5, size: 26, x: "73%", y: "70%" },
            { Icon: SiCss3, size: 24, x: "73%", y: "82%" },
            { Icon: SiGit, size: 22, x: "73%", y: "82%" },
            { Icon: SiMongodb, size: 22, x: "78%", y: "70%" },
            { Icon: SiMysql, size: 22, x: "88%", y: "55%" },
            { Icon: SiTypescript, size: 22, x: "88%", y: "42%" },
            { Icon: SiRedux, size: 22, x: "82%", y: "60%" },

          
    ];
  
    return (
      <div aria-hidden className="absolute inset-0 pointer-events-none ">
        {icons.map((it, idx) => {
          const { Icon, size, x, y } = it;
          // small random delays & motion patterns
          const floatDuration = 4 + (idx % 5) * 0.6;
          const delay = (idx % 4) * 0.2;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 1], y: [0, -8, 0] }}
              transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
              style={{
                position: "absolute",
                left: x,
                top: y,
                translate: "-50% -50%",
                // zIndex: 6,
              }}
              className="drop-shadow-lg"
            >
              <div
                className="w-auto h-auto p-1 rounded-full bg-white/10 dark:bg-black/20 flex items-center justify-center"
                style={{ width: size + 12, height: size + 12 }}
              >
                <Icon size={size}  />
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }
  