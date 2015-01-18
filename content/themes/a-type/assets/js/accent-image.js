$(document).ready(function () {
	//by now, any overrides should be set
	getResizedImage();
});

var accentImageNativeSize;

function measureBackgroundImage(callback) {
	if (accentImageNativeSize) {
		callback(accentImageNativeSize);
		return;
	}

	img = new Image();
	img.onload = function () {
	   accentImageNativeSize = { x : this.width, y : this.height };
		callback(accentImageNativeSize);
	}
	img.src = accentImagePath;
}

function getResizedImage() {
	measureBackgroundImage(function (size) {
		windowSize = { x : window.outerWidth, y : window.outerHeight };

		var finalWidth, finalHeight;

		var ratio = size.x / size.y;
		var windowRatio = windowSize.x / windowSize.y;
		if (ratio < windowRatio) {
			finalWidth = windowSize.x;
			finalHeight = finalWidth * (1 / ratio);
		}
		else {
			finalHeight = windowSize.y;
			finalWidth = finalHeight * ratio;
		}

		finalWidth = ("" + finalWidth).split(".")[0];
		finalHeight = ("" + finalHeight).split(".")[0];

		if (accentImagePath[0] === "/") {
			accentImagePath = blogUrl + accentImagePath;
		}

		updateAccentImage("/resize-image?width=" + finalWidth + "&height=" + finalHeight + "&src=" + encodeURIComponent(accentImagePath));
	});
}

function updateAccentImage(imgSrc) {
	console.log(imgSrc);
	$("body,h1,h2,h3,.img-stripe,.img-accent").css("background-image", "url(" + imgSrc + ")");
	// pseudo-element is a special case and requires injection :(
	document.styleSheets[1].addRule("blockquote::before", "background-image: url(" + imgSrc + ");");
}