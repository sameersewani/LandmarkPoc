public without sharing class GlobalSearchFAQs {
    @AuraEnabled(cacheable=true)
    public static List<FAQ__c> searchFAQ(String keyword){
        try{
            String query = 'Select Id, Answer__c, Question__c From FAQ__c Where Answer__c Like\'%'+keyword+'%\' OR Question__c LIKE \'%'+keyword+'%\'';
            List<FAQ__c> faqList = database.query(query);
            system.debug(faqList);
            return faqList;
        } catch(Exception e){
            system.debug('Error--> '+ e);
            return null;
        }
    }
}