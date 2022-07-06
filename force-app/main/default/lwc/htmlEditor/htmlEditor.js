import ContentType from '@salesforce/schema/Attachment.ContentType';
import { LightningElement, track, api } from 'lwc';

/**
 * @author noa baroukh
 * @description Rich Text Editor that allow to edit HTML CODE source directy in TextArea
 */
export default class HtmlEditor extends LightningElement {

    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'image',
        'clean',
        'table',
        'header',
        'color',
    ];

    @api
    markup;
    
    @track
    showSource = false;

    @track
    valRichTxt;

    connectedCallback() {
        this.valRichTxt = this.markup;
    }

    handleSwitch(e){
        var isChecked = e.target.checked;
        console.log('switchEvent ' +isChecked);
        this.showSource = isChecked;
    
        if(isChecked && this.valRichTxt != undefined){
            this.valRichTxt= this.process(this.valRichTxt);
        }
        // alert("alert handleSwitch" +this.valRichTxt);
    }

    handleChangeTextArea(e){
        this.valRichTxt = e.target.value;
        this.markup = this.valRichTxt;
        alert(this.markup);
    }

    handleChangeRichText(e){
        this.valRichTxt = e.target.value;
        this.markup = this.valRichTxt;
    }
    
    process(str) {
        str = str.trim();
        str = str.replace(/\n/g,'');
        str = str.replace(/\t/g,'');
        var div = document.createElement('div');
        div.innerHTML = str;
        return this.format(div, 0).innerHTML;
    }

    format(node, level){
        var indentBefore = new Array(level++ + 1).join('    ');
        var indentAfter = new Array(level - 1).join('  ');
        var textNode;

        for(var i = 0; i < node.children.length; i++){
            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);

            // si textNode commence par <style
            // apeller la fonction this.formatCss(node.children[i], level);
            // sinon this format
            if(node.children[i].tagName === 'STYLE'){
                node.children[i].textContent = 
                    this.formatCss(node.children[i].textContent, level);
            }
            this.format(node.children[i], level);
            if(node.lastElementChild == node.children[i]){
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
       return node;
    }

    formatCss(cssCode, level){
        console.log('+++ CSS Code var', cssCode);
        cssCode = cssCode
            .replaceAll('  ', '')
            .replaceAll('\t', '')
            .replaceAll('\n', '');

        //alert('CSS CODE 1: ' +cssCode);
       
        var indentElem = new Array(level + 1).join('  ');
        var indentInstruc = new Array(level + 3).join('  ');

        cssCode = '\n'+indentElem+cssCode;
        cssCode = cssCode.replaceAll('{', "{"+'\n'+indentInstruc);
        cssCode = cssCode.replaceAll(';', ';'+'\n'+indentInstruc);
        cssCode = cssCode.replaceAll('    }', '}'+'\n'+indentElem);

   
        //alert('CSS CODE 2 : ' +cssCode);
        return cssCode;
    }
}