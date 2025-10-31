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

export default function Filter() {
  const [lang, setLang] = useState<string>("");

  const filteredComponents = data.filter((item) => item.language === lang);

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-6 text-white">
        {/* Dropdown */}
        <select
          value={lang}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white rounded-lg p-2 border border-gray-600"
        >
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

        {/* Display filtered components */}
        {filteredComponents.map((item) => (
          <div
            key={item.id}
            className="bg-gray-700 p-4 rounded-lg w-64 text-center shadow-lg"
          >
            <h2 className="font-bold text-lg mb-2">{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      {/*<div className="flex flex-col items-center gap-6 p-6 min-h-screen">*/}
      {/*  <select*/}
      {/*    value={lang}*/}
      {/*    onChange={(e) => setLanguage(e.target.value)}*/}
      {/*    className="bg-gray-800 text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"*/}
      {/*  >*/}
      {/*    <option value="react">React</option>*/}
      {/*    <option value="typescript">Typescript</option>*/}
      {/*    <option value="javascript">JavaScript</option>*/}
      {/*    <option value="python">Python</option>*/}
      {/*    <option value="html">HTML</option>*/}
      {/*    <option value="css">CSS</option>*/}
      {/*    <option value="scss">SCSS</option>*/}
      {/*    <option value="tailwind">Tailwind</option>*/}
      {/*    <option value="node">Node</option>*/}
      {/*    <option value="express">Express</option>*/}
      {/*    <option value="fastapi">FastAPI</option>*/}
      {/*    <option value="django">Django</option>*/}
      {/*    <option value="flask">Flask</option>*/}
      {/*    <option value="next">Next</option>*/}
      {/*    <option value="vue">Vue</option>*/}
      {/*    <option value="angular">Angular</option>*/}
      {/*    <option value="svelte">Svelte</option>*/}
      {/*    <option value="ember">Ember</option>*/}
      {/*  </select>*/}

      {/*  /!* Display filtered components *!/*/}
      {/*  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">*/}
      {/*    {filteredComponents.map((item) => (*/}
      {/*      <div*/}
      {/*        key={item.id}*/}
      {/*        className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"*/}
      {/*      >*/}
      {/*        <h2 className="font-bold text-xl mb-2 text-white">*/}
      {/*          {item.title}*/}
      {/*        </h2>*/}
      {/*        <p className="text-gray-300">{item.content}</p>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!* Dropdown *!/*/}
    </>
  );
}
