import { LightningElement, api } from 'lwc';

export default class ParentScreenProposal extends LightningElement {
    //isTeplate true is used to go to the next screen
    isTrueTemplate = false;
    //for getting current record id 
    @api recordId;
    agreedPrice;
    partnerId;
    clientId;

    changeScreen() {
        this.isTrueTemplate = this.isTrueTemplate === true ? false : true;
    }
    //listen for onclick on save button event from child component
    onNextPageClick(event) {
        this.changeScreen();
        this.agreedPrice = event.detail.agreedPrice;
        this.partnerId = event.detail.partnerId;
        this.clientId = event.detail.clientId;
    }
    //listen for onclick on Create Proposal button event from child component
    onButtonClick(event) {
        this.changeScreen();
        this.agreedPrice = null;
    }
}