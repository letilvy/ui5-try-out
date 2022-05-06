/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"sap/ui/Device",
	"./pages/Recommend",
	"./pages/App"
], function (opaTest, Device) {
	"use strict";

	QUnit.module("Recommend");

	opaTest("Should see the table with all entries", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheRecommendPage.theTableShouldHaveAllEntries().
			and.theTableShouldContainOnlyFormattedUnitNumbers().
			and.theTitleShouldDisplayTheTotalAmountOfItems();
	});

	opaTest("Search for the First object should deliver results that contain the firstObject in the name", function (Given, When, Then) {
		//Actions
		When.onTheRecommendPage.iSearchForTheFirstObject();

		// Assertions
		Then.onTheRecommendPage.theTableShowsOnlyObjectsWithTheSearchStringInTheirTitle();
	});

	opaTest("Entering something that cannot be found into search field and pressing search field's refresh should leave the list as it was", function (Given, When, Then) {
		//Actions
		When.onTheRecommendPage.iTypeSomethingInTheSearchThatCannotBeFoundAndTriggerRefresh();

		// Assertions
		Then.onTheRecommendPage.theTableHasEntries();

		// Cleanup
		Then.iTeardownMyApp();
	});

});