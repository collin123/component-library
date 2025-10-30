// Define the snippet structure
interface Snippet {
  id: number;
  name: string;
  code: string;
  created_at: string;
}

// Extend the Window interface to include our Electron API
interface Window {
  api: {
    getSnippets: () => Promise<Snippet[]>;
    addSnippet: (name: string, code: string) => Promise<void>;
    searchSnippets: (query: string) => Promise<Snippet[]>;
    deleteSnippet: (id: number) => Promise<void>;
  };
}
