class ClubCart extends HTMLElement {
    constructor() {
      super();
      this.clubs = [];
      this.attachShadow({ mode: 'open' });
      this.#render();
      this.readFromLocalStorage();
    }
  
    #render() {
      this.shadowRoot.innerHTML = `
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <style>
          .cart-container {
            color: var(--primary-orange);
            &:hover {
              cursor: pointer;
            }
          }
        </style>
        <div class="cart-container">
          <i class="fa-regular fa-heart"></i>
          <span id="counter">${this.clubs.length}</span>
        </div>
      `;
    }
  
    connectedCallback() {
      window.addEventListener("club-like-clicked", (e) => {
        if (e.detail.isLiked) {
          this.addToCart(e.detail.theClub);
        } else {
          this.removeFromCart(e.detail.theClub);
        }
      });
    }
  
    readFromLocalStorage() {
      const clubList = JSON.parse(localStorage.getItem("cart"));
      if (clubList !== null) {
        this.clubs = clubList;
        this.#render();
      }
    }
  
    addToCart(club) {
      this.clubs.push(club);
      localStorage.setItem("cart", JSON.stringify(this.clubs));
      this.#render();
    }
  
    removeFromCart(club) {
      const clubIndex = this.clubs.findIndex(c => c.name === club.name);
      if (clubIndex !== -1) {
        this.clubs.splice(clubIndex, 1);
  
        // const counter = this.shadowRoot.querySelector("#counter");
        // counter.innerText = parseInt(counter.innerText, 10) - 1;
  
        localStorage.setItem("cart", JSON.stringify(this.clubs));
        this.#render();
      }
    }
  
    disconnectedCallback() {
      // implementation
    }
  
    attributeChangedCallback(name, oldVal, newVal) {
      // implementation
    }
  
    adoptedCallback() {
      // implementation
    }
  }
  
  window.customElements.define('club-cart', ClubCart);
  