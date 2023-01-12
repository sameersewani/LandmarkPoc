import { api, LightningElement, wire } from "lwc";

export default class LogoAndApplicantName extends LightningElement {

    cardIsOpen = true;
    
    @api creditCardDetails = {};
    // creditReport = 'DELINQUENT';
    /* 
    @api CreditCardDetails = {
        Bank_Name__c : '',
        Enrolled_Balance__c : 0,
        Account_Holder__c : 'Primary',
        Account_Number__c : '',
        Date_of_Last_Payment__c : '',
        Balance__c : 0,
        Question__c : '',
    }
    */
    

    handleAccordianClick(){

        console.log("Accordian clicked");
        
        switch(this.cardIsOpen) {
            case true:
                this.cardIsOpen = false;
                break;
            case false:
                this.cardIsOpen = true;
                // code block
                break;
            default:
                // code block
        }

    }
}