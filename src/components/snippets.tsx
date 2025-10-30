import React, { useState, useEffect } from "react";

interface Snippet {
  id: number;
  name: string;
  code: string;
  created_at: string;
}

export default function Snippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");

  // Load all snippets on mount
  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    const data: Snippet[] = await window.api.getSnippets();
    setSnippets(data);
  };

  const handleSearch = async () => {
    if (!search) return loadSnippets();
    const data: Snippet[] = await window.api.searchSnippets(search);
    setSnippets(data);
  };

  const handleAdd = async () => {
    if (!newName || !newCode) return;
    await window.api.addSnippet(newName, newCode);
    setNewName("");
    setNewCode("");
    loadSnippets();
  };

  const handleDelete = async (id: number) => {
    await window.api.deleteSnippet(id);
    loadSnippets();
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Copied to clipboard!");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Code Snippets</h1>

      {/* Add snippet */}
      <div className="mb-4 space-y-2">
        <input
          className="w-full p-2 rounded border"
          placeholder="Snippet Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <textarea
          className="w-full p-2 rounded border"
          placeholder="Snippet Code"
          rows={4}
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-3 py-2 rounded"
          onClick={handleAdd}
        >
          Add Snippet
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex space-x-2">
        <input
          className="flex-1 p-2 rounded border"
          placeholder="Search snippets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Snippets list */}
      <ul className="space-y-3">
        {snippets.map((s) => (
          <li key={s.id} className="bg-gray-800 p-3 rounded text-white">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold">{s.name}</h3>
              <div className="space-x-2">
                <button
                  className="bg-blue-500 px-2 py-1 rounded"
                  onClick={() => handleCopy(s.code)}
                >
                  Copy
                </button>
                <button
                  className="bg-red-500 px-2 py-1 rounded"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <pre className="bg-gray-900 p-2 rounded overflow-x-auto">
              {s.code}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
