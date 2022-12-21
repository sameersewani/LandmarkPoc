import { LightningElement, wire } from 'lwc';
import getFAQs from '@salesforce/apex/LandMark.getFAQS';

import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import CONTACT_ID from "@salesforce/schema/User.ContactId";

// this gets you the logged in user
import USER_ID from "@salesforce/user/Id";

export default class LandmarkParentComponent extends LightningElement {

    // @wire(getFAQs) myWiredRecord ({data, error}){
    //     if(data){
    //         console.log(data);
    //     }else if(error){
    //         console.log(error);
    //     }
    // }
    faqRecords;

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [CONTACT_ID]
    })
    user;

    get contactId() {
        return getFieldValue(this.user.data, CONTACT_ID);
    }

    connectedCallback(){
        console.log("ConnectedCallback");

        getFAQs().then(result =>{
            console.log(result);
            this.faqRecords = result;
        })
    }


}