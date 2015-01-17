var accentImagePath = accentImagePath ? accentImagePath : "/assets/img/mountain.jpg";
var accentImageNativeSize = null;
var windowSize;
var img;

$(document).ready(function () {
	//by now, any overrides should be set
	measureBackgroundImage(responsiveBackgroundResize);
});

function updateAccentImage(url) {
	$("body,h1,h2,h3,.img-stripe,.img-accent").css("background-image", "url(" + url + ")");
	// pseudo-element is a special case and requires injection :(
	document.styleSheets[1].addRule("blockquote::before", "background-image: url(" + url + ");");
}

function measureBackgroundImage(callback) {
	img = new Image();
	img.onload = function () {
		accentImageNativeSize = { x : this.width, y : this.height };
		if (callback) {
			callback();
		}
	}
	img.src = accentImagePath;
}

function responsiveBackgroundResize() {
	window.requestAnimationFrame(function () {
		// if image not measured, theres no point
		if (!accentImageNativeSize) {
			return;
		}

		windowSize = { x : window.outerWidth, y : window.outerHeight };

		var finalWidth, finalHeight;

		var ratio = accentImageNativeSize.x / accentImageNativeSize.y;
		var windowRatio = windowSize.x / windowSize.y;
		if (ratio < windowRatio) {
			finalWidth = windowSize.x;
			finalHeight = finalWidth * (1 / ratio);
		}
		else {
			finalHeight = windowSize.y;
			finalWidth = finalHeight * ratio;
		}

		var hasWorker = window.Worker ? true : false;
		hasWorker = false;

		// async if possible...
		if (hasWorker) {
			var worker = new Worker("/assets/js/background-resize.js");
			worker.onmessage = updateAccentImage;
			worker.postMessage([accentImagePath, finalWidth, finalHeight]);
		}
		else {
			createResizedImage(img, finalWidth, finalHeight, updateAccentImage);
		}
	});
}
