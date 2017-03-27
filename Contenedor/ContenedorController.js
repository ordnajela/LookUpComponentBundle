({
	doInit : function(component, event, helper) {
		var actionTraerCont = component.get("c.getContacto");
		actionTraerCont.setCallback(this, function(response) {
			component.set("v.contacto", response.getReturnValue());

			var NAMESPACE = "c";
			var evtInitializeLooUp = $A.get("e."+NAMESPACE+":EvtLookUpInitialize");
			evtInitializeLooUp.fire();
		});
		$A.enqueueAction(actionTraerCont);
	},
	showAlert : function(component, event, helper) {
		var isClear = event.getParam("isClear");
		if(isClear === true)
		{
			var fieldApiName = event.getParam("fieldApiName");
			component.set("v.contacto."+fieldApiName, "");
		}
		else
		{
			var fieldApiName = event.getParam("fieldApiName");
			var fieldValueId = event.getParam("fieldElementId");
			component.set("v.contacto."+fieldApiName, fieldValueId);
		}
	}
})