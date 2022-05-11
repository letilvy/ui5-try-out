sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Text"
], function(BaseController, JSONModel, Formatter, Filter, FilterOperator, Text){
	"use strict";

	return BaseController.extend("sap.ui5.tryout.controller.Recommend", {

		formatter: Formatter,

		onInit: function(){
			var oModel = new JSONModel();
			oModel.loadData(
				"./localService/mockdata/Recommendations.json", "", false
			);
			this.setModel(oModel, "recommend");

			var oModel = new JSONModel();
			oModel.loadData(
				"./localService/mockdata/UserProfile.json", "", false
			);
			this.setModel(oModel, "profile");
		},

		showUserProfile: function(sId, oContext){
			return new Text(sId, {
				text: oContext.getProperty()
			});
		},

		pressRecommendedItem: function(oEvent){
			var oItem = oEvent.getSource().getBindingContext("recommend").getObject();
			window.open(oItem.Url);
		}
	});
});