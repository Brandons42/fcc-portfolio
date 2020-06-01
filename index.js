var checkIsTouchDevice = require('./isTouchDevice');

var backgroundCode = document.querySelector('#background-code > code');

var req = new XMLHttpRequest();

req.open(
	'GET',
	'https://raw.githubusercontent.com/Brandons42/word-exists-documentation/master/dist/index.html',
	true
);

req.send();

req.onload = function () {
	var text = req.responseText;

	text += text + text;

	var breakpoint = window.innerWidth > 700 ? 1500 : 500;

	if (backgroundCode.textContent) {
		backgroundCode.textContent += text.slice(0, breakpoint);
	} else {
		backgroundCode.innerText += text.slice(0, breakpoint);
	}

	var q = breakpoint;

	var interval = setInterval(function () {
		if (backgroundCode.textContent) {
			backgroundCode.textContent += text[q];
		} else {
			backgroundCode.innerText += text[q];
		}

		q++;

		if (q === text.length) {
			clearInterval(interval);
		}
	}, 50);
};

function getDescription(tile) {
	return tile.getElementsByClassName('description')[0];
}

var isTouchDevice = checkIsTouchDevice();

var tiles = document.getElementsByClassName('project-tile');

for (var q = 0; q < 4; q++) {
	if (isTouchDevice) {
		var description = getDescription(tiles[q]);

		description.style.display = 'initial';
		description.style.textShadow = '1px 1px 5px black';
	} else {
		tiles[q].onmouseout = function () {
			getDescription(this).style.display = 'none';
		};

		tiles[q].onmouseover = function () {
			getDescription(this).style.display = 'initial';
		};
	}
}
