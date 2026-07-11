import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="font-serif text-3xl font-semibold mb-10">
        Politique de confidentialité
      </h1>

      <div className="prose">
        <p>
          <em>Dernière mise à jour : juillet 2025</em>
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          Ayoub Berkiks, contact@ayoubberkiks.fr
        </p>

        <h2>Données collectées</h2>
        <p>
          Via le formulaire de contact, je collecte les données suivantes :
          nom, adresse email, nom de l&apos;entreprise (optionnel), budget
          indicatif, type de projet et description du projet.
        </p>

        <h2>Finalité du traitement</h2>
        <p>
          Ces données sont collectées dans le seul but de traiter votre
          demande de contact et de vous recontacter dans le cadre d&apos;une
          éventuelle collaboration commerciale.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Vos données sont conservées pendant une durée maximale de 3 ans à
          compter de votre dernier contact.
        </p>

        <h2>Destinataires des données</h2>
        <p>
          Vos données sont transmises aux services tiers suivants dans le
          cadre du traitement de votre demande :
        </p>
        <ul>
          <li>
            <strong>Resend</strong> (envoi d&apos;emails transactionnels) — États-Unis
          </li>
          <li>
            <strong>Notion</strong> (gestion de la base clients) — États-Unis
          </li>
        </ul>
        <p>
          Ces transferts hors UE sont encadrés par les clauses contractuelles
          types de la Commission européenne.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, d&apos;opposition et de portabilité de vos
          données. Pour exercer ces droits, contactez-moi à{" "}
          <a href="mailto:contact@ayoubberkiks.fr">contact@ayoubberkiks.fr</a>.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL
          (www.cnil.fr).
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site n&apos;utilise pas de cookies publicitaires. Des cookies
          techniques peuvent être utilisés pour le bon fonctionnement du site.
          Aucun cookie de tracking tiers n&apos;est déposé sans votre consentement.
        </p>
      </div>
    </div>
  );
}
