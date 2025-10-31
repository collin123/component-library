import { useState } from "react";
import data from "../../public/db.json";

type ComponentItem = {
  name?: string;
  category?: string;
  language?: string | null;
  "file-extension"?: string;
  description?: string;
  code?: string;
};

const customLanguages = {
  javascript: "javascript",
  typescript: "typescript",
  html: "html",
  css: "css",
  json: "json",
  python: "python",
  scss: "scss",
  tailwind: "tailwind",
  node: "node",
  express: "express",
  fastapi: "fastapi",
  django: "django",
  flask: "flask",
  react: "react",
  next: "next",
  vue: "vue",
  angular: "angular",
  svelte: "svelte",
  ember: "ember",
  tsx: "tsx",
  jsx: "jsx",
} as const;

export default function SearchBar(){
  return(
    <>
      <div>
        <input type="text" placeholder="Componenet name" />
      </div>
    </>
  )
}