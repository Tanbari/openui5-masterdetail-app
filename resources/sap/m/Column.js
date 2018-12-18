/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Element","sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device","sap/ui/thirdparty/jquery"],function(e,t,i,r,n,a){"use strict";var s=e.PopinDisplay;var o=r.VerticalAlign;var p=r.TextAlign;var h=r.SortOrder;var d=t.extend("sap.m.Column",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},hAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin},vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:o.Inherit},styleClass:{type:"string",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true},minScreenWidth:{type:"string",group:"Behavior",defaultValue:null},demandPopin:{type:"boolean",group:"Behavior",defaultValue:false},popinHAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin,deprecated:true},popinDisplay:{type:"sap.m.PopinDisplay",group:"Appearance",defaultValue:s.Block},mergeDuplicates:{type:"boolean",group:"Behavior",defaultValue:false},mergeFunctionName:{type:"string",group:"Misc",defaultValue:"getText"},sortIndicator:{type:"sap.ui.core.SortOrder",group:"Appearance",defaultValue:h.None}},defaultAggregation:"header",aggregations:{header:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/m/designtime/Column.designtime"}});d.prototype._index=-1;d.prototype._screen="";d.prototype._media=null;d.prototype.exit=function(){this._clearMedia()};d.prototype.getTable=function(){var e=this.getParent();if(e&&e.isA("sap.m.Table")){return e}};d.prototype.informTable=function(e,t,i){var r=this.getTable();if(r){var n="onColumn"+e;if(r[n]){r[n](this,t,i)}}};d.prototype.ontouchstart=function(e){this._bTouchStartMarked=e.isMarked()};d.prototype.ontap=function(e){if(!this._bTouchStartMarked&&!e.isMarked()){this.informTable("Press")}};d.prototype.onsapspace=function(e){if(e.srcControl===this){this.informTable("Press");e.preventDefault()}};d.prototype.onsapenter=d.prototype.onsapspace;d.prototype.invalidate=function(){var e=this.getParent();if(!e||!e.bOutput){return}t.prototype.invalidate.apply(this,arguments)};d.prototype._clearMedia=function(){if(this._media&&this._minWidth){this._detachMediaContainerWidthChange(this._notifyResize,this,this.getId());n.media.removeRangeSet(this.getId());this._media=null}};d.prototype._addMedia=function(){delete this._bShouldAddMedia;if(this._minWidth){n.media.initRangeSet(this.getId(),[parseFloat(this._minWidth)]);this._attachMediaContainerWidthChange(this._notifyResize,this,this.getId());this._media=this._getCurrentMediaContainerRange(this.getId());if(this._media){this._media.matches=!!this._media.from}}};d.prototype._notifyResize=function(e){if(this._media.from===e.from){return}this._media=e;this._media.matches=!!e.from;setTimeout(function(){this.fireEvent("media",this);this.informTable("Resize")}.bind(this),0)};d.prototype._validateMinWidth=function(t){if(!t){return}if(Object.prototype.toString.call(t)!="[object String]"){throw new Error('expected string for property "minScreenWidth" of '+this)}if(Object.keys(e.ScreenSizes).indexOf(t.toLowerCase())!=-1){return}if(!/^\d+(\.\d+)?(px|em|rem)$/i.test(t)){throw new Error('invalid CSS size("px", "em", "rem" required) or sap.m.ScreenSize enumeration for property "minScreenWidth" of '+this)}};d.prototype._isWidthPredefined=function(t){var i=this,r=t.replace(/[^a-z]/gi,""),n=parseFloat(e.BaseFontSize)||16;a.each(e.ScreenSizes,function(e,a){if(r!="px"){a/=n}if(a+r==t){i._minWidth=this+"px";i._screen=e;return false}});if(this._minWidth){return true}if(r=="px"){this._minWidth=t}else{this._minWidth=parseFloat(t)*n+"px"}};d.prototype.getCssAlign=function(e){e=e||this.getHAlign();if(e===p.Begin||e===p.End||e===p.Initial){e=i.getTextAlign(e)}return e.toLowerCase()};d.prototype.getStyleClass=function(e){var t=this.getProperty("styleClass");if(!e){return t}if(this._screen&&(!this.getDemandPopin()||!window.matchMedia)){t+=" sapMSize-"+this._screen}else if(this._media&&!this._media.matches){t+=" sapMListTblNone"}return t.trim()};d.prototype.setIndex=function(e){this._index=+e};d.prototype.setOrder=function(e){this._order=+e};d.prototype.getOrder=function(){return this.hasOwnProperty("_order")?this._order:this.getInitialOrder()};d.prototype.setInitialOrder=function(e){this._initialOrder=+e};d.prototype.getInitialOrder=function(){if(this.hasOwnProperty("_initialOrder")){return this._initialOrder}var e=this.getTable();if(!e){return-1}return e.indexOfColumn(this)};d.prototype.setDisplay=function(e,t){if(!e||this._index<0){return}var i=this._index+1,r=this.getParent(),n=t?"table-cell":"none",a=e.querySelector("tr > th:nth-child("+i+")"),s=e.querySelectorAll("tr > td:nth-child("+i+")"),o=s.length;a.style.display=n;a.setAttribute("aria-hidden",!t);for(i=0;i<o;i++){s[i].style.display=n;s[i].setAttribute("aria-hidden",!t)}if(r&&r.setTableHeaderVisibility){setTimeout(function(){r.setTableHeaderVisibility(t)},0)}};d.prototype.setDisplayViaMedia=function(e){var t=this.getParent(),i=this._media&&this._media.matches;if(!this.getDemandPopin()&&this._screen&&t&&t.setTableHeaderVisibility){setTimeout(function(){t.setTableHeaderVisibility(i)},0)}else{this.setDisplay(e,i)}};d.prototype.setVisible=function(e){if(e==this.getVisible()){return this}var t=this.getParent(),i=t&&t.getTableDomRef&&t.getTableDomRef(),r=i&&this._index>=0;this.setProperty("visible",e,r);if(r){this.setDisplay(i,e)}return this};d.prototype.setMinScreenWidth=function(t){var i=this.getParent();if(t==this.getMinScreenWidth()){return this}this._validateMinWidth(t);this._clearMedia();this._minWidth=0;this._screen="";if(t){t=t.toLowerCase();var r=e.ScreenSizes[t];if(r){this._screen=t;this._minWidth=r+"px"}else{this._isWidthPredefined(t)}if(i&&i.isActive()){this._addMedia()}else{this._bShouldAddMedia=true}}return this.setProperty("minScreenWidth",t)};d.prototype.setDemandPopin=function(e){if(e==this.getDemandPopin()){return this}if(!this.getMinScreenWidth()){return this.setProperty("demandPopin",e,true)}return this.setProperty("demandPopin",e)};d.prototype.setSortIndicator=function(e){this.setProperty("sortIndicator",e,true);this.$().attr("aria-sort",this.getSortIndicator().toLowerCase());return this};d.prototype.isPopin=function(){if(!this.getDemandPopin()){return false}if(this._media){return!this._media.matches}return false};d.prototype.isHidden=function(){if(this._media){return!this._media.matches}if(this._screen&&this._minWidth){return parseFloat(this._minWidth)>window.innerWidth}return false};d.prototype.setLastValue=function(e){if(this.getMergeDuplicates()){this._lastValue=e}return this};d.prototype.clearLastValue=function(){return this.setLastValue(NaN)};d.prototype.getLastValue=function(){return this._lastValue};d.prototype.onItemsRemoved=function(){this.clearLastValue()};d.prototype.getFocusDomRef=function(){var e=this.getParent();if(e&&e.bActiveHeaders){var i=this.getDomRef();if(i){return i.firstChild}}return t.prototype.getFocusDomRef.apply(this,arguments)};return d});