sap.ui.define([], function(){

	"use strict";

	return {

		html2Text: function(sHtml){
			return sHtml.replace(/<\/?[^>]+>/gi, ' ');
		}

	};

});