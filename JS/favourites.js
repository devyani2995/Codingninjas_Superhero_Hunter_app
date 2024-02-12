//Fetching the id of div element of superhero-container
let superHeroList = document.getElementById("superhero-container");
console.log(localStorage);

localStorage.clear();

//Removing superhero from favourites list
function removeFavSuperHero(id) {
  localStorage.removeItem(id);
  //Reload the current page
  window.location.reload();
}

//Adding id in the local storage and navigating to about page
function aboutSuperhero(id) {
  localStorage.setItem("id", id);
  window.location.assign('heroinfo.html');
}

//Checking if local storage is empty then message will show on screen 
//Otherwise will display favourite superhero list
if (localStorage.length == 0) {
  superHeroList.style.display = 'flex';
  superHeroList.innerHTML = `<b>No favourites superhero to display</b>`;
  superHeroList.style.color = 'white';
  superHeroList.style.fontSize = 'large';
} else {
  superHeroList.style.display = 'flex';
  //Traversing on local storage for favourites
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == "id") {
      localStorage.removeItem(localStorage.key(i));
      continue;
    }
    //Getting data from local storage in JSON format
    let favData = JSON.parse(localStorage.getItem(localStorage.key(i)));

    //Updating HTML content for displaying list of favourites superhero 
    superHeroList.innerHTML = `
        <div id="superhero-list">
           <div id="card">
            <div class = "superhero">
            <div id="info">
              <img id="${favData.id}" class="superhero-img" src="${favData.thumbnail.path}.${favData.thumbnail.extension}">
              <p id="name" class="superhero-name">${favData.name}</p>
            </div>
            <div id="buttons-container">
                <!-- Add to Favourite button -->
                <button class="buttons" id="fav" data-id="${favData.id}">
                  Remove
                </button>

                <!-- button to display more information about superhero-->
                <button class="buttons" id="about" onclick="aboutSuperhero(${favData.id})">About</button>
            </div>
          </div>
          </div>
          </div>
            ` + superHeroList.innerHTML;
  }
}

// Add click event listener to the superHeroList element
superHeroList.addEventListener('click', function (e) {
  // Check if the clicked element has an id of 'fav'
  if (e.target.id === 'fav') {
    // Handle the click on the "Add to Favorite" button
    // Access superhero data using event delegation
    let id = e.target.dataset.id;
    // Call a function to handle removing the superhero to favourites
    removeFavSuperHero(id);
  }
});


