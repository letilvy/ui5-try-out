sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./RecommendJourney",
	"./NavigationJourney",
	"./NotFoundJourney",
	"./ObjectJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "sap.ui5.tryout.view.",
		autoWait: true
	});

});