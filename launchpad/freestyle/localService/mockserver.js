sap.ui.define([
	"sap/base/Log",
	"sap/base/util/UriParameters",
	"sap/ui/core/util/MockServer",
	"./MockRequests",
	"sap/ui/util/XMLHelper",
	"jquery.sap.sjax"
], function(Log, UriParameters, MockServer, MockRequests, XMLHelper, jQuery) {
	"use strict";

	var oMockServer,
		_sAppModulePath = "sap/ui/demoapps/rta/freestyle/",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */

		init: function(fnGetManifestEntry) {
			var oUriParameters = UriParameters.fromQuery(window.location.search),
				sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesModulePath),
				//sManifestUrl = sap.ui.require.toUrl(_sAppModulePath + "manifest.json"),
				sEntity = "SEPMRA_C_PD_Product",
				sErrorParam = oUriParameters.get("errorType"),
				iErrorCode = sErrorParam === "badRequest" ? 400 : 500,
				//oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource =  fnGetManifestEntry("sap.app").dataSources.mainService,
				sMetadataUrl = sap.ui.require.toUrl(_sAppModulePath + oMainDataSource.settings.localUri),
				// ensure there is a trailing slash
				sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/",
				oMainAnnotations = fnGetManifestEntry("sap.app").dataSources.mainAnnotations,
				sAnnotations = XMLHelper.serialize(jQuery.sap.sjax({
					url: sap.ui.require.toUrl(_sAppModulePath + oMainAnnotations.settings.localUri),
					dataType: "xml"
				}).data),
				oRequests;

			oMockServer = new MockServer({
				rootUri: sMockServerUrl
			});
			oRequests = new MockRequests(oMockServer);
			new MockServer({
				rootUri: oMainAnnotations.uri,
				requests: [{
					method: "GET",
					path: new RegExp(""),
					response: function(oXhr) {
						oXhr.respondXML(200, {}, sAnnotations);
						return true;
					}
				}]
			});
			// configure mock server with a delay of 1s
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: (oUriParameters.get("serverDelay") || 50)
			});

			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sJsonFilesUrl,
				bGenerateMissingMockData: true
			});

			var aRequests = oMockServer.getRequests(),
				fnResponse = function(iErrCode, sMessage, aRequest) {
					aRequest.response = function(oXhr) {
						oXhr.respond(iErrCode, {
							"Content-Type": "text/plain;charset=utf-8"
						}, sMessage);
					};
				};

			// handling the metadata error test
			if (oUriParameters.get("metadataError")) {
				aRequests.forEach(function(aEntry) {
					if (aEntry.path.toString().indexOf("$metadata") > -1) {
						fnResponse(500, "metadata Error", aEntry);
					}
				});
			}

			// Handling request errors
			if (sErrorParam) {
				aRequests.forEach(function(aEntry) {
					if (aEntry.path.toString().indexOf(sEntity) > -1) {
						fnResponse(iErrorCode, sErrorParam, aEntry);
					}
				});
			}
			//add the app-specific mock implementation to the standard one
			oMockServer.setRequests(aRequests.concat(oRequests.getRequests()));

			MockServer.startAll();

			Log.info("Running the app with mock data");
		},

		/**
		 * @public returns the mockserver of the app, should be used in integration tests
		 * @returns {sap.ui.core.util.MockServer} the mockserver instance
		 */
		getMockServer: function() {
			return oMockServer;
		}
	};

});
