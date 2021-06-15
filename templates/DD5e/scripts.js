const { ipcRenderer } = require("electron");
const showdown = require("showdown");
const converter = new showdown.Converter({ tables: true });
let filename;

ipcRenderer.on("save_request", (event, arg) => {
	let text = "";
	for (i in log) {
		text += log[i];
		//		console.log(log[i]);
		if (i < log.length - 1) {
			text += "\n";
		}
	}
	//	console.log(text);
	ipcRenderer.send("save_character", {
		file: filename,
		info: JSON.stringify(info),
		log: text,
	});
});

let info = {
	version: "1.0.0",
	game_info: {
		ruleset: "DD5e",
		session: 0,
		next_game_date: "",
	},
	class_level: {
		artificer: [false, 1, ""],
		barbarian: [false, 1, ""],
		bard: [false, 1, ""],
		cleric: [false, 1, ""],
		druid: [false, 1, ""],
		fighter: [false, 1, ""],
		monk: [false, 1, ""],
		paladin: [false, 1, ""],
		ranger: [false, 1, ""],
		rogue: [false, 1, ""],
		sorcerer: [false, 1, ""],
		warlock: [false, 1, ""],
		wizard: [false, 1, ""],
	},
	basic: {
		name: "",
		race: "",
		background: "",
		age: 0,
		build: "",
		alignment: "",
		deity: "",
		languages: "",
		traits: [],
		ideals: [],
		bonds: [],
		flaws: [],
		description: "",
	},
	combat_stats: {
		hit_points: [0, 0, ""],
		hit_dice: ["d4", 1],
		speed: [0, 0, ""],
		armor: [10, 0, ""],
		spellcasting_ability_modifier: "intelligence",
		spell_components: "",
	},
	ability_stats: {
		strength: [0, 0, false],
		dexterity: [0, 0, false],
		constitution: [0, 0, false],
		intelligence: [0, 0, false],
		wisdom: [0, 0, false],
		charisma: [0, 0, false],
	},
	proficiencies: {
		athletics: ["strength", false],
		intimidation: ["charisma", false],
		medicine: ["wisdom", false],
		perception: ["wisdom", false],
		acrobatics: ["dexterity", false],
		animal_handling: ["wisdom", false],
		arcana: ["intelligence", false],
		deception: ["charisma", false],
		history: ["intelligence", false],
		insight: ["wisdom", false],
		investigation: ["intelligence", false],
		nature: ["intelligence", false],
		performance: ["charisma", false],
		persuasion: ["charisma", false],
		religion: ["intelligence", false],
		sleight_of_hand: ["dexterity", false],
		stealth: ["dexterity", false],
		survival: ["wisdom", false],
		other: "",
	},
	discreet_schemas: [
		{ name: "spellcaster",
			description: "Spell slots by spell level",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				["2", "0", "0", "0", "0", "0", "0", "0", "0"],
				["3", "0", "0", "0", "0", "0", "0", "0", "0"],
				["4", "2", "0", "0", "0", "0", "0", "0", "0"],
				["4", "3", "0", "0", "0", "0", "0", "0", "0"],
				["4", "3", "2", "0", "0", "0", "0", "0", "0"],
				["4", "3", "3", "0", "0", "0", "0", "0", "0"],
				["4", "3", "3", "1", "0", "0", "0", "0", "0"],
				["4", "3", "3", "2", "0", "0", "0", "0", "0"],
				["4", "3", "3", "3", "1", "0", "0", "0", "0"],
				["4", "3", "3", "3", "2", "0", "0", "0", "0"],
				["4", "3", "3", "3", "2", "1", "0", "0", "0"],
				["4", "3", "3", "3", "2", "1", "0", "0", "0"],
				["4", "3", "3", "3", "2", "1", "1", "0", "0"],
				["4", "3", "3", "3", "2", "1", "1", "0", "0"],
				["4", "3", "3", "3", "2", "1", "1", "1", "0"],
				["4", "3", "3", "3", "2", "1", "1", "1", "0"],
				["4", "3", "3", "3", "2", "1", "1", "1", "1"],
				["4", "3", "3", "3", "3", "1", "1", "1", "1"],
				["4", "3", "3", "3", "3", "2", "1", "1", "1"],
				["4", "3", "3", "3", "3", "2", "2", "1", "1"]
			],
			classes: [
				"bard",
				"cleric",
				"druid",
				"sorcerer",
				"wizard"
			] },
		{ name: "secondary caster",
			description: "Spell slots by spell level",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				["0", "0", "0", "0", "0"],
				["2", "0", "0", "0", "0"],
				["3", "0", "0", "0", "0"],
				["3", "0", "0", "0", "0"],
				["4", "2", "0", "0", "0"],
				["4", "2", "0", "0", "0"]
				,["4", "3", "0", "0", "0"],
				["4", "3", "0", "0", "0"],
				["4", "3", "2", "0", "0"],
				["4", "3", "2", "0", "0"],
				["4", "3", "3", "0", "0"],
				["4", "3", "3", "0", "0"],
				["4", "3", "3", "1", "0"],
				["4", "3", "3", "1", "0"],
				["4", "3", "3", "2", "0"],
				["4", "3", "3", "2", "0"],
				["4", "3", "3", "3", "1"],
				["4", "3", "3", "3", "1"],
				["4", "3", "3", "3", "2"],
				["4", "3", "3", "3", "2"]
			],
			classes: [
				"paladin",
				"ranger"
			] },
		{ name: "minor caster",
			description: "Spell slots by spell level",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				["2", "0", "0", "0"],
				["3", "0", "0", "0"],
				["3", "0", "0", "0"],
				["3", "0", "0", "0"],
				["4", "2", "0", "0"],
				["4", "2", "0", "0"],
				["4", "2", "0", "0"],
				["4", "3", "0", "0"],
				["4", "3", "0", "0"],
				["4", "3", "0", "0"],
				["4", "3", "2", "0"],
				["4", "3", "2", "0"],
				["4", "3", "2", "0"],
				["4", "3", "3", "0"],
				["4", "3", "3", "0"],
				["4", "3", "3", "0"],
				["4", "3", "3", "1"],
				["4", "3", "3", "1"]
			],
			classes: [
				"fighter",
				"rogue"
			] },
		{ name: "rages",
			description: "Barbarian rages per rest period",
			active: false,
			display_in_section: "combat",
			list_by_level: [
				"2",
				"2",
				"3",
				"3",
				"3",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"6",
				"6",
				"6",
				"unlimited"
			],
			classes: [
				"barbarian"
			] },
			{ name: "rage damage",
			description: "Extra damage wile inraged",
			active: false,
			display_in_section: "combat",
			list_by_level: [
				"+2",
				"+2",
				"+2",
				"+2",
				"+2",
				"+2",
				"+2",
				"+2",
				"+3",
				"+3",
				"+3",
				"+3",
				"+3",
				"+3",
				"+3",
				"+4",
				"+4",
				"+4",
				"+4",
				"+5"
			],
			classes: [
				"barbarian"
			] },
		{ name: "martial arts",
			description: "Damage for unarmed or monk weapons",
			active: false,
			display_in_section: "combat",
			list_by_level: [
				"1d4",
				"1d4",
				"1d4",
				"1d4",
				"1d6",
				"1d6",
				"1d6",
				"1d6",
				"1d6",
				"1d6",
				"1d8",
				"1d8",
				"1d8",
				"1d8",
				"1d8",
				"1d8",
				"1d10",
				"1d10",
				"1d10",
				"1d10"
			],
			classes: [
				"monk"
			] },
		{ name: "points",
			description: "Points to spend on class features",
			active: false,
			display_in_section: "combat",
			list_by_level: [
				"0",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
				"16",
				"17",
				"18",
				"19",
				"20"
			],
			classes: [
				"monk",
				"sorcerer"
			] },
		{ name: "unarmored movement",
			description: "Extra speed while unarmored",
			active: false,
			display_in_section: "combat",
			list_by_level: [
				"+10 ft.",
				"+10 ft.",
				"+10 ft.",
				"+10 ft.",
				"+10 ft.",
				"+15 ft.",
				"+15 ft.",
				"+15 ft.",
				"+15 ft.",
				"+20 ft.",
				"+20 ft.",
				"+20 ft.",
				"+20 ft.",
				"+25 ft.",
				"+25 ft.",
				"+25 ft.",
				"+25 ft.",
				"+30 ft.",
				"+30 ft.",
				"+30 ft."
			],
			classes: [
				"monk"
			] },
		{ name: "sneak attack",
			description: "Extra damage for sneaking around your opponent",
			active: false,
			display_in_section: "combat",
			list_by_level: [
				"1d6",
				"1d6",
				"2d6",
				"2d6",
				"3d6",
				"3d6",
				"4d6",
				"4d6",
				"5d6",
				"5d6",
				"6d6",
				"6d6",
				"7d6",
				"7d6",
				"8d6",
				"8d6",
				"9d6",
				"9d6",
				"10d6",
				"10d6"
			],
			classes: [
				"rogue"
			] },
		{ name: "spell slots",
			description: "Spell slots available",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"1",
				"2",
				"2",
				"2",
				"2",
				"2",
				"2",
				"2",
				"2",
				"2",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"4",
				"4",
				"4",
				"4"
			],
			classes: [
				"warlock"
			] },
		{ name: "slot level",
			description: "Maximum spell level",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"1st",
				"1st",
				"2nd",
				"2nd",
				"3rd",
				"3rd",
				"4th",
				"4th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th",
				"5th"
			],
			classes: [
				"warlock"
			] },
		{ name: "invocations known",
			description: "Number of invocations",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"0",
				"2",
				"2",
				"2",
				"3",
				"3",
				"4",
				"4",
				"5",
				"5",
				"5",
				"6",
				"6",
				"6",
				"7",
				"7",
				"7",
				"8",
				"8",
				"8"
			],
			classes: [
			"warlock"
		] },
		{ name: "cantrips known",
			description: "Number of cantrips",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"2",
				"2",
				"2",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4"
			],
			classes: [
				"bard",
				"druid"
			] },
		{ name: "cantrips known",
			description: "Number of cantrips",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"3",
				"3",
				"3",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5"
			],
			classes: [
				"cleric",
				"warlock",
				"wizard"
			] },
		{ name: "cantrips known",
			description: "Number of cantrips",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"4",
				"4",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"6",
				"6",
				"6",
				"6",
				"6",
				"6",
				"6",
				"6",
				"6",
				"6",
				"6"
			],
			classes: [
				"sorcerer"
			] },
		{ name: "cantrips known",
			description: "Number of cantrips",
			active: false,
			display_in_section: "spells",
			list_by_level: [
			"0",
				"0",
				"2",
				"2",
				"2",
				"2",
				"2",
				"2",
				"2",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3"
			],
			classes: [
				"fighter"
			] },
		{ name: "cantrips known",
			description: "Number of cantrips",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"0",
				"0",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"3",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4",
				"4"
			],
			classes: [
				"rogue"
			] },
		{ name: "spells known",
			description: "Number of spells",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"0",
				"2",
				"3",
				"3",
				"4",
				"4",
				"5",
				"5",
				"6",
				"6",
				"7",
				"7",
				"8",
				"8",
				"9",
				"9",
				"10",
				"10",
				"11",
				"11"
			],
			classes: [
				"ranger"
			] },
		{ name: "spells known",
			description: "Number of spells",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"12",
				"13",
				"13",
				"14",
				"14",
				"15",
				"15",
				"15",
				"15"
			],
			classes: [
				"sorcerer"
			] },
		{ name: "spells known",
			description: "Number of spells",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"10",
				"11",
				"11",
				"12",
				"12",
				"13",
				"13",
				"14",
				"14",
				"15",
				"15"
			],
			classes: [
				"warlock"
			] },
		{ name: "spells known", 
			description: "Number of spells",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"14",
				"15",
				"15",
				"16",
				"18",
				"19",
				"19",
				"20",
				"22",
				"22",
				"22"
			],
			classes: [
				"bard"
			] },
		{ name: "spells known",
			description: "Number of spells",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"0",
				"0",
				"3",
				"4",
				"4",
				"4",
				"5",
				"6",
				"6",
				"7",
				"8",
				"8",
				"9",
				"10",
				"10",
				"11",
				"11",
				"11",
				"12",
				"13"
			],
			classes: [
				"rogue"
			] },
		{ name: "spells known",
			description: "Number of spells",
			active: false,
			display_in_section: "spells",
			list_by_level: [
				"0",
				"0",
				"3",
				"4",
				"4",
				"4",
				"5",
				"5 + 1",
				"5 + 1",
				"6 + 1",
				"7 + 1",
				"7 + 1",
				"8 + 1",
				"8 + 2",
				"8 + 2",
				"9 + 2",
				"9 + 2",
				"9 + 2",
				"10 + 2",
				"10 + 3"
			],
			classes: [
				"fighter"
			] }
	],
	features: [],
	inventory: [],
	spells: [],
	gold: "",
};
log = [];

