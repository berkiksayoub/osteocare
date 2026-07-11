import fs from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "content/projets");

interface Frontmatter {
  title: string;
  excerpt: string;
  category: string;
  result?: string;
  client?: string;
  duration?: string;
  year?: string;
  tags?: string[];
}

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: { title: "", excerpt: "", category: "" }, body: raw };

  const yamlStr = match[1];
  const body = match[2];

  const frontmatter: Record<string, unknown> = {};
  for (const line of yamlStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      frontmatter[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else {
      frontmatter[key] = val.replace(/^["']|["']$/g, "");
    }
  }

  return { frontmatter: frontmatter as unknown as Frontmatter, body };
}

function mdToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hublp])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getProjectBySlug(slug: string) {
  const extensions = [".mdx", ".md"];
  for (const ext of extensions) {
    const filePath = path.join(PROJECTS_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { frontmatter, body } = parseFrontmatter(raw);
      const content = mdToHtml(body);
      return { frontmatter, content, slug };
    }
  }
  return null;
}
