// filepath: c:\Projects\component-library\src\utils\fetchData.ts
// Small reusable helper to fetch the components JSON from /db.json
// Returns an array of items (always an array) and throws on HTTP errors so callers can handle them.

export type ComponentItem = {
  name?: string;
  category?: string;
  language?: string | null;
  "file-extension"?: string;
  description?: string;
  code?: string;
};

export async function fetchComponents(): Promise<ComponentItem[]> {
  try {
    const res = await fetch(`/db.json?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = (await res.json()) as ComponentItem[] | ComponentItem;
    return Array.isArray(data) ? data : [data];
  } catch (err) {
    // surface the error to the caller but also log it for debugging
    // callers (like React components) can choose how to handle errors
    // (set state / show UI, etc.)
    // eslint-disable-next-line no-console
    console.error("fetchComponents failed:", err);
    throw err;
  }
}
