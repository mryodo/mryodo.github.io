import { getCollection, type CollectionEntry } from "astro:content";
import { renderMarkdown } from "./markdown";

type NewsData = CollectionEntry<"news">["data"];

export interface NewsEntry {
  id: string;
  year: string;
  date: string;
  link: NewsData["link"];
  decorator: NewsData["decorator"];
  bodyHtml: string;
  sort: string;
}

export async function getNews(): Promise<NewsEntry[]> {
  const entries = await getCollection("news");

  return entries
    .map((entry) => ({
      id: entry.id,
      year: entry.data.year,
      date: entry.data.date,
      link: entry.data.link,
      decorator: entry.data.decorator,
      bodyHtml: renderMarkdown(entry.body ?? ""),
      sort: entry.data.sort,
    }))
    .sort((a, b) => stamp(b.sort) - stamp(a.sort));
}

function stamp(sort: string): number {
  const t = new Date(sort).getTime();
  return Number.isNaN(t) ? 0 : t;
}