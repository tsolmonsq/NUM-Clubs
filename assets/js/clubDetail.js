document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clubId = urlParams.get("id");

    //Clubiin delgerengui medeelliig id-aar ni avah
    fetch(`http://localhost:3000/clubs/${clubId}`).then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();

    }).then(clubData => {

        displayClubDetails(clubData);
        writeComment(clubId);
        getComments(clubId);

        
    }).catch(error => {
        console.error("Error fetching club details:", error.message);
    })
    
});

//Delgerengui medeelliig delgetsleh
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
              <div class="comment-cont"></div>
            </section>
            <form class="comment-form">
              <label for="comment">Сэтгэгдэл бичих</label>
              <input type="text" name="comment" id="comment" placeholder="Таны сэтгэгдэл" />
              <input type="submit" id="commentBtn" value="Бичих" />
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
          </div>
        </div>
      </section>`;
    console.log(clubData);
  }

//Comment bichih
function writeComment(clubId){
  const commentForm = document.querySelector('.comment-form');

            commentForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                const commentInput = document.getElementById('comment').value;
                const uname = localStorage.getItem("username");

                if(uname === null)
                alert("Newtreechee");

                if (commentInput.trim() !== '') {

                    const commentData = {
                        text: commentInput,
                        username: uname,
                        clubId: clubId,
                    };

                    fetch('http://localhost:3000/writecomment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(commentData)
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    }).then(responseData => {
                        console.log('Comment posted successfully:', responseData);
                        getComments(clubId);
                    }).catch(error => {
                        console.error("Error posting comment:", error.message);
                    });
                }
            });
}


//Clubiin id-aar ni commentuudiin jagsaaltiig avah
function getComments(clubId) {
  fetch(`http://localhost:3000/comments/${clubId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(comments => {
          displayComments(comments);
      })
      .catch(error => {
          console.error("Error fetching comments:", error.message);
      });
}

//Club deh niit commentuudiin toog gargah
function updateCommentCount(count) {
  const commentCount = document.getElementById("comment-counter");
  commentCount.innerHTML = count;
}

//Commentiig display hiih
function displayComments(comments) {
  const commentSection = document.querySelector('.comment-cont');
  commentSection.innerHTML = '';


  comments.forEach(comment => {`  `
      const commentElement = document.createElement('article');
      commentElement.setAttribute("class", "user-comment");
      
      commentElement.innerHTML = `
        <span >${comment.username}</span>
        <p>${comment.text}</p>
      `
      commentSection.appendChild(commentElement);
  });

  updateCommentCount(comments.length);
}
  
