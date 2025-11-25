import { app, BrowserWindow } from "electron";
import path from "path";

// Keep a nullable typed BrowserWindow to satisfy `strict` mode
let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 650, // width of launcher
    height: 400, // height of launcher
    x: undefined, // center automatically
    y: undefined, // center automatically
    center: true, // center on screen
    frame: false, // remove OS title bar
    transparent: true, // make background transparent
    backgroundColor: "#00000000", // full transparency (mandatory on Windows)
    alwaysOnTop: true, // keep above all windows
    skipTaskbar: true, // hide from taskbar
    resizable: false, // prevent resizing
    minimizable: false, // no minimize button
    maximizable: false, // no maximize button
    closable: true, // show close button
    hasShadow: false, // shadow will be handled via CSS
    focusable: true, // allow window to receive focus
    show: false, // show after ready-to-show
    roundedCorners: true, // Windows 11 only: rounded corners
    webPreferences: {
      nodeIntegration: true, // enable Node.js integration
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
  } else {
    // Production: load compiled index.html from dist
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