// ability_stats: name (key), score (integer, index 0), alter_by (integer, index 1), and save (boolean, index 2)
// armor: base unarmored (int), adjustment (int), notes (string)
// inventory: name (string), description (string), active (boolean), cost (string), armor_class (integer), add_dex_mod (boolean), max_dex_bonus (integer), stealth_disadv (boolean), weight (integer), damage (string), style (string), range (list, integers), properties (string), proficient (boolean), and quantity (integer)
// feature: name (string), description (string), quantity (list of integers), and replenish (string)
// spell: name (string), type (string), level (string), school (string), ritual_tag (boolean), casting_time (string), range (string), verbal (boolean), somatic (boolean), materials (string), duration (string), description (string), quantity (integer), and active (boolean)

function checkVersion(newObj, oldObj) {
	function merge(newObj, oldObj) {
		for (key in newObj)
			if (key !== "version") {
				if (typeof newObj[key] === "object") {
					// If this is a list rathere than a dictionary style object then check for nonexisting values and add them if they don't exist
					// This is because some list iterators and their values would not pass the condition and be copied
					if (Array.isArray(newObj[key])) {
						if (
							oldObj.hasOwnProperty(key) &&
							JSON.stringify(newObj[key]) !== JSON.stringify(oldObj[key])
						) {
							newObj[key] = oldObj[key];
						}
					} else {
						// This is a dictionary style object so just keep digging down using recursion
						if (!oldObj[key]) {
							oldObj[key] = {};
						}
						merge(newObj[key], oldObj[key]);
					}
				} else if (oldObj.hasOwnProperty(key) && newObj[key] !== oldObj[key]) {
					newObj[key] = oldObj[key];
				}
			}
	}

	// Check the version and if there is a newer version, display a message that warns the user
	if (newObj["version"] !== oldObj["version"]) {
		alert(
			"This is a newer version. Please check your character data to ensure that it transfered properly."
		);
	}
	merge(newObj, oldObj);
}

const AdmZip = require("adm-zip");
const query = window.location.search;
const search = new URLSearchParams(query);
filename = search.get("filename");

if (filename) {
	const zip = new AdmZip(filename);
	const path = require("path");
	let data = zip.readAsText(`${path.parse(filename).name}.dat`);
	if (data) {
		checkVersion(info, JSON.parse(data));
	}
	log = zip.readAsText("log.txt").split("\n");
}

// Global scope variables
let elements; // Placeholder variable for looping
let totalLevel; // The total level of the character: e.g. a 5th level fighter multiclassed with a 2nd level ranger is a 7th level character
const NUMBER_PER_PAGE = 20; // The number of records to display per page in the log section
let TOTAL_PAGES = Math.ceil(log.length / NUMBER_PER_PAGE); // The number of total pages in the log section
let PAGE = TOTAL_PAGES; // Start on the last page of notes

