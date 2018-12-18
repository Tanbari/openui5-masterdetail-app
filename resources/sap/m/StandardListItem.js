/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/IconPool","./library","./ListItemBase","./Image","./StandardListItemRenderer"],function(e,t,i,a,o,n){"use strict";var r=e.TextDirection;var s=e.ValueState;var p=a.extend("sap.m.StandardListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},description:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconInset:{type:"boolean",group:"Appearance",defaultValue:true},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},info:{type:"string",group:"Misc",defaultValue:null},infoState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:s.None},adaptTitleSize:{type:"boolean",group:"Appearance",defaultValue:true},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:r.Inherit},infoTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:r.Inherit}},designtime:"sap/m/designtime/StandardListItem.designtime"}});p.prototype.exit=function(){if(this._oImage){this._oImage.destroy("KeepDom")}a.prototype.exit.apply(this,arguments)};p.prototype.setIcon=function(e){var i=this.getIcon();this.setProperty("icon",e);if(this._oImage&&(!e||t.isIconURI(e)!=t.isIconURI(i))){this._oImage.destroy("KeepDom");this._oImage=undefined}return this};p.prototype._getImage=function(){var e=this._oImage;if(e){e.setSrc(this.getIcon());if(e.setDensityAware){e.setDensityAware(this.getIconDensityAware())}}else{e=t.createControlByURI({id:this.getId()+"-img",src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false},o).setParent(this,null,true)}var i=this.getIconInset()?"sapMSLIImg":"sapMSLIImgThumb";e.addStyleClass(e instanceof o?i:i+"Icon",true);this._oImage=e;return this._oImage};p.prototype._activeHandlingInheritor=function(){if(this._oImage){var e=this.getActiveIcon();e&&this._oImage.setSrc(e)}};p.prototype._inactiveHandlingInheritor=function(){if(this._oImage){this._oImage.setSrc(this.getIcon())}};p.prototype.getContentAnnouncement=function(e){var t="",i=this.getInfoState();t+=this.getTitle()+" "+this.getDescription()+" "+this.getInfo()+" ";if(i!="None"&&i!=this.getHighlight()){t+=e.getText("LIST_ITEM_STATE_"+i.toUpperCase())}return t};return p});