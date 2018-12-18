/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/test/_OpaLogger","sap/ui/test/_ControlFinder","sap/ui/thirdparty/jquery"],function(t,e,o,i){"use strict";var s=t.extend("sap.ui.test.selectors._ControlSelectorValidator",{constructor:function(t,o){this.aSelectors=t;this.oValidationAncestor=o;this._oLogger=e.getLogger("sap.ui.test.selectors._ControlSelectorValidator")},_validate:function(t){if(t){var e=o._findControls(i.extend({},t));if(this.oValidationAncestor&&e.length>1){e=e.filter(function(t){return this._hasAncestor(t,this.oValidationAncestor)}.bind(this))}if(e.length===1){this._oLogger.debug("Selector matched a single control: "+JSON.stringify(t));this.aSelectors.push(t)}else{this._oLogger.debug("Selector matched multiple controls: "+JSON.stringify(t))}}},_hasAncestor:function(t,e){var o=t.getParent();return!!o&&(o===e||this._hasAncestor(o,e))}});return s});