update([
	"character_level",
	"basic",
	"schema",
	"ability_stats",
	"combat_stats",
	"weapons",
	"features",
	"proficiencies",
	"spells",
	"inventory",
	"gold",
	"combat_schemas",
	"spells_schemas",
	"log"
]);

document
	.getElementById("class_level-arrow")
	.addEventListener("click", function () {
		// Local scope variables
		let arrow = document.getElementById("class_level-arrow");
		let display = document.getElementById("level_by_class");
		let checkBox, levelBox, subClassBox, classChangeForm, checked;

		if (arrow.innerHTML === "✏") {
			// Display the classes and levels
			arrow.innerHTML = "✍"; // To signify that this character attribute is being edited
			display.innerHTML = ""; // Clear the display
			classChangeForm = "";

			for (key in info.class_level) {
				checked = info.class_level[key][0] ? "checked" : "";
				checkBox = `<input id="class_level-${key}" type="checkbox" ${checked}>`;
				subClassBox = `<input id="subClass-${key}" type="text" value="${info.class_level[key][2]}">`;
				levelBox = `<input id="level-${key}" type="number" value="${info.class_level[key][1]}">`;
				classChangeForm += `<p>${checkBox} ${key}: select level ${levelBox}, Enter a subclass if applicable ${subClassBox}</p>`;
			}
			display.innerHTML = classChangeForm;
		} else {
			for (key in info.class_level) {
				info.class_level[key] = [
					document.getElementById(`class_level-${key}`).checked,
					parseInt(document.getElementById(`level-${key}`).value),
					document.getElementById(`subClass-${key}`).value,
				];
			}

			update([
				"character_level",
				"ability_stats",
				"combat_stats",
				"weapons",
				"proficiencies",
				"spells",
				"combat_schemas",
				"spells_schemas",
			]); // Initialize all the displayes that are effected by level
		}
	});

for (let elem of document.getElementsByName("basic")) {
	elem.addEventListener("click", function () {
		let name = event.target.id.split("-")[1];
		let arrow = document.getElementById(`basic-${name}-arrow`);
		let display = document.getElementById(`basic-${name}-display`);
		let box = document.getElementById(`basic-${name}-box`);

		if (arrow.innerHTML === "✏") {
			// Collect the information
			arrow.innerHTML = "✍"; // To signify that this character attribute is being edited
			box.value = typeof info.basic[name] !== "object" ? display.innerHTML : ""; // Place the current value in the edit box
			box.style.display = "inline"; // Unhide the edit box
			box.focus();
			box.select(); // And focus on it, selecting the contents
			display.style.display =
				typeof info.basic[name] !== "object" ? "none" : "initial"; // And hide the current attribute if it is not a list
		} else {
			// Save and display
			// Depending on the type of info, different things need to happen: objects need to push to a list and numbers need to be parsed to integers
			if (typeof info.basic[name] === "object" && box.value) {
				info.basic[name].push(box.value);
			} else if (typeof info.basic[name] === "number") {
				info.basic[name] = parseInt(box.value);
			} else {
				info.basic[name] = box.value;
			}
			update(["basic"]); // Update the character sheet
		}
	});
}

document.getElementById("schema-box").addEventListener("change", function () {
	let box = document.getElementById("schema-box");
	let button = document.getElementById("schema-button");
	let display = document.getElementById("schema-display");
	display.innerHTML = "";
	let form = document.getElementById("new_schema-form");

	if (box.value) {
		if (box.value === "new_schema") {
			display.style.display = "none";
			form.style.display = "initial";
			form.reset();
			button.disabled = true;
		} else {
			button.innerHTML = info.discreet_schemas[box.value].active
				? "Deactivate"
				: "activate";
			button.disabled = false;
			form.style.display = "none";
			display.innerHTML = formatSchema(
				info.discreet_schemas[box.value]
			).outerHTML;
			display.style.display = "initial";
		}
	} else {
		display.style.display = "none";
		form.style.display = "none";
		button.disabled = true;
	}
});

document.getElementById("schema-button").addEventListener("click", function () {
	let box = document.getElementById("schema-box");
	let button = document.getElementById("schema-button");

	button.innerHTML =
		button.innerHTML === "activate" ? "deactivate" : "Activate";
	info.discreet_schemas[box.value].active =
		!info.discreet_schemas[box.value].active;
	update([`${info.discreet_schemas[box.value].display_in_section}_schemas`]);
});

document.getElementById("schema-reset").addEventListener("click", function () {
	document.getElementById("schema-box").value = "";
	update(["schema"]);
});

document
	.getElementById("ability_stats-arrow")
	.addEventListener("click", function () {
		if (document.getElementById("ability_stats-arrow").innerHTML === "✏") {
			// Display the edit boxes
			document.getElementById("ability_stats-arrow").innerHTML = "✍";
			for (let key in info.ability_stats) {
				document.getElementById(`ability_stats-${key}-save-box`).style.display =
					"inline";
				document.getElementById(`ability_stats-${key}-box`).style.display =
					"inline";
				document.getElementById(`ability_stats-${key}-save-box`).checked =
					info.ability_stats[key][2];
				document.getElementById(`ability_stats-${key}-box`).value =
					document.getElementById(`ability_stats-${key}-display`).innerHTML;
				document.getElementById(`ability_stats-${key}-display`).style.display =
					"none";
				document.getElementById(
					`ability_stats-${key}-checkmark`
				).style.display = "none";
				document.getElementById(
					`ability_stats-adjust-${key}-box`
				).disabled = true;
			}
		} else {
			// Update the info
			for (let key in info.ability_stats) {
				info.ability_stats[key][0] = parseInt(
					document.getElementById(`ability_stats-${key}-box`).value
				);
				info.ability_stats[key][2] = document.getElementById(
					`ability_stats-${key}-save-box`
				).checked;
			}
			update(["ability_stats", "proficiencies", "combat_stats", "weapons"]);
		}
	});

document
	.getElementById("new_schema-button")
	.addEventListener("click", function () {
		if (document.getElementById("features-form").checkValidity()) {
		}
	});

for (let elem of document.getElementsByName("ability_stats-adjust")) {
	elem.addEventListener("change", function () {
		let name = event.target.id.split("-")[2];
		info.ability_stats[name][1] = parseInt(event.target.value);
		update(["ability_stats"]);
	});
}

for (let elem of document.getElementsByName("combat_stats")) {
	elem.addEventListener("click", function () {
		let name = event.target.id.split("-")[1];
		arrow = document.getElementById(`combat_stats-${name}-arrow`);
		adjust = document.getElementById(`combat_stats-${name}-adjust`);
		box = document.getElementById(`combat_stats-${name}-box`);
		display = document.getElementById(`combat_stats-${name}-display`);

		if (arrow.innerHTML === "✏") {
			arrow.innerHTML = "✍";
			adjust.disabled = true;
			box.value = display.innerHTML;
			box.style.display = "inline";
			box.focus();
			display.style.display = "none";
		} else {
			info.combat_stats[name][0] =
				box.type === "number" ? parseInt(box.value) : box.value;
			update(["combat_stats"]);
		}
	});
}

for (let elem of document.getElementsByName("combat_stats-adjust")) {
	elem.addEventListener("change", function () {
		let name = event.target.id.split("-")[1];
		document.getElementById("test").innerHTML += name + " ";
		info.combat_stats[name][1] = parseInt(
			document.getElementById(`combat_stats-${name}-adjust`).value
		);
		update(["combat_stats"]);
	});
}

