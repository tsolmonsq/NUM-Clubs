class ClubsLiked extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
            />
            <link rel="stylesheet" href="./styles/clubs.css" />
            <div class="cards-container" id="cards-container-1"></div>
        `;
    }
   
    connectedCallback() {
        this.readFromLocalStorage();
    }
    readFromLocalStorage() {
        const clubList = JSON.parse(localStorage.getItem("cart"));
        if (clubList == null || clubList.length === 0){
            const cont = this.shadowRoot.getElementById("cards-container-1");
            cont.innerHTML = `<i class="fa-regular fa-folder-open"></i><p>Хоосон байна</p>`
            cont.style = "display: flex; justify-content: center; color: var(--text-color-2); gap: 0.5rem; font-size: 1.2rem; margin-top: 5rem;";
            return;
        } 

        const container = this.shadowRoot.getElementById("cards-container-1");
        container.innerHTML = ""; 

        for (let i = 0; i < clubList.length; i++) {
            const club = clubList[i];

            const clubCard = document.createElement("club-card");
            clubCard.setAttribute("id", club.id);
            clubCard.setAttribute("name", club.name);
            clubCard.setAttribute("category", club.category);
            clubCard.setAttribute("cover", club.coverImage);
            clubCard.setAttribute("logo", club.logo);
            clubCard.setAttribute("desc", club.description);
            clubCard.setAttribute("fyear", club.foundedYear);
            clubCard.setAttribute("members", club.members);

            const removeBtn = document.createElement('p');
            removeBtn.setAttribute("slot", "remove");
            removeBtn.setAttribute("id", "close");
            removeBtn.innerText = "X";
            clubCard.appendChild(removeBtn);

            removeBtn.style = "color: var(--text-color-1); position: absolute; top: 8rem; right: 1rem; font-size: 1.5rem;";


            removeBtn.addEventListener('click', (e) => {

                    e.stopPropagation();

                    this.removeFromStorage(i ,club.name);

                    this.readFromLocalStorage();
                    location.reload();
            });

            removeBtn.onmouseover = function () {
                removeBtn.style.color = "var(--primary-orange)";
            };
            
            removeBtn.onmouseout = function () {
                removeBtn.style.color = "var(--text-color-1)";
            };

            container.appendChild(clubCard);
        }
    }
    
    removeFromStorage(index, clubName){
        const clubList = JSON.parse(localStorage.getItem("cart")) || [];

        
        clubList.splice(index, 1);

        localStorage.removeItem(`${clubName}`);

        localStorage.setItem("cart", JSON.stringify(clubList));
    }

}

window.customElements.define('clubs-liked', ClubsLiked);
