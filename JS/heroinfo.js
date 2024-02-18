//Fetching the id of div element of loader and card-container
let loader = document.getElementById("loading");
let card_conatiner = document.getElementById("card-container");

//Getting the id from local storage
let id = localStorage.getItem("id");
let infodata = [];

// remove the item with the key "id" from localStorage when the favourites link is clicked
let favID = document.getElementById('fav-link');
favID.addEventListener('click', function () {
  localStorage.removeItem("id");
});

// Function to fetch detailed information about a superhero from the Marvel API
async function fetchHeroInfo() {
  let url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=951bb64a7b4c0f434e8ce47e51e0fa36&hash=5aff9aa11365f4ed841c6b667f5201a1`;

  //Fetching data from an API
  let response = await fetch(url);
  // extracting json into a plain JavaScript object
  let resJson = await response.json();
  // Hide loader and display the card container
  loader.style.display = 'none';
  card_conatiner.style.display = 'flex';

  infodata = [...resJson.data.results];

  //Updating HTML content for displaying informations about the superhero 
  card_conatiner.innerHTML =
    `
    <div id="hero-info">
    <div id="card">
      <div class="superhero">
        <div id="info">
          <img class="hero-img" src="${infodata[0].thumbnail.path}.${infodata[0].thumbnail.extension}">
          <table style="width: 100%">
            <tr>
              <td class="table-text"><b>Id</b></td>
              <td><b>:</b></td>
              <td>${infodata[0].id}</td>
            </tr>
            <tr>
              <td class="table-text"><b>Name</b></td>
              <td><b>:</b></td>
              <td>${infodata[0].name}</td>
            </tr>
            <tr>
              <td class="table-text"><b>Description</b></td>
              <td><b>:</b></td>
              <td>
                ${infodata[0].description}
              </td>
            </tr>
            <tr>
              <td class="table-text"><b>Comics Available</b></td>
              <td><b>:</b></td>
              <td>${infodata[0].comics.available}</td>
            </tr>
            <tr>
              <td class="table-text"><b>Stories Available</b></td>
              <td><b>:</b></td>
              <td>${infodata[0].stories.available}</td>
            </tr>
            <tr>
              <td class="table-text"><b>Series Available</b></td>
              <td><b>:</b></td>
              <td>${infodata[0].series.available}</td>
            </tr>
            <tr>
              <td class="table-text"><b>Events Available</b></td>
              <td><b>:</b></td>
              <td>${infodata[0].events.available}</td>
            </tr>
          </table>
          <!-- Link to view more details about comics -->
          <div id="comics-detail">
            <a href=${infodata[0].urls[2] ? infodata[0].urls[2].url : infodata[0].urls[1].url}  target="_blank" >Comics Detail</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
}

fetchHeroInfo();
