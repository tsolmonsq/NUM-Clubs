
document.getElementById("clubs-selection").addEventListener("change", function () {
    
    const selectedValue = this.value;
    if (selectedValue !== "") {
      window.location.href = `./clubs.html?category=${selectedValue}`;
    } 
    else 
      window.location.href = `./clubs.html`;

  });

  class ClubPage {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.data = [];
      this._tagFilter = this.getUrlParam("category");
    }

    async fetchData() {
      try {
        const response = await fetch("./assets/json/clubs.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.data = await response.json();
        this._list = this.filterByTag(this.data);
        this.render();
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    filterByTag(clubData) {
      if (!this._tagFilter || this._tagFilter === "Бүгд") {
        return clubData;
      }

      return clubData.filter(
        (club) =>
          club.category.toLowerCase() === this._tagFilter.toLowerCase()
      );
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

    render() {
      this.container.innerHTML = "";
      this._list.forEach((club) => {
        const clubCard = this.createClubCard(club);
        this.container.appendChild(clubCard);
      });
    }

    getUrlParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    async init() {      
      await this.fetchData();
      this.render(); 
      this.setDropdownValue(); 
    }
    setDropdownValue() {
      const categoryParam = this.getUrlParam("category");
      if (categoryParam) {
        const dropdown = document.getElementById("clubs-selection");
        dropdown.value = categoryParam;
      }
    }

  }
  const clubPage = new ClubPage("cards-container-1");
  clubPage.init();

  

  
