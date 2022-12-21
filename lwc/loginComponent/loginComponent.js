import { LightningElement,api,track } from 'lwc';
import logoSecond from '@salesforce/resourceUrl/logoSecond';


export default class LoginComponent extends LightningElement {
    logo=logoSecond;
    onCreate(){
        console.log('hi');
    }
}