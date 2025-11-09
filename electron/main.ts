// import { app, BrowserWindow, Menu } from 'electron';
// import path from 'path';
//
// let win: BrowserWindow;
//
// function createWindow() {
//     // Remove native menu entirely
//     Menu.setApplicationMenu(null);
//
//     win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         frame: false,          // removes the title bar & native buttons
//         autoHideMenuBar: true, // hide menu on Windows/Linux
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//         },
//     });
//
//     const devServerURL = process.env.VITE_DEV_SERVER_URL;
//
//     if (devServerURL) {
//         win.loadURL(devServerURL);
//         win.webContents.openDevTools(); // optional
//     } else {
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

import { app, BrowserWindow } from "electron";
import path from "path";

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // removes the title bar
    autoHideMenuBar: true, // hides the menu bar
    icon: path.join(__dirname, "../src/assets/grid-code.svg"), // <-- can use SVG
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // REMOVE DEFAULT MENU
  win.removeMenu();

  const devServerURL = process.env.VITE_DEV_SERVER_URL;

  if (devServerURL) {
    // Dev: Load Vite dev server (dynamic CSS & HMR)
    win.loadURL(devServerURL);
    win.webContents.openDevTools(); // optional
  } else {
    // Production: Load built HTML with compiled CSS
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
