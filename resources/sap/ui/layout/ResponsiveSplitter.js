/*!
* UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","sap/ui/core/Control","./ResponsiveSplitterUtilities","./ResponsiveSplitterPage","./PaneContainer","./SplitPane","sap/ui/core/delegate/ItemNavigation","sap/ui/core/ResizeHandler","./ResponsiveSplitterRenderer","sap/ui/thirdparty/jquery"],function(t,e,i,a,n,s,o,r,p,l){"use strict";var g=e.extend("sap.ui.layout.ResponsiveSplitter",{metadata:{library:"sap.ui.layout",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"}},defaultAggregation:"rootPaneContainer",aggregations:{rootPaneContainer:{type:"sap.ui.layout.PaneContainer",multiple:false},_pages:{type:"sap.ui.layout.ResponsiveSplitterPage",multiple:true,visibility:"hidden"}},associations:{defaultPane:{type:"sap.ui.layout.SplitPane",multiple:false}},events:{}}});var u={MAX_VISIBLE_BUTTONS:7};g.prototype.init=function(){this._aPaneContainers=[];this._aPanes=[];this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout");this.addEventDelegate({onAfterRendering:function(){this._initItemNavigation()}},this)};g.prototype.onBeforeRendering=function(){var t=this.getRootPaneContainer();if(t){t._oSplitter.addEventDelegate({onAfterRendering:function(){this._setSplitterBarsTooltips(t._oSplitter);this._updatePaginatorButtonsTooltips()}},this);this._createWidthIntervals();this._createPages();this._detachResizeHandler()}};g.prototype.onAfterRendering=function(){this._parentResizeHandler=r.register(this,this._onParentResize.bind(this));var t=this.getRootPaneContainer();if(t){this._onParentResize()}};g.prototype.exit=function(){this._detachResizeHandler()};g.prototype._setSplitterBarsTooltips=function(t,e){var i=t.$().find(" > .sapUiLoSplitterBar"),a=t.$().find(" > .sapUiLoSplitterContent"),n="",s,o,r,p;for(var l=0;l<a.length;l++){p=a[l].childNodes[0].id;r=sap.ui.getCore().byId(p);s=l+1;o=l+2;if(e){n+=this._oResourceBundle.getText("RESPONSIVE_SPLITTER_RESIZE",[e+"."+s,e+"."+o])}else{n+=this._oResourceBundle.getText("RESPONSIVE_SPLITTER_RESIZE",[s,o])}if(i[l]){i[l].setAttribute("title",n);n=""}if(r instanceof sap.ui.layout.Splitter){this._setSplitterBarsTooltips(r,s)}}};g.prototype._updatePaginatorButtonsTooltips=function(){var t=Array.prototype.slice.call(this._getVisibleButtons()),e=this.getRootPaneContainer()._oSplitter.getAssociatedContentAreas().length,i=this._oResourceBundle.getText("RESPONSIVE_SPLITTER_HOME")+" ",a=this._oResourceBundle.getText("RESPONSIVE_SPLITTER_AND"),n="",s=this,o;if(t.length>0){o=t.shift();for(var r=1;r<=e;r++){i+=r;if(r<e-1){i+=", "}else if(r===e-1){i+=" "+a+" "}}o.setAttribute("title",i);[].forEach.call(t,function(t){n=s._oResourceBundle.getText("RESPONSIVE_SPLITTER_GOTO")+" "+(e+1);e+=1;t.setAttribute("title",n)})}};g.prototype._handlePaginatorButtonTap=function(t){var e=this._oItemNavigation.getFocusedIndex();if(l(t.target).hasClass("sapUiResponsiveSplitterPaginatorButton")){l(t.target).attr("tabindex",0);var i=parseInt(l(t.target).attr("page-index"));this.getAggregation("_pages").forEach(function(t){t.setVisible(false)});if(i!==0){var a=this._currentInterval.aPages.filter(function(t){return t.demandPane});i=this._currentInterval.aPages.indexOf(a[i-1])}this._activatePage(i,parseInt(l(t.target).attr("page-index")))}if(l(t.target).hasClass("sapUiResponsiveSplitterPaginatorNavButton")){if(l(t.target).hasClass("sapUiResponsiveSplitterPaginatorButtonForward")){this._handlePaginatorForward(t)}else{this._handlePaginatorBack(t)}this._setItemNavigation();this._oItemNavigation.focusItem(e)}this._setItemNavigation()};g.prototype.ontap=g.prototype._handlePaginatorButtonTap;g.prototype.onsapenter=g.prototype._handlePaginatorButtonTap;g.prototype.onsapspace=g.prototype._handlePaginatorButtonTap;g.prototype.onsapright=function(t){this._handleArrowNavigation(6,"Forward",t)};g.prototype.onsapleft=function(t){this._handleArrowNavigation(0,"Back",t)};g.prototype._initItemNavigation=function(){if(this._oItemNavigation){this._bPrevItemNavigation=true;this._clearItemNavigation()}this._oItemNavigation=new o;this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._setItemNavigation();if(this._bPrevItemNavigation){this._oItemNavigation.focusItem(0)}};g.prototype._setItemNavigation=function(){var t=this._getVisibleButtons(),e=[];this._oItemNavigation.setRootDomRef(this.$().find(".sapUiResponsiveSplitterPaginator")[0]);for(var i=0;i<t.length;i++){if(t[i]){e.push(t[i])}}this._oItemNavigation.setItemDomRefs(e)};g.prototype._clearItemNavigation=function(){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation};g.prototype._handleArrowNavigation=function(t,e,i){if(i.target===this._getVisibleButtons()[t]){this["_handlePaginator"+e](i);this._setItemNavigation()}else{return}};g.prototype._onParentResize=function(){var t=this._intervalHasChanged(),e=this.getRootPaneContainer();if(t&&e){this._arrangeContent();this._setPaginatorVisibility()}};g.prototype._detachResizeHandler=function(){if(this._parentResizeHandler){r.deregister(this._parentResizeHandler);this._parentResizeHandler=null}};g.prototype._createWidthIntervals=function(){var t=[];this._aIntervals=[];i.visitPanes(this.getRootPaneContainer(),function(e){var i=e.getRequiredParentWidth();if(t.indexOf(i)==-1){t.push(i)}});t.push(Number.NEGATIVE_INFINITY);t.push(Number.POSITIVE_INFINITY);t.sort(function(t,e){return t-e});for(var e=0;e<t.length-1;e++){var a=new i.splitterInterval(t[e],t[e+1],this.getRootPaneContainer());this._aIntervals.push(a)}};g.prototype._createPages=function(){var t=this._getMaxPageCount();this.destroyAggregation("_pages",true);for(var e=0;e<t;e++){var i=new a;this.addAggregation("_pages",i,true)}};g.prototype._intervalHasChanged=function(){var t=this.getDomRef().clientWidth,e=null,i=this._aIntervals;for(var a=0;a<i.length;a++){if(i[a].iFrom<t&&t<=i[a].iTo){e=i[a];break}}if(this._currentInterval!==e){this._currentInterval=e;return true}return false};g.prototype._setPaginatorVisibility=function(){var t=this.$().find(".sapUiResponsiveSplitterPaginatorButton"),e=this.$().find(".sapUiResponsiveSplitterPaginatorNavButton"),i=this.$().find(".sapUiResponsiveSplitterPaginator"),a=this._getHiddenPanes().length+1,n=a<u.MAX_VISIBLE_BUTTONS;t.addClass("sapUiResponsiveSplitterHiddenElement");if(a>1){this.getDomRef().classList.add("sapUiRSVisiblePaginator");t=t.slice(0,n?a:u.MAX_VISIBLE_BUTTONS);t.removeClass("sapUiResponsiveSplitterHiddenElement");t.removeClass("sapUiResponsiveSplitterHiddenPaginatorButton");e.toggleClass("sapUiResponsiveSplitterHiddenPaginatorButton",n);i.toggleClass("sapUiResponsiveSplitterWithNavButtons",!n)}else{this.getDomRef().classList.remove("sapUiRSVisiblePaginator")}};g.prototype._getMaxPageCount=function(){var t=0;this._aIntervals.forEach(function(e){if(e.iPagesCount>t){t=e.iPagesCount}});return t};g.prototype._arrangeContent=function(){var t=this.getAggregation("_pages")||[];this._clearContent();t.forEach(function(t){t.setVisible(false)});this._fillPageContent(this.getRootPaneContainer());this._activatePage(0)};g.prototype._activatePage=function(t){var e=this.$().find(".sapUiResponsiveSplitterPaginatorButton"),i=this.$().find(".sapUiResponsiveSplitterPaginatorSelectedButton"),a=e.index(i),n=this.getAggregation("_pages")||[];n[a]&&n[a].setVisible(false);n[t]&&n[t].setVisible(true);i.removeClass("sapUiResponsiveSplitterPaginatorSelectedButton");e.eq(t).addClass("sapUiResponsiveSplitterPaginatorSelectedButton");i.attr("aria-checked",false);e.eq(t).attr("aria-checked",true)};g.prototype._fillPageContent=function(t){var e=t instanceof n,i=t instanceof s,a=t.getParent(),o=a instanceof n,r=this.getAggregation("_pages"),p,l,g,u,h,d;if(e&&r){this._aPaneContainers.push(t);l=this._getAllPanesInInterval(t,this._currentInterval.iFrom).length>0;g=t._oSplitter;if(o&&l){a._oSplitter.addAssociatedContentArea(g)}else if(!o){r[0].setContent(g)}t.getPanes().forEach(function(t){this._fillPageContent(t)},this)}else if(i&&r){this._assignDefault(t);this._aPanes.push(t);u=t.getDemandPane();p=this._getHiddenPanes();h=p.length;d=this._getMaxPageCount();var f;if(t._isInInterval(this._currentInterval.iFrom)){a._oSplitter.addAssociatedContentArea(t.getContent())}else if(u&&h<d){for(f=0;f<h;f++){r[f+1].setContent(p[f].getContent())}}else if(u&&h===d){for(f=0;f<h;f++){r[f].setContent(p[f].getContent())}}else if(this._isDefault(t)){r[0].setContent(t.getContent())}}};g.prototype._isDefault=function(t){return this.getDefaultPane()===t.getId()};g.prototype._assignDefault=function(t){var e=this.getDefaultPane();this.setDefaultPane(e||t)};g.prototype._getAllPanesInInterval=function(t,e){var i=[];function a(t){t.getPanes().forEach(function(t){if(t instanceof n){a(t)}else if(t._isInInterval(e)){i.push(t)}});return i}return a(t,e)};g.prototype._getHiddenPanes=function(){return this._aPanes.filter(function(t){return t.getDemandPane()&&!t._isInInterval(this._currentInterval.iFrom)},this)};g.prototype._clearContent=function(){this._aPaneContainers.forEach(function(t){t._oSplitter.removeAllAssociatedContentArea()});this._aPaneContainers=[];this._aPanes=[]};g.prototype._getVisibleButtons=function(){return this.$().find(".sapUiResponsiveSplitterPaginatorButton:not(.sapUiResponsiveSplitterHiddenElement, .sapUiResponsiveSplitterHiddenPaginatorButton)")};g.prototype._handlePaginatorButtonTap=function(t){var e=t.target,i=t.target.classList,a;if(i.contains("sapUiResponsiveSplitterPaginatorButton")){a=e.getAttribute("page-index");this._activatePage(a)}else if(i.contains("sapUiResponsiveSplitterPaginatorNavButton")){if(i.contains("sapUiResponsiveSplitterPaginatorButtonForward")){this._handlePaginatorForward(t)}else{this._handlePaginatorBack(t)}}};g.prototype._handlePaginatorForward=function(t){var e=this._getVisibleButtons(),i=this._getHiddenPanes().length,a=this.$().find(".sapUiResponsiveSplitterPaginatorButton.sapUiResponsiveSplitterHiddenElement"),n=a.filter(function(){return this.getAttribute("page-index")>=u.MAX_VISIBLE_BUTTONS&&this.getAttribute("page-index")<=i});if(n.length>0){e.first().addClass("sapUiResponsiveSplitterHiddenElement");n.last().removeClass("sapUiResponsiveSplitterHiddenElement")}};g.prototype._handlePaginatorBack=function(t){var e=this._getVisibleButtons(),i=this._getMaxPageCount()-u.MAX_VISIBLE_BUTTONS,a=this.$().find(".sapUiResponsiveSplitterPaginatorButton.sapUiResponsiveSplitterHiddenElement"),n=a.filter(function(){return this.getAttribute("page-index")<i});if(n.length>0){e.last().addClass("sapUiResponsiveSplitterHiddenElement");n.last().removeClass("sapUiResponsiveSplitterHiddenElement")}};g.prototype.ontap=g.prototype._handlePaginatorButtonTap;g.prototype.onsapenter=g.prototype._handlePaginatorButtonTap;g.prototype.onsapspace=g.prototype._handlePaginatorButtonTap;return g});