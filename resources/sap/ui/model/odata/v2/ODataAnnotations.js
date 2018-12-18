/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/odata/AnnotationParser","sap/ui/Device","sap/ui/base/EventProvider","sap/ui/core/cache/CacheManager","sap/base/assert","sap/ui/thirdparty/jquery"],function(e,t,r,a,o,n){"use strict";var i=r.extend("sap.ui.model.odata.v2.ODataAnnotations",{constructor:function(t,o){var n=this;r.apply(this,[o]);this._oMetadata=t;this._pLoaded=t.loaded();this._mCustomHeaders={};this._mAnnotations={};this._hasErrors=false;function i(e){if(!n._hasErrors){a.set(n.sCacheKey,JSON.stringify(e))}}if(!o||!o.skipMetadata){if(!o){o={}}if(!o.source){o.source=[]}else if(Array.isArray(o.source)){o.source=o.source.slice(0)}else{o.source=[o.source]}o.source.unshift({type:"xml",data:t.loaded().then(function(e){return{xml:e["metadataString"],lastModified:e["lastModified"],eTag:e["eTag"]}})})}if(o){this.sCacheKey=o.cacheKey;this.setHeaders(o.headers);if(this.sCacheKey){this._pLoaded=a.get(n.sCacheKey).then(function(t){var r;if(t){r=JSON.parse(t)}if(Array.isArray(r)){r.annotations={};r.forEach(function(t){e.restoreAnnotationsAtArrays(t.annotations);e.merge(r.annotations,t.annotations)});n._mAnnotations=r.annotations;n._fireSomeLoaded(r);n._fireLoaded(r);return r}else{return n.addSource(o.source).then(function(e){i(e);return e})}})}else{this._pLoaded=this.addSource(o.source)}}},metadata:{publicMethods:["getData","addSource","getHeaders","setHeaders","attachSuccess","detachSuccess","attachError","detachError","attachLoaded","detachLoaded","attachFailed","detachFailed"]}});i.prototype.getData=function(){return this._mAnnotations};i.prototype.getAnnotationsData=function(){return this._mAnnotations};i.prototype.getHeaders=function(){return n.extend({},this._mCustomHeaders)};i.prototype.setHeaders=function(e){this._mCustomHeaders=n.extend({},e)};i.prototype.loaded=function(){return this._pLoaded};i.prototype.addSource=function(e){if(!e||Array.isArray(e)&&e.length===0){return this._oMetadata.loaded()}if(!Array.isArray(e)){e=[e]}var t=this;var r=e.map(function(e){e=typeof e==="string"?{type:"url",data:e}:e;return t._loadSource(e).then(t._parseSourceXML).then(t._parseSource.bind(t)).catch(function(e){return e})});return Promise.all(r).then(function(e){return e.map(function(e){try{e=t._mergeSource(e);t._fireSuccess(e)}catch(r){t._fireError(e)}return e})}).then(function(e){e.annotations=t.getData();var r=e.filter(function(e){return e instanceof Error});if(r.length>0){t._hasErrors=true;if(r.length!==e.length){t._fireSomeLoaded(e);t._fireFailed(e)}else{t._fireFailed(e);t._fireAllFailed(e);return Promise.reject(e)}}else{t._fireSomeLoaded(e);t._fireLoaded(e)}return e})};i.prototype.attachSuccess=function(e,t,r){return this.attachEvent("success",e,t,r)};i.prototype.detachSuccess=function(e,t){return this.detachEvent("success",e,t)};i.prototype.attachError=function(e,t,r){return this.attachEvent("error",e,t,r)};i.prototype.detachError=function(e,t){return this.detachEvent("error",e,t)};i.prototype.attachLoaded=function(e,t,r){return this.attachEvent("loaded",e,t,r)};i.prototype.detachLoaded=function(e,t){return this.detachEvent("loaded",e,t)};i.prototype.attachFailed=function(e,t,r){return this.attachEvent("failed",e,t,r)};i.prototype.detachFailed=function(e,t){return this.detachEvent("failed",e,t)};i.prototype.attachSomeLoaded=function(e,t,r){return this.attachEvent("someLoaded",e,t,r)};i.prototype.detachSomeLoaded=function(e,t){return this.detachEvent("someLoaded",e,t)};i.prototype.attachAllFailed=function(e,t,r){return this.attachEvent("allFailed",e,t,r)};i.prototype.detachAllFailed=function(e,t){return this.detachEvent("allFailed",e,t)};i.prototype._fireSuccess=function(e){return this.fireEvent("success",{result:e},false,false)};i.prototype._fireError=function(e){return this.fireEvent("error",{result:e},false,false)};i.prototype._fireLoaded=function(e){return this.fireEvent("loaded",{result:e},false,false)};i.prototype._fireFailed=function(e){return this.fireEvent("failed",{result:e},false,false)};i.prototype._fireSomeLoaded=function(e){return this.fireEvent("someLoaded",{result:e},false,false)};i.prototype._fireAllFailed=function(e){return this.fireEvent("allFailed",{result:e},false,false)};i.prototype._loadSource=function(e){if(e.data instanceof Promise){return e.data.then(function(t){delete e.data;e.type="xml";e.xml=t.xml;e.lastModified=t.lastModified;e.eTag=t.eTag;return this._loadSource(e)}.bind(this))}else if(e.type==="xml"){if(typeof e.data==="string"){e.xml=e.data;delete e.data}return Promise.resolve(e)}else if(e.type==="url"){return this._loadUrl(e)}else{var t=new Error('Unknown source type: "'+e.type+'"');t.source=e;return Promise.reject(t)}};i.prototype._loadUrl=function(e){o(e.type==="url",'Source type must be "url" in order to be loaded');return new Promise(function(t,r){var a={url:e.data,async:true,headers:this._getHeaders(),beforeSend:function(e){e.overrideMimeType("text/plain")}};var o=function(r,a,o){e.xml=o.responseText;if(o.getResponseHeader("Last-Modified")){e.lastModified=new Date(o.getResponseHeader("Last-Modified"))}if(o.getResponseHeader("eTag")){e.eTag=o.getResponseHeader("eTag")}t(e)};var i=function(t,a){var o=new Error('Could not load annotation URL: "'+e.data+'"');o.source=e;r(o)};n.ajax(a).done(o).fail(i)}.bind(this))};i.prototype._parseSourceXML=function(e){o(typeof e.xml==="string","Source must contain XML string in order to be parsed");return new Promise(function(r,a){var o;if(t.browser.msie){o=new window.ActiveXObject("Microsoft.XMLDOM");o.preserveWhiteSpace=true;var n=e.xml;if(n.indexOf(" xmlns:xml=")>-1){n=n.replace(' xmlns:xml="http://www.w3.org/XML/1998/namespace"',"").replace(" xmlns:xml='http://www.w3.org/XML/1998/namespace'","")}o.loadXML(n)}else if(window.DOMParser){o=(new DOMParser).parseFromString(e.xml,"application/xml")}var i;if(!o){i=new Error("The browser does not support XML parsing. Annotations are not available.");i.source=e;a(i)}else if(o.getElementsByTagName("parsererror").length>0||o.parseError&&o.parseError.errorCode!==0){i=new Error("There were errors parsing the XML.");i.source={type:e.type,data:e.data,xml:e.xml,document:o};a(i)}else{e.document=o;r(e)}})};i.prototype._parseSource=function(r){o(r.document instanceof window.Document||t.browser.msie,"Source must contain a parsed XML document converted to an annotation object");return this._oMetadata.loaded().then(function(){r.annotations=e.parse(this._oMetadata,r.document,r.data);delete r.document;return r}.bind(this))};i.prototype._mergeSource=function(t){o(typeof t.annotations==="object","Source must contain an annotation object to be merged");e.merge(this._mAnnotations,t.annotations);return t};i.prototype._getHeaders=function(){return n.extend({"sap-cancel-on-close":true},this.getHeaders(),{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()})};return i});