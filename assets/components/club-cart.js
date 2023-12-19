class ClubCart extends HTMLElement {
    constructor() {
        super();
        this.clubs = [];
        this.attachShadow({mode: 'open'});
        this.#Render();
        this.readFromLocalStorage();
    }
    #Render(){
        this.shadowRoot.innerHTML = `
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
        />
        <style>
        .cart-container{
            color: var(--primary-orange);
            &:hover{
                cursor: pointer;
            }
        }
        </style>
        <div class="cart-container">
            <i class="fa-regular fa-heart"></i>
            <span id="counter" >0</span>
        </div>
        `
    }

    connectedCallback() {
        //implementation
        window.addEventListener("club-like-clicked", 
        (e) => {

            if(e.detail.isLiked){
                this.AddToCart(e.detail.theClub)  
            }
            else{
                this.RemoveFromCart(e.detail.theClub);       
            }
        });
    }
    readFromLocalStorage(){
        const counter = this.shadowRoot.querySelector("#counter");
        const storedValue = localStorage.getItem("cart-total");
        if (storedValue !== null) {
            counter.innerText = storedValue;
        }
    }
    AddToCart(club){
        this.clubs.push(club);
        const counter  = this.shadowRoot.querySelector("#counter");
        counter.innerText = parseInt(counter.innerText, 10) + 1;   
        localStorage.setItem("cart-total", counter.innerText);
        localStorage.setItem("cart-data", JSON.stringify(this.clubs));
    }
    RemoveFromCart(club) {
        const clubIndex = this.clubs.findIndex(c => c.name === club.name); 
        if (clubIndex !== -1) {
          this.clubs.splice(clubIndex, 1);
      
          const counter = this.shadowRoot.querySelector("#counter");
          counter.innerText = parseInt(counter.innerText, 10) - 1;
      
          localStorage.setItem("cart-total", counter.innerText);
          localStorage.setItem("cart-data", JSON.stringify(this.clubs));
        }
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

window.customElements.define('club-cart', ClubCart);
