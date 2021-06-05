const { app, BrowserWindow } = require('electron');
const menu = require('./menu');
let window;

app.on('ready', () => {
	window = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInSubFrames: true,
			webviewTag: true,
		}
	});
	window.maximize();
	window.loadURL(`file://${__dirname}/index.html`);
  window.on('ready-to-show', function () {
    window.show();
    window.focus();
  });
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
