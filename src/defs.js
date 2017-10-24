export const gameName = 'game';

export const settings = {
    width: 600,
    height: 600,
    cells: 20,
    cellSize: 40,
    mapContainer: {x: 0, y: 100, w: 600, h: 500, velocity: 0.15},
    topBar: {x: 0, y: 0, w: 600, h: 100},
    bottomBar: {x: 0, y: 500, w: 600, h: 100},
    leftBar: {y: 100, w: 200, h: 500, hidden: true},
    rightBar: {y: 100, w: 200, h: 500, hidden: true}
};

export const personTypes = {
	fast: {
		name: 'fast',
		textures: {},
		move: {swimming: false, flying: false},
		level: [
			{speed: 5, health: 4, power: 2, attackRange: 3},
			{speed: 6, health: 4, power: 2, attackRange: 3},
			{speed: 7, health: 5, power: 3, attackRange: 3},
			{speed: 8, health: 6, power: 4, attackRange: 4},
		],
		cost: [100, 200, 300, 400]
	},
    middle: {
        name: 'middle',
        textures: {},
        move: {swimming: false, flying: false},
        level: [
            {speed: 3, health: 5, power: 3, attackRange: 4},
            {speed: 4, health: 6, power: 4, attackRange: 4},
            {speed: 5, health: 7, power: 5, attackRange: 4},
            {speed: 6, health: 8, power: 6, attackRange: 5},
        ],
        cost: [175, 275, 375, 550]
    },
    strong: {
        name: 'strong',
        textures: {},
        move: {swimming: false, flying: false},
        level: [
            {speed: 2, health: 7, power: 5, attackRange: 4},
            {speed: 2, health: 8, power: 6, attackRange: 4},
            {speed: 3, health: 9, power: 7, attackRange: 4},
            {speed: 4, health: 10, power: 8, attackRange: 5},
        ],
        cost: [250, 350, 500, 700]
    },
};

export const cellTypes = {
	x: {
		bg: 0xEE4D63,
		bgActive: 0xEE4D63,
		border: 0xEEC78C,
		movable: false,
		textColor: 0xEEA797,
		text: '',
		texture: ''
	},
	w: {
		bg: 0x3D3EEE,
		bgActive: 0x6FC6E,
		movable: false,
		textColor: 0xA5E6EE,
		text: '',
		texture: ''
	},
	f: {
		bg: 0x099711,
		bgActive: 0x6AD664,
		movable: true,
		movableCf: 2,
		textColor: 0xE7FEAB,
		text: '',
		texture: ''
	},
	d: {
		bg: 0x065806,
		bgActive: 0x147F1A,
		movable: true,
		movableCf: 3,
		textColor: 0xE7FEAB,
		text: '',
		texture: ''
	},
	empty: {
		bg: 0xF0ECBE,
		bgActive: 0xDAB363,
		border: 0x817D65,
		movable: true,
		movableCf: 1,
		textColor: 0xBBBD73,
		text: '',
		texture: ''
	}
};

export const mapTemplate = [
	'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	'x', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	'x', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	'x', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', 'f', 'f', 'f', 'f', 'f', ' ', ' ', ' ',
	'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', 'f', ' ', ' ', ' ', 'f', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'd', ' ', ' ', ' ', 'd', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'f', ' ', ' ', ' ', 'f', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'f', 'f', 'f', 'f', 'f', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', 'w', 'w', 'w', 'w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', 'w', ' ', ' ', 'w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', 'w', ' ', ' ', 'w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', 'w', ' ', 'w', 'w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'f', 'f', 'f', 'f', 'f', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'd', 'd', 'd', 'd', 'd', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
];