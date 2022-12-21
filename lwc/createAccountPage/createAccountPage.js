import { LightningElement, track } from 'lwc';
import logo from '@salesforce/resourceUrl/logo';
import Create_your_American_Debt_Relief_account from '@salesforce/label/c.Create_your_American_Debt_Relief_account';
import saveCreateAccountDetails from '@salesforce/apex/createAccountController.saveCreateAccountDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import basepath from '@salesforce/community/basePath';

export default class CreateAccountPage extends LightningElement {
    bankLogo = logo;
    loginPage=basepath;
    @track isDisableCreateAccount = true;
    validEmailValue;
    validPhoneValue;
    validClientId;
    validUserName;
    title = '';
    message = '';
    variant = '';

    labels = {Create_your_American_Debt_Relief_account}

    get options() {
        return [
            { label: 'Email', value: 'Email' },
            { label: 'SMS Text', value: 'SMS Text' }
        ];
    }

    

    changeHandler(event){
        if(event.target.name == 'clientID'){
            let emailFieldElement = this.template.querySelector('.emailField');
            let phoneFieldElement = this.template.querySelector('.phoneField');
            let userNameFieldElement = this.template.querySelector('.usernameField');
            let phoneFieldValue = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneFieldElement.value);
            let checkUserName = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(userNameFieldElement.value);
            let check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailFieldElement.value);
            if(emailFieldElement.value != '' && phoneFieldElement.value != '' && userNameFieldElement.value != '' && event.target.value != ''){
                if(phoneFieldValue && check && checkUserName){
                    if(check && checkUserName){
                        this.validClientId = event.target.value;
                        this.validEmailValue = emailFieldElement.value;
                        this.validPhoneValue = phoneFieldElement.value;
                        this.validUserName = userNameFieldElement.value;
                        this.isDisableCreateAccount = false;
                    }
                }else{
                    this.isDisableCreateAccount = true;
                }
            }else{
                this.isDisableCreateAccount = true;
            }
            console.log( this.isDisableCreateAccount);
        }
        if(event.target.name == 'email'){
            let clientIDFieldElement = this.template.querySelector('.clientIDField');
            let phoneFieldElement = this.template.querySelector('.phoneField');
            let userNameFieldElement = this.template.querySelector('.usernameField');
            let phoneFieldValue = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneFieldElement.value);
            let check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(event.target.value);
            let checkUserName = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(userNameFieldElement.value);
            if(check){
                console.log('check ',check);
                console.log('1 ',clientIDFieldElement.value != '' && phoneFieldElement.value != '' && userNameFieldElement.value != '' && event.target.value != '');
                console.log('2 ',phoneFieldValue && userNameFieldElement.value.length > 8 && userNameFieldElement.value.length < 20);
                if(clientIDFieldElement.value != '' && phoneFieldElement.value != '' && userNameFieldElement.value != '' && event.target.value != ''){
                    if(phoneFieldValue && checkUserName){
                        this.validEmailValue = event.target.value;
                        this.validPhoneValue = phoneFieldElement.value;
                        this.validUserName = userNameFieldElement.value;
                        this.validClientId = clientIDFieldElement.value;
                        this.isDisableCreateAccount = false;
                    }else{
                        this.isDisableCreateAccount = true;
                    }
                }else{
                    this.isDisableCreateAccount = true;
                }
            }else{
                this.isDisableCreateAccount = true;
            }
            console.log( this.isDisableCreateAccount);
        }
        if(event.target.name == 'phone'){
          let clientIDFieldElement = this.template.querySelector('.clientIDField');
            let phoneFieldElement = this.template.querySelector('.phoneField');
            let userNameFieldElement = this.template.querySelector('.usernameField');
            let emailFieldElement = this.template.querySelector('.emailField');
            let phoneFieldValue = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneFieldElement.value);
            let check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailFieldElement.value);
            let checkUserName = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(userNameFieldElement.value);
            console.log('check ',check);
            console.log('1 ',clientIDFieldElement.value != '' && phoneFieldElement.value != '' && userNameFieldElement.value != '' && event.target.value != '');
            console.log('2 ',phoneFieldValue && userNameFieldElement.value.length > 8 && userNameFieldElement.value.length < 20);
            console.log('check1 ',check);
            if(check){
                if(clientIDFieldElement.value != '' && phoneFieldElement.value != '' && userNameFieldElement.value != '' && event.target.value != ''){
                    if(phoneFieldValue && checkUserName){
                        this.validPhoneValue = event.target.value;
                        this.validUserName = userNameFieldElement.value;
                        this.validClientId = clientIDFieldElement.value;
                        this.validEmailValue = emailFieldElement.value;
                        this.isDisableCreateAccount = false;
                    }else{
                        this.isDisableCreateAccount = true;
                    }
                }else{
                    this.isDisableCreateAccount = true;
                }
            }else{
                this.isDisableCreateAccount = true;
            }
            console.log( this.isDisableCreateAccount);
        }
        if(event.target.name == 'username'){
            let clientIDFieldElement = this.template.querySelector('.clientIDField');
            let phoneFieldElement = this.template.querySelector('.phoneField');
            let userNameFieldElement = this.template.querySelector('.usernameField');
            let emailFieldElement = this.template.querySelector('.emailField');
            let phoneFieldValue = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneFieldElement.value);
            let check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailFieldElement.value);
            let checkUserName = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(userNameFieldElement.value);
            console.log('check ',check);
            console.log('1 ',clientIDFieldElement.value != '' && phoneFieldElement.value != '' && userNameFieldElement.value != '' && event.target.value != '');
            console.log('2 ',phoneFieldValue && userNameFieldElement.value.length >= 8 && userNameFieldElement.value.length <= 20);
            console.log(phoneFieldValue);
            console.log('check1 ' ,check)
            if(check){
                console.log('d1');
                if(clientIDFieldElement.value != '' && phoneFieldElement.value != '' && userNameFieldElement.value != '' && event.target.value != ''){
                    console.log('d2');
                    console.log('12 ',phoneFieldValue && userNameFieldElement.value.length > 8 && userNameFieldElement.value.length < 20);
                    if(phoneFieldValue && checkUserName){
                        this.validUserName = event.target.value;
                        this.validPhoneValue = phoneFieldElement.value;
                        this.validClientId = clientIDFieldElement.value;
                        this.validEmailValue = emailFieldElement.value;
                        console.log('d3');
                        console.log('validUserName ', this.validUserName);
                        console.log('this.validPhoneValue ',this.validPhoneValue);
                        console.log('this.validClientId ',this.validClientId);
                        console.log('this.validEmailValue ',this.validEmailValue);
                        this.isDisableCreateAccount = false;
                    }else{
                        this.isDisableCreateAccount = true;
                    }
                }else{
                    this.isDisableCreateAccount = true;
                }
            }else{
                this.isDisableCreateAccount = true;
            }
            console.log( this.isDisableCreateAccount);
        }
    }

    saveCreateAccountData()
    {
        console.log(this.validEmailValue);
        console.log(this.validPhoneValue);
        console.log(this.validClientId);
        console.log('send');
        let firstName = 'test1';
        let lastName = 'test2';
        let password = 'Test@123456789';
        let confirmPassword = 'Test@123456789';
        let regConfirmUrl = '';
        let extraFields = '';
        let startUrl = '';
        let includePassword = true;
        let accountId = '1234567890';
        saveCreateAccountDetails({email: this.validEmailValue, phone: this.validPhoneValue, clientId: this.validClientId, userName: this.validUserName, 
            firstName: firstName, lastName: lastName, password: password, confirmPassword: confirmPassword, accountId: accountId, regConfirmUrl: regConfirmUrl, 
            extraFields: extraFields, startUrl: startUrl, includePassword: includePassword})
            .then((result) => 
            {
                let data = result;
                if(data == true){
                    this.validClientId = this.validEmailValue = this.validPhoneValue = this.validUserName = '';
                    this.title = this.validUserName;
                    this.message = 'your account has been created successfully';
                    this.variant = 'success';
                    this.showNotification();
                    window.location.replace(this.loginPage);
                }else{
                    //this.validClientId = this.validEmailValue = this.validPhoneValue = this.validUserName = '';
                    this.title = this.validUserName;
                    this.message = 'Username already exists';
                    this.variant = 'error';
                    this.showNotification();
                }
            })
            .catch((error) => {
                console.log(JOSN.parse(JSON.stringify(error)));
                let err = error;
                this.validClientId = this.validEmailValue = this.validPhoneValue = this.validUserName = '';
                    this.title = this.validUserName;
                    this.message = err
                    this.variant = 'error';
                    this.showNotification();
            });
        }
        showNotification() {
            console.log('showToast');
            const evt = new ShowToastEvent({
                title: this.title,
                message: this.message,
                variant: this.variant,
        });
        this.dispatchEvent(evt);
    }
    returnToLoginButton()
    {
        window.location.replace(this.loginPage);
    }
}