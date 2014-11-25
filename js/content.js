$(function () {
	var items = [
		{
			name : "Magnolia",
			text : "Something about Magnolia"
		},
		{
			name : "Something else",
			text : "..."
		},
		{
			name : "Something else",
			text : "..."
		},
		{
			name : "Something else",
			text : "..."
		},
		{
			name : "Something else",
			text : "..."
		}
	];
	
	var tpl = _.template($("#floatingItemTemplate").text().trim());
	
	var container = $("#dev");
	
	_.each(items, function (item) {
		container.append($(tpl(item)));
	});
});