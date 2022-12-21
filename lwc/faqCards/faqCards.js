import { api, LightningElement } from 'lwc';

export default class CreditCards extends LightningElement {

    cardIsOpen = true;
    
    @api question;
    @api answer;
    // question = 'What happens if I am unable to save funds for the program?';
    // answer = 'This is a savings based program, so if you are unable to accumulate funds then we will not be able to resolve your accounts. It is imperative to the success of your program that you continue to make your monthly savings commitment on time; any delay could negatively impact your plan.';

    handleAccordianClick(){
        // console.log("Accordian clicked");
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