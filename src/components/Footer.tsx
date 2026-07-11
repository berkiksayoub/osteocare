import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg font-semibold mb-3">Ayoub Berkiks</p>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Freelance marketing digital et communication.<br />
              Stratégie, web, SEO/SEA et contenu — sans sous-traitance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Navigation
            </p>
            <nav className="space-y-2">
              {[
                { href: "/services", label: "Services" },
                { href: "/projets", label: "Projets" },
                { href: "/blog", label: "Blog" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Contact
            </p>
            <div className="space-y-2">
              <a
                href="mailto:contact@ayoubberkiks.fr"
                className="block text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
              >
                contact@ayoubberkiks.fr
              </a>
              <Link
                href="/contact#formulaire"
                className="inline-flex items-center text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Discutons de votre projet →
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[var(--muted-foreground)]">
            © {currentYear} Ayoub Berkiks. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
