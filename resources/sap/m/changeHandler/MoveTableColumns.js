/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t){"use strict";var n={};var r="source";var o="target";var i="movedElements";var a="columns";var g="cells";var d="items";function s(n,i,s,c){var l=s.modifier,u=s.view,f=s.appComponent,v=n.getContent(),p=n.getDependentControl(r,s),m=n.getDependentControl(o,s),h=l.getAggregation(m,a),C=function(t,n,r){var o=l.getAggregation(t,g);if(!o){e.warning("Aggregation cells to move not found");return}if(n<0||n>=o.length){e.warning("Move cells in table item called with invalid index: "+n);return}var i=o[n];l.removeAggregation(t,g,i);l.insertAggregation(t,g,i,r,u)},y=function(e,t){l.getAggregation(m,d).forEach(function(n){if(l.getControlType(n)==="sap.m.GroupHeaderListItem"){return}C(n,e,t)})};if(p!==m){e.warning("Moving columns between different tables is not yet supported.");return false}v.movedElements.forEach(function(n){var r=l.bySelector(n.selector,f,u),o,i,g,s,v;if(!r){v=n.selector&&n.selector.id;e.warning("The table column with id: '"+v+"' stored in the change is not found and the move operation cannot be applied");return}g=h.indexOf(r);s=n.sourceIndex;i=t.isFunction(c)&&c(g);i=t.isNumeric(i)?i:n.targetIndex;if(g!==i){o=g}else{o=s}l.removeAggregation(m,a,r);l.insertAggregation(m,a,r,i,u);var p=l.getBindingTemplate(m,d);if(p){C(p,o,i);l.updateAggregation(m,d)}else{y(o,i)}},this);return true}n.applyChange=function(e,t,n){var r=[];s(e,t,n,function(e){r.unshift({index:e})});e.setRevertData(r)};n.revertChange=function(e,t,n){var r=e.getRevertData();s(e,t,n,function(){var e=r.shift();return e&&e.index});e.resetRevertData()};n.completeChangeContent=function(e,t,n){var a=n.modifier,g=n.appComponent,d=e.getDefinition(),s=a.bySelector(t.source.id,g),c=a.bySelector(t.target.id,g),l={aggregation:t.source.aggregation,type:a.getControlType(s)},u={aggregation:t.target.aggregation,type:a.getControlType(c)};d.content={movedElements:[]};t.movedElements.forEach(function(e){var t=e.element||a.bySelector(e.id,g);d.content.movedElements.push({selector:a.getSelector(t,g),sourceIndex:e.sourceIndex,targetIndex:e.targetIndex})});e.addDependentControl(t.source.id,r,n,l);e.addDependentControl(t.target.id,o,n,u);e.addDependentControl(t.movedElements.map(function(e){return e.id}),i,n)};return n},true);