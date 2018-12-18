/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","./WizardProgressNavigator","sap/ui/Device","./WizardRenderer","sap/ui/dom/containsOrEquals","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Focusable"],function(t,e,i,r,s,n,o,a,p){"use strict";var u=e.extend("sap.m.Wizard",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Wizard.designtime",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},showNextButton:{type:"boolean",group:"Behavior",defaultValue:true},finishButtonText:{type:"string",group:"Appearance",defaultValue:"Review"},enableBranching:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"steps",aggregations:{steps:{type:"sap.m.WizardStep",multiple:true,singularName:"step"},_progressNavigator:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{
/**
					 * This association controls the current activated step of the wizard (meaning the last step)
					 * For example if we have A->B->C->D steps, we are on step A and we setCurrentStep(C) A,B and C are going to be activated. D will still remain unvisited.
					 * The parameter needs to be a Wizard step that is part of the current Wizard
					 * @since 1.50
					 */
currentStep:{type:"sap.m.WizardStep",multiple:false}},events:{stepActivate:{parameters:{index:{type:"int"}}},complete:{parameters:{}}}}});u.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8,ANIMATION_TIME:300,SCROLL_OFFSET:16};u.prototype.init=function(){this._stepCount=0;this._stepPath=[];this._scrollLocked=false;this._scroller=this._initScrollEnablement();this._resourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._initProgressNavigator()};u.prototype.onBeforeRendering=function(){if(!this._isMinStepCountReached()||this._isMaxStepCountExceeded()){a.error("The Wizard is supposed to handle from 3 to 8 steps.")}this._saveInitialValidatedState();var t=this._getStartingStep();if(t&&this._stepPath.indexOf(t)<0){this._activateStep(t);this._updateProgressNavigator()}};u.prototype.onAfterRendering=function(){if(!this.getCurrentStep()){this.setAssociation("currentStep",this.getSteps()[0],true)}var t=sap.ui.getCore().byId(this.getCurrentStep());this._activateAllPreceedingSteps(t);this._attachScrollHandler()};u.prototype.exit=function(){var t=this.getDomRef("step-container");if(t){t.onscroll=null}this._scroller.destroy();this._scroller=null;this._stepPath=null;this._stepCount=null;this._scrollLocked=null;this._resourceBundle=null};u.prototype.validateStep=function(t){if(!this._containsStep(t)){a.error("The wizard does not contain this step");return this}t.setProperty("validated",true,true);this._updateNextButtonState();return this};u.prototype.invalidateStep=function(t){if(!this._containsStep(t)){a.error("The wizard does not contain this step");return this}t.setProperty("validated",false,true);this._updateNextButtonState();return this};u.prototype.nextStep=function(){var t=this._getProgressNavigator().getProgress()-1;var e=this._stepPath[t];this.validateStep(e);this._handleNextButtonPress();return this};u.prototype.previousStep=function(){var t=this._getProgressNavigator().getProgress()-2;if(t>=0){this.discardProgress(this._stepPath[t])}return this};u.prototype.getProgress=function(){return this._getProgressNavigator().getProgress()};u.prototype.getProgressStep=function(){return this._stepPath[this.getProgress()-1]};u.prototype.goToStep=function(t,e){if(!this.getVisible()||this._stepPath.indexOf(t)<0){return this}var i=this,r={scrollTop:this._getStepScrollOffset(t)},s={queue:false,duration:u.CONSTANTS.ANIMATION_TIME,start:function(){i._scrollLocked=true},complete:function(){i._scrollLocked=false;var r=i._getProgressNavigator();if(!r){return}r._updateCurrentStep(i._stepPath.indexOf(t)+1,undefined,true);if(e||e===undefined){i._focusFirstStepElement(t)}}};p(this.getDomRef("step-container")).animate(r,s);return this};u.prototype.discardProgress=function(t,e){var i=this.getProgress(),r=this._stepPath,s=this._stepPath.indexOf(t),n=this._stepPath[s],o=s+1;if(o>i||o<=0){a.warning("The given step is either not yet reached, or is not present in the wizard control.");return this}this._getProgressNavigator().discardProgress(o,true);this._updateNextButtonState();this._restoreInitialValidatedState(o);n._markAsLast();for(var p=0;p<o-1;p++){var u=r[p].getAggregation("_nextButton");u.setEnabled(false);u.removeStyleClass("sapMWizardNextButtonVisible")}for(var h=o;h<r.length;h++){r[h]._deactivate();if(r[h].getSubsequentSteps().length>1){r[h].setNextStep(null)}}if(t.getSubsequentSteps().length>1&&!e){t.setNextStep(null)}r.splice(o);this._updateProgressNavigator();this.setAssociation("currentStep",t);n._oNextButton.setVisible(true);return this};u.prototype.setCurrentStep=function(t){this.setAssociation("currentStep",t,true);var e=typeof t==="string"?sap.ui.getCore().byId(t):t;if(e&&this._isStepReachable(e)){this._activateAllPreceedingSteps(e)}return this};u.prototype.setShowNextButton=function(t){this.setProperty("showNextButton",t,true);this.getSteps().forEach(function(e){e.getAggregation("_nextButton").setVisible(t)});return this};u.prototype.setFinishButtonText=function(t){this.setProperty("finishButtonText",t,true);this._updateNextButtonState();return this};u.prototype.getFinishButtonText=function(){if(this.getProperty("finishButtonText")==="Review"){return this._resourceBundle.getText("WIZARD_FINISH")}else{return this.getProperty("finishButtonText")}};u.prototype.addStep=function(t){if(this._isMaxStepCountExceeded()){a.error("The Wizard is supposed to handle up to 8 steps.");return this}t._attachNextButtonHandler(this._handleNextButtonPress.bind(this));this._incrementStepCount();return this.addAggregation("steps",t)};u.prototype.insertStep=function(t,e){throw new Error("Dynamic step insertion is not yet supported.")};u.prototype.removeStep=function(t){throw new Error("Dynamic step removal is not yet supported.")};u.prototype.removeAllSteps=function(){this._resetStepCount();this.getSteps().forEach(function(t){t._detachNextButtonHandler()});return this.removeAllAggregation("steps")};u.prototype.destroySteps=function(){this._resetStepCount();this._getProgressNavigator().setStepCount(this._getStepCount());return this.destroyAggregation("steps")};u.prototype._activateAllPreceedingSteps=function(t){if(this._stepPath.indexOf(t)>=0){this.discardProgress(t,true);return}while(this.getProgressStep()!==t){this.nextStep()}};u.prototype._isNextStepDetermined=function(t,e){if(!this.getEnableBranching()){return true}t=t||sap.ui.getCore().byId(this.getCurrentStep());return this._getNextStep(t,e)!==null};u.prototype._isStepReachable=function(t){if(this.getEnableBranching()){var e=this._getStartingStep();while(e!==t){e=e._getNextStepReference();if(e==null){return false}}return true}else{return this.getSteps().indexOf(t)>=0}};u.prototype._initScrollEnablement=function(){return new i(this,null,{scrollContainerId:this.getId()+"-step-container",horizontal:false,vertical:true})};u.prototype._initProgressNavigator=function(){var t=this,e=new r(this.getId()+"-progressNavigator",{stepChanged:this._handleStepChanged.bind(this)});e._setOnEnter(function(e,i){var r=t._stepPath[i];setTimeout(function(){this._focusFirstStepElement(r)}.bind(t),u.CONSTANTS.ANIMATION_TIME)});this.setAggregation("_progressNavigator",e)};u.prototype._handleNextButtonPress=function(){var t=this._getProgressNavigator(),e=this._stepPath[this._stepPath.length-1],i=t.getProgress(),r=t.getStepCount(),s=this.getEnableBranching()?e._isLeaf():i===r;if(s){this.fireComplete()}else{var n=this.getProgressStep();this._getNextButton().setVisible(false);n._complete();if(!this._isNextStepDetermined(n,i)){throw new Error("The wizard is in branching mode, and the nextStep association is not set.")}if(i===r){t.setStepCount(r+1);t.rerender()}t.incrementProgress();this._handleStepActivated(t.getProgress());this._handleStepChanged(t.getProgress());this.setAssociation("currentStep",this._stepPath[this._stepPath.length-1],true)}this._updateNextButtonState()};u.prototype._getStepScrollOffset=function(t){var e=t.$().position().top,i=this._scroller.getScrollTop(),r=this._stepPath[this.getProgress()-1],n=0;if(!s.system.phone&&!o(r.getDomRef(),this._getNextButton().getDomRef())){n=this._getNextButton().$().outerHeight()}return i+e-(u.CONSTANTS.SCROLL_OFFSET+n)};u.prototype._focusFirstStepElement=function(t){var e=t.$();if(e.firstFocusableDomRef()){e.firstFocusableDomRef().focus()}};u.prototype._handleStepChanged=function(t){var e=(typeof t==="number"?t:t.getParameter("current"))-2;var i=this._stepPath[e];var r=this._getNextStep(i,e);var n=s.system.desktop?true:false;this.goToStep(r,n)};u.prototype._handleStepActivated=function(t){var e=t-2,i=this._stepPath[e];var r=this._getNextStep(i,e);this._activateStep(r);this._updateProgressNavigator();this.fireStepActivate({index:t})};u.prototype._isMaxStepCountExceeded=function(){if(this.getEnableBranching()){return false}var t=this._getStepCount();return t>=u.CONSTANTS.MAXIMUM_STEPS};u.prototype._isMinStepCountReached=function(){var t=this._getStepCount();return t>=u.CONSTANTS.MINIMUM_STEPS};u.prototype._getStepCount=function(){return this._stepCount};u.prototype._incrementStepCount=function(){this._stepCount+=1;this._getProgressNavigator().setStepCount(this._getStepCount())};u.prototype._decrementStepCount=function(){this._stepCount-=1;this._getProgressNavigator().setStepCount(this._getStepCount())};u.prototype._resetStepCount=function(){this._stepCount=0;this._getProgressNavigator().setStepCount(this._getStepCount())};u.prototype._getProgressNavigator=function(){return this.getAggregation("_progressNavigator")};u.prototype._saveInitialValidatedState=function(){if(this._initialValidatedState){return}this._initialValidatedState=this.getSteps().map(function(t){return t.getValidated()})};u.prototype._restoreInitialValidatedState=function(t){var e=this._stepPath,i=this.getSteps();for(var r=t;r<e.length;r++){var s=e[r];var n=i.indexOf(s);var o=this._initialValidatedState[n];s.setValidated(o)}};u.prototype._getNextStep=function(t,e){if(!this.getEnableBranching()){return this.getSteps()[e+1]}if(e<0){return this._getStartingStep()}var i=t._getNextStepReference();if(i===null){throw new Error("The wizard is in branching mode, and no next step is defined for "+"the current step, please set one.")}if(!this._containsStep(i)){throw new Error("The next step that you have defined is not part of the wizard steps aggregation."+"Please add it to the wizard control.")}var r=t.getSubsequentSteps();if(r.length>0&&!t._containsSubsequentStep(i.getId())){throw new Error("The next step that you have defined is not contained inside the subsequentSteps"+" association of the current step.")}return i};u.prototype._updateNextButtonState=function(){if(!this._getNextButton()){return}var t,e=this._getStepCount(),i=this._getNextButton(),r=this.getProgress(),s=this._stepPath[r-1].getValidated();if(this.getEnableBranching()){t=this._stepPath[r-1]._isLeaf()}else{t=r===e}i.setEnabled(s);if(t){i.setText(this.getFinishButtonText())}else{i.setText(this._resourceBundle.getText("WIZARD_STEP")+" "+(r+1))}};u.prototype._getNextButton=function(){var t=this._stepPath[this._stepPath.length-1];if(t){return t.getAggregation("_nextButton")}else{return null}};u.prototype._updateProgressNavigator=function(){var t=this._getProgressNavigator(),e=this._getStartingStep(),i=this.getSteps(),r=[e.getTitle()],s=[e.getIcon()],n=[e.getOptional()],o=1;if(this.getEnableBranching()){while(!e._isLeaf()&&e._getNextStepReference()!==null){o++;e=e._getNextStepReference();r.push(e.getTitle());n.push(e.getOptional());s.push(e.getIcon())}t.setVaryingStepCount(e._isBranched());t.setStepCount(o)}else{r=i.map(function(t){return t.getTitle()});n=i.map(function(t){return t.getOptional()});s=i.map(function(t){return t.getIcon()})}t.setStepTitles(r);t._stepOptionalIndication=n;t.setStepIcons(s)};u.prototype._getStartingStep=function(){return this.getSteps()[0]};u.prototype._attachScrollHandler=function(){var t=this.getDomRef("step-container");t.onscroll=this._scrollHandler.bind(this)};u.prototype._scrollHandler=function(t){if(this._scrollLocked){return}var e=t.target.scrollTop,i=this._getProgressNavigator(),r=this._stepPath[i.getCurrentStep()-1].getDomRef();if(!r){return}var s=r.clientHeight,n=r.offsetTop,o=100;if(e+o>=n+s&&i._isActiveStep(i._currentStep+1)){i.nextStep()}while(e+o<=n){i.previousStep();r=this._stepPath[i.getCurrentStep()-1].getDomRef();if(!r){return}n=r.offsetTop}};u.prototype._containsStep=function(t){return this.getSteps().some(function(e){return e===t})};u.prototype._checkCircularReference=function(t){if(this._stepPath.indexOf(t)>=0){throw new Error("The step that you are trying to activate has already been visited. You are creating "+"a loop inside the wizard.")}};u.prototype._activateStep=function(t){this._checkCircularReference(t);this._stepPath.push(t);t._activate()};return u});