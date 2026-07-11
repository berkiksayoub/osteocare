import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles sur le marketing digital, le SEO, la stratégie et le développement web.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
          Blog
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-6">
          Bientôt disponible
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed">
          Je publie régulièrement sur le marketing digital, le SEO, la
          stratégie de contenu et le développement web. Revenez bientôt.
        </p>
      </div>
    </div>
  );
}
