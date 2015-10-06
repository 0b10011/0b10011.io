(function () {
	'use strict';

	window.calculateInToPx = function (field) {
		var inchInput = document.getElementById('in'),
			inches = inchInput.value,
			dpiInput = document.getElementById('dpi'),
			dpi = dpiInput.value,
			pixelInput = document.getElementById('px'),
			pixels = pixelInput.value;

		inchInput.setAttribute('placeholder', '   ');
		dpiInput.setAttribute('placeholder', '   ');
		pixelInput.setAttribute('placeholder', '   ');

		if (field !== 'dpi' && inches && pixels) {
			dpiInput.setAttribute('placeholder', pixels / inches);
			dpiInput.value = '';
		} else if (field !== 'px' && inches && dpi) {
			pixelInput.setAttribute('placeholder', inches * dpi);
			pixelInput.value = '';
		} else if (field !== 'in' && dpi && pixels) {
			inchInput.setAttribute('placeholder', pixels / dpi);
			inchInput.value = '';
		}
	};

	function loadCalculator() {
		document.getElementById("calculatorContainer").innerHTML = '<p>' +
				'<label><input id="in" onchange="calculateInToPx(\'in\');" oninput="calculateInToPx(\'in\');">Inches</label> × ' +
				'<label><input id="dpi" onchange="calculateInToPx(\'dpi\');" oninput="calculateInToPx(\'dpi\');">DPI</label> = ' +
				'<label><input id="px" onchange="calculateInToPx(\'px\');" oninput="calculateInToPx(\'px\');">Pixels</label>' +
			'</p>';
		window.calculateInToPx();
	}

	loadCalculator();
}());
