import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="font-serif text-7xl font-semibold text-[var(--accent)] mb-8">404</p>
      <h1 className="font-serif text-3xl font-semibold mb-4">
        Cette page n&apos;existe pas
      </h1>
      <p className="text-[var(--muted-foreground)] mb-10">
        La page que vous cherchez a peut-être été déplacée ou supprimée.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
