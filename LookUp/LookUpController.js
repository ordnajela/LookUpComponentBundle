({
	tryToSearch : function(component, event, helper) {
		var searchCriteria = component.get("v.searchCriteria");
		var apiName = component.get("v.objectApiName");
		if(searchCriteria.length <= 2)
		{
			component.set("v.results", []);
			$A.util.addClass(component.find("divResults"), "slds-hide");
			return;
		}
		helper.executeSearch(component, apiName, searchCriteria);
	},
	handleSelection : function(component, event, helper) {
		var isClear = event.getParam("isClear");
		if(isClear === false && event.getParam("fieldApiName") === component.get("v.fieldApiName"))
		{
			var itxtCriteria = component.find("itxtCriteria");
			itxtCriteria.set("v.value", event.getParam("fieldElementName"));
			itxtCriteria.set("v.disabled", true);
			var icon = component.find("icSearchClose");
			icon.set("v.iconName", "utility:close");
			component.set("v.isSelected", true);
			component.set("v.results", []);
			$A.util.addClass(component.find("divResults"), "slds-hide");
		}
	},
	tryToClear : function(component, event, helper) {
		var isSelected = component.get("v.isSelected");
		if(isSelected === true)
		{
			var itxtCriteria = component.find("itxtCriteria");
			var fieldApiName = component.get("v.fieldApiName");
			itxtCriteria.set("v.value", "");
			itxtCriteria.set("v.disabled", false);
			var icon = component.find("icSearchClose");
			icon.set("v.iconName", "utility:search");
			component.set("v.isSelected", false);
			var NAMESPACE = "c";
			var evtItemSelected = $A.get("e."+NAMESPACE+":EvtLookUpItemSelected");
			evtItemSelected.setParams({"isClear" : true, "fieldApiName" : fieldApiName});
			evtItemSelected.fire();
		}
	},
	doInit : function(component, event, helper)
	{
		var selectedElementId = component.get("v.selectedElementId");
		if(selectedElementId !== null && selectedElementId !== "")
		{
			var actionGetName = component.get("c.getSelectedName");
			actionGetName.setParams({
				"objectApiName" : component.get("v.objectApiName"),
				"selectedElementId" : component.get("v.selectedElementId")
			});
			actionGetName.setCallback(this, function(response) {
				var state = response.getState();
				if(state === "SUCCESS")
				{
					var itxtCriteria = component.find("itxtCriteria");
					itxtCriteria.set("v.value", response.getReturnValue());
					itxtCriteria.set("v.disabled", true);
					var icon = component.find("icSearchClose");
					icon.set("v.iconName", "utility:close");
					component.set("v.isSelected", true);
					component.set("v.results", []);
					$A.util.addClass(component.find("divResults"), "slds-hide");
				}
				if(state === "ERROR")
				{
					console.log("ERROR");
					console.log(JSON.parse(JSON.stringify(response.getError())));
				}
			});
			$A.enqueueAction(actionGetName);
		}
	}
})