class ClubComment extends HTMLElement {
    constructor(){
        super()
        this.text = this.getAttribute("txt") ?? "text";
        this.date = this.getAttribute("ognoo") ?? "2023/11/29";
    }

    connectedCallback() {
        this.innerHTML = 
        `<li class="user-comment">
            <span>${this.date}</span>
            <p>${this.text}</p>
        </li>`;
    }

    disconnectedCallback() {
    
    }

    attributeChangedCallback(name, oldVal, newVal) {
    
    }

    adoptedCallback() {
    
    }

}

window.customElements.define('club-comment', ClubComment);
