public with sharing class ProposalController {
@AuraEnabled(cacheable=true)
public static List<Property__c> getPropertyList() {
    return [SELECT Name, Price__c FROM Property__c];
}

@AuraEnabled
public static String createProposal(Double agrPrice, String clientId, String oppId, String partnerId, Property__c pr) {
    if(agrPrice == null) {
    agrPrice = pr.Price__c;
     }
    Proposal__c p = new Proposal__c(
    Agreed_price__c = agrPrice, 
    Client_Contact__c = clientId,
    Opportunity__c = oppId,
    Partner_Agent_Contact__c = partnerId,
    Property__c = pr.Id    
    );
    insert p;
    return p.Id;
}

}
