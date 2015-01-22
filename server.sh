#!/bin/bash

./node_modules/forever/bin/forever \
	start \
	-l forever.log \
	-o out.log \
	-e err.log \
	app.js
