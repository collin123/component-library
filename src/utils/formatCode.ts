// export default function formatedCode(code: string): string {
//   if (!code) return "";
//   return code
//     .replace(/\\n/g, "\n") // convert escaped newlines
//     .replace(/\\\\n/g, "\n")
//     .replace(/;/g, ";\n") // add line breaks after ;
//     .trim();
// }

export default function simpleFormat(code: string) {
  if (!code) return "";

  let indent = 0;
  return code
    .replace(/\s*{\s*/g, () => "{\n" + "  ".repeat(++indent))
    .replace(/\s*}\s*/g, () => "\n" + "  ".repeat(--indent) + "}")
    .replace(/;\s*/g, ";\n" + "  ".repeat(indent));
}
