var resized = document.createElement("canvas");

function quickResize (image, resized, callback) {
	resized.getContext("2d").drawImage(image, 0, 0, resized.width, resized.height);
	callback(resized.toDataURL("image/png"));
}

function createResizedImage (image, finalWidth, finalHeight, done) {
	resized.width = finalWidth;
	resized.height = finalHeight;

	quickResize(image, resized, function (url) {
		done(url);
	});
}

onmessage = function (e) {
	var img = new Image();
	img.onload = function () {
		createResizedImage(img, e.data[1], e.data[2], postMessage);
	}
	img.src = e.data[0];
}