$(function () {
	function depress($target) {
		$target.css({
			'-webkit-transform': 'rotate3d(1, 0, 0, 0deg)',
			'-moz-transform': 'rotate3d(1, 0, 0, 0deg)',
			'-ms-transform': 'rotate3d(1, 0, 0, 0deg)',
			'-o-transform': 'rotate3d(1, 0, 0, 0deg)',
			'transform': 'rotate3d(1, 0, 0, 0deg)'
		}, 500);
		
		$target.css({
			'-webkit-transform': 'rotate3d(0, 1, 0, 0deg)',
			'-moz-transform': 'rotate3d(0, 1, 0, 0deg)',
			'-ms-transform': 'rotate3d(0, 1, 0, 0deg)',
			'-o-transform': 'rotate3d(0, 1, 0, 0deg)',
			'transform': 'rotate3d(0, 1, 0, 0deg)'
		}, 500);
	}
	
	function press($sourceEl, $target) {
		var deltaX = $sourceEl.offset().left + ($sourceEl.width() / 2);
		deltaX -= $target.offset().left + ($target.width() / 2);
		var deltaY = $sourceEl.offset().top + ($sourceEl.height() / 2);
		deltaY -= $target.offset().top + ($target.width() / 2);
		var orthoX = deltaY;
		var orthoY = -deltaX;
		var mag = Math.sqrt(orthoX * orthoX + orthoY * orthoY);
		orthoX /= mag;
		orthoY /= mag;
		var degree = -(mag / $target.width()) * 5;
		
		$target.css({
			'-webkit-transform': 'rotate3d(' + orthoX + ', ' + orthoY + ', 0, ' + degree + 'deg)',
			'-moz-transform': 'rotate3d(' + orthoX + ', ' + orthoY + ', 0, ' + degree + 'deg)',
			'-ms-transform': 'rotate3d(' + orthoX + ', ' + orthoY + ', 0, ' + degree + 'deg)',
			'-o-transform': 'rotate3d(' + orthoX + ', ' + orthoY + ', 0, ' + degree + 'deg)',
			'transform': 'rotate3d(' + orthoX + ', ' + orthoY + ', 0, ' + degree + 'deg)'
		}, 500);
	}
	
	var $skewTarget = $(".skew-target");
	var $skewers = $(".skew");
	
	$skewers.on("mousedown", function () {
		press($(this), $skewTarget);
	});
	
	$skewers.on("mouseup", function () {
		depress($skewTarget);
	});
});