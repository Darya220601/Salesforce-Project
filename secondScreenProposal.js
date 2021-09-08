import { LightningElement, api, wire } from 'lwc';
import getPropertyList from '@salesforce/apex/ProposalController.getPropertyList';
import createProposal from '@salesforce/apex/ProposalController.createProposal';
const COLS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Price', fieldName: 'Price__c', type: 'currency' },
];
export default class SecondScreenProposal extends LightningElement {
    cols = COLS;
    //To get all properties -> use getPropertyList apex method
    @wire(getPropertyList) propertyList;
    @api agreedPrice;
    @api partnerId;
    @api clientId;
    @api opportunityId;
    //messageErroe is displayed if user hasn't selected any properties
    messageError = "You have to select Property!";
    //if user selected property -> error = false;
    error = false;
    selectedRows;
    // hasselection check if user selected any properties
    hasSelection = false
    proposalId;
    //if proposal hasn't being created successfully -> errorCreationProposal = true
    errorCreationProposal = false;
    //message displayed after proposal creation
    messageSuccessfulCreating = "";
    isSuccessCreation = false;

    //if property was selected
    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows[0];
        this.hasSelection = true;
    }
    
    createProposalClickEvent() {
        const passEvent = new CustomEvent('buttonclick');
        this.dispatchEvent(passEvent);
    }
    //if user want to create one more proposal after current creation
    handleNewProposalClick(event) {
        this.createProposalClickEvent();
    }

    displayMessage() {
        if (!this.errorCreationProposal) {
            this.messageSuccessfulCreating = "Proposal have being created successfully!:)"
            this.isSuccessCreation = true;
        } else {
            this.messageSuccessfulCreating = "Creation Of Proposal failed:("
        }
    }

    //Aftr click on Button "Save", which create proposal
    handleButtonClick(event) {
        if (this.hasSelection) {
            this.error = false;
            createProposal({
                agrPrice: this.agreedPrice,
                clientId: this.clientId,
                oppId: this.opportunityId,
                partnerId: this.partnerId,
                pr: this.selectedRows
            }).then(result => {
                this.proposalId = result;
            }).catch(error => {
                this.errorCreationProposal = true;
            });
            this.displayMessage();
        } else {
            this.error = true;
        }
    }
}