class ClubsLiked extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./assets/styles/clubs.css" />
            <div class="cards-container" id="cards-container-1"></div>
        `;
    }
   
    connectedCallback() {
        this.readFromLocalStorage();
    }
    readFromLocalStorage() {
        const clubList = JSON.parse(localStorage.getItem("cart"));
        if (clubList == null) 
            return;

        const container = this.shadowRoot.getElementById("cards-container-1");
        container.innerHTML = ""; // Clear previous content

        for (let i = 0; i < clubList.length; i++) {
            const club = clubList[i];

            const clubCard = document.createElement("club-card");
            clubCard.setAttribute("name", club.name);
            clubCard.setAttribute("category", club.category);
            clubCard.setAttribute("cover", club.coverImage);
            clubCard.setAttribute("logo", club.logo);
            clubCard.setAttribute("desc", club.description);
            clubCard.setAttribute("fyear", club.foundedYear);
            clubCard.setAttribute("members", club.members);

            container.appendChild(clubCard);
        }
    }

}

window.customElements.define('clubs-liked', ClubsLiked);
