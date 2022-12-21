import { api, LightningElement } from 'lwc';
import { NavigationMixin } from "lightning/navigation";

export default class HomeScreenAccountCards extends NavigationMixin (LightningElement) {

    cardIsOpen = true;

    @api creditCardDetails = {};

    handleEditAccount(){
        console.log("Edit Account", this.creditCardDetails.Id);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.creditCardDetails.Id,
                objectApiName: 'Bank_Account__c', // objectApiName is optional
                actionName: 'edit',
            }
        });
    }

    // creditCardDetails = {
    //     index:1,
    //     Bank_Name__c : 'Chase',
    //     Enrolled_Balance__c : 45000,
    //     Account_Holder__c : 'Primary',
    //     Account_Number__c : 'American Express',
    //     Date_of_Last_Payment__c : '',
    //     Balance__c : 20000,
    //     Question__c : '-',
    // }

}