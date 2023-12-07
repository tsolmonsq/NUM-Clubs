class ClubComment extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./assets/styles/about_club.css"/>
        <div class="user-comment">
            <span>${this.getAttribute('ognoo')}</span>
            <p>${this.getAttribute('txt')}</p>
        </div>`;
    }
}

window.customElements.define("club-comment", ClubComment);
