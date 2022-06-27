import { LightningElement, track } from 'lwc';

export default class HtmlEditor extends LightningElement {

    //handleswitch button
    @track
    showSource = false;
    @track
    valRichTxt;

    /**
     * @description handleSwitch
     *
     */
    handleSwitch(e){
        console.log('switchEvent ' + e.target.checked);
        this.showSource = e.target.checked;
    }

    //handleChange textArea
    handleChangeTextArea(e){
        this.valRichTxt = e.target.value;
    }

    //handleChange RichText
    handleChangeRichText(e){
        this.valRichTxt = e.target.value;
    }
}