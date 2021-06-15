class RecentFiles {
	constructor() {
		this.recentFilesList = [];
	}

	addFile(file, name='', ruleset='', closed=false) {
		// file: the path of a file to be added
		// name: the name of the character in the file
		// ruleset: the name of the game to which the character belongs
		// closed: true if the file has been closed by the user
		this.recentFilesList.splice(0, 0, { file: file, name: name, ruleset: ruleset, closed: closed });
		const { app } = require('electron');
		app.addRecentDocument(file); // also add to the OS recent files
	}

	getFile(i) {
		// Retrieve a record from the file list
		return this.recentFilesList[i];
	}

	updateFile(file='', name='', ruleset='', closed=false) {
		let i = this.isInList(file);
		if (this.recentFilesList[i]) {
			this.recentFilesList[i].file = file;
			this.recentFilesList[i].name = name;
			this.recentFilesList[i].ruleset = ruleset;
			this.recentFilesList[i].closed = closed;
		}
	}

	removeFile(i) {
		if (typeof i === 'string') { i = this.isInList(i); }
		if (this.recentFilesList[i]) { this.recentFilesList.splice(i, 1); }
	}

	cleanList() {
		// Remove closed files from the recent files list that are beyond the first 5 entries.
		if (this.recentFilesList.length > 5) {
			for (let i=5; i < this.recentFilesList.length; i++) {
				if (this.recentFilesList[i].closed) { removeFile(i); }
			}
		}
	}

	clearList() {
		// Remove all files from the list
		this.recentFilesList = [];
	}

	isInList(file) {
		// Checks to see if the file exists in the list and returns its index
		for (let i = 0; i < this.recentFilesList.length; i++) {
			if (this.recentFilesList[i].file === file) { return i; }
		}
		return;
	}

	moveToTop(file) {
		// Moves the file to the top of the list
		const i = this.isInList(file);
		if (i) {
			const file = this.recentFilesList[i];
			removeFile(i);
			this.recentFilesList.splice(0, 0, file);
			return true;
		}
		return false;
	}

	getList() {
		// Returns the contents of the list
		return this.recentFilesList;
	}

	loadRecentFiles(file) {
		// Imports the recent files
		const fs = require('fs');
		const content = JSON.parse(fs.readFileSync(file).toString());
		if (content.recents) {
			this.recentFilesList = [];
			for (let v of content.recents) {
				this.recentFilesList.push(v);
			}
		}
	}

	saveRecentFiles(file) {
		// Exports the recent files
		const fs = require('fs');
		const content = JSON.parse(fs.readFileSync(file).toString());
		if (this.recentFilesList.length) { 
content.recents = this.recentFilesList; 
}
		fs.writeFileSync(file, JSON.stringify(content));
	}
}

const recentFiles = new RecentFiles();

module.exports = recentFiles;