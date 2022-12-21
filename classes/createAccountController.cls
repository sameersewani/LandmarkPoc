public class createAccountController
{ 
    @AuraEnabled
    public static Boolean saveCreateAccountDetails(String email, String phone, String clientId, String userName, String firstName, String lastName, String password, String confirmPassword, String accountId, String regConfirmUrl, String extraFields, String startUrl, Boolean includePassword)
    {
        System.debug(email);
        System.debug(phone);
        System.debug(clientId);
        System.debug(userName);
        try{
            Request__c saveResult = new Request__c(Client_ID__c = clientId, Primary_Email_Address__c = email, Primary_Phone_Number__c = phone, Username__c = userName);
            System.debug('try');
        	insert saveResult;
            //LightningSelfRegisterController.selfRegister(firstName, lastName, email, password, confirmPassword, accountId, regConfirmUrl, extraFields, startUrl, includePassword);
            return true;
        }catch(Exception e){
            System.debug('catch');
            System.debug('The following exception has occurred: ' + e.getMessage());
            return false;
        }
    }
}