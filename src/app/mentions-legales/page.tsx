import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="font-serif text-3xl font-semibold mb-10">Mentions légales</h1>

      <div className="prose">
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité par Ayoub Berkiks, freelance en marketing et
          communication digitale, exerçant en auto-entrepreneur.
        </p>
        <p>
          <strong>Email :</strong> contact@ayoubberkiks.fr<br />
          <strong>Siret :</strong> [À compléter]<br />
          <strong>Adresse :</strong> France
        </p>

        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701,
          San Francisco, California 94104, États-Unis.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, graphismes,
          logotypes) est la propriété exclusive d&apos;Ayoub Berkiks. Toute
          reproduction, représentation, modification ou adaptation, totale ou
          partielle, est interdite sans autorisation préalable écrite.
        </p>

        <h2>Responsabilité</h2>
        <p>
          L&apos;éditeur ne saurait être tenu responsable des dommages directs ou
          indirects résultant de l&apos;utilisation de ce site. Les informations
          présentes sur ce site sont fournies à titre indicatif.
        </p>

        <h2>Liens externes</h2>
        <p>
          Ce site peut contenir des liens vers des sites tiers. L&apos;éditeur
          n&apos;est pas responsable du contenu de ces sites.
        </p>
      </div>
    </div>
  );
}
