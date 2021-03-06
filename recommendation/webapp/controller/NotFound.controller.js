sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui5.tryout.controller.NotFound", {

		/**
		 * Navigates to the recommend when the link is pressed
		 * @public
		 */
		onLinkPressed : function () {
			this.getRouter().navTo("recommend");
		}

	});

});