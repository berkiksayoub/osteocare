import { z } from "zod";

export const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  entreprise: z.string().optional(),
  budget: z.enum(["lt2k", "2k5k", "5k10k", "gt10k", "tbd"], {
    message: "Veuillez sélectionner un budget",
  }),
  typeProjet: z
    .array(z.string())
    .min(1, "Sélectionnez au moins un type de projet"),
  description: z
    .string()
    .min(50, "La description doit contenir au moins 50 caractères"),
  rgpd: z.literal(true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
