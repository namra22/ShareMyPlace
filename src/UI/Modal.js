export class Modal{
    constructor(contentId,fallBackText){
        this.contentTemplateEl=document.getElementById(contentId);
        this.modalTemplateEl=document.getElementById('modal-template');
        this.fallBackText=fallBackText;
    }
    show(){
        if('content' in document.createElement('template')){
            const modalElements= document.importNode(this.modalTemplateEl.content,true);
            this.modalElement=modalElements.querySelector('.modal');
            this.backdropElement=modalElements.querySelector('.backdrop');
            const contentElement=document.importNode(this.contentTemplateEl.content,true);
            this.modalElement.appendChild(contentElement);
            //afterbegin is a value used with the insertAdjacentHTML method in JavaScript to specify where to insert HTML content relative to the beginning of an element's content.
            // The insertAdjacentHTML method allows you to insert HTML code at a specified position relative to the element.
            document.body.insertAdjacentElement('afterbegin', this.modalElement);
            document.body.insertAdjacentElement('afterbegin', this.backdropElement);

        }else{
            alert(this.fallBackText);
        }
    }
    hide(){
        if (this.modalElement) {
            document.body.removeChild(this.modalElement); // this.modalElement.remove()
            document.body.removeChild(this.backdropElement);
            this.modalElement = null;
            this.backdropElement = null;
          }
    }
}