for (let elem of document.getElementsByName("combat_stats-notes")) {
	elem.addEventListener("click", function () {
		let name = event.target.id.split("-")[1];

		if (
			document.getElementById(`combat_stats-${name}-notes-arrow`).innerHTML ===
			"✏"
		) {
			document.getElementById(`combat_stats-${name}-notes-arrow`).innerHTML =
				"✍";
			document.getElementById(`combat_stats-${name}-notes-box`).style.display =
				"inline";
			document.getElementById(`combat_stats-${name}-notes-box`).value =
				document.getElementById(`combat_stats-${name}-notes-display`).innerHTML;
			document.getElementById(
				`combat_stats-${name}-notes-display`
			).style.display = "none";
			document.getElementById(`combat_stats-${name}-notes-box`).focus();
			document.getElementById(`combat_stats-${name}-notes-box`).select();
		} else {
			info.combat_stats[name][2] = document.getElementById(
				`combat_stats-${name}-notes-box`
			).value;
			update(["combat_stats"]);
		}
	});
}

document
	.getElementById("features-button")
	.addEventListener("click", function () {
		if (document.getElementById("features-form").checkValidity()) {
			let button = document.getElementById("features-button");
			feature = { name: "", description: "", quantity: [0, 0], replenish: "" };
			feature.name = document.getElementById("features-name-box").value;
			feature.description = document.getElementById(
				"features-description-box"
			).value;
			feature.quantity = [
				parseInt(document.getElementById("features-quantity-box").value),
				parseInt(document.getElementById("features-quantity-box").value),
			];
			feature.replenish = document.getElementById(
				"features-replenish-box"
			).value;

			if (button.value) {
				info.features[button.value] = feature;
			} else {
				info.features.push(feature);
			}

			update(["features"]);
		}
	});

document
	.getElementById("proficiencies-arrow")
	.addEventListener("click", function () {
		let keys = Object.keys(info.proficiencies).sort();

		if (document.getElementById("proficiencies-arrow").innerHTML === "✏") {
			document.getElementById("proficiencies-arrow").innerHTML = "✍";
			let table = document.getElementById("proficiencies-table");
			emptyTable(table);
			let box, checked, row;

			for (key of keys)
				if (key !== "other") {
					checked = info.proficiencies[key][1] ? " checked" : "";
					box = `<input id="proficiencies-${key}" type="checkbox"${checked}>`;
					row = table.insertRow(-1);
					row.insertCell().innerHTML = box;
					row.insertCell().innerHTML = key.replace(/_/g, " ");
					row.insertCell().innerHTML = info.proficiencies[key][0];
					row.insertCell().innerHTML = "—";
				}
		} else {
			for (key of keys)
				if (key !== "other") {
					info.proficiencies[key][1] = document.getElementById(
						`proficiencies-${key}`
					).checked;
				}
			update(["proficiencies"]);
		}
	});

document
	.getElementById("other-proficiencies-arrow")
	.addEventListener("click", function () {
		if (
			document.getElementById("other-proficiencies-arrow").innerHTML === "✏"
		) {
			document.getElementById("other-proficiencies-arrow").innerHTML = "✍";
			document.getElementById("other-proficiencies-display").style.display =
				"none";
			document.getElementById("other-proficiencies-box").value =
				document.getElementById("other-proficiencies-display").innerHTML;
			document.getElementById("other-proficiencies-box").style.display =
				"inline";
			document.getElementById("other-proficiencies-box").focus();
			document.getElementById("other-proficiencies-box").select();
		} else {
			info.proficiencies.other = document.getElementById(
				"other-proficiencies-box"
			).value;
			update(["proficiencies"]);
		}
	});

document
	.getElementById("spells-ability-modifier-arrow")
	.addEventListener("click", function () {
		if (
			document.getElementById("spells-ability-modifier-arrow").innerHTML ===
			"✏"
		) {
			document.getElementById("spells-ability-modifier-arrow").innerHTML = "✍";
			document.getElementById("spells-ability-modifier-box").style.display =
				"inline";
			document.getElementById("spells-ability-modifier-box").focus();
			document.getElementById("spells-ability-modifier-box").select();
			document.getElementById("spells-ability-modifier-display").style.display =
				"none";
		} else {
			info.combat_stats.spellcasting_ability_modifier = document.getElementById(
				"spells-ability-modifier-box"
			).value;
			update(["spells"]);
		}
	});

document
	.getElementById("spells-components-arrow")
	.addEventListener("click", function () {
		if (document.getElementById("spells-components-arrow").innerHTML === "✏") {
			document.getElementById("spells-components-arrow").innerHTML = "✍";
			document.getElementById("spells-components-box").value =
				info.combat_stats.spell_components;
			document.getElementById("spells-components-display").style.display =
				"none";
			document.getElementById("spells-components-box").style.display = "inline";
			document.getElementById("spells-components-box").focus();
			document.getElementById("spells-components-box").select();
		} else {
			info.combat_stats.spell_components = document.getElementById(
				"spells-components-box"
			).value;
			update(["spells"]);
		}
	});

document.getElementById("spells-button").addEventListener("click", function () {
	if (document.getElementById("spells-form").checkValidity()) {
		let button = event.target;
		let box;
		let spell = {
			name: "",
			type: "",
			level: "",
			school: "",
			ritual_tag: false,
			casting_time: "",
			range: "",
			verbal: false,
			somatic: false,
			materials: "",
			duration: "",
			description: "",
		};

		for (let key in spell) {
			box = document.getElementById(`spells-${key}-box`);

			if (box.type === "number") {
				spell[key] = parseInt(box.value);
			} else if (box.type === "checkbox") {
				spell[key] = box.checked;
			} else {
				spell[key] = box.value;
			}
		}
		spell.active = false;
		spell.quantity = 1;

		if (button.value) {
			info.spells[button.value] = spell;
		} else {
			info.spells.push(spell);
		}

		update(["spells"]);
	}
});

document
	.getElementById("inventory-button")
	.addEventListener("click", function () {
		if (document.getElementById("inventory-form").checkValidity()) {
			let button = event.target;
			let box;
			let item = {
				name: "",
				type: "",
				sub_type: "",
				description: "",
				weight: 0,
				cost: "",
				quantity: 1,
				style_armor: "",
				armor_class: 0,
				add_dex_mod: false,
				max_dex_bonus: 0,
				stealth_disadv: false,
				active: false,
				style_weapon: "",
				proficient: false,
				damage: "",
				min: 0,
				max: 0,
				properties: "",
			};

			for (let key in item) {
				box = document.getElementById(`inventory-${key}-box`);

				if (box.type === "number") {
					item[key] = parseInt(box.value);
				} else if (box.type === "checkbox") {
					item[key] = box.checked;
				} else {
					item[key] = box.value;
				}
			}

			if (button.value) {
				info.inventory[button.value] = item;
			} else {
				info.inventory.push(item);
			}

			update(["combat_stats", "weapons", "inventory"]);
		}
	});

document
	.getElementById("inventory-add_dex_mod-box")
	.addEventListener("change", function () {
		document.getElementById("inventory-max_dex_bonus-box").disabled =
			!document.getElementById("inventory-add_dex_mod-box").checked
				? true
				: false;
	});

document.getElementById("gold-arrow").addEventListener("click", function () {
	if (document.getElementById("gold-arrow").innerHTML === "✏") {
		document.getElementById("gold-arrow").innerHTML = "✍";
		document.getElementById("gold-box").style.display = "inline";
		document.getElementById("gold-box").value =
			document.getElementById("gold-display").innerHTML;
		document.getElementById("gold-display").style.display = "none";
		document.getElementById("gold-box").focus();
		document.getElementById("gold-box").select();
	} else {
		info.gold = document.getElementById("gold-box").value;
		update(["gold"]);
	}
});

document.getElementById("log-button").addEventListener("click", function () {
	let d = new Date(); // Create a date and time object

	// Format the date and time object into a desired look
	let hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
	let timeOfDay = d.getHours() >= 12 ? "pm" : "am";
	let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
	let dateFormat = `${hours}:${minutes} ${timeOfDay} ${
		d.getMonth() + 1
	}/${d.getDate()}/${d.getFullYear()}`;

	log.push(`${dateFormat}: ${document.getElementById("log-box").value}`); // Create the log entry
	update(["log"]);
});

