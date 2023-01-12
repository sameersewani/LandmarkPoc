import { api, LightningElement, wire } from 'lwc';

import getFAQs from '@salesforce/apex/LandMark.getFAQS';
import getCurrentUserDetails from '@salesforce/apex/LandMark.getCurrentUserDetails';
import createBankAccount from '@salesforce/apex/LandMark.createBankAccount';
import searchFAQ from '@salesforce/apex/GlobalSearchFAQs.searchFAQ';
import Bank_Account from '@salesforce/schema/Bank_Account__c';
import Account_Holder from '@salesforce/schema/Bank_Account__c.Account_Holder__c';
import Account_Number from '@salesforce/schema/Bank_Account__c.Account_Number__c';
import Balance from '@salesforce/schema/Bank_Account__c.Balance__c';
import Contact from '@salesforce/schema/Bank_Account__c.Contact__c';
import Bank_Name from '@salesforce/schema/Bank_Account__c.Bank_Name__c';
import Date_of_Last_Payment from '@salesforce/schema/Bank_Account__c.Date_of_Last_Payment__c';
import Enrolled_Balance from '@salesforce/schema/Bank_Account__c.Enrolled_Balance__c';
import Question from '@salesforce/schema/Bank_Account__c.Question__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ONTRACK_IMG from '@salesforce/resourceUrl/onTrack';
import logo from '@salesforce/resourceUrl/logo';
import basepath from '@salesforce/community/basePath';

export default class LandmarkMainParentComponent extends LightningElement {

    imageURL=logo ;
    onTrack = ONTRACK_IMG;
    sidebar = false;
    loginPage=basepath+'/login';
    Objectname = Bank_Account;
    myFields = [Account_Holder, Account_Number, Balance, Contact, Bank_Name, Date_of_Last_Payment, Enrolled_Balance, Question];
    faqRecords = [];
    homeScreenFAQs = [];
    userDetails;
    AccountDetails = []

    isAddAccount = false;

    max = 33654.50;
    completed = 9258.36;

    progress = {
        max : this.max.toLocaleString("en-US", {style:"currency", currency:"USD"}),
        completed: this.completed.toLocaleString("en-US", {style:"currency", currency:"USD"}),
        percentage : (this.completed / this.max * 100)+'%',
    }

    faqRecordsForContactUS = [{}];
    recordNotFoundMessage = 'Record Not Found';
    isVisibleRecordNotFoundMessage = false;
    isVisibleRecordList = false;

    templateRender = { Tab1: true }; // Default Tab as Active

    // @wire(getFAQs) myWiredRecord({data, error}){
    //     if(data){
    //         console.log(data);
    //         this.faqRecords = data;
    //         this.homeScreenFAQs = [...data.slice(0,3)];
    //     }else if(error){
    //         console.log(error);
    //     }
    // }

    // @wire(getCurrentUserDetails) currentUserDetails({data, error}){
    //     if(data){
    //         console.log(data);
    //         this.userDetails = data.Contact;
    //     }else if(error){
    //         console.log(error);
    //     }
    // }

    CurrentUserDetails(){
        getCurrentUserDetails().then(result => {
            let AccountDetails = [];
            this.userDetails = result.Contact;
            console.log(result);
            AccountDetails = this.userDetails.Bank_Accounts__r;
            let count = 0;
            console.log(AccountDetails);
            let fields = ['index', 'Question__c', 'Name', 'Id', 'Enrolled_Balance__c', 'Date_of_Last_Payment__c', 'Contact__c', 'Bank_Name__c', 'Balance__c', 'Account_Number__c', 'Account_Holder__c'];
            AccountDetails.forEach(res => {
                res.index = ++count;
                res.endingDigits = res.Account_Number__c.slice((res.Account_Number__c.length - 4), (res.Account_Number__c.length))
                // console.log('checking if exist' ,'Bank_Name__c' in res);
                fields.forEach(field=>{
                    if(!(field in res)){
                        res[field] = '';
                    }
                })
            })
            this.AccountDetails = [...AccountDetails];
            console.log(this.AccountDetails);
        }).catch(error => {
            console.error(error);
        })
    }
    LogoutButton()
    {
        window.location.replace(this.loginPage);
    }

    connectedCallback() {

        getFAQs().then(result => {
            this.faqRecords = [...result];
            this.homeScreenFAQs = [...result.slice(0, 3)];
            // console.log(result);
        }).catch(error => {
            console.log('ERROR IN CONN : ', error);
        })

        // getId()
        // .then(result=>
        // {
        //     console.log("😀",result);
        //     this.imageURL=result;
        // }).catch(error =>{
            //     console.error(error);
        // })
        
        this.CurrentUserDetails();
    }
    renderedCallback(){
        let progression = this.template.querySelector('.progressCompleted');
        // console.log(progression);
        progression.style.width = this.progress.percentage;
        progression.innerText = '   ';

        let progressionCard = this.template.querySelector('.cardProgressCompleted');
        // console.log(progressionCard);
        progressionCard.style.width = this.progress.percentage;
        progressionCard.innerText = this.progress.completed;
        // progression.style.height = '35px';
        // progression.innerText = `${this.progress.completed} of ${this.progress.max}`;
        // progression.parentNode.innerText = `${this.progress.completed} of ${this.progress.max}`;
    }

