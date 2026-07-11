import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.excerpt,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Breadcrumb */}
      <nav className="mb-10 text-sm text-[var(--muted-foreground)]">
        <Link href="/projets" className="hover:text-[var(--accent)] transition-colors">
          ← Tous les projets
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-14">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--accent)] bg-[var(--muted)] px-2.5 py-1 rounded-full mb-6">
          {frontmatter.category}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-6 leading-tight">
          {frontmatter.title}
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
          {frontmatter.excerpt}
        </p>
        {frontmatter.result && (
          <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 rounded-lg text-sm font-semibold">
            ✓ {frontmatter.result}
          </div>
        )}
      </header>

      {/* Meta grid */}
      {(frontmatter.client || frontmatter.duration || frontmatter.year) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-14 p-6 bg-[var(--muted)] rounded-2xl">
          {frontmatter.client && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">
                Client
              </p>
              <p className="text-sm font-medium">{frontmatter.client}</p>
            </div>
          )}
          {frontmatter.duration && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">
                Durée
              </p>
              <p className="text-sm font-medium">{frontmatter.duration}</p>
            </div>
          )}
          {frontmatter.year && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">
                Année
              </p>
              <p className="text-sm font-medium">{frontmatter.year}</p>
            </div>
          )}
          {frontmatter.tags && (
            <div className="col-span-2 sm:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                Technologies & approches
              </p>
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs border border-[var(--border)] bg-white px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* CTA */}
      <div className="mt-16 pt-10 border-t border-[var(--border)] text-center">
        <p className="font-serif text-2xl font-semibold mb-4">
          Vous avez un projet similaire ?
        </p>
        <p className="text-[var(--muted-foreground)] mb-8">
          Discutons de ce que je peux faire pour vous.
        </p>
        <Link
          href="/contact#formulaire"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:opacity-90 transition-opacity"
        >
          Discutons de votre projet
        </Link>
      </div>
    </div>
  );
}
