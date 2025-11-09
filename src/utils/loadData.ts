// interface ComponentItem {
//   name: string;
//   category: string;
//   description: string;
//   code: string;
//   language: string;
//   "file-extension": string;
// }
//
// export default async function loadData(): Promise<ComponentItem[]> {
//   try {
//     const res = await fetch(`/db.json?t=${Date.now()}`, { cache: "no-store" });
//     if (!res.ok) {
//       throw new Error(`HTTP ${res.status}`);
//     }
//
//     const data = (await res.json()) as ComponentItem[];
//     // Ensure always an array
//     const items = Array.isArray(data) ? data : [data];
//     return items;
//   } catch (err) {
//     console.error("Failed to load JSON:", err);
//     return []; // fallback to empty array
//   }
// }

type ComponentItem = {
  name?: string;
  category?: string;
  language?: string | null;
  "file-extension"?: string;
  description?: string;
  code?: string;
};

import fs from "fs";
import path from "path";

export default function loadJson(jsonPath: string): any {
  const filePath: string = path.join(__dirname, jsonPath);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const jsonData: ComponentItem = JSON.parse(fileContent);

  return jsonData;
}
