import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import AdminLogin from "../components/AdminLogin";
import { useAdmin } from "../context/AdminContext";
import { useMyContext } from "../context/MyContext";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#projects" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact-section" },
];

export default function Navbar({ returnFn }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { dark, setDark } = useMyContext();
  const { isAdmin, logoutAdmin } = useAdmin();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    setDark(dark);
  }, [dark]);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed w-full top-0 z-20 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-(--color-bg)/90 backdrop-blur-md border-b border-(--color-border) shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* LOGO */}
          <motion.div whileHover={{ scale: 1.05 }} className="font-bold text-xl cursor-pointer">
            <Link to="/" onClick={returnFn}>
              <span className="text-(--color-accent)">S</span>ridhar.
            </Link>
          </motion.div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-sm font-medium text-(--color-text-light) hover:text-(--color-text) transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-3">
            {/* ADMIN BUTTON */}
            {!isAdmin ? (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="px-3 py-1.5 text-xs border border-(--color-border) rounded-full
                           font-medium text-(--color-text-light) hover:border-(--color-accent)
                           hover:text-(--color-accent) transition-all duration-200"
              >
                Admin
              </button>
            ) : (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 text-xs border border-red-500/40 rounded-full
                           font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
              >
                Logout
              </button>
            )}

            {/* THEME TOGGLE */}
            <motion.button
              onClick={() => setDark(!dark)}
              whileTap={{ rotate: 180 }}
              className="p-2 rounded-lg text-(--color-text-light) hover:text-(--color-text)
                         hover:bg-(--card-bg) transition-all duration-200"
            >
              {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
            </motion.button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 text-(--color-text-light) hover:text-(--color-text) transition"
              onClick={() => setOpen(true)}
            >
              <HiOutlineMenu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-72 bg-(--color-bg) border-l border-(--color-border)
                         z-40 flex flex-col p-6 gap-6"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">
                  <span className="text-(--color-accent)">S</span>ridhar.
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-(--color-text-light) hover:text-(--color-text)"
                >
                  <HiOutlineX size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-(--color-text-light) hover:text-(--color-text)
                               hover:text-(--color-accent) transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && !isAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-(--card-bg) border border-(--color-border) p-6 rounded-xl shadow-2xl relative">
            <button
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-3 right-3 text-(--color-text-light) hover:text-(--color-text) transition"
            >
              <HiOutlineX size={18} />
            </button>
            <AdminLogin onSuccess={() => setShowAdminLogin(false)} />
          </div>
        </div>
      )}
    </>
  );
}
