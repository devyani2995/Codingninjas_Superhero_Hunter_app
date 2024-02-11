//Fetching the id of div element of loader,superhero-container and search-string
let loader = document.getElementById("loading");
let superHeroList = document.getElementById("superhero-container");
let searchInput = document.getElementById('search-string');

//GET request- fetching data from an Marvel API
async function fetchSuperHero() {
  try {
    const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=951bb64a7b4c0f434e8ce47e51e0fa36&hash=5aff9aa11365f4ed841c6b667f5201a1');
    // Convert the response to JSON format
    let res = await response.json();
    // Hide loader and display the superhero list
    loader.style.display = 'none';
    superHeroList.style.display = 'flex';
    // Call a function to display the superhero list
    getAllSuperHeroList(res.data.results);
  } catch (error) {
    // Handle errors by displaying them to the console
    console.log("error", error);
  }
}

//Calling the function
fetchSuperHero();

//Adding keyup event listener to the search input element and fetching searched data from an api
searchInput.addEventListener('keyup', async function (e) {
  // Get the value entered in the search input field
  let search_name = searchInput.value;
  let url = '';
  //Check if search input field is not empty then set the URL to fetch the data of searched superhero 
  //Otherwise set the URL to fetch all characters
  if (!search_name) {
    url = 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=951bb64a7b4c0f434e8ce47e51e0fa36&hash=5aff9aa11365f4ed841c6b667f5201a1';
  } else {
    url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${search_name}&ts=1&apikey=951bb64a7b4c0f434e8ce47e51e0fa36&hash=5aff9aa11365f4ed841c6b667f5201a1`;
  }

  //Accesing data from an api
  let response = await fetch(url);
  // Convert the response to JSON format
  let resJson = await response.json();
  // Call a function to handle displaying the fetched data
  showData(resJson);
});

//Adding id in the local storage and navigating to about page
function aboutSuperhero(id) {
  localStorage.setItem("id", id);
  window.location.assign('/heroinfo.html');
}

//Add data in local storage and showing the toast message
function addFavSuperHero(superheroData, id) {
  console.log(JSON.parse(superheroData));
  //set data in local storage
  localStorage.setItem(id, superheroData);
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  // Add the "show" class to DIV
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//Display seached hero name on screen
function showData(res) {
  let results = res.data.results;

  //If array list is empty then message will show on the screen else display the superhero list
  if (results.length === 0) {
    superHeroList.innerHTML = "<b>No Super Hero To Display</b>";
    superHeroList.style.color = 'white';
    superHeroList.style.fontSize = 'large';
  } else {
    superHeroList.innerHTML = " ";
    for (let item of results) {
      //Updating HTML content for displaying searched superhero
      superHeroList.innerHTML = `
        <div id="superhero-list">
           <div id="card">
            <div class = "superhero">
            <div id="info">
              <img class="superhero-img" src="${item.thumbnail.path}.${item.thumbnail.extension}">
              <p id="name" class="superhero-name">${item.name}</p>
            </div>
            <div id="buttons-container">
                <!-- Add to Favourite button -->
                <button class="buttons" id="fav" data-superhero='${JSON.stringify(item)}' data-id="${item.id}">
                  Add to Favourite
                </button>

                <!-- button to display more information about superhero-->
                <button class="buttons" id="about" onclick="aboutSuperhero(${item.id})">About</button>
            </div>
          </div>
          </div>
          </div>
            ` + superHeroList.innerHTML;
    }
  }
}

//Display the list of all superheroes in home page
function getAllSuperHeroList(results) {
  superHeroList.innerHTML = "";
  for (let item of results) {
    //Updating HTML content for displaying the list of all superheroes in home page 
    superHeroList.innerHTML = `<div id="superhero-list">
            <div id="card">
              <div class = "superhero">
              <div id="info">
               <img class="superhero-img" src="${item.thumbnail.path}.${item.thumbnail.extension}">
                <p id="name" class="superhero-name">${item.name}</p>
               </div>
               <div id="buttons-container">
                  <!-- Add to Favourite button -->
                  <button class="buttons" id="fav" data-superhero='${JSON.stringify(item)}' data-id="${item.id}">
                     Add to Favourite
                   </button>
  
                  <!-- button to display more information about superhero-->
                   <button class="buttons" id="about" onclick="aboutSuperhero(${item.id})">About</button>
               </div>
             </div>
             </div>
             </div>` + superHeroList.innerHTML;
  }

}

// Add click event listener to the superHeroList element
superHeroList.addEventListener('click', function (e) {
  // Check if the clicked element has an id of 'fav'
  if (e.target.id === 'fav') {
    // Handle the click on the "Add to Favorite" button
    // Access superhero data using event delegation
    let superheroData = e.target.dataset.superhero;
    let id = e.target.dataset.id;
    // Call a function to handle adding the superhero to favourites
    addFavSuperHero(superheroData, id);
  }
});
