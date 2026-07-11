import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Je suis Ayoub Berkiks, freelance marketing et communication digitale. Ma conviction : le digital n'est efficace que s'il est aligné avec votre stratégie business.",
};

export default function AProposPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
          À propos
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight mb-8">
          Je construis des présences digitales{" "}
          <em className="italic font-normal">qui travaillent pour vous</em>
        </h1>
      </div>

      <div className="prose">
        <p>
          Je m&apos;appelle Ayoub Berkiks. Je suis freelance en marketing et
          communication digitale, basé en France.
        </p>

        <p>
          Mon parcours mélange deux disciplines que l&apos;industrie sépare
          souvent : la <strong>stratégie marketing</strong> et le{" "}
          <strong>développement web</strong>. Cette combinaison n&apos;est pas un
          accident — c&apos;est mon différenciateur.
        </p>

        <h2>Ce que je pense du digital</h2>

        <p>
          La plupart des entreprises n&apos;ont pas besoin de plus d&apos;outils. Elles
          ont besoin de <strong>clarté</strong> : savoir pourquoi elles font ce
          qu&apos;elles font en ligne, mesurer ce qui fonctionne, et arrêter ce qui
          ne fonctionne pas.
        </p>

        <p>
          Je suis convaincu que le marketing digital efficace n&apos;est pas
          sorcier, mais il demande de la rigueur, de la cohérence et une vraie
          compréhension du business. Pas de la magie, pas de buzzwords.
        </p>

        <h2>Pourquoi travailler seul</h2>

        <p>
          Quand vous m&apos;engagez, c&apos;est moi qui fais le travail. Pas une équipe
          junior. Pas un réseau de sous-traitants. Moi.
        </p>

        <p>
          Ça veut dire que je peux avoir une vision à 360° de votre projet :
          je comprends les contraintes techniques quand je definis la stratégie,
          et je comprends les enjeux business quand je code.
        </p>

        <p>
          La contrepartie : ma capacité est limitée. J&apos;accepte peu de projets à
          la fois pour garantir une qualité d&apos;exécution irréprochable.
        </p>

        <h2>Ce que je ne fais pas</h2>

        <p>
          Je ne fais pas du volume. Je ne promets pas de résultats en 30 jours.
          Je ne propose pas de forfaits à 299€/mois. Si vous cherchez ça, je
          ne suis probablement pas la bonne personne.
        </p>

        <p>
          Si vous cherchez quelqu&apos;un qui va comprendre votre activité avant de
          proposer quoi que ce soit, qui va vous donner un avis honnête même
          quand il n&apos;est pas celui que vous voulez entendre, et qui va
          s&apos;investir dans votre succès — on peut en discuter.
        </p>
      </div>

      <div className="mt-16 pt-10 border-t border-[var(--border)]">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact#formulaire"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Discutons de votre projet
          </Link>
          <Link
            href="/projets"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[var(--foreground)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors"
          >
            Voir mes projets
          </Link>
        </div>
      </div>
    </div>
  );
}
