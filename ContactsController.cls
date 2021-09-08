public with sharing class ContactsController {
    @AuraEnabled
    public static String createContacts(String fName, String lName) {
    Contact c = new Contact(
    FirstName = fName,
    LastName = lName
    );
     insert c;
    return c.Id;
    }
}
