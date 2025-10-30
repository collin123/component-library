// import { app, BrowserWindow } from 'electron';
// import path from 'path';
//
// let win: BrowserWindow;
//
// function createWindow() {
//     win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//         },
//     });
//
//     const devServerURL = process.env.VITE_DEV_SERVER_URL;
//
//     if (devServerURL) {
//         // Dev: Load Vite dev server (dynamic CSS & HMR)
//         win.loadURL(devServerURL);
//         win.webContents.openDevTools(); // optional
//     } else {
//         // Production: Load built HTML with compiled CSS
//         win.loadFile(path.join(__dirname, '../dist/index.html'));
//     }
// }
//
// app.whenReady().then(createWindow);
//
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit();
// });
//
// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { addSnippet, getAllSnippets, searchSnippets, deleteSnippet } from "./snippetService";

let mainWindow: BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile(path.join(__dirname, "../src/index.html")); // adjust if using Vite dev server
    // mainWindow.webContents.openDevTools(); // optional for debugging
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC handlers
ipcMain.handle("get-snippets", () => getAllSnippets());
ipcMain.handle("add-snippet", (_, name: string, code: string) => addSnippet(name, code));
ipcMain.handle("search-snippets", (_, query: string) => searchSnippets(query));
ipcMain.handle("delete-snippet", (_, id: number) => deleteSnippet(id));
