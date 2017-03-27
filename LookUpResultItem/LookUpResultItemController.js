({
	tryToSelect : function(component, event, helper) {
		var NAMESPACE = "c";
		var elementId = component.get("v.elementId");
		var elementName = component.get("v.elementName");
		var fieldApiName = component.get("v.fieldApiName");

		var evtItemSelected = $A.get("e."+NAMESPACE+":EvtLookUpItemSelected");
		evtItemSelected.setParams({"fieldApiName" : fieldApiName, "fieldElementId" : elementId, "fieldElementName" : elementName, "isClear" : false});
		evtItemSelected.fire();
	}
})