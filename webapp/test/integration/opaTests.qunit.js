/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"sap/ui5/tryout/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});