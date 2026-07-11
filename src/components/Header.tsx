"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CalendlyEmbed from "@/components/CalendlyEmbed";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projets", label: "Projets" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-xl font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              Ayoub Berkiks
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                    pathname.startsWith(link.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {calendlyUrl && (
                <button
                  onClick={() => setCalendlyOpen(true)}
                  className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                >
                  Réserver un appel
                </button>
              )}
              <Link
                href="/contact#formulaire"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
              >
                Discutons de votre projet
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-white">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium py-1 transition-colors hover:text-[var(--accent)] ${
                    pathname.startsWith(link.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[var(--border)] space-y-2">
                {calendlyUrl && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setCalendlyOpen(true);
                    }}
                    className="block w-full text-left text-sm font-medium text-[var(--foreground)] py-1"
                  >
                    Réserver un appel
                  </button>
                )}
                <Link
                  href="/contact#formulaire"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg"
                >
                  Discutons de votre projet
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Calendly popup */}
      {calendlyOpen && calendlyUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setCalendlyOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <h2 className="font-serif text-lg font-semibold">Réserver un appel découverte</h2>
              <button
                onClick={() => setCalendlyOpen(false)}
                className="p-1 rounded text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CalendlyEmbed url={calendlyUrl} mode="inline" />
          </div>
        </div>
      )}
    </>
  );
}
