import { LightningElement,track,wire } from 'lwc';
import logo from '@salesforce/resourceUrl/logo';
import { NavigationMixin } from 'lightning/navigation';
import basepath from '@salesforce/community/basePath';
import login from '@salesforce/apex/LightningLoginFormController.login';



export default class LoginPage extends NavigationMixin(LightningElement)
{
  createPage=basepath + '/SelfRegister';
  forgotPage=basepath + '/ForgotPassword';
  
  connectedCallback()
  {
    console.log(basepath);
  }
    @track bankLogo=logo;
    get SubmitBtn() 
    {
        return `width: 26%; display: grid; border-radius: 30px;`
    }

    forgotButton()
    {
      window.location.replace(this.forgotPage);
    }
   onCreate()
   {
    window.location.replace(this.createPage);
    }
    onSubmitClick()
    {

        let userName=this.template.querySelector(`[data-id="username"]`).value;
        let Password=this.template.querySelector(`[data-id="password"]`).value;
        console.log(userName);
        console.log(Password);
        login({username:userName,password:Password,startUrl:'https://cyntexa-2c4-dev-ed.develop.preview.salesforce-experience.com'})
        .then(result =>
        {
          console.log('result',result);
          window.location.replace(result);
        })
        .catch(error =>
        {
          console.log('error',error);
        });
    }
    
}