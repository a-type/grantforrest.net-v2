var ghost = require("ghost");
var express = require("express");
var path  = require("path");
var Canvas = require("canvas");
var Image  = Canvas.Image;
var app = express();
var http = require("http");
var https = require("https");
var Url = require("url");
var fs = require("fs");

ghost({
	config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {

	var appHostname = Url.parse(ghostServer.config.url).hostname;

	app.route("/resize-image").get(function (req, res, next) {
		var width = req.query.width;
		var height = req.query.height;
		var imgSrc = req.query.src;

		var imgUrl = Url.parse(imgSrc);

		function resizeAndSendImageBuffer(buffer) {
			var img = new Image();
			img.onload = function () {
				console.log("Image loaded");
				var canvas = new Canvas(parseInt(width), parseInt(height));
				canvas.getContext("2d").drawImage(img, 0, 0, width, height);
				var buffer = canvas.toBuffer();

				res.send(buffer);
			};

			console.log("Loading image");
			img.src = buffer;
		}

		if (imgUrl.hostname === "localhost" || imgUrl.hostname === "127.0.0.1" || imgUrl.hostname === appHostname) {
			var resolvedFilePath;
			if (imgSrc.indexOf("assets/img/mountain.png") > 0) {
				resolvedFilePath = "./content/themes/a-type" + imgUrl.pathname;
			}
			else {
				var relativePath = /\/content\/images(\/[a-zA-Z0-9\/._-]*)/.exec(imgUrl.pathname)[1];
				resolvedFilePath = ghostServer.config.paths.contentPath + "/images" + relativePath;
			}

			fs.readFile(resolvedFilePath, function (err, data) {
				console.log("Loading image at " + resolvedFilePath);
				if (err) {
					res.status(500).send("Error loading image from file " + err);
				}
				resizeAndSendImageBuffer(data);
			})
		}
		else if (imgUrl.protocol === "http:") {
			console.log("Downloading image " + imgSrc);
			http.get(imgUrl.href, function (imgResponse) {
				var buf = '';
				imgResponse.setEncoding("binary");
				imgResponse.on("data", function (chunk) { buf += chunk });
				imgResponse.on("end", function () {
					resizeAndSendImageBuffer(buf);
				});
				imgResponse.on("error", function () {
					res.status(500).send("Error downloading image");
				});
			});
		}
		else if (imgUrl.protocol === "https:") {
			console.log("Downloading image " + imgSrc);
			https.get(imgUrl.href, function (imgResponse) {
				var buf = '';
				imgResponse.setEncoding("binary");
				imgResponse.on("data", function (chunk) { buf += chunk });
				imgResponse.on("end", function () {
					resizeAndSendImageBuffer(buf);
				});
				imgResponse.on("error", function () {
					res.status(500).send("Error downloading image");
				});
			});
		}
		else {
			res.status(400).send("Unsupported image url protocol: " + imgUrl.protocol);
		}
	});

	app.use("/", ghostServer.rootApp);

   ghostServer.start(app);
});
