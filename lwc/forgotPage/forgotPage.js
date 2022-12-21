import { LightningElement,api,track } from 'lwc';
import logo from '@salesforce/resourceUrl/logo';
import { NavigationMixin } from 'lightning/navigation';
import basepath from '@salesforce/community/basePath';
export default class ForgotPage extends NavigationMixin(LightningElement)
 {
    @track bankLogo=logo;
    loginPage=basepath;
    @track Id='';
    @track Email='';
    @track Number='';

    idChange(event)
    {
      this.Id=event.target.value;
      console.log(this.Id);
    }
    emailChange(event)
    {
      this.Email=event.target.value;
    }
    numberChange(event)
    {
      this.Number=event.target.value;
      if(this.Id!='' && this.Email!='' && this.Number!='')
      {
        this.template.querySelector('.btnn').disabled=false;
      }
    }

    
    returnButton()
    {
      window.location.replace(this.loginPage);
    }
    onSubmitClick()
    {
      window.location.replace(this.loginPage);
    }
 }