document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clubId = urlParams.get("id");

    fetch(`http://localhost:3000/clubs/${clubId}`).then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then(clubData => {
        displayClubDetails(clubData);
    }).catch(error => {
        console.error("Error fetching club details:", error.message);
    })
});

function displayClubDetails(clubData) {
    document.querySelector('main').innerHTML =
      `<section class="about-club">
        <img class="cover" src="${clubData[0].coverImage}" alt="Club cover" />
        <div class="container">
          <div class="left">
            <div class="left-head">
              <img class="club-logo" src="${clubData[0].logo}" alt="Club logo" />
              <div class="left-head-txt">
                <span class="club-tag">${clubData[0].category}</span>
                <h1 class="club-title">${clubData[0].clubName}</h1>
              </div>
            </div>
            <p class="club-description">
              ${clubData[0].description}
            </p>
            <div class="infography">
              <article class="infography-item">
                <h3>Нийт гишүүдийн тоо</h3>
                <i class="fa-regular fa-user"></i>
                <span>${clubData[0].members}</span>
              </article>
              <article class="infography-item">
                <h3>Байгуулагдсан он</h3>
                <i class="fa-solid fa-calendar-days"></i>
                <span>${clubData[0].foundedYear}</span>
              </article>
              <article class="infography-item">
                <h3>Зохиосон эвентүүд</h3>
                <i class="fa-regular fa-calendar-check"></i>
                <span>40</span>
              </article>
            </div>
            <section class="comment-section">
              <h2>Сэтгэгдлүүд <span id="comment-counter">0</span></h2>
            </section>
            <form class="comment-form">
              <label for="comment">Сэтгэгдэл бичих</label>
              <input type="text" name="comment" id="comment" placeholder="Таны сэтгэгдэл" />
              <input type="button" onclick="oncomment()" value="Бичих" />
            </form>
          </div>
          <div class="right">
            <button id="register-club-btn" type="button">+ Элсэх</button>
            <address class="club-contact">
              <h2>Холбоо барих</h2>
              <ul>
                <li><a href="#"><i class="fa-brands fa-facebook-f"></i>facebook.com</a></li>
                <li><a href="#"><i class="fa-brands fa-instagram"></i>instagram.com</a></li>
                <li><a href="#"><i class="fa-regular fa-envelope"></i>example@gmail</a></li>
              </ul>
            </address>
            <div class="members">
              <!-- Member cards go here -->
            </div>
          </div>
        </div>
      </section>`;
    console.log(clubData);
  }
  