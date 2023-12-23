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
            <p><span></span> онд байгуулагдсан</p>
          </li>
          <li class="members">
            <i class="fa-regular fa-user"></i>
            <p><span></span> гишүүнтэй</p>
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
        this.addEventListener("click", (e)=>this.#clicked(e));

    }
    #likeBtnClicked(val){
      console.log("club-like-btn event recieved!");

        let clubData = {
          id: this.getAttribute("id"),
          name: this.getAttribute("name"),
          category: this.getAttribute("category"),
          coverImage: this.getAttribute("cover"),
          logo: this.getAttribute("logo"),
          description: this.getAttribute("desc"),
          foundedYear: this.getAttribute("fyear"),
          members: this.getAttribute("members")
        };

        localStorage.setItem(this.getAttribute("name"), val);

        
        const evnt = new CustomEvent('club-like-clicked', {
          composed: true,
          detail: {
            name: this.name,
            isLiked: val,
            theClub: clubData
          }
        });

      
      window.dispatchEvent(evnt);

      if(!val)
        this.shadowRoot.querySelector("club-like-btn").removeAttribute("checked");

    }

    #clicked(e) {
      const isClubLikeBtn = e.composedPath().includes(this.shadowRoot.querySelector("club-like-btn"));
  
      if (!isClubLikeBtn) {

          const clubId = this.getAttribute("id");
          window.location.href = `./about_club.html?id=${clubId}`;
      }
    }

    connectedCallback(){
      let likedState = localStorage.getItem(this.getAttribute("name"));
      if(likedState === "true"){
        this.shadowRoot.querySelector("club-like-btn").setAttribute("checked", true);
      }
      
    }
    
    static get observedAttributes() {
      return ["id", "logo", "cover", "name", "category", "desc", "fyear", "members"];
    }

    attributeChangedCallback(name, oldVal, newVal) { 
      switch(name){
        case "id":
          this.shadowRoot.id = newVal;
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
          this.shadowRoot.querySelector(".founded-year p span").innerHTML = newVal;
          break;
        case "members":
          this.shadowRoot.querySelector(".members p span").innerHTML = newVal;
          break;
      }
  }
}

window.customElements.define('club-card', ClubCard);
