public with sharing class TestingController {

	@AuraEnabled
	public static Contact getContacto() {
		Contact ctr = [SELECT Id, Name, ReportsToId, ReportsTo.Id, ReportsTo.Name, AccountId, Account.Name, Account.Id FROM Contact WHERE Id = '0033600000HzSv1AAF' LIMIT 1];
		System.debug('Contact To Return = ' + ctr);
		return ctr;
	}
}