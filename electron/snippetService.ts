import db from "./database";

// Add a new snippet
export function addSnippet(name: string, code: string) {
  const stmt = db.prepare("INSERT INTO snippets (name, code) VALUES (?, ?)");
  stmt.run(name, code);
}

// Get all snippets
export function getAllSnippets() {
  const stmt = db.prepare("SELECT * FROM snippets ORDER BY created_at DESC");
  return stmt.all();
}

// Search snippets by name
export function searchSnippets(query: string) {
  const stmt = db.prepare("SELECT * FROM snippets WHERE name LIKE ?");
  return stmt.all(`%${query}%`);
}

// Delete a snippet
export function deleteSnippet(id: number) {
  const stmt = db.prepare("DELETE FROM snippets WHERE id = ?");
  stmt.run(id);
}
