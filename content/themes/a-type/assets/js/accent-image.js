var accentImagePath = accentImagePath ? accentImagePath : "/assets/img/mountain.jpg";

$(document).ready(function () {
	//by now, any overrides should be set
	console.log(accentImagePath);
	updateAccentImage();
});

function updateAccentImage() {
	$("body,h1,h2,h3,.img-stripe,.img-accent").css("background-image", "url(" + accentImagePath + ")");
	// pseudo-element is a special case and requires injection :(
	document.styleSheets[1].addRule("blockquote::before", "background-image: url(" + accentImagePath + ");");
}