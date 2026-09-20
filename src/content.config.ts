import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/news" }),
  schema: z.object({
    title: z.boolean().default(false),
    date: z.string(),
    link: z.array(z.tuple([z.string(), z.string()])).default([]),
    sort: z.coerce.string(),
    decorator: z.enum(["post", "alert"]).default("post"),
    year: z.coerce.string(),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/papers" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.coerce.number(),
    type: z.enum(["journal", "preprint"]).default("preprint"),
    sort: z.coerce.string(),
    journal: z.string().default(""),
    citation: z.string().optional(),
    doi: z.string().optional(),
    pdf: z.string().optional(),
    image: z.string().optional(),
    links: z
      .array(z.object({ name: z.string(), url: z.string() }))
      .default([]),
  }),
});

export const collections = { news, papers };
