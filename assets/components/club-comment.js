class ClubComment extends HTMLElement {
    // constructor(){
    //     super()
    //     this.text = this.getAttribute("txt") ?? "text";
    //     this.date = this.getAttribute("ognoo") ?? "2023/11/29";
    // }

    // connectedCallback() {
    //     this.innerHTML = 
    //     `<li class="user-comment">
    //         <span>${this.date}</span>
    //         <p>${this.text}</p>
    //     </li>`;
    // }
    constructor(){
        super();
        this.text = this.getAttribute("txt") ?? "No comment text";
        this.date = this.getAttribute("ognoo") ?? "No date provided";
        this.author = this.getAttribute("author") ?? "Anonymous";
        this.avatar = this.getAttribute("avatar") ?? "default_avatar.png";


        
    }
    
    connectedCallback() {
        this.innerHTML = 
        `<li class="user-comment">
            <img src="${this.avatar}" alt="Avatar" class="comment-avatar">
            <span class="comment-author">${this.author}</span>
            <span class="comment-date">${this.date}</span>
            <p class="comment-text">${this.text}</p>
        </li>`;
    }

    updateComment(text, date, author, avatar) {
        this.text = text;
        this.date = date;
        this.author = author;
        this.avatar = avatar;
        this.updateInnerHTML();
    }
    
    updateInnerHTML() {
        this.innerHTML = 
        `<li class="user-comment">
            <img src="${this.avatar}" alt="Avatar" class="comment-avatar">
            <span class="comment-author">${this.author}</span>
            <span class="comment-date">${this.date}</span>
            <p class="comment-text">${this.text}</p>
        </li>`;
    }
    static get observedAttributes() { return ['txt', 'ognoo', 'author', 'avatar']; }

attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
        switch(name) {
            case 'txt':
                this.text = newVal;
                break;
            case 'ognoo':
                this.date = newVal;
                break;
            case 'author':
                this.author = newVal;
                break;
            case 'avatar':
                this.avatar = newVal;
                break;
        }
        this.updateInnerHTML();
    }
}

    

    disconnectedCallback() {
    
    }

  

    adoptedCallback() {
    
    }

}

window.customElements.define('club-comment', ClubComment);
