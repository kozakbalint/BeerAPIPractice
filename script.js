let beers = document.getElementById("beers")
let cart = document.getElementById("cart")

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    //console.log(this.responseText);
    JSON.parse(this.responseText).forEach(sor => {
      //console.log(sor.name)
      beers.innerHTML += `
        <div class="col-md-3 beer">
            <img src="${sor.image_url}">
            <h2>${sor.name}</h2>
            <h3>"${sor.tagline}"</h3>
            <p>since <b>${sor.first_brewed}</b></p>
            <button class="btn btn-primary" onclick="addToCart(${sor.id})">Kosárba</button>
        </div>`;
    });
  }
});

xhr.open("GET", "https://api.punkapi.com/v2/beers");
xhr.send();

let beersInCart = [];
function addToCart(id) {
  console.log("Új sör hozzáadva:")
  let url = "https://api.punkapi.com/v2/beers/" + id;
  fetch(url)
    .then(response => response.json())
    .then(beer => {
      beersInCart.push(beer)
      refreshCart()
      document.getElementById("cart-num").innerHTML = beersInCart.length
    })
}

function refreshCart() {
  cart.innerHTML = ""
  beersInCart.forEach(beer => {
    cart.innerHTML += `
      <div class="row">
        <div class="col-sm-3">
          <img src="${beer[0].image_url}">
        </div>
        <div class="col-sm-9">${beer[0].name}</div>
      </div>
    `;
  });
}