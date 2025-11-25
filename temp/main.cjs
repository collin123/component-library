"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
// Keep a nullable typed BrowserWindow to satisfy `strict` mode
let win = null;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 650,
        height: 400,
        frame: false, // removes title bar and OS frame
        transparent: true, // makes background transparent
        backgroundColor: "#00000000", // mandatory for full transparency on Windows
        alwaysOnTop: true, // stays on top like Raycast
        skipTaskbar: true, // hide from taskbar
        resizable: false,
        minimizable: false,
        maximizable: false,
        closable: true,
        hasShadow: false, // shadow handled by CSS
        focusable: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // Remove the default menu
    win.removeMenu();
    // Center and show after ready
    win.once("ready-to-show", () => {
        win?.center();
        win?.show();
        win?.focus();
    });
    const devServerURL = process.env.VITE_DEV_SERVER_URL;
    if (devServerURL) {
        // Dev: load vite dev server for HMR
        win.loadURL(devServerURL);
        win.webContents.openDevTools();
    }
    else {
        // Production: load compiled index.html from dist
        win.loadFile(path_1.default.join(__dirname, "../dist/index.html"));
    }
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
