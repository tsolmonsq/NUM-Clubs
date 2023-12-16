class ClubCard extends HTMLElement {
    constructor() {
        super();
        //implementation
        this.attachShadow({mode:'open'});
    }
      render() {

        this.shadowRoot.innerHTML=   `<link rel="stylesheet" href="./assets/styles/clubs.css"/>
        
        
        <article class = "club-card"> <img class="cover" src="${this.getAttribute('coverImage')}" alt=cover" />
        <div class="card-head">
          <img class="club-logo" src="${this.getAttribute('logo')}" alt="name" />
          <div class="card-head-txt">
            <span class="club-tag">${this.getAttribute('c-tag')}</span>
            <h3>${this.getAttribute('name')}</h3>
          </div>
        </div>
        <p class="club-description">${this.getAttribute('desc')}</p>
        <ul class="card-status">
          <li>
            <i class="fa-solid fa-calendar-days"></i>
            <p>${this.getAttribute('f-year')}</p>
          </li>
          <li>
            <i class="fa-regular fa-user"></i>
            <p>${this.getAttribute('members')}</p>
          </li>
          <li>
            <i class="fa-regular fa-pen-to-square"></i>
            <p>${this.getAttribute('act-status')}</p>
          </li>
        </ul> </article>`;

      }
        






    



    connectedCallback() {
        //implementation

        this.render();
    }

    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
    }

    adoptedCallback() {
        //implementation
    }

}

window.customElements.define('club-card', ClubCard);
export default ClubCard;