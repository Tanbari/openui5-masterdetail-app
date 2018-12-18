/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/base/security/encodeXML"],function(e,t){"use strict";var a=e.AvatarSize;var i=e.AvatarType;var s={};s.render=function(e,s){var r=s.getInitials(),l=s._getActualDisplayType(),d=s.getDisplaySize(),n=s.getDisplayShape(),p=s.getImageFitType(),o=s.getCustomDisplaySize(),g=s.getCustomFontSize(),u=s._getEscapedSrc(),b="sapFAvatar",c=s.getTooltip_AsString(),w=s._getDefaultTooltip(),y=s.getAriaLabelledBy(),f=s.getAriaDescribedBy(),A=c&&r?w+" "+c:w,C=r?w+" "+r:w;e.write("<span");e.writeControlData(s);e.addClass(b);e.addClass(b+d);e.addClass(b+l);e.addClass(b+n);if(s.hasListeners("press")){e.addClass("sapMPointer");e.addClass("sapFAvatarFocusable");e.writeAttribute("role","button");e.writeAttribute("tabIndex",0)}else{e.writeAttribute("role","img")}if(l===i.Image){e.addClass(b+l+p);e.addStyle("background-image","url('"+t(u)+"')")}if(d===a.Custom){e.addStyle("width",o);e.addStyle("height",o);e.addStyle("font-size",g)}if(c){e.writeAttributeEscaped("title",c);e.writeAttributeEscaped("aria-label",A)}else{e.writeAttributeEscaped("aria-label",C)}if(y&&y.length>0){e.writeAttributeEscaped("aria-labelledby",y.join(" "))}if(f&&f.length>0){e.writeAttributeEscaped("aria-describedby",f.join(" "))}e.writeClasses();e.writeStyles();e.write(">");if(l===i.Icon){e.renderControl(s._getIcon())}else if(l===i.Initials){e.write("<span");e.addClass(b+"InitialsHolder");e.writeClasses();e.write(">");e.writeEscaped(r);e.write("</span>")}if(s._fnLightBoxOpen){e.write('<span class="sapFAvatarMagnifyingGlass"></span>')}e.write("</span>")};return s},true);