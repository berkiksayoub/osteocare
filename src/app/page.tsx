import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ayoub Berkiks — Marketing & Communication Digitale",
  description:
    "Freelance marketing digital et communication pour PME/TPE et startups françaises. Stratégie, web, SEO/SEA et contenu — sans sous-traitance.",
};

const SERVICES = [
  {
    icon: "◈",
    title: "Stratégie digitale",
    problem: "Vous avez des outils marketing mais pas de vision d'ensemble.",
    solution:
      "Je construis votre feuille de route digitale : positionnement, canaux, KPIs — tout aligne avec vos objectifs business.",
  },
  {
    icon: "⬡",
    title: "Site web & SEO",
    problem: "Votre site attire du trafic mais ne convertit pas.",
    solution:
      "Je conçois et développe des sites orientés performance : UX, vitesse, SEO technique, conversion.",
  },
  {
    icon: "◎",
    title: "Contenu & SEA",
    problem: "Vous investissez en ads sans retour mesurable.",
    solution:
      "Je pilote vos campagnes Google/Meta et produis le contenu qui convertit à chaque étape du tunnel.",
  },
];

const CASE_STUDIES = [
  {
    slug: "refonte-site-startup-saas",
    category: "Web",
    title: "Refonte site SaaS B2B",
    result: "+47% de démos qualifiées en 90 jours",
    tags: ["Next.js", "SEO", "CRO"],
  },
  {
    slug: "strategie-seo-ecommerce",
    category: "SEO",
    title: "SEO e-commerce PME",
    result: "De 0 à 8 000 visiteurs/mois organiques",
    tags: ["SEO technique", "Contenu", "Analytics"],
  },
  {
    slug: "campagne-sea-lancement",
    category: "SEA",
    title: "Lancement produit via Google Ads",
    result: "CAC divisé par 2 en 60 jours",
    tags: ["Google Ads", "Landing page", "A/B test"],
  },
];

const PROOF_NUMBERS = [
  { value: "12+", label: "Projets livrés" },
  { value: "3", label: "Secteurs d'expertise" },
  { value: "100%", label: "Sans sous-traitance" },
  { value: "48h", label: "Délai de réponse" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-6">
            Freelance Marketing &amp; Communication Digitale
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[var(--foreground)] mb-6">
            Du diagnostic à l&apos;exécution —{" "}
            <em className="italic font-normal">sans intermédiaire</em>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed mb-10 max-w-2xl">
            J&apos;aide les PME/TPE et startups françaises à construire une
            présence digitale cohérente. Je code, je designe et je stratégise
            moi-même — vous avez un interlocuteur unique qui comprend votre
            business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact#formulaire"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Discutons de votre projet
            </Link>
            <Link
              href="/projets"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[var(--foreground)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors"
            >
              Voir mes projets →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
              Services
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
              Trois façons de vous aider
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
              >
                <span className="text-2xl text-[var(--accent)] mb-6 block">
                  {service.icon}
                </span>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4 leading-relaxed">
                  <em>Problème :</em> {service.problem}
                </p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  {service.solution}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Voir toutes les offres →
            </Link>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
              Études de cas
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
              Des résultats, pas des promesses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                href={`/projets/${study.slug}`}
                className="group block bg-[var(--muted)] rounded-2xl p-8 border border-transparent hover:border-[var(--accent)] transition-all"
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-2.5 py-1 rounded-full mb-6">
                  {study.category}
                </span>
                <h3 className="font-serif text-xl font-semibold mb-4 group-hover:text-[var(--accent)] transition-colors">
                  {study.title}
                </h3>
                <p className="text-sm font-semibold text-[var(--foreground)] mb-4">
                  ✓ {study.result}
                </p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
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
          <div className="mt-10 text-center">
            <Link
              href="/projets"
              className="inline-flex items-center text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Voir tous les projets →
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 bg-[var(--accent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {PROOF_NUMBERS.map((item) => (
              <div key={item.label}>
                <p className="font-serif text-4xl font-semibold text-white mb-2">
                  {item.value}
                </p>
                <p className="text-sm text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-6">
            Un projet en tête ?<br />
            <em className="italic font-normal">Parlons-en.</em>
          </h2>
          <p className="text-[var(--muted-foreground)] mb-10 leading-relaxed">
            Pas de devis générique. Je prends le temps de comprendre votre
            contexte avant de vous proposer quoi que ce soit.
          </p>
          <Link
            href="/contact#formulaire"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Discutons de votre projet
          </Link>
        </div>
      </section>
    </>
  );
}
