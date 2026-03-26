"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "회사소개" },
  { href: "#technology", label: "기술" },
  { href: "#solutions", label: "솔루션" },
  { href: "#global", label: "글로벌" },
  { href: "#clients", label: "고객사" },
  { href: "#history", label: "연혁" },
  { href: "#contact", label: "문의" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"KO" | "EN">("KO");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center font-bold text-white text-lg group-hover:shadow-lg group-hover:shadow-accent-blue/30 transition-shadow">
              U
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">
                UTTEC
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 -mt-1 tracking-widest">
                NETWORK SOLUTION
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === "KO" ? "EN" : "KO")}
              className="ml-4 px-3 py-1.5 text-xs font-semibold rounded-full border border-accent-blue/40 text-accent-blue hover:bg-accent-blue/10 transition-all"
            >
              {lang}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="메뉴"
          >
            <span
              className={`hamburger-line transition-all ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`hamburger-line transition-all ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`hamburger-line transition-all ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong mt-2 mx-4 rounded-2xl p-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => setLang(lang === "KO" ? "EN" : "KO")}
              className="px-4 py-2 text-sm text-accent-blue"
            >
              {lang === "KO" ? "English" : "한국어"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
