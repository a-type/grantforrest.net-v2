$(function () {
	$(".flip-card")
	.on("mouseenter", function () {
		$(this).removeClass("unflipped").addClass("flipped");
	})
	.on("mouseleave", function () {
		$(this).removeClass("flipped").addClass("unflipped");
	});
});