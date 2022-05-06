/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"sap/ui/Device",
	"./pages/Recommend",
	"./pages/Browser",
	"./pages/Object",
	"./pages/App"
], function (opaTest, Device) {
	"use strict";

	QUnit.module("Navigation");

	opaTest("Should see the objects list", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheRecommendPage.iShouldSeeTheTable();
	});

	opaTest("Should react on hash change", function (Given, When, Then) {
		// Actions
		When.onTheRecommendPage.iRememberTheItemAtPosition(2);
		When.onTheBrowser.iChangeTheHashToTheRememberedItem();

		// Assertions
		Then.onTheObjectPage.iShouldSeeTheRememberedObject();
	});

	opaTest("Should go back to the TablePage", function (Given, When, Then) {
		// Actions
		When.onTheBrowser.iPressOnTheBackwardsButton();

		// Assertions
		Then.onTheRecommendPage.iShouldSeeTheTable();
	});

	opaTest("Object Page shows the correct object Details", function (Given, When, Then) {
		// Actions
		When.onTheRecommendPage.iRememberTheItemAtPosition(1).
			and.iPressATableItemAtPosition(1);

		// Assertions
		Then.onTheObjectPage.iShouldSeeTheRememberedObject();
	});

	opaTest("Should be on the table page again when browser back is pressed", function (Given, When, Then) {
		// Actions
		When.onTheBrowser.iPressOnTheBackwardsButton();

		// Assertions
		Then.onTheRecommendPage.iShouldSeeTheTable();
	});

	opaTest("Should be on the object page again when browser forwards is pressed", function (Given, When, Then) {
		// Actions
		When.onTheBrowser.iPressOnTheForwardsButton();

		// Assertions
		Then.onTheObjectPage.iShouldSeeTheRememberedObject();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Start the App and simulate metadata error: MessageBox should be shown", function (Given, When, Then) {
		//Arrangement
		Given.iStartMyApp({
			delay: 2000,
			metadataError: true
		});

		//Assertions
		Then.onTheAppPage.iShouldSeeTheMessageBox();

		// Actions
		When.onTheAppPage.iCloseTheMessageBox();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Start the App and simulate bad request error: MessageBox should be shown", function (Given, When, Then) {
		//Arrangement
		Given.iStartMyApp({
			delay: 2000,
			errorType: "serverError"
		});

		//Assertions
		Then.onTheAppPage.iShouldSeeTheMessageBox();

		// Actions
		When.onTheAppPage.iCloseTheMessageBox();

		// Cleanup
		Then.iTeardownMyApp();
	});

});