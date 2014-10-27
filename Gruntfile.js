"use strict";

module.exports = function (grunt) {
	var lessFiles = [ "less/*.less" ];
	
	grunt.initConfig({
		watch : {
			static : {
				files : lessFiles,
				tasks : [ "less:default" ]
			}
		},
		
		less : {
			default : {
				files : {
					"css/home.css" : "less/home.less",
					"css/flipcard.css" : "less/flipcard.less"
				}
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");
}