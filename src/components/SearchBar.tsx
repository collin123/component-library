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
  const [lang,setLang]=useState<string>("");

  const langFilter
  
  return(
    <>
      <div>
        <input type="text" placeholder="Componenet name" />
      </div>
      <div>
        <label htmlFor="languages">Choose a language:</label>
        <select id="languages" name="language">
          <option value="react">React</option>
          <option value="typescript">Typescript</option>
          <option value="javascript">javascript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="scss">SCSS</option>
          <option value="tailwind">Tailwind</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="fastapi">FastAPI</option>
          <option value="django">Django</option>
          <option value="flask">Flask</option>
          <option value="react">React</option>
          <option value="next">Next</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
          <option value="ember">Ember</option>
        </select>
      </div>
    </>
  )
}