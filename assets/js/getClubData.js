document.getElementById("clubs").addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue !== "") {
      window.location.href = `./clubs.html?category=${selectedValue}`;
    } else {
      window.location.href = `./clubs.html`;
    }
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
      const card = document.createElement("article");
      card.classList.add("club-card");

      card.innerHTML = `
          <img class="cover" src="${club.coverImage}" alt="${club.name}_cover" />
          <div class="card-head">
            <img class="club-logo" src="${club.logo}" alt="${club.name}_logo" />
            <div class="card-head-txt">
              <span class="club-tag">${club.category}</span>
              <h3>${club.name}</h3>
            </div>
          </div>
          <p class="club-description">${club.description}</p>
          <ul class="card-status">
            <li>
              <i class="fa-solid fa-calendar-days"></i>
              <p>${club.foundedYear}</p>
            </li>
            <li>
              <i class="fa-regular fa-user"></i>
              <p>${club.members}</p>
            </li>
            <li>
              <i class="fa-regular fa-pen-to-square"></i>
              <p>${club.activities}</p>
            </li>
          </ul>
        `;
      return card;
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
    }
  }

  const clubPage = new ClubPage("cards-container-1");
  clubPage.init();