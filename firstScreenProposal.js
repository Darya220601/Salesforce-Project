import { LightningElement } from 'lwc';
import createContacts from '@salesforce/apex/ContactsController.createContacts';
export default class FirstScreenProposal extends LightningElement {
    clientName;
    clientLastName;
    partnerName;
    partnerLastName;
    agreedPrice;
    clientId;
    partnerId;
    //if contact wasn't created successfully -> annErrorOccured = true
    annErrorOccured = false;
    messageError = 'Error creating contact'

    createTwoContacts() {
        //Create Client Contact
        createContacts({
            fName: this.clientName,
            lName: this.clientLastName
        }).then(result => {
            this.clientId = result;
        }).catch(error => {
            this.annErrorOccured = true;
        });

        //Create Partner Contact
        createContacts({
            fName: this.partnerName,
            lName: this.partnerLastName
        }).then(result => {
            this.partnerId = result;
        }).catch(error => {
            this.annErrorOccured = true;
        });
    }

    onClientNameChange(event) {
        this.clientName = event.detail.value;
    }

    onClientLastNameChange(event) {
        this.clientLastName = event.detail.value;
    }

    onPartnerNameChange(event) {
        this.partnerName = event.detail.value;
    }

    onPartnerLastNameChange(event) {
        this.partnerLastName = event.detail.value;
    }

    onAgreedPriceChange(event) {
        this.agreedPrice = event.detail.value;
    }

    validateInputs() {
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity(); //If has constarints check
            }, true);
        return isInputsCorrect;
    }

    createEventChangeScreen() {
        const passEvent = new CustomEvent('nextpageclick', {
            detail: { clientId: this.clientId.toString(), agreedPrice: this.agreedPrice, partnerId: this.partnerId.toString() }
        });
        this.dispatchEvent(passEvent);
    }

    //Function to go to the next screen of proposal creation
    handleNextPageClick() {
        if (this.validateInputs()) {
            this.createTwoContacts();
            if (!this.annErrorOccured) {
                this.createEventChangeScreen();
            }
        }
    }
}