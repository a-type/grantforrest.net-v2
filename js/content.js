$(function () {
	_.templateSettings.variable = "data";

	var items = {
		info : [
			{
				text  : "Something about myself here, I don't know",
				type  : "quote"
			},
			{
				text   : "Email Me",
				target : "mailto:a-type-dev@outlook.com",
				type   : "quote"
			}
		],
		dev : [
			{
				name : "Magnolia",
				text : "Something about Magnolia",
				type : "article"
			},
			{
				name : "Something else",
				text : "...",
				type : "article"
			},
			{
				name : "Something else",
				text : "...",
				type : "article"
			},
			{
				name : "Something else",
				text : "...",
				type : "article"
			},
			{
				name : "Something else",
				text : "...",
				type : "article"
			}
		],
		music: [
		]
	};
	
	var templates = {
		article : _.template($("#flexItemTemplate").text().trim()),
		quote   : _.template($("#flexQuoteTemplate").text().trim())
	};
	
	_.forOwn(items, function (page, pageName) {
		var container = $("#" + pageName);
		_.each(page, function (item) {
			container.append($(templates[item.type](item)));
		});
	});
});