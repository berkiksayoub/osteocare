import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message envoyé",
  description: "Votre message a bien été reçu.",
};

export default function MerciPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
        <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
        Votre message est bien reçu
      </h1>
      <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
        Je vous réponds sous 48h ouvrées avec un premier retour sur votre projet.
        En attendant, vous avez reçu un email de confirmation.
      </p>
      {calendlyUrl && (
        <div className="mb-10">
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            Vous voulez aller plus vite ?
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Réserver un appel découverte →
          </a>
        </div>
      )}
      <Link
        href="/"
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
