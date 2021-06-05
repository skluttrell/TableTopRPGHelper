const { webFrame } = require('electron');
const TabGroup = require('electron-tabs');
const tabGroup = new TabGroup();
const tabIndexToFrameId = [];

let homeTab = tabGroup.addTab({
	title: "Home",
	src: `file://${__dirname}/home.html`,
	visible: true,
	active: true,
	closable: false
});

module.exports = tabGroup;