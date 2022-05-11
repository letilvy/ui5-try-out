/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"sap/ui/demoapps/rta/freestyle/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});
