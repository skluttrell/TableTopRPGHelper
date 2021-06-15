const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const menu = require('./menu');
let window;

app.on('ready', () => {
	window = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInSubFrames: true,
//			webviewTag: true,
		}
	});
	window.maximize();
	window.loadURL(`file://${__dirname}/index.html`);
	window.on('ready-to-show', function () {
		window.show();
		window.focus();
	});
	window.on('close', (event) => {
		if (window) {
			event.preventDefault();
			window.webContents.send('close-app');
		}
	});
	ipcMain.on('close-app', _ => {
		window = null;
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
});

Menu.setApplicationMenu(menu);