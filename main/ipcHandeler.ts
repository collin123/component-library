// import { ipcMain } from "electron";
// import path = require("path");
// import fs = require("fs");
import { ipcMain } from "electron";
import fs from "fs";
import path from "path";

ipcMain.handle("read-json", async (e, fileName: string) => {
  const filePath = path.join(__dirname, "../../public", fileName);
  const data = fs.readFileSync(filePath, "utf-8");
  console.log(data);
  return JSON.parse(data);
});
