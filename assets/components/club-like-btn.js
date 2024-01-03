//Club-iin card dahi like dardag zurhen button-g component bolgow
class ClubLikeBtn extends HTMLElement {
    constructor() {
        super();
        this.#Render();
        this.eventListenerAdded = false;
    }
    //Render hiih
    #Render(){
        this.innerHTML = `
        <div class="heart-checkbox" id="heart-button">
          <input type="checkbox" id="heart"/>
          <label for="heart"><i class="fa-solid fa-heart"></i></label>
        </div>
        `;
    }

    //Ug component deer click darah uyd clickHandler function ajillana.
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
            if(e.target.checked){
                evntName = "club-like-btn-liked";
            }

            //Etseg element buyu clubiin cardruu event shidihed beldej baina.
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

    static get observedAttributes() {
        return ["checked"];
    }
    
    
    attributeChangedCallback(name, oldVal, newVal) {
        //implementation
        if(name === "checked")
            this.querySelector("#heart").checked = newVal != null;
    }
}

window.customElements.define('club-like-btn', ClubLikeBtn);
