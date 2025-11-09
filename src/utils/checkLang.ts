interface ComponentItem {
  name: string;
  category: string;
  language: string;
  "file-extension": string;
  description: string;
  code: string;
}

export default function checkLang(
  data: ComponentItem[],
  selectedLang: string,
): ComponentItem[] {
  // if (!data) {
  //   console.log("No data assigned in json file:checkLang.ts");
  //   throw new Error();
  // }
  // if (!data.language) {
  //   console.log("No language assigned in json file:checkLang.ts");
  //   throw new Error();
  // }
  // if (data.language === "any") {
  //   return;
  // }

  !data
    ? (console.log("No data assigned in json file:checkLang.ts"),
      (() => {
        throw new Error();
      })())
    : !data.language
      ? (console.log("No language assigned in json file:checkLang.ts"),
        (() => {
          throw new Error();
        })())
      : data.language === "any"
        ? undefined
        : null; // do nothing if none of the above

  // Return only components that match the selected language
  return data.filter((item) => item.language === selectedLang);
}
