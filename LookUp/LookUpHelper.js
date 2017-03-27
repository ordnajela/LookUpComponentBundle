({
	executeSearch : function(component, apiName, searchCriteria)
	{
		var actionSearch = component.get("c.search");
		actionSearch.setParams({"apiName" : apiName, "criteria" : searchCriteria});
		actionSearch.setCallback(this, function(response){
			var state = response.getState();
			if(state === "SUCCESS")
			{
				var results = response.getReturnValue();
				component.set("v.results", results);
				$A.util.removeClass(component.find("divResults"), "slds-hide");
			}
			if(state === "ERROR")
			{
				console.log("ERROR");
			}
		});
		$A.enqueueAction(actionSearch);
	}
})