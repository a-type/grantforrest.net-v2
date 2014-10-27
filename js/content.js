$(function () {
	var items = [
		{
			name : "Magnolia",
			text : "Something about Magnolia"
		}
	];
	
	var tpl = _.template($("#projectItemTemplate").text().trim());
	
	var container = $("#dev");
	
	_.each(items, function (item) {
		container.append($(tpl(item)));
	});
});