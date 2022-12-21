public without sharing class LandMark {
	
    @AuraEnabled(cacheable=true)
    public static List<FAQ__c> getFAQS(){
        return [SELECT Id, Name, Question__c, Answer__c FROM FAQ__c Order By CreatedDate];
    }
    /*
    @AuraEnabled(cacheable=true)
    public static Map<String, List<FAQ__c>> getFAQS(){
    	Map<String, List<FAQ__c>> mp = new Map<String, List<FAQ__c>>();
        List<FAQ__c> faqList = [SELECT Id, Name, Question__c, Answer__c FROM FAQ__c Order By CreatedDate];
        mp.put('FAQTab', faqList);
        List<FAQ__c> faqSectionList = new List<FAQ__c>();
        for(Integer i=0; i < 3 ; i++){
            faqSectionList.add(faqList[i]);
        }
        mp.put('FAQSection', faqSectionList);
        return mp;
        //return [SELECT Id, Name, Question__c, Answer__c FROM FAQ__c Order By CreatedDate];
    }
	*/
    @AuraEnabled
    public static Object getCurrentUserDetails(){
        //Id UserId = '0052w00000AaCYSAA3';
        //User u = [SELECT Id, ContactId FROM User WHERE Id =: UserId];
        User u = [SELECT Id, ContactId FROM User WHERE Id =:UserInfo.getUserId()];
        System.debug(u);
        //return u.ContactId;
       	Contact con = [SELECT Id, AccountId, Name, Title, Email, (SELECT Id, Name, Balance__c, Question__c, Account_Holder__c, Bank_Name__c, Enrolled_Balance__c, Date_of_Last_Payment__c, Account_Number__c FROM Bank_Accounts__r) FROM Contact Where Id =:u.ContactId];
        //List<Bank_Account__c> bankAccList = con.Bank_Accounts__r;
        Map<String, Object> mp = new Map<String, Object>();
        mp.put('Contact', con);
    	return mp;
    }
     @AuraEnabled
    public static String getId()
    {
        return [select contact.account.PhotoUrl__c from user where id=:UserInfo.getUserId()].contact.account.PhotoUrl__c;
    }
	/*@AuraEnabled
    public static Object getAccountDetails(){
        Id UserId = '0052w00000AaCYSAA3';
        User u = [SELECT Id, ContactId FROM User WHERE Id =: UserId];
        Contact con = [SELECT Id, AccountId, Name, Title, Email, (SELECT Id, Name, Balance__c, Question__c, Account_Holder__c, Bank_Name__c, Enrolled_Balance__c, Date_of_Last_Payment__c, Account_Number__c FROM Bank_Accounts__r) FROM Contact Where Id =:u.ContactId];
        //User u = [SELECT Id, ContactId FROM User WHERE Id =: UserInfo.getUserId()];
        System.debug(u);
    }*/
    @AuraEnabled
    public static boolean createBankAccount(String accountHolder, Long accountNumber, Integer balance, Id contactId, String bankName, Date dateOfLastPayment, Integer enrolledBalance, String question){
        try {
            Bank_Account__c createNewBankAccount = new Bank_Account__c(Account_Holder__c = accountHolder, Account_Number__c = accountNumber, Balance__c = balance, Contact__c = contactId, Bank_Name__c = bankName, Date_of_Last_Payment__c = dateOfLastPayment, Enrolled_Balance__c = enrolledBalance, Question__c = question);
        	Insert createNewBankAccount;
            return true;
        }catch(Exception e){
            System.debug('problem: '+e);
            return false;
        }
    }
}