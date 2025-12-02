import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import AdminLogin from "../components/AdminLogin";
import { useAdmin } from "../context/AdminContext";
import { useMyContext } from "../context/MyContext";



export default function Navbar({returnFn}) {
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
      {/* NAVBAR CONTAINER */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-0 z-20 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-white/80 dark:bg-black/20 shadow-xl backdrop-blur-xl "
            : "py-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm"
        }`}
      >
        <div className="  px-4 flex items-center justify-between">

          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold cursor-pointer"
          >
            <Link to="/" onClick={returnFn}>
              <span className="text-accent">S</span>ridhar.
            </Link>
          </motion.div>

          {/* DESKTOP LINKS */}
          <div className="flex items-center gap-4 md:gap-8">



            {/* ADMIN BUTTON */}
            {!isAdmin ? (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="px-3 py-1 border-2 rounded text-sm font-medium dark:border-slate-600 hover:bg-black/10 dark:hover:bg-white/10 transition"
              >
                Admin
              </button>
            ) : (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1 border-2 rounded text-sm font-medium text-red-500 dark:text-red-400 dark:border-slate-600  transition"
              >
                Logout
              </button>
            )}

            {/* DARK MODE */}
            <motion.button
              onClick={() => {
                const t = !dark;
                setDark(t);
                // localStorage.setItem("theme", t ? "dark" : "light");
              }}
              whileTap={{ rotate: 180 }}
              className="p-2 rounded  transition"
            >
              {dark ? <FaSun /> : <FaMoon />}
            </motion.button>
          </div>

          {/* MOBILE MENU BUTTON */}
          {/* <button className="md:hidden p-2" onClick={() => setOpen(true)}>
            <HiOutlineMenu size={26} />
          </button> */}
        </div>
      </motion.nav>



      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && !isAdmin && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className=" bg-black/20 backdrop-blur-md p-6 rounded shadow-xl relative">
            <button
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-2 right-2"
            >
              ✖
            </button>

            <AdminLogin
              onSuccess={() => setShowAdminLogin(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
