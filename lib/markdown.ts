import { marked } from "marked";

marked.use({ gfm: true });

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}