"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { useRouter } from "next/navigation";

const BUDGET_OPTIONS = [
  { value: "lt2k", label: "< 2 000 €" },
  { value: "2k5k", label: "2 000 - 5 000 €" },
  { value: "5k10k", label: "5 000 - 10 000 €" },
  { value: "gt10k", label: "> 10 000 €" },
  { value: "tbd", label: "À définir" },
];

const PROJECT_TYPES = [
  { value: "site-web", label: "Site web" },
  { value: "seo-sea", label: "SEO/SEA" },
  { value: "strategie", label: "Stratégie" },
  { value: "contenu", label: "Contenu" },
  { value: "autre", label: "Autre" },
];

export default function ContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { typeProjet: [] },
  });

  const selectedTypes = watch("typeProjet") ?? [];

  function toggleType(value: string) {
    const current = selectedTypes;
    if (current.includes(value)) {
      setValue("typeProjet", current.filter((v) => v !== value), { shouldValidate: true });
    } else {
      setValue("typeProjet", [...current, value], { shouldValidate: true });
    }
  }

  async function onSubmit(data: ContactFormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError(json.error ?? "Une erreur est survenue. Veuillez réessayer.");
        return;
      }
      router.push("/contact/merci");
    } catch {
      setServerError("Impossible d'envoyer le formulaire. Vérifiez votre connexion.");
    }
  }

  return (
    <form id="formulaire" onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Nom */}
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          id="nom"
          type="text"
          {...register("nom")}
          placeholder="Jean Dupont"
          className="w-full px-4 py-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all"
        />
        {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="jean@exemple.fr"
          className="w-full px-4 py-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Entreprise */}
      <div>
        <label htmlFor="entreprise" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Entreprise
        </label>
        <input
          id="entreprise"
          type="text"
          {...register("entreprise")}
          placeholder="Ma Startup SAS"
          className="w-full px-4 py-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all"
        />
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Budget indicatif <span className="text-red-500">*</span>
        </label>
        <select
          id="budget"
          {...register("budget")}
          className="w-full px-4 py-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all bg-white"
        >
          <option value="">Sélectionner un budget</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget.message}</p>}
      </div>

      {/* Type de projet */}
      <div>
        <p className="block text-sm font-medium text-[var(--foreground)] mb-2">
          Type de projet <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => {
            const selected = selectedTypes.includes(type.value);
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => toggleType(type.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  selected
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-white text-[var(--foreground)] border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
        {errors.typeProjet && (
          <p className="mt-1 text-xs text-red-500">{errors.typeProjet.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Décrivez votre projet <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={5}
          placeholder="Parlez-moi de votre contexte, vos objectifs, vos contraintes… (minimum 50 caractères)"
          className="w-full px-4 py-3 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all resize-vertical"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* RGPD */}
      <div className="flex items-start gap-3">
        <input
          id="rgpd"
          type="checkbox"
          {...register("rgpd")}
          className="mt-0.5 h-4 w-4 rounded border-[var(--border)] accent-[var(--accent)]"
        />
        <label htmlFor="rgpd" className="text-sm text-[var(--muted-foreground)]">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande et me recontacter.
          Voir la{" "}
          <a href="/politique-confidentialite" className="text-[var(--accent)] hover:underline">
            politique de confidentialité
          </a>
          .{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>
      {errors.rgpd && <p className="text-xs text-red-500 -mt-4">{errors.rgpd.message}</p>}

      {serverError && (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
