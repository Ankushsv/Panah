'use client';
import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#stats", label: "Stats" },
    { href: "#testimonials", label: "Love" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="glass mt-4 rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Logo />
              <span className="text-lg font-semibold">Project</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-slate-700 hover:text-brand-700 transition">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="#cta" className="btn-secondary text-sm">Sign in</Link>
              <Link href="#cta" className="btn-primary text-sm">Get started</Link>
              <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl border">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.75h16.5M3.75 12h16.5M3.75 18.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
          {open && (
            <div className="mt-3 grid gap-2 md:hidden">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-2 py-2 rounded-lg hover:bg-brand-50">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
