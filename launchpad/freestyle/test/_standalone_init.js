(function () {
	"use strict";

	window['sap-ui-config'] = window['sap-ui-config'] || {};
	window['sap-ui-config'].theme = 'sap_horizon';
	window['sap-ui-config'].language = 'en';
	window['sap-ui-config'].compatVersion = 'edge';
	window['sap-ui-config'].libs = 'sap.m,sap.ui.rta';
	window['sap-ui-config'].resourceroots = {
		"sap.ui.demoapps.rta.freestyle": "../"
	};
	window['sap-ui-config'].flexibilityServices = '[{"connector": "LocalStorageConnector"}]';

	var __aPrefixMatches = document.location.pathname.match(/(.*)\/test-resources\//);
	var __sPathPrefix = __aPrefixMatches &&  __aPrefixMatches[1] || "";

	//document.write('<script src="' + __sPathPrefix + '/resources/sap-ui-core.js"><' + '/script>');
	document.write('<script src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"><' + '/script>');
})();