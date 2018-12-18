/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/base/EventProvider","sap/base/assert","sap/base/Log"],function(e,t,n,s){"use strict";var i=e.extend("sap.ui.core.EventBus",{constructor:function(){e.apply(this);this._mChannels={};this._defaultChannel=new t}});i.prototype.subscribe=function(e,t,s,i){if(typeof t==="function"){i=s;s=t;t=e;e=null}n(!e||typeof e==="string","EventBus.subscribe: sChannelId must be empty or a non-empty string");n(typeof t==="string"&&t,"EventBus.subscribe: sEventId must be a non-empty string");n(typeof s==="function","EventBus.subscribe: fnFunction must be a function");n(!i||typeof i==="object","EventBus.subscribe: oListener must be empty or an object");var u=r(this,e);u.attachEvent(t,s,i);return this};i.prototype.subscribeOnce=function(e,t,n,s){if(typeof t==="function"){s=n;n=t;t=e;e=null}function i(){this.unsubscribe(e,t,i,undefined);n.apply(s||this,arguments)}return this.subscribe(e,t,i,undefined)};i.prototype.unsubscribe=function(e,s,i,r){if(typeof s==="function"){r=i;i=s;s=e;e=null}n(!e||typeof e==="string","EventBus.unsubscribe: sChannelId must be empty or a non-empty string");n(typeof s==="string"&&s,"EventBus.unsubscribe: sEventId must be a non-empty string");n(typeof i==="function","EventBus.unsubscribe: fnFunction must be a function");n(!r||typeof r==="object","EventBus.unsubscribe: oListener must be empty or an object");var o=u(this,e);if(!o){return this}o.detachEvent(s,i,r);if(o!=this._defaultChannel){var a=t.getEventList(o);var f=true;for(var p in a){if(o.hasListeners(p)){f=false;break}}if(f){delete this._mChannels[e]}}return this};i.prototype.publish=function(e,i,r){if(arguments.length==1){r=null;i=e;e=null}else if(arguments.length==2){if(typeof i!="string"){r=i;i=e;e=null}}r=r?r:{};n(!e||typeof e==="string","EventBus.publish: sChannelId must be empty or a non-empty string");n(typeof i==="string"&&i,"EventBus.publish: sEventId must be a non-empty string");n(typeof r==="object","EventBus.publish: oData must be an object");var o=u(this,e);if(!o){if(s.isLoggable(s.Level.DEBUG,"sap.ui.core.EventBus")){s.debug("Failed to publish into channel '"+e+"'."+" No such channel.",e,"sap.ui.core.EventBus")}return}var a=t.getEventList(o)[i];if(Array.isArray(a)){a=a.slice();var f;for(var p=0,l=a.length;p<l;p++){f=a[p];this._callListener(f.fFunction,f.oListener||this,e,i,r)}}else if(s.isLoggable(s.Level.DEBUG,"sap.ui.core.EventBus")){s.debug("Failed to publish Event '"+i+"' in '"+e+"'."+" No listeners found.",e+"#"+i,"sap.ui.core.EventBus")}};i.prototype.getInterface=function(){return this};i.prototype._callListener=function(e,t,n,s,i){e.call(t,n,s,i)};i.prototype.destroy=function(){this._defaultChannel.destroy();for(var t in this._mChannels){this._mChannels[t].destroy()}this._mChannels={};e.prototype.destroy.apply(this,arguments)};function u(e,t){if(!t){return e._defaultChannel}return e._mChannels[t]}function r(e,n){var s=u(e,n);if(!s&&n){e._mChannels[n]=new t;s=e._mChannels[n]}return s}return i});