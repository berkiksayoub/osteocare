import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Stratégie digitale, création de site web, SEO, SEA et contenu. Des offres positionnées par problème résolu, pas par livrable.",
};

const OFFERS = [
  {
    category: "Stratégie",
    title: "Vous n'avez pas de cap digital clair",
    description:
      "Vos équipes testent des canaux en silos, sans cohérence ni mesure. Le budget part, les résultats ne suivent pas.",
    deliverables: [
      "Audit de votre présence digitale actuelle",
      "Positionnement et persona acheteur",
      "Feuille de route sur 6 à 12 mois",
      "Tableau de bord KPIs",
      "Formation équipe interne (optionnel)",
    ],
    cta: "Partir avec une stratégie",
    color: "border-l-4 border-[var(--accent)]",
  },
  {
    category: "Web",
    title: "Votre site ne convertit pas, ou n'existe pas encore",
    description:
      "Un site beau qui ne génère pas de leads, c'est un coût. Je conçois des sites orientés objectifs business : vitesse, SEO et conversion dès la maquette.",
    deliverables: [
      "Design sur mesure (Figma → code)",
      "Développement Next.js ou WordPress",
      "SEO on-page et technique",
      "Analytics et suivi conversions",
      "Formation CMS incluse",
    ],
    cta: "Créer ou refondre mon site",
    color: "border-l-4 border-[var(--accent)]",
  },
  {
    category: "SEO",
    title: "Personne ne vous trouve sur Google",
    description:
      "Le SEO n'est pas magique, c'est de l'ingénierie. Audit technique, architecture de contenu, acquisition de liens — je construis une visibilité qui dure.",
    deliverables: [
      "Audit SEO technique complet",
      "Recherche de mots-clés et opportunités",
      "Plan de contenu éditorial",
      "Optimisation on-page et maillage interne",
      "Rapport mensuel et ajustements",
    ],
    cta: "Améliorer mon référencement",
    color: "border-l-4 border-[var(--accent)]",
  },
  {
    category: "SEA / Ads",
    title: "Vous payez pour des clics qui ne convertissent pas",
    description:
      "Google Ads et Meta Ads peuvent être rentables. Mais pas sans suivi précis, sans landing page dédiée et sans optimisation continue. Je pilote vos campagnes de A à Z.",
    deliverables: [
      "Setup ou audit de vos campagnes existantes",
      "Création des landing pages de conversion",
      "Tracking conversions avancé (GA4 + GTM)",
      "A/B tests annonces et pages",
      "Reporting hebdomadaire",
    ],
    cta: "Rendre mes ads rentables",
    color: "border-l-4 border-[var(--accent)]",
  },
  {
    category: "Contenu",
    title: "Vous produisez du contenu, mais ça ne génère pas de leads",
    description:
      "Blog, réseaux sociaux, email — si le contenu ne s'adresse pas à votre acheteur au bon moment, c'est du bruit. Je construis une stratégie éditoriale qui convertit.",
    deliverables: [
      "Stratégie de contenu et calendrier éditorial",
      "Rédaction d'articles SEO",
      "Copywriting pages de vente et emails",
      "Gestion réseaux sociaux (optionnel)",
      "Newsletter mensuelle",
    ],
    cta: "Créer du contenu qui convertit",
    color: "border-l-4 border-[var(--accent)]",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
          Services
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-6 leading-tight">
          Je résous des problèmes,<br />
          <em className="italic font-normal">pas des livrables</em>
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
          Chaque offre part d&apos;un problème réel. Si vous ne vous reconnaissez
          pas dans l&apos;une d&apos;elles, dites-le moi — on trouvera ce dont vous avez
          vraiment besoin.
        </p>
      </div>

      {/* Offers */}
      <div className="space-y-10">
        {OFFERS.map((offer) => (
          <div
            key={offer.category}
            className={`bg-[var(--muted)] rounded-2xl p-8 sm:p-10 ${offer.color}`}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--accent)] bg-white px-2.5 py-1 rounded-full mb-6">
              {offer.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
              {offer.title}
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
              {offer.description}
            </p>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
                Ce que vous obtenez
              </p>
              <ul className="space-y-2">
                {offer.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="text-[var(--accent)] mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/contact#formulaire"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
            >
              {offer.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-20 pt-16 border-t border-[var(--border)]">
        <h2 className="font-serif text-2xl font-semibold mb-10">Questions fréquentes</h2>
        <div className="space-y-8">
          {[
            {
              q: "Est-ce que vous sous-traitez ?",
              a: "Non. Je gère tout moi-même : la stratégie, le design et le développement. Vous avez un interlocuteur unique du début à la fin.",
            },
            {
              q: "Quel est votre délai de disponibilité ?",
              a: "Variable selon ma charge. Contactez-moi pour connaître mes disponibilités actuelles. En général, je peux démarrer dans les 2 à 3 semaines.",
            },
            {
              q: "Comment se déroule un projet type ?",
              a: "Appel découverte → proposition → devis → démarrage. On commence toujours par bien définir le problème à résoudre avant de parler livrables.",
            },
            {
              q: "Proposez-vous un accompagnement au forfait mensuel ?",
              a: "Oui, pour le SEO, le contenu et la gestion des campagnes. Les projets ponctuels (site web, audit, stratégie) sont facturés au projet.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">{faq.q}</h3>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
