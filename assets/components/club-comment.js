class ClubComment extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./assets/styles/about_club.css"/>
        <li class="user-comment">
            <span>${this.getAttribute('ognoo')}</span>
            <p>${this.getAttribute('txt')}</p>
        </li>`;
        
    }
    
    connectedCallback() {
     
    }

    updateComment(text, date, author, avatar) {
       
    }
    
   
    attributeChangedCallback(name, oldVal, newVal) {
    }

    

    disconnectedCallback() {
    
    }

  

    adoptedCallback() {
    
    }
}

window.customElements.define("club-comment", ClubComment);
