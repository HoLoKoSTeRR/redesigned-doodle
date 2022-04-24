const { app, BrowserWindow, Menu, shell } = require("electron");
const contextMenu = require("electron-context-menu");
Menu.setApplicationMenu(null);
function createWindow() {
  const onlineStatusWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: "./preload.js",
      nodeIntegration: false,
      contextIsolation: true,
      // ...
    },
  });

  onlineStatusWindow.loadURL("https://admin-rho-silk.vercel.app");
}
contextMenu({
  showLookUpSelection: false,
  showSearchWithGoogle: false,
  showCopyImageAddress: false,
  showCopyLinkAddress: false,
  showToggleDevTools: false,
  showCopyLink: false,
  menu: () => [],
  prepend: () => [
    {
      label: "Открыть тестовую страницу",
      click: () => {
        shell.openExternal("https://shiny-engine.vercel.app");
      },
    },
  ],
});
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
