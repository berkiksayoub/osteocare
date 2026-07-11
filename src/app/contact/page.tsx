import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discutons de votre projet. Formulaire de contact, ou réservez directement un appel découverte.",
};

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
            Contact
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight mb-6">
            Discutons de<br />
            <em className="italic font-normal">votre projet</em>
          </h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
            Remplissez le formulaire ci-contre. Je vous réponds sous 48h
            ouvrées avec un premier avis honnête sur votre situation.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[var(--accent)] text-sm">①</span>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Vous remplissez le formulaire</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Plus vous êtes précis, plus ma réponse sera pertinente.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[var(--accent)] text-sm">②</span>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">Je reviens sous 48h</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Avec un premier diagnostic et les questions que j&apos;ai.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[var(--accent)] text-sm">③</span>
              </div>
              <div>
                <p className="font-medium text-sm mb-1">On cale un appel si pertinent</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  30 minutes pour aligner les attentes et décider ensemble.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[var(--muted)] rounded-2xl">
            <p className="text-sm text-[var(--muted-foreground)] mb-2">Email direct</p>
            <a
              href="mailto:contact@ayoubberkiks.fr"
              className="text-[var(--accent)] font-medium hover:underline"
            >
              contact@ayoubberkiks.fr
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div>
          <ContactForm />
        </div>
      </div>

      {/* Calendly */}
      {calendlyUrl && (
        <div className="mt-20 pt-16 border-t border-[var(--border)]">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="font-serif text-2xl font-semibold mb-3">
              Ou réservez directement un appel découverte
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm">
              30 minutes, sans engagement. On évalue ensemble si je peux vous aider.
            </p>
          </div>
          <CalendlyEmbed url={calendlyUrl} mode="inline" />
        </div>
      )}
    </div>
  );
}
