sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/Log","sap/base/util/UriParameters"],function(e,t,r,a){"use strict";var i,o="sap/ui/demo/masterdetail/",n=o+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(o+"manifest.json"),f=new t(p);f.attachRequestCompleted(function(){var t=new a(window.location.href),c=sap.ui.require.toUrl(n),p=f.getProperty("/sap.app/dataSources/mainService"),d=sap.ui.require.toUrl(o+p.settings.localUri),l=/.*\/$/.test(p.uri)?p.uri:p.uri+"/";if(!i){i=new e({rootUri:l})}else{i.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});i.simulate(d,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=i.getRequests();var v=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){v(500,"metadata Error",e)}})}var g=u.errorType||t.get("errorType"),h=g==="badRequest"?400:500;if(g){m.forEach(function(e){v(h,g,e)})}i.setRequests(m);i.start();r.info("Running the app with mock data");s()});f.attachRequestFailed(function(){var e="Failed to load application manifest";r.error(e);c(new Error(e))})})},getMockServer:function(){return i}};return s});