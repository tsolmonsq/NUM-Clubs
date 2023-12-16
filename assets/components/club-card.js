const template = document.createElement("template");

template.innerHTML = `
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      />
      <link rel="stylesheet" href="./assets/styles/clubs.css" />
      
      <article class="club-card">
        <img class="cover"/>
        <club-like-btn></club-like-btn>
        <div class="card-head">
          <img class="club-logo" />
          <div class="card-head-txt">
            <span class="club-tag"></span>
            <h3></h3>
          </div>
        </div>
        <p class="club-description"></p>
        <ul class="card-status">
          <li class="founded-year">
            <i class="fa-solid fa-calendar-days"></i>
            <p></p>
          </li>
          <li class="members">
            <i class="fa-regular fa-user"></i>
            <p></p>
          </li>
        </ul>
      </article>
`;


class ClubCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.addEventListener("club-like-btn-liked", ()=>this.#likeBtnClicked(true));
        this.addEventListener("club-like-btn-disliked", ()=>this.#likeBtnClicked(false));
    }
    #likeBtnClicked(val){
      console.log("club-like-btn event recieved!");
        const evnt = new CustomEvent('club-like-clicked', {
          composed: true,
          detail: {
            name: this.name,
            isLiked: val
          }
        });
      
      
      window.dispatchEvent(evnt);
    }

    connectedCallback(){
      this.shadowRoot.getElementById("heart-button").addEventListener("click", () => {
        console.log("Added to Cart");
        const cart = document.querySelector("club-cart");
        cart.AddToCart(this);
      });
    }
    
    static get observedAttributes() {
      return ["logo", "cover", "name", "category", "desc", "fyear", "members"];
    }

    attributeChangedCallback(name, oldVal, newVal) { 
      switch(name){
        case "cover":
          this.shadowRoot.querySelector(".cover").src = newVal;
          break;
        case "logo":
          this.shadowRoot.querySelector(".club-logo").src = newVal;
          break;
        case "name":
          this.shadowRoot.querySelector(".card-head-txt h3").innerHTML = newVal;
          break;
        case "category":
          this.shadowRoot.querySelector(".club-tag").innerHTML = newVal;
          break;
        case "desc":
          this.shadowRoot.querySelector(".club-description").innerHTML = newVal;
          break;
        case "fyear":
          this.shadowRoot.querySelector(".founded-year p").innerHTML = newVal;
          break;
        case "members":
          this.shadowRoot.querySelector(".members p").innerHTML = newVal;
          break;
      }
  }
}
window.customElements.define('club-card', ClubCard);
