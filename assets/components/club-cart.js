// Taalagdsan clubuudiig hadgalah sags component
class ClubCart extends HTMLElement {
    constructor() {
      super();

      // clubuudiin medeelliig hadglah array
      this.clubs = []; 
      this.attachShadow({ mode: 'open' });
      
      this.#render();
      this.readFromLocalStorage();
    }
  
    //render function
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
  
    //element DOM-d nemegdeh uyd duudagddag callback function
    connectedCallback() {

      //club card componentees irsen eventiig barij avj baina
      window.addEventListener("club-like-clicked", (e) => {
        if (e.detail.isLiked) {
          this.addToCart(e.detail.theClub);
        } else {
          this.removeFromCart(e.detail.theClub);
        }
      });
    }
    
    // local storage-ees clubuudiin list awah
    readFromLocalStorage() {
      const clubList = JSON.parse(localStorage.getItem("cart"));
      if (clubList !== null) {
        this.clubs = clubList;
        this.#render();
      }
    }
  
    //local storaged shineer nemegdsen clubiig hadgalah
    addToCart(club) {
      this.clubs.push(club);
      localStorage.setItem("cart", JSON.stringify(this.clubs));
      this.#render();
    }
  
    // club taalagdsan clubuudiin jagsaaltaas hasagdah uyd tuuniig local storage-ees hasah
    removeFromCart(club) {
      const clubIndex = this.clubs.findIndex(c => c.name === club.name);
      if (clubIndex !== -1) {
        this.clubs.splice(clubIndex, 1);
  
  
        localStorage.setItem("cart", JSON.stringify(this.clubs));
        this.#render();
      }
    }
  }
  
window.customElements.define('club-cart', ClubCart);
  