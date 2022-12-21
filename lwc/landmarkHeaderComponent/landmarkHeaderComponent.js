import { LightningElement,track } from 'lwc';
import getId from '@salesforce/apex/LandMark.getId';
export default class LandmarkHeaderComponent extends LightningElement
 {
    str;
    connectedCallback()
    {
        getId()
        .then(result=>
        {
            console.log("😀",result);
            this.str=result;
        }).catch(error =>{
            console.error(error);
        })

    }

}