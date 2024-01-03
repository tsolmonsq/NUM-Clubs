class ClubPage {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.data = [];
    this._tagFilter = this.getUrlParam("category");
    this._nameFilter = this.getUrlParam("name");
  }

  //Niit clubuudiin medeelliig avah
  async fetchData() {
    try {
      const response = await fetch('http://localhost:3000/clubs');
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

  searchByName(searchTerm) {
    if (!searchTerm) {
      return this.data;
    }
    
    return this.data.filter(
      (club) => club.clubName.toLowerCase().includes(searchTerm)
    );
  }

  //Clubiin medeelliig category-oor ni shuuh
  filterByTag(clubData) {
    if (!this._tagFilter || this._tagFilter === "Бүгд") {
      return clubData;
    }

    return clubData.filter(
      (club) =>
        club.category.toLowerCase() === this._tagFilter.toLowerCase()
    );
  }
    
    
  //Clubiin card-iig uusgeh
  createClubCard(club) {
    const clubCard = document.createElement("club-card");
    clubCard.setAttribute("id", club.clubId);
    clubCard.setAttribute("name", club.clubName);
    clubCard.setAttribute("category", club.category);
    clubCard.setAttribute("cover", club.coverImage);
    clubCard.setAttribute("logo", club.logo);
    clubCard.setAttribute("desc", club.description);
    clubCard.setAttribute("fyear", club.foundedYear);
    clubCard.setAttribute("members", club.members);
    return clubCard;
  }

  //Render hiih
  render() {
    this.container.innerHTML = "";
    this._list.map((club) => {
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


//Category selection filter
document.getElementById("clubs-selection").addEventListener("change", function () {
    
  const selectedValue = this.value;
  if (selectedValue !== "") {
    window.location.href = `./numclubs?category=${selectedValue}`;
  } 
  else 
    window.location.href = `./numclubs`;

});

//Searching
const searchInput = document.getElementById("site-search");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const searchVal = searchInput.value.trim().toLowerCase();

  clubPage._list = clubPage.searchByName(searchVal);
  clubPage.render();
});


  
  

  
