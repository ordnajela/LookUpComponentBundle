public with sharing class LookUpController {
	@AuraEnabled
	public static String getSelectedName(String objectApiName, Id selectedElementId)
	{
		/* TODO Case es un caso especial, no tene name */
		String getNameQuery = 'SELECT Name FROM '+objectApiName+' WHERE Id = \''+selectedElementId+'\' LIMIT 1';
		System.debug(getNameQuery);
		List<SObject> queryResults = Database.query(getNameQuery);
		System.debug(queryResults);
		return (String)queryResults[0].get('Name');
	}

	@AuraEnabled
	public static List<SearchElement> search(String apiName, String criteria)
	{
		/* TODO Case es un caso especial, no tene name */
		List<SearchElement> elmsToReturn = new List<SearchElement>();
		// sanitize variables
		apiName = String.escapeSingleQuotes(apiName);
		criteria = String.escapeSingleQuotes(criteria);
		String searchQuery = 'FIND \'' + criteria + '*\' IN ALL FIELDS RETURNING ' + apiName + '(id,name) Limit 5';
		try
		{
			List<List<SObject>> searchResult = search.query(searchQuery);
			for(SObject obj : searchResult[0])
			{
				SearchElement elm = new SearchElement((Id)obj.get('Id'), (String)obj.get('Name'));
				elmsToReturn.add(elm);
			}
		}
		catch(Exception except)
		{
			System.debug(except.getMessage());
		}
		System.debug('elms'+elmsToReturn);
		return elmsToReturn;
	}
	public class SearchElement
	{
		@AuraEnabled public Id elementId;
		@AuraEnabled public String elementName;
		SearchElement(Id elmId, String elmName)
		{
			this.elementId = elmId;
			this.elementName = elmName;
		}
	}
}