/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./ImageRenderer","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(t,e,i,r,s){"use strict";var o=t.ImageMode;var a=e.extend("sap.m.Image",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/Image.designtime",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},decorative:{type:"boolean",group:"Accessibility",defaultValue:true},alt:{type:"string",group:"Accessibility",defaultValue:null},useMap:{type:"string",group:"Misc",defaultValue:null},densityAware:{type:"boolean",group:"Misc",defaultValue:false},activeSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:""},mode:{type:"sap.m.ImageMode",group:"Misc",defaultValue:"Image"},backgroundSize:{type:"string",group:"Appearance",defaultValue:"cover"},backgroundPosition:{type:"string",group:"Appearance",defaultValue:"initial"},backgroundRepeat:{type:"string",group:"Appearance",defaultValue:"no-repeat"}},aggregations:{detailBox:{type:"sap.m.LightBox",multiple:false,bindable:"bindable"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{},press:{},load:{},error:{}}}});a._currentDevicePixelRatio=function(){var t=window.devicePixelRatio===undefined?1:window.devicePixelRatio;if(t<=1){t=1}else{t*=2;t=Math.round(t);t/=2}if(t>2){t=2}return t}();a.prototype.onload=function(t){var e,i;if(!this._defaultEventTriggered){this._defaultEventTriggered=true}this._bVersion2Tried=false;var r=this.$(),s=r[0];if(this.getMode()===o.Background){r.css("background-image",'url("'+this._oImage.src+'")')}if(!this._isWidthOrHeightSet()){if(this._iLoadImageDensity>1){e=Math.round(s.getBoundingClientRect().width);i=Math.round(s.getBoundingClientRect().height);if(e===s.naturalWidth&&i===s.naturalHeight){r.width(e/this._iLoadImageDensity)}}}r.removeClass("sapMNoImg");this.fireLoad()};a.prototype.onerror=function(t){if(!this._defaultEventTriggered){this._defaultEventTriggered=true}var e=this.$(),i=this.getMode(),r=i===o.Image?this._getDomImg().attr("src"):this._oImage.src,n=a._currentDevicePixelRatio,h=this._isActiveState?this.getActiveSrc():this.getSrc();e.addClass("sapMNoImg");if(!r||this._iLoadImageDensity===1){if(this.getAlt()&&!this.getDecorative()){e.removeClass("sapMNoImg")}this.fireError();return}if(n===2||n<1){this._iLoadImageDensity=1;this._updateDomSrc(this._generateSrcByDensity(h,1))}else if(n===1.5){if(this._bVersion2Tried){setTimeout(s.proxy(function(){this._iLoadImageDensity=1;this._updateDomSrc(this._generateSrcByDensity(h,1))},this),0)}else{setTimeout(s.proxy(function(){this._iLoadImageDensity=2;this._updateDomSrc(this._generateSrcByDensity(h,2));this._bVersion2Tried=true},this),0)}}};a.prototype.setDetailBox=function(t){var e=this.getDetailBox();if(t){if(t===e){return this}if(e){this.detachPress(this._fnLightBoxOpen,e)}this._fnLightBoxOpen=t.open;this.attachPress(this._fnLightBoxOpen,t)}else if(this._fnLightBoxOpen){this.detachPress(this._fnLightBoxOpen,e);this._fnLightBoxOpen=null}return this.setAggregation("detailBox",t)};a.prototype.clone=function(){var t=e.prototype.clone.apply(this,arguments),i=t.getDetailBox();if(i){t.detachPress(this._fnLightBoxOpen,this.getDetailBox());t._fnLightBoxOpen=i.open;t.attachPress(t._fnLightBoxOpen,i)}return t};a.prototype.onBeforeRendering=function(){this._defaultEventTriggered=false};a.prototype.onAfterRendering=function(){var t=this.getDetailBox()?this.$().find(".sapMImg"):this.$(),e=this.getMode(),i;if(e===o.Image){t.on("load",s.proxy(this.onload,this));t.on("error",s.proxy(this.onerror,this));i=t[0]}if(e===o.Background){i=this._oImage}if(i&&i.complete&&!this._defaultEventTriggered){if(i.naturalWidth>0){this.onload({})}else{this.onerror({})}}};a.prototype.exit=function(){if(this._oImage){s(this._oImage).off("load",this.onload).off("error",this.onerror);this._oImage=null}else{this.$().off("load",this.onload).off("error",this.onerror)}if(this._fnLightBoxOpen){this._fnLightBoxOpen=null}};a.prototype.ontouchstart=function(t){if(t.srcControl.mEventRegistry["press"]||t.srcControl.mEventRegistry["tap"]){t.setMarked()}if(t.targetTouches.length===1&&this.getActiveSrc()){this._updateDomSrc(this._getDensityAwareActiveSrc());this._isActiveState=true}};a.prototype.ontouchend=function(t){if(t.targetTouches.length===0&&this.getActiveSrc()){this._isActiveState=false;this._updateDomSrc(this._getDensityAwareSrc());this.$().removeClass("sapMNoImg")}};a.prototype.setSrc=function(t){if(t===this.getSrc()){return this}this.setProperty("src",t,true);var e=this.getDomRef();if(e){this._updateDomSrc(this._getDensityAwareSrc())}return this};a.prototype.setActiveSrc=function(t){if(!t){t=""}return this.setProperty("activeSrc",t,true)};a.prototype.attachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex","0");this.$().attr("role","button")}return this};a.prototype.detachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex");if(this.getDecorative()){this.$().attr("role","presentation")}else{this.$().removeAttr("role")}}return this};a.prototype.ontap=function(t){this.fireTap({});this.firePress({})};a.prototype.onkeyup=function(t){if(t.which===r.SPACE||t.which===r.ENTER){this.firePress({});t.stopPropagation()}};a.prototype._updateDomSrc=function(t){var e=this.$(),i=this.getMode();if(e.length){if(i===o.Image){this._getDomImg().attr("src",t)}else{e.addClass("sapMNoImg");s(this._oImage).attr("src",t)}}};a.prototype._getDomImg=function(){var t=this.$();return this.getDetailBox()?t.children("img"):t};a.prototype._preLoadImage=function(t){if(this.getMode()!==o.Background){return}var e=s(this._oImage);if(!this._oImage){this._oImage=new window.Image;e=s(this._oImage);e.on("load",s.proxy(this.onload,this)).on("error",s.proxy(this.onerror,this))}this._oImage.src=t};a.prototype._isWidthOrHeightSet=function(){return this.getWidth()&&this.getWidth()!==""||this.getHeight()&&this.getHeight()!==""};a.prototype._getDensityAwareSrc=function(){var t=this.getSrc(),e=this.getDensityAware(),i=e?a._currentDevicePixelRatio:1;this._iLoadImageDensity=i;if(i===1){return t}return this._generateSrcByDensity(t,i)};a.prototype._getDensityAwareActiveSrc=function(){var t=this.getActiveSrc(),e=this.getDensityAware(),i=e?a._currentDevicePixelRatio:1;this._iLoadImageDensity=i;if(i===1){return t}return this._generateSrcByDensity(t,i)};a.prototype._generateSrcByDensity=function(t,e){if(!t){return""}if(this._isDataUri(t)){this._iLoadImageDensity=1;return t}if(e===1){return t}var i=t.lastIndexOf("."),r=t.lastIndexOf("/"),s=t.substring(0,i),o=t.substring(i);if(i===-1||r>i){return t+"@"+e}s=s+"@"+e;return s+o};a.prototype._isDataUri=function(t){return t?t.indexOf("data:")===0:false};a.prototype.getAccessibilityInfo=function(){var t=this.hasListeners("press");if(this.getDecorative()&&!this.getUseMap()&&!t){return null}return{role:t?"button":"img",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(t?"ACC_CTR_TYPE_BUTTON":"ACC_CTR_TYPE_IMAGE"),description:this.getAlt()||this.getTooltip_AsString()||"",focusable:t}};a.prototype.getFormDoNotAdjustWidth=function(){return true};return a});