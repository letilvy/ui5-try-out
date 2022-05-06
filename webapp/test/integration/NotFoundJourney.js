/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/Recommend",
	"./pages/Browser",
	"./pages/NotFound",
	"./pages/App"
], function (opaTest) {
	"use strict";

	QUnit.module("NotFound");

	opaTest("Should see the resource not found page when changing to an invalid hash", function (Given, When, Then) {
		//Arrangement
		Given.iStartMyApp();

		//Actions
		When.onTheBrowser.iChangeTheHashToSomethingInvalid();

		// Assertions
		Then.onTheNotFoundPage.iShouldSeeResourceNotFound();
	});

	opaTest("Clicking the 'Show my recommend' link on the 'Resource not found' page should bring me back to the recommend", function (Given, When, Then) {
		//Actions
		When.onTheNotFoundPage.iPressTheNotFoundShowRecommendLink();

		// Assertions
		Then.onTheRecommendPage.iShouldSeeTheTable();
	});

	opaTest("Should see the not found text for no search results", function (Given, When, Then) {
		//Actions
		When.onTheRecommendPage.iSearchForSomethingWithNoResults();

		// Assertions
		Then.onTheRecommendPage.iShouldSeeTheNoDataTextForNoSearchResults();
	});

	opaTest("Clicking the back button should take me back to the not found page", function (Given, When, Then) {
		//Actions
		When.onTheBrowser.iPressOnTheBackwardsButton();

		// Assertions
		Then.onTheNotFoundPage.iShouldSeeResourceNotFound();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see the 'Object not found' page if an invalid object id has been called", function (Given, When, Then) {
		//Arrangement
		Given.iStartMyApp({hash : "Objects/SomeInvalidObjectId"});

		// Assertions
		Then.onTheNotFoundPage.iShouldSeeObjectNotFound();
	});

	opaTest("Clicking the 'Show my recommend' link on the 'Object not found' page should bring me back to the recommend", function (Given, When, Then) {
		//Actions
		When.onTheNotFoundPage.iPressTheObjectNotFoundShowRecommendLink();

		// Assertions
		Then.onTheRecommendPage.iShouldSeeTheTable();

		// Cleanup
		Then.iTeardownMyApp();
	});

});