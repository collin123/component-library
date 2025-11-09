import prettier from "@prettier/standalone";
import parserTypeScript from "@prettier/parser-typescript";

export default function prettierFormater(code: string): string {
  if (!code) return "";
  try {
    return prettier.format(code, {
      parser: "typescript",
      plugins: [parserTypeScript],
      tabWidth: 2,
    });
  } catch (err) {
    console.error("Prettier formatting failed:", err);
    return code;
  }
}
