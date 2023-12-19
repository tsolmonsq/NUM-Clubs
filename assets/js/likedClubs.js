class LikedClubs{
    constructor(containerId){
        this.container = document.getElementById(containerId);
        this.clubList = [];
    }
    readLocalStorage(){
        this.clubList = JSON.parse(localStorage.getItem("cart-data"));
    }

    createClubCard(club) {
        const clubCard = document.createElement("club-card");
        clubCard.setAttribute("name", club.name);
        clubCard.setAttribute("category", club.category);
        clubCard.setAttribute("cover", club.coverImage);
        clubCard.setAttribute("logo", club.logo);
        clubCard.setAttribute("desc", club.description);
        clubCard.setAttribute("fyear", club.foundedYear);
        clubCard.setAttribute("members", club.members);
        return clubCard;
    }

    render(){
        this.container.innerHTML = "";
        this.clubList.forEach((club) => {
            const clubCard = this.createClubCard(club);
            this.container.appendChild(clubCard);
        });
    }
    async init() {
        try {
          if (!this.container) {
            console.error("Container not found.");
            return;
          }
      
          this.readLocalStorage();
          this.render();
        } catch (error) {
          console.error("Error initializing liked clubs:", error);
        }
    }
}
const likedClubs = new LikedClubs("cards-container-1");
likedClubs.init();