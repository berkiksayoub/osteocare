"use client";

import { useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    slug: "refonte-site-startup-saas",
    category: "Web",
    title: "Refonte site SaaS B2B",
    excerpt: "Refonte complète d'un site SaaS B2B pour améliorer les conversions en démo.",
    result: "+47% de démos qualifiées en 90 jours",
    tags: ["Next.js", "SEO", "CRO"],
    year: "2024",
  },
  {
    slug: "strategie-seo-ecommerce",
    category: "SEO",
    title: "SEO e-commerce PME",
    excerpt: "Stratégie SEO complète pour une PME e-commerce en croissance.",
    result: "De 0 à 8 000 visiteurs/mois organiques",
    tags: ["SEO technique", "Contenu", "Analytics"],
    year: "2024",
  },
  {
    slug: "campagne-sea-lancement",
    category: "SEA",
    title: "Lancement produit via Google Ads",
    excerpt: "Campagne Google Ads pour le lancement d'un nouveau produit B2C.",
    result: "CAC divisé par 2 en 60 jours",
    tags: ["Google Ads", "Landing page", "A/B test"],
    year: "2023",
  },
  {
    slug: "strategie-digitale-cabinet",
    category: "Stratégie",
    title: "Stratégie digitale cabinet conseil",
    excerpt: "Refonte de la stratégie digitale d'un cabinet de conseil en transformation.",
    result: "+3 leads qualifiés/mois en moyenne",
    tags: ["Stratégie", "LinkedIn", "Contenu"],
    year: "2023",
  },
];

const CATEGORIES = ["Tous", "Stratégie", "Web", "SEO", "SEA", "Contenu"];

export default function ProjetsPage() {
  const [active, setActive] = useState("Tous");

  const filtered =
    active === "Tous"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
          Projets
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-6">
          Ce que j&apos;ai construit
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
          Des études de cas détaillées : contexte, approche, résultats et
          apprentissages.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/projets/${project.slug}`}
            className="group block border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)] transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--accent)] bg-[var(--muted)] px-2.5 py-1 rounded-full">
                {project.category}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {project.year}
              </span>
            </div>
            <h2 className="font-serif text-xl font-semibold mb-3 group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4 leading-relaxed">
              {project.excerpt}
            </p>
            <p className="text-sm font-semibold text-[var(--foreground)] mb-6">
              ✓ {project.result}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[var(--muted-foreground)] border border-[var(--border)] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[var(--muted-foreground)] text-center py-16">
          Aucun projet dans cette catégorie pour l&apos;instant.
        </p>
      )}
    </div>
  );
}