document.getElementById("log-clear").addEventListener("click", function () {
	if (
		confirm(
			"Are you absolutely sure you want to erase the log? This action cannot be undone!"
		)
	) {
		log.length = 0;
		TOTAL_PAGES = Math.ceil(log.length / NUMBER_PER_PAGE);
		PAGE = TOTAL_PAGES;
		update(["log"]);
	}
});

document.getElementById("log-export").addEventListener("click", function () {
	let text = "";
	for (i in log) {
		text += `${log[i]}\n`;
	}
	const { clipboard } = require("electron");
	clipboard.writeText(text);
});

function update(what = []) {
	let alpha, arrow, box, delta, display, item, row, table, text, uList;
	let dexMod = getModifier(
		info.ability_stats.dexterity[0] + info.ability_stats.dexterity[1]
	);
	let strMod = getModifier(
		info.ability_stats.strength[0] + info.ability_stats.strength[1]
	);
	let wisMod = getModifier(
		info.ability_stats.wisdom[0] + info.ability_stats.wisdom[1]
	);

	for (thing of what) {
		if (thing === "character_level") {
			display = document.getElementById("level_by_class");
			display.innerHTML = "";
			totalLevel = 0;

			for (let key in info.class_level) {
				if (info.class_level[key][0]) {
					// The first index (0) is a bool representing an active level
					totalLevel += info.class_level[key][1]; // Keep track of the absolute character level
					text = `${key}: ${info.class_level[key][1]}`;
					if (info.class_level[key][2]) {
						text += ` (${info.class_level[key][2]})`;
					}
					display.innerHTML += `<p>${text}</p>`; // Display each separate active class's level and class specialties
				}
			}

			// Make sure things are reset
			document.getElementById("class_level-arrow").innerHTML = "✏";
			document.getElementById("character-level-display").innerHTML = totalLevel;
		} else if (thing === "basic") {
			for (let key in info.basic) {
				display = document.getElementById(`basic-${key}-display`);
				display.innerHTML = ""; // Reset the display
				document.getElementById(`basic-${key}-arrow`).innerHTML = "✏"; // Reset the editing arrow
				document.getElementById(`basic-${key}-box`).style.display = "none"; // Reset the editing box

				if (typeof info.basic[key] === "object") {
					// This is a list
					uList = `<ul style="list-style: none;">`; // Create an unordered list without bullets

					for (let i = 0; i < info.basic[key].length; i++) {
						delta = `<button type="button" class="edit-button" onclick="info.basic[${key}].splice(${i}, 1); update([ 'basic' ]);">δ</button>`;
						item = `<li>${delta} ${info.basic[key][i]}</li>`;
						uList += item;
					}
					uList += `</ul>`;
					display.innerHTML = uList;
				} else {
					// Just a simple value
					text = String(info.basic[key]);
					if (key === "description") {
						converter.makeHtml(text);
					} // Description allows for markdown code
					display.innerHTML = text;
					display.style.display = "initial";
				}
			}
		} else if (thing === "schema") {
			box = document.getElementById("schema-box");
			let option;

			// Clear out the current options
			(box) => {
				let parentNode = box.parentNode;
				let newBox = box.cloneNode(false); // Make a shallow copy
				parentNode.replaceChild(newBox, box);
				return newBox;
			};

			// Create an initial 'select' option
			option = document.createElement("option");
			option.value = "";
			option.innerHTML = "Select a schema";
			box.add(option);

			// Fill out the select box with the options on file
			for (let i in info["discreet_schemas"]) {
				text = `${info.discreet_schemas[i].name}`;
				if (info.discreet_schemas[i]["classes"]) {
					text += " (" + info.discreet_schemas[i]["classes"] + ")";
				}
				option = document.createElement("option");
				option.innerHTML = text;
				option.value = i;
				box.add(option);
			}

			// Add the option to create a new schema
			option = document.createElement("option");
			option.innerHTML = "New schema";
			option.value = "new_schema";
			box.add(option);

			// Reset everything
			document.getElementById("schema-display").innerHTML = "";
			document.getElementById("new_schema-classes").innerHTML = "";
			box.value = "";
			document.getElementById("new_schema-form").reset();
			for (let key in info.class_level) {
				// Incase new classes are added
				box = `<label for="new_schema-class-${key}">${key}<input id="new_schema-class-${key}" name="new_schema-class" type="checkbox" value="${key}"></label>`;
				document.getElementById(
					"new_schema-classes"
				).innerHTML += `<p>${box}</p>`;
			}
			document.getElementById("new_schema-form").style.display = "none";
			document.getElementById("schema-button").disabled = true;
		} else if (thing === "ability_stats") {
			for (let key in info.ability_stats) {
				let mod = getModifier(
					info.ability_stats[key][0] + info.ability_stats[key][1]
				);
				document.getElementById(`ability_stats-${key}-display`).innerHTML =
					info.ability_stats[key][0] + info.ability_stats[key][1]; // The base score: index 0 is base, index 1 is adjustment
				document.getElementById(`ability_stats-${key}-display`).style.display =
					"inline";
				document.getElementById(
					`ability_stats-${key}-modifier-display`
				).innerHTML = mod; // Ability modifier
				document.getElementById(`ability_stats-${key}-save-box`).style.display =
					"none"; // Ensure the checkbox input is hidden
				if (info.ability_stats[key][2]) {
					// Index 2 indicates if the character is proficient in this save
					document.getElementById(
						`ability_stats-${key}-checkmark`
					).style.display = "inline";
					document.getElementById(
						`ability_stats-${key}-save-display`
					).innerHTML = mod + getProficiency();
				} else {
					document.getElementById(
						`ability_stats-${key}-checkmark`
					).style.display = "none";
					document.getElementById(
						`ability_stats-${key}-save-display`
					).innerHTML = mod;
				}
				document.getElementById(`ability_stats-${key}-box`).style.display =
					"none"; // Ensure the stat input box is hidden
				document.getElementById(
					`ability_stats-adjust-${key}-box`
				).disabled = false; // Adjusts the base stat incase of bonuses or debuffs
				document.getElementById(`ability_stats-adjust-${key}-box`).value =
					info.ability_stats[key][1];
			}

			// Reset the edit arrow
			document.getElementById("ability_stats-arrow").innerHTML = "✏";
		} else if (thing === "combat_stats") {
			let ac = 0;
			let stealth = "";
			text = "";

			// Display initiative bonus
			document.getElementById("combat_stats-initiative-display").innerHTML = dexMod;

			// Display hit points
			document.getElementById("combat_stats-hit_points-arrow").innerHTML = "✏";
			document.getElementById("combat_stats-hit_points-display").innerHTML =
				info.combat_stats.hit_points[0];
			document.getElementById("combat_stats-hit_points-adjust").value =
				info.combat_stats.hit_points[1];
			document.getElementById("combat_stats-hit_points-current").innerHTML =
				info.combat_stats.hit_points[0] + info.combat_stats.hit_points[1];
			document.getElementById("combat_stats-hit_points-adjust").disabled =
				false;
			document.getElementById("combat_stats-hit_points-box").style.display =
				"none";
			document.getElementById("combat_stats-hit_points-display").style.display =
				"inline";
			document.getElementById("combat_stats-hit_points-notes-arrow").innerHTML = "✏";
			document.getElementById("combat_stats-hit_points-notes-display").innerHTML =
				info.combat_stats.hit_points[2];
			document.getElementById("combat_stats-hit_points-notes-display").style.display =
				"inline";
			document.getElementById("combat_stats-hit_points-notes-box").style.display =
				"none";

			// Display hit dice
			document.getElementById("combat_stats-hit_dice-arrow").innerHTML = "✏";
			document.getElementById("combat_stats-hit_dice-adjust").disabled =
				false;
			document.getElementById("combat_stats-hit_dice-display").innerHTML =
				info.combat_stats.hit_dice[0];
			document.getElementById("combat_stats-hit_dice-adjust").value =
				info.combat_stats.hit_dice[1];
			document.getElementById("combat_stats-hit_dice-box").style.display =
				"none";
			document.getElementById("combat_stats-hit_dice-display").style.display =
				"inline";

			// Display armor
			for (let v of info.inventory)
				if (v.type === "armor" && v.active) {
					text = (text) ?
						`${text}, ${v.name}` :
						v.name;
					ac += v.armor_class;
					if (v.add_dex_mod) {
						if (v.max_dex_bonus > 0) {
							ac = (dexMod < v.max_dex_bonus) ?
								ac + dexMod :
								ac + v.max_dex_bonus;
						} else {
							ac += dexMod;
						}
					}
					if (v.stealth_disadv) {
						stealth = " (Stealth Disadvantage)";
					}
				}
			if (ac === 0) { // The character has no active armor
				ac = info.combat_stats.armor[0] + dexMod;
				text = text ?
					text + `Unarmored, ${text}` :
					"Unarmored";
			}
			ac += info.combat_stats.armor[1];
			text = `${ac} ${text}${stealth}`;
			document.getElementById("combat_stats-armor-adjust").value =
				info.combat_stats.armor[1];
			document.getElementById("combat_stats-armor_class-display").innerHTML =
				text;
			document.getElementById("combat_stats-armor-notes-arrow").innerHTML = "✏";
			document.getElementById("combat_stats-armor-notes-display").innerHTML =
				info.combat_stats.armor[2];
			document.getElementById("combat_stats-armor-notes-display").style.display =
				"inline";
			document.getElementById("combat_stats-armor-notes-box").style.display =
				"none";

			// Display speed
			document.getElementById("combat_stats-speed-arrow").innerHTML = "✏";
			document.getElementById("combat_stats-speed-display").innerHTML =
				info.combat_stats.speed[0];
			document.getElementById("combat_stats-speed-adjust").value =
				info.combat_stats.speed[1];
			document.getElementById("combat_stats-speed-current").innerHTML =
				info.combat_stats.speed[0] + info.combat_stats.speed[1];
			document.getElementById("combat_stats-speed-adjust").disabled =
				false;
			document.getElementById("combat_stats-speed-box").style.display =
				"none";
			document.getElementById("combat_stats-speed-display").style.display =
				"inline";
			document.getElementById("combat_stats-speed-notes-arrow").innerHTML = "✏";
			document.getElementById("combat_stats-speed-notes-display").innerHTML =
				info.combat_stats.speed[2];
			document.getElementById("combat_stats-speed-notes-display").style.display =
				"inline";
			document.getElementById("combat_stats-speed-notes-box").style.display =
				"none";

			// Display passive perception
			document.getElementById("combat_stats-passive_perception-display").innerHTML = info.proficiencies.perception[1] ?
				10 + wisMod + getProficiency() :
				10 + wisMod;
		} else if (thing === "weapons") {
			let hitMod = 0;
			let range = "";
			table = "Weapon|Hit Mod|Damage|Range|Properties\n---|---\n";

			for (i in info.inventory)
				if (info.inventory[i].type === "weapon") {
					hitMod = info.inventory[i].sub_type === "melee" ? strMod : dexMod; // Calculate hit modifier based on if it is ranged or melee
					if (info.inventory[i].proficient) {
						hitMod += getProficiency();
					}
					range = info.inventory[i].min || info.inventory[i].max ?
						`(${info.inventory[i].min}/${info.inventory[i].max})` :
						"n/a"; // Apply a range if applicable
					table += `${info.inventory[i].name}|${hitMod}|${info.inventory[i].damage}|${range}|${info.inventory[i].properties}\n`; // Fill out the information
				}

			document.getElementById("weapons-table").innerHTML =
				converter.makeHtml(table); // Display the weapons table
	} else if (thing === "features") {
			text = "";

			for (let i in info.features) {
				arrow = document.createElement("button");
				arrow.setAttribute("class", "edit-button");
				arrow.value = i;
				arrow.innerHTML = "✏";
				arrow.setAttribute(
					"onclick",
					`
					event.target.innerHTML = '✍';
					for (let key in info.features[event.target.value]) if (key !== 'quantity') {
					if (typeof info.features[event.target.value][key] === 'boolean') { document.getElementById(\`features-\${key}-box\`).checked = info.features[event.target.value][key]; }
					else { document.getElementById(\`features-\${key}-box\`).value = info.features[event.target.value][key]; }
					} document.getElementById('features-quantity-box').value = info.features[event.target.value].quantity[0];
					document.getElementById('features-button').value = event.target.value;
					document.getElementById('features-name-box').focus();
					document.getElementById('features-name-box').select();
				`
				);

				delta = document.createElement("button");
				delta.setAttribute("class", "edit-button");
				delta.value = i;
				delta.innerHTML = "δ";
				delta.setAttribute(
					"onclick",
					`info.features.splice(event.target.value, 1);update([ 'features' ]);`
				);

				text += `<h2>${arrow.outerHTML} ${delta.outerHTML} ${info.features[i].name}</h2>`;
				if (info.features[i].quantity[0]) {
					text += `Total of ${info.features[i].quantity[0]} before a ${info.features[i].replenish} rest. `;
					text += `<label for="features-${i}">Uses remaining:
						<input id="features-${i}" type="number" min="0" value="${info.features[i].quantity[1]}" onchange="info.features[event.target.id.split('-')[1]].quantity[1] = parseInt(event.target.value);update();"></label>`;
				}
				text += `${converter.makeHtml(info.features[i].description)}<br>`;
			}

			document.getElementById("features-display").innerHTML = text;
			document.getElementById("features-button").value = "";
			document.getElementById("features-form").reset();
		} else if (thing === "proficiencies") {
			table = document.getElementById("proficiencies-table");
			let list1 = [];
			let list2 = [];
			emptyTable(table);

			// Separate the proficiencies into two lists. The first is the skills for which you are proficient, the second are skills for which you only get your ability modifier.
			for (let key in info.proficiencies)
				if (key !== "other") {
					if (info.proficiencies[key][1]) {
						list1.push(key);
					} else {
						list2.push(key);
					}
				}
			// Sort the proficiencies alphabetically
			list1.sort();
			list2.sort();

			// The first list, skills for which you are proficient, go at the top of the table
			for (let v of list1) {
				row = table.insertRow(-1);
				row.insertCell().innerHTML = "✓";
				row.insertCell().innerHTML = v.replace(/_/g, " ");
				row.insertCell().innerHTML = info.proficiencies[v][0];
				row.insertCell().innerHTML =
					getModifier(
						info.ability_stats[info.proficiencies[v][0]][0] +
							info.ability_stats[info.proficiencies[v][0]][1]
					) + getProficiency();
			}

			// Insert all other proficiencies
			for (let v of list2) {
				row = table.insertRow(-1);
				row.insertCell().innerHTML = "";
				row.insertCell().innerHTML = v.replace(/_/g, " ");
				row.insertCell().innerHTML = info.proficiencies[v][0];
				row.insertCell().innerHTML = getModifier(
					info.ability_stats[info.proficiencies[v][0]][0] +
						info.ability_stats[info.proficiencies[v][0]][1]
				);
			}

			document.getElementById("proficiencies-arrow").innerHTML = '✏';
			document.getElementById("other-proficiencies-arrow").innerHTML = '✏';
			document.getElementById("other-proficiencies-display").style.display =
				"inline";
			document.getElementById("other-proficiencies-display").innerHTML =
				info.proficiencies.other;
			document.getElementById("other-proficiencies-box").style.display = 'none';
		} else if (thing === "spells") {
			let active = {
				cantrip: [],
				"1st": [],
				"2nd": [],
				"3rd": [],
				"4th": [],
				"5th": [],
				"6th": [],
				"7th": [],
				"8th": [],
				"9th": [],
			};
			document.getElementById("spells-known-display").innerHTML = "";
			document.getElementById("spells-known").style.display = "none";
			document.getElementById("invocations-display").innerHTML = "";
			document.getElementById("invocations").style.display = "none";
			document.getElementById("spells-active-display").innerHTML = "";
			document.getElementById("spells-active").style.display = "none";

			for (let i in info.spells) {
				// Create a button to edit the spell
				arrow = document.createElement("button");
				arrow.setAttribute("class", "edit-button");
				arrow.value = i;
				arrow.innerHTML = "✏";
				arrow.setAttribute(
					"onclick",
					`
					event.target.innerHTML = '✍';
					for (let key in info.spells[event.target.value]) if (key !== 'quantity' && key !== 'active') {
					if (typeof info.spells[event.target.value][key] === 'boolean') { document.getElementById(\`spells-\${key}-box\`).checked = info.spells[event.target.value][key]; }
					else { document.getElementById(\`spells-\${key}-box\`).value = info.spells[event.target.value][key]; }
					} document.getElementById('spells-button').value = event.target.value;
					document.getElementById('spells-name-box').focus();
					document.getElementById('spells-name-box').select();
				`
				);

				// Create a button to activate the spell
				alpha = document.createElement("button");
				alpha.setAttribute("class", "edit-button");
				alpha.value = i;
				alpha.innerHTML = "α";
				alpha.setAttribute(
					"onclick",
					`info.spells[event.target.value].active = true;update([ 'spells' ]);`
				);

				// Create a button to delete the spell
				delta = document.createElement("button");
				delta.setAttribute("class", "edit-button");
				delta.value = i;
				delta.innerHTML = "δ";
				delta.setAttribute(
					"onclick",
					`info.spells.splice(event.target.value, 1);update([ 'spells' ]);`
				);

				box = `<label for="spells-${i}-quantity"> × <input id="spells-${i}-quantity" type="number" min="0" value="${info.spells[i].quantity}"
					onchange="info.spells[event.target.id.split('-')[1]].quantity = parseInt(event.target.value);update();"></label>`;

				if (info.spells[i].type === "spell") {
					// Construct the active spells list
					if (info.spells[i].active) {
						item = `<li>${info.spells[i].name}${box}</li>`;
						active[info.spells[i].level].push(item);
					}

					// Add the spell to the spells list
					text = `<h3 style="text-transform: capitalize;">${arrow.outerHTML} ${delta.outerHTML} ${alpha.outerHTML} ${info.spells[i].name}</h3>`;
					text += `<ul style="list-style-type: none;"><li>`;
					if (info.spells[i].level === "cantrip") {
						text += `${info.spells[i].school} cantrip`;
					} else {
						text += `${info.spells[i].level}-level ${info.spells[i].school}`;
					}
					if (info.spells[i].ritual_tag) {
						text += " (ritual)";
					}
					text += "</li>";
					text += `<li>Casting Time: ${info.spells[i].casting_time}</li>`;
					text += `<li>Range: ${info.spells[i].range}</li>`;
					text += "<li>Components: ";
					if (info.spells[i].verbal) {
						text += "V";
						if (info.spells[i].somatic || info.spells[i].materials) {
							text += ", ";
						}
					}
					if (info.spells[i].somatic) {
						text += "S";
						if (info.spells[i].materials) {
							text += ", ";
						}
					}
					if (info.spells[i].materials) {
						text += `M (${info.spells[i].materials})`;
					}
					text += "</li>";
					text += `<li>Duration: ${info.spells[i].duration}</li>`;
					text += `</ul>${converter.makeHtml(info.spells[i].description)}<br>`;
					document.getElementById("spells-known-display").innerHTML += text;
				} else if (info.spells[i].type === "invocation") {
					display = document.getElementById("invocations-display");
					display.innerHTML += `<h3 style="text-transform: capitalize;">${arrow.outerHTML} ${delta.outerHTML} ${info.spells[i].name}</h3>`;
					display.innerHTML += `${converter.makeHtml(
						info.spells[i].description
					)}<br>`;
				}
			}

			if (document.getElementById("spells-known-display").innerHTML) {
				document.getElementById("spells-known").style.display = "block";
			}
			if (document.getElementById("invocations-display").innerHTML) {
				document.getElementById("invocations").style.display = "block";
			}

			// Display the active spells by level
			display = document.getElementById("spells-active-display");
			for (let key in active) {
				if (active[key].length) {
					display.innerHTML += "<h3>";
					if (key === "cantrip") {
						display.innerHTML += "Cantrips (0-level)</h3><br><ul>";
					} else {
						display.innerHTML += `${key}-level</h3><br><ul>`;
					}
					for (let spell in active[key]) {
						display.innerHTML += active[key];
					}
					display.innerHTML += "</ul><br>";
				}
			}
			if (display.innerHTML) {
				document.getElementById("spells-active").style.display = "block";
			}

			// Set the spell ability information
			let mod = info.combat_stats.spellcasting_ability_modifier;
			document.getElementById("spells-ability-modifier-arrow").innerHTML = "✏";
			document.getElementById("spells-ability-modifier-box").style.display =
				"none";
			document.getElementById("spells-ability-modifier-box").value = mod;
			document.getElementById("spells-ability-modifier-display").innerHTML =
				mod;
			document.getElementById("spells-ability-modifier-display").style.display =
				"inline";
			document.getElementById("spells-save-dc-display").innerHTML =
				8 +
				parseInt(getProficiency()) +
				getModifier(info.ability_stats[mod][0]);
			document.getElementById("spells-attack-modifier-display").innerHTML =
				parseInt(getProficiency()) + getModifier(info.ability_stats[mod][0]);
			document.getElementById("spells-components-arrow").innerHTML = "✏";
			document.getElementById("spells-components-box").style.display = "none";
			document.getElementById("spells-components-display").innerHTML =
				info.combat_stats.spell_components;
			document.getElementById("spells-components-display").style.display =
				"inline";

			// Reset the form
			document.getElementById("spells-button").value = "";
			document.getElementById("spells-form").reset();
		} else if (thing === "inventory") {
			table = document.getElementById("inventory-table");
			emptyTable(table);
			let items = { armor: [], weapon: [], other: [] };
			let totalWeight = 0;

			for (let i in info.inventory) {
				totalWeight += info.inventory[i].weight * info.inventory[i].quantity; // Multiplies the weight of the item by the number held and adds it to the total
				items[info.inventory[i].type].push(i);
			}

			// Populate the inventory table.
			for (let key in items) {
				row = table.insertRow(-1);
				row.insertCell().innerHTML = key;
				uList = document.createElement("ul");
				uList.style.listStyle = "none";
				for (let i of items[key]) {
					arrow = document.createElement("button"); // Edit item
					arrow.setAttribute("class", "edit-button");
					arrow.innerHTML = "✏";
					arrow.value = i;
					arrow.setAttribute(
						"onclick",
						`
						event.target.innerHTML = '✍';
						for (let key in info.inventory[event.target.value]) {
						if (typeof info.inventory[event.target.value][key] === 'boolean') { document.getElementById(\`inventory-\${key}-box\`).checked = info.inventory[event.target.value][key]; }
						else { document.getElementById(\`inventory-\${key}-box\`).value = info.inventory[event.target.value][key]; }
						}
						document.getElementById('inventory-button').value = event.target.value;
						document.getElementById('inventory-name-box').focus();
						document.getElementById('inventory-name-box').select();
					`
					);

					alpha = document.createElement("button"); // Equip item
					alpha.setAttribute("class", "edit-button");
					alpha.innerHTML = "α";
					alpha.value = i;
					alpha.setAttribute(
						"onclick",
						`info.inventory[event.target.value].active = (info.inventory[event.target.value].active) ? false : true;update([ 'combat_stats', 'inventory' ]);`
					);

					delta = document.createElement("button"); // Remove from inventory
					delta.setAttribute("class", "edit-button");
					delta.innerHTML = "δ";
					delta.value = i;
					delta.setAttribute(
						"onclick",
						`info.inventory.splice(event.target.value, 1);update([ 'combat_stats', 'inventory' ]);`
					);

					box = `<label for="${key}-${i}"> ×
						<input id="${key}-${i}" type="number" min="1" value="${info.inventory[i].quantity}" onchange="info.inventory[event.target.id.split('-')[1]].quantity = parseInt(event.target.value);update();"></label>`;

					item = document.createElement("li");
					if (info.inventory[i].active) {
						item.innerHTML += "✓ ";
					}
					item.innerHTML += `${arrow.outerHTML} `;
					if (key === "armor") {
						item.innerHTML += `${alpha.outerHTML} `;
					}
					item.innerHTML += `${delta.outerHTML} ${info.inventory[i].name} ${box}`;
					uList.appendChild(item);
				}
				row.insertCell().innerHTML = uList.outerHTML;
			}

			// Display the total weight of the inventory
			document.getElementById("inventory-weight-display").innerHTML =
				totalWeight;

			// Clear the inventory form
			document.getElementById("inventory-button").value = "";
			document.getElementById("inventory-form").reset();
		} else if (thing === "gold") {
			document.getElementById("gold-arrow").innerHTML = "✏";
			document.getElementById("gold-display").innerHTML = info.gold;
			document.getElementById("gold-display").style.display = "inline";
			document.getElementById("gold-box").style.display = "none";
		} else if (thing === "combat_schemas") {
			let level = 1;
			display = document.getElementById("combat-schemas-display");
			display.innerHTML = "";

			for (let i in info.discreet_schemas)
				if (
					info.discreet_schemas[i].active &&
					info.discreet_schemas[i].display_in_section === "combat"
				) {
					// Figure out which class level to use
					for (let c of info.discreet_schemas[i].classes) {
						if (info.class_level[c][0]) {
							if (info.class_level[c][1] > level) {
								level = info.class_level[c][1];
							}
						}
					}

					display.innerHTML += `${
						formatSchema(info.discreet_schemas[i], [level, level]).outerHTML
					}<br>`;
				}
		} else if (thing === "spells_schemas") {
			let level = 1;
			display = document.getElementById("spell-schemas-display");
			display.innerHTML = "";

			for (let i in info.discreet_schemas)
				if (
					info.discreet_schemas[i].active &&
					info.discreet_schemas[i].display_in_section === "spells"
				) {
					// Figure out which class level to use
					for (let c of info.discreet_schemas[i].classes) {
						if (info.class_level[c][0]) {
							if (info.class_level[c][1] > level) {
								level = info.class_level[c][1];
							}
						}
					}

					display.innerHTML += `${
						formatSchema(info.discreet_schemas[i], [level, level]).outerHTML
					}<br>`;
				}
		} else if (thing === "log") {
			let end, nav, next, pNum, prev, start;
			document.getElementById("#log-nav").innerHTML = "";
			display = document.getElementById("log-display");
			display.innerHTML = "";

			if (PAGE) {
				// End early if the end of the log entries has been reached before the end of the current page
				for (
					let i = (PAGE - 1) * NUMBER_PER_PAGE;
					i <= PAGE * NUMBER_PER_PAGE - 1;
					i++
				)
					if (i in log) {
						display.innerHTML += converter.makeHtml(log[i]);
					}
				display.innerHTML += "<br>";

				// Create a navigation element to hold the log navigation links
				nav = document.createElement("nav");

				// Create the navigation button to go to the previous set of log entries
				prev = `<a href="#log-nav" onclick="PAGE--;update([ 'log' ]);">✍prev</a>`;
				if (PAGE > 1) {
					nav.innerHTML += prev;
				}

				// Create the page number navigation buttons
				start = PAGE <= 10 ? 1 : PAGE - 9;
				end =
					PAGE > TOTAL_PAGES - 10 && start + 9 <= TOTAL_PAGES ?
						start + 9 :
						TOTAL_PAGES;

				for (let i = start; i <= end; i++) {
					if (i !== PAGE) {
						pNum = `<a href="#log-nav" onclick="PAGE = parseInt(event.target.innerHTML);update([ 'log' ]);">${i}</a>`;
						nav.innerHTML += pNum;
					} else if (TOTAL_PAGES > 1) {
						nav.innerHTML += `[${i}]`; // The current page is displayed as plain text
					}
				}

				next = `<a href="#log-nav" onclick="PAGE++;update([ 'log' ]);">next✏</a>`;
				if (PAGE < TOTAL_PAGES && TOTAL_PAGES > 1) {
					nav.innerHTML += next;
				}

				if (nav.innerHTML) {
					document.getElementById(
						"#log-nav"
					).innerHTML = `${nav.outerHTML}<br>`;
				}
			}

			// Reset the log entry form
			document.getElementById("log-box").value = "";
		}
	}
}

