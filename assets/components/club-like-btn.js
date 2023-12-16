class ClubLikeBtn extends HTMLElement {
    constructor() {
        super();
        this.#Render();
        this.eventListenerAdded = false;
    }
    #Render(){
        this.innerHTML = `
        <div class="heart-checkbox" id="heart-button">
          <input type="checkbox" id="heart" />
          <label for="heart"><i class="fa-solid fa-heart"></i></label>
        </div>
        `;
    }
    connectedCallback() {
        if(!this.eventListenerAdded){
            this.eventListenerAdded = true;
            this.addEventListener(
                "click",
                this.clickHandler,
                true
            )
        }
    }
    clickHandler(e){
        if(e.target.tagName.toLowerCase() == "input"){
            let evntName = "club-like-btn-disliked";
            if(e.target.checked)
                evntName = "club-like-btn-liked";
            const evnt = new Event(evntName, 
                {
                    bubbles: true,
                    capture: true,
                    composed: true
                });
            this.parentElement.dispatchEvent(evnt);
            console.log(evntName+" dispatched");
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

window.customElements.define('club-like-btn', ClubLikeBtn);