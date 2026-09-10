import { getCollection, type CollectionEntry } from "astro:content";
import type { PaperLink } from "@/components/content/paper";
import { renderMarkdown } from "./markdown";

type PapersData = CollectionEntry<"papers">["data"];

export interface PaperEntry {
  id: string;
  year: number;
  status: PapersData["type"];
  title: string;
  authors: string;
  venue: string;
  abstract: string;
  links: PaperLink[];
  sort: string;
}

export async function getPapers(): Promise<PaperEntry[]> {
  const entries = await getCollection("papers");

  return entries
    .map((entry) => ({
      id: entry.id,
      year: entry.data.year,
      status: entry.data.type,
      title: entry.data.title,
      authors: entry.data.authors.join(", "),
      venue: venue(entry.data),
      abstract: renderMarkdown(entry.body ?? ""),
      links: entry.data.links.map((link) => ({
        label: link.name,
        href: link.url,
      })),
      sort: entry.data.sort,
    }))
    .sort((a, b) => stamp(b.sort) - stamp(a.sort));
}

function venue(data: PapersData): string {
  const base = data.journal || "arXiv";
  return `${base} (${data.year})`;
}

function stamp(sort: string): number {
  const t = new Date(sort).getTime();
  return Number.isNaN(t) ? 0 : t;
}