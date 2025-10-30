// import { contextBridge } from 'electron';
//
// contextBridge.exposeInMainWorld('electronAPI', {
//     // Example: exposed API
// });


import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getSnippets: () => ipcRenderer.invoke("get-snippets"),
  addSnippet: (name: string, code: string) => ipcRenderer.invoke("add-snippet", name, code),
  searchSnippets: (query: string) => ipcRenderer.invoke("search-snippets", query),
  deleteSnippet: (id: number) => ipcRenderer.invoke("delete-snippet", id),
});
