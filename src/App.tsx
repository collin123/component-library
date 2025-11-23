import "./index.css";
import { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import copyText from "./utils/copy";
import Filter from "./components/Filter.tsx";
import ErrAlert from "./components/ErrAlert.tsx";
import formatCode from "./utils/formatCode.ts";
import languages from "./utils/info.ts";
import SearchBar from "./components/SearchBar.tsx";
import { fetchComponents } from "./utils/fetchData";

const oneDark = themes.oneDark;

// added a lightweight type for the JSON shape so TS can validate usage inside this file
type ComponentItem = {
  name?: string;
  category?: string;
  language?: string | null;
  "file-extension"?: string;
  description?: string;
  code?: string;
};

// const customLanguages = {
//   react: "jsx",
//   javascript: "javascript",
//   typescript: "typescript",
//   html: "html",
//   css: "css",
//   json: "json",
//   python: "python",
// } as const;

export default function App() {
  const [jsonData, setJsonData] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [newItemsCount, setNewItemsCount] = useState<number>(0);

  const fetchData = async () => {
    try {
      const incoming = await fetchComponents();
      // detect new items by simple length and shallow name comparison
      const existingNames = new Set(jsonData.map((d) => d.name));
      const added = incoming.filter(
        (d) => d.name && !existingNames.has(d.name),
      );
      // Only treat items as "new" after the first successful load (lastUpdated != null)
      if (lastUpdated !== null && added.length > 0)
        setNewItemsCount((c) => c + added.length);
      setJsonData(incoming);
      setLastUpdated(Date.now());
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch /db.json", err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // log theme to help debug whether oneDark was imported at runtime
    // (check the browser console for this object)
    // eslint-disable-next-line no-console
    console.log("prism oneDark theme:", oneDark);
    fetchData();
    const interval = setInterval(fetchData, 3000); // poll every 3s
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchData();
    setNewItemsCount(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Component Library
          </h1>
          <SearchBar />
          <Filter />
          <div className="flex items-center gap-3">
            {newItemsCount > 0 && (
              <span className="text-sm text-white bg-green-600 px-2 py-1 rounded">
                {newItemsCount} new
              </span>
            )}
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Refresh
            </button>
            {/*<RefreshBtn />*/}
          </div>
        </div>
        {lastUpdated && (
          <div className="text-xs text-gray-500 mb-4">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </div>
        )}

        {error && (
          // <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-md">
          //   {error}
          // </div>
          <ErrAlert title="Error" description={error} />
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jsonData &&
            jsonData.map((component, index) => {
              // ensure we only use known keys from the mapping; fallback to 'react' -> 'jsx'
              const langKey =
                (component.language &&
                  // (component.language as keyof typeof customLanguages)) ||
                  (component.language as keyof typeof languages)) ||
                "react";
              // const language = customLanguages[langKey] || "jsx";
              const language = languages[langKey] || "jsx";

              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    {component.name ?? "Untitled"}
                  </h2>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {component.category ?? "Uncategorized"}
                    </span>
                    {component.language && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {component.language}
                      </span>
                    )}
                    {component["file-extension"] && (
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {component["file-extension"]}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {component.description ?? "No description"}
                  </p>

                  {/*{component.code && (*/}
                  {/*  <div className="mt-2">*/}
                  {/*    <div className="text-sm font-medium text-gray-700 mb-1">*/}
                  {/*      Code:*/}
                  {/*    </div>*/}
                  {/*    <div className="bg-gray-800 rounded-lg p-3 text-sm overflow-x-auto">*/}
                  {/*      <button*/}
                  {/*        onClick={() => copyText(component.code!)}*/}
                  {/*        className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition"*/}
                  {/*      >*/}
                  {/*        Copy*/}
                  {/*      </button>*/}
                  {/*      <Highlight*/}
                  {/*        code={(component.code || "").trim()}*/}
                  {/*        language={language}*/}
                  {/*        theme={oneDark}*/}
                  {/*      >*/}
                  {component.code && (
                    <div className="mt-2">
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Code:
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3 text-sm overflow-x-auto">
                        <button
                          onClick={() => copyText(formatCode(component.code!))}
                          className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition"
                        >
                          Copy
                        </button>
                        <Highlight
                          code={formatCode(component.code!)}
                          language={language}
                          theme={oneDark}
                        >
                          {(props: any) => {
                            const {
                              className,
                              style,
                              tokens,
                              getLineProps,
                              getTokenProps,
                            } = props as any;
                            return (
                              <pre
                                className={className}
                                style={{
                                  ...style,
                                  margin: 0,
                                  padding: "0.5rem",
                                  fontSize: "0.8rem",
                                  lineHeight: "1.5",
                                  fontFamily: "monospace",
                                  overflowX: "auto",
                                }}
                              >
                                {tokens.map((line: any, i: number) => (
                                  <div
                                    key={i}
                                    {...getLineProps({ line, key: i })}
                                  >
                                    {line.map((token: any, key: number) => (
                                      <span
                                        key={key}
                                        {...getTokenProps({ token, key })}
                                      />
                                    ))}
                                  </div>
                                ))}
                              </pre>
                            );
                          }}
                        </Highlight>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Raw JSON Data:
          </h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