function formatSchema(schema, levels = [1, 20]) {
	let table = document.createElement("TABLE");
	table.createTHead();
	let th, cell;

	table.createCaption().innerHTML = schema.name;
	if (typeof schema.list_by_level[0] === "string") {
		// For those schemas that are just a single element like rage damage or ki points
		row = table.tHead.insertRow(0);
		th = document.createElement("TH");
		th.innerHTML = "Level";
		row.appendChild(th);
		th = document.createElement("th");
		th.innerHTML = `<span style="text-transform: capitalize;">${schema.description}</span>`;
		row.appendChild(th);

		// Fill out the table body
		for (let i = levels[0] - 1; i < levels[1]; i++) {
			row = table.insertRow(-1);
			row.insertCell().innerHTML = formatLevel(i + 1);
			row.insertCell().innerHTML =
				schema.list_by_level[i] !== "0" ? schema.list_by_level[i] : "–";
		}
	} else {
		// Spell slots have levels for each of them so use a nested header
		// The first is the standard level and title row, whereas the second is under the title row and holds cells for each spell level.
		row = table.tHead.insertRow(-1);
		th = document.createElement("th");
		th.rowSpan = 2; // The first cell occupies 2 rows
		th.innerHTML = "Level";
		row.appendChild(th);
		th = document.createElement("th");
		th.colSpan = schema.list_by_level[0].length; // The second cell occupies multiple columns
		th.innerHTML = `<span styl="text-transform: capitalize;">${schema.description}</span>`;
		row.appendChild(th);

		// Building the second row
		row = table.tHead.insertRow(-1);
		for (let i in schema.list_by_level[0]) {
			//document.getElementById('test').innerHTML += i + ' ';
			th = document.createElement("th");
			th.id = parseInt(i) + 1;
			th.innerHTML = formatLevel(parseInt(i) + 1);
			row.appendChild(th);
		}

		// Fill out the table body
		for (let i = levels[0] - 1; i < levels[1]; i++) {
			row = table.insertRow(-1);
			row.insertCell().innerHTML = formatLevel(i + 1);

			// Place all the slot information under the correct slot header in the second header row
			for (let n in schema.list_by_level[i]) {
				cell = row.insertCell().innerHTML =
					schema.list_by_level[i][n] !== "0" ? schema.list_by_level[i][n] : "–";
			}
		}
	}

	return table;
}

function formatLevel(level) {
	let end = ["th", "st", "nd", "rd"];
	let i = 10 < level % 100 && level % 100 < 14 ? 0 : level % 10;
	return i in end ? `${level}${end[i]}` : `${level}${end[0]}`;
}

function emptyTable(table) {
	let rowCount = table.rows.length;
	if (rowCount > 1) {
		for (i = 1; i < rowCount; i++) {
			table.deleteRow(-1); // Each pass deletes the last row in the table.
		}
	}
}

function getModifier(ability) {
	return Math.floor((ability - 10) / 2);
}

function getProficiency() {
	if (totalLevel >= 1 && totalLevel <= 4) {
		return 2;
	} else if (totalLevel >= 5 && totalLevel <= 8) {
		return 3;
	} else if (totalLevel >= 9 && totalLevel <= 12) {
		return 4;
	} else if (totalLevel >= 13 && totalLevel <= 16) {
		return 5;
	}
	return 6;
}
