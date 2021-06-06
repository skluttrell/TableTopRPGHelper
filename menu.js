const { app, Menu, BrowserWindow, globalShortcut, dialog, ipcMain } = require('electron');
const AdmZip = require('adm-zip');

function loadFile(filename=null) {
			const window = BrowserWindow.getFocusedWindow();

	if (!filename) {
//		console.log('Presenting loading dialog...');
		const options = {
			title: 'Select a character',
			filters: [
				{ name: 'Character files', extensions: [ 'cha' ]}
			]
		};
		const files = dialog.showOpenDialogSync(window, options);
		if (files) {
			filename = files[0];
		}
	}
	if (filename) {
		window.send('load_character', filename);
	}
}

function saveFile(startDir='') {
	const window = BrowserWindow.getFocusedWindow();
	const zip = new AdmZip();

	const options = {
		title: 'Save new character as',
		defaultPath: startDir,
		filters: [
			{ name: 'Character files', extensions: [ 'cha' ]}
		]
	};
	const filename = dialog.showSaveDialogSync(window, options);

	if (filename) {
		characterFile = filename.split('\\').pop().split('.')[0] + '.dat';
		zip.addFile(characterFile, Buffer.alloc(0, '')); // Create an empty character file in the archive
		zip.addFile('log.txt', Buffer.alloc(0, '')); // Create the log file in the character archive
		zip.writeZip(filename); // Store the archive on disc
		return filename; // Send the new file name back to the save request
	}
	return;
}

app.on('ready', () => {
	globalShortcut.register('CommandOrControl+S', () => {
		// Send message to the renderer to request a frame id
		BrowserWindow.getFocusedWindow().send('who_am_i');
	});

	globalShortcut.register('CommandOrControl+O', () => {
		loadFile();
	});
});

ipcMain.on('load_character', (event, arg) => {
	loadFile(arg);
});

ipcMain.on('save_character', (event, arg) => {
	// Need to know the exact length of a string and special characters seem to cause it to be misreported
	function lengthUtf8(str) {
		// Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
		// https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
		let m = encodeURIComponent(str).match(/%[89ABab]/g);
		return str.length + (m ? m.length : 0);
	}
	const window = BrowserWindow.getFocusedWindow();

	if (typeof arg === 'object') { // Just save the information
		const zip = new AdmZip(arg.file);
		const tmp = new AdmZip();
		characterFile = arg.file.split('\\').pop().split('.')[0] + '.dat';
		// Known issue where updateFile can currupt the file in the archive
		// Adding content to Existing Archive corrupts data#378 opened on May 3 by tylertownsend
		//zip.updateFile(characterFile, Buffer.alloc(lengthUtf8(arg.info), arg.info));
		//zip.updateFile('log.txt', Buffer.alloc(lengthUtf8(arg.log), arg.log));
		zip.deleteFile(characterFile)
		zip.addFile(characterFile, Buffer.alloc(lengthUtf8(arg.info), arg.info));
		zip.deleteFile('log.txt');
		zip.addFile('log.txt', Buffer.alloc(lengthUtf8(arg.log), arg.log));
		zip.writeZip();
	} else { // This is a new character request
		const pattern = String(/^\*\[.+\]\*$/.exec(arg));
		if (pattern) {
			const filename = saveFile(`${__dir}\Templates\${pattern.substring(2, pattern.length - 2)}\Characters`); // Request a save location
			if (filename) { // Load the new character sheet
				window.send('load_character', { file: filename, ruleset: pattern.substring(2, pattern.length - 2) });
			}
		}
	}
});

ipcMain.on('save_request', (event, arg) => {
	BrowserWindow.getFocusedWindow().webContents.sendToFrame(arg, 'save_request');
});