    SearchFAQ(event) {
        searchFAQ({ keyword: event.target.value }).then(result => {
            // console.log(result);
            this.faqRecords = result;
        })
    }

    SearchFAQforContactUs(event) {
        console.log('calling');
        console.log('1 ', event);
        console.log('2 ', JSON.parse(JSON.stringify(event)));
        console.log('3 ', event.target.value);
        console.log('4 ', JSON.parse(JSON.stringify(event.target.value)));
        searchFAQ({ keyword: event.target.value }).then(result => {
            console.log(result);
            if (result.length == 0) {
                this.isVisibleRecordList = false;
                this.isVisibleRecordNotFoundMessage = true;
                console.log('val= ', this.isVisibleRecordNotFoundMessage);
            } else {
                console.log('else');
                this.isVisibleRecordNotFoundMessage = false;
                this.isVisibleRecordList = true;
                this.faqRecordsForContactUS = result;
            }
        })
    }

    handleClick(event) {
        let templateRender = {};
        this.template.querySelectorAll('.Tabs').forEach(Tab => {
            Tab.classList.remove("active");
        })
        event.target.classList.add("active");
        let count = 0;
        this.template.querySelectorAll('.Tabs').forEach(Tab => {
            templateRender["Tab" + ++count] = Tab.classList.contains('active');
        })
        console.log(templateRender);
        this.templateRender = templateRender;
    }

    get optionsforAccountHolders() {
        return [
            { label: 'Primary', value: 'Primary' },  
            { label: 'Secondary', value: 'Secondary' },
            { label: 'Joint', value: 'Joint' }
        ];
    }

    get options() {
        return [
            { label: 'Adjust my savings commitment', value: 'savings' },
            { label: 'Assist me with my online account', value: 'online account' },
            { label: 'Help with collection calls and letters', value: 'calls' },
            { label: 'Update you with new creditor information', value: 'creditor' },
            { label: 'Receive an update on my progress', value: 'progress' },
            { label: 'Learn more about my program', value: 'program' },
            { label: 'Address a concern or question', value: 'Address' },
            { label: 'Explain what a settlement is  ', value: 'settlement' },
            { label: 'Questions about a legal document', value: 'documents' },
            { label: 'Verify my documents were received', value: 'Verify' },
        ];
    }

    handleAddAccount() {
        console.log("Account Clicked");
        this.isAddAccount = true;
        console.log(this.isAddAccount);
    }

    handleModalClose() {
        this.isAddAccount = false;
    }

    handleModalSuccess() {
        this.showNotification("Bank Account Created!", '', 'success');
        this.isAddAccount = false;
    }

    handleRecordSave() {
        let contact = this.template.querySelector('.contactIdField').value;
        let creditCardBankName = this.template.querySelector('.creditCardBankName').value;
        let accountHolder = this.template.querySelector('.accountHolder').value;
        let accountNumber = this.template.querySelector('.accountNumber').value;
        let contacting = this.template.querySelector('.contacting').value;
        let enrolledBalance = this.template.querySelector('.enrolledBalance').value;
        let dateOfLastPayment = this.template.querySelector('.dateOfLastPayment').value;
        let balance = this.template.querySelector('.balance').value;
        createBankAccount({accountHolder:accountHolder, accountNumber:accountNumber, balance:balance, contactId:contact, bankName:creditCardBankName, dateOfLastPayment:dateOfLastPayment, enrolledBalance:enrolledBalance, question:contacting})
        .then(result=>{
            console.log(result);
            if(result==true){
                console.log('true');
                this.showNotification('Account has been Created!!','','success');
                this.CurrentUserDetails();
            } else{
                console.log('false');
                this.showNotification('Account Creation Failed!!','','error');
                this.CurrentUserDetails();
            }
        })
        this.isAddAccount = false;
    }


    showNotification(title, message, variant) {
        console.log('showToast');
        const evt = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(evt);
    }

    handleError(event) {
        let errorMessage = event.detail.detail;
        console.log("response", errorMessage);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: errorMessage,
                variant: 'error'
            })
        );
    }

    showSideBar() {
        let element = this.template.querySelector('.sidebar');
        console.log(element);

        if (!this.sidebar) {
            element.style.display = 'grid';
            element.style.position = 'fixed';
            this.sidebar = true;
        } else {
            element.style.display = 'none';
            element.style.position = 'relative';
            this.sidebar = false;
        }
    }
    handleViewAllFAQs(){
        this.template.querySelector('[data-id="FAQsTab"]').click();
        // window.scrollTo(0, 0);
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth",
        });
    }

}