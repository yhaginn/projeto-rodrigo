const games = [

{ id: 1, name: "Cyber Nexus", category: "Ação", price: 149.90, icon: "🤖" },

{ id: 2, name: "Dragon Realms", category: "RPG", price: 199.90, icon: "🐉" },

{ id: 3, name: "Neon Racing", category: "Corrida", price: 119.90, icon: "🏎️" },

{ id: 4, name: "Football 26", category: "Esportes", price: 179.90, icon: "⚽" },

{ id: 5, name: "Space War", category: "Ação", price: 89.90, icon: "🚀" },

{ id: 6, name: "Shadow Kingdom", category: "RPG", price: 159.90, icon: "⚔️" },

{ id: 7, name: "Turbo X", category: "Corrida", price: 99.90, icon: "🏁" },

{ id: 8, name: "Basket Pro", category: "Esportes", price: 129.90, icon: "🏀" }

];

let cart = [];

let favorites = [];

let currentCategory = "Todos";

const gamesGrid = document.getElementById("gamesGrid");

const searchInput = document.getElementById("searchInput");

const cartElement = document.getElementById("cart");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

const modal = document.getElementById("modal");

/* ========================= RENDERIZAR JOGOS ========================= */

function renderGames() {

const search = searchInput.value .toLowerCase() .trim();

const filtered = games.filter(game => {

const matchesName = game.name .toLowerCase() .includes(search);

const matchesCategory = currentCategory === "Todos" || game.category === currentCategory;

return matchesName && matchesCategory;

});

gamesGrid.innerHTML = "";

if (filtered.length === 0) {

gamesGrid.innerHTML = <div style=" grid-column:1/-1; text-align:center; padding:50px; color:#777; "> <h3>Nenhum jogo encontrado 😢</h3> <p>Tente outra pesquisa.</p> </div> ;

return; }

filtered.forEach(game => {

const favorite = favorites.includes(game.id);

const card = document.createElement("article");

card.className = "game-card";

card.innerHTML = `

<button class="favorite-button 
𝑓
𝑎
𝑣
𝑜
𝑟
𝑖
𝑡
𝑒
?
"
𝑎
𝑐
𝑡
𝑖
𝑣
𝑒
"
:
"
"
"
𝑜
𝑛
𝑐
𝑙
𝑖
𝑐
𝑘
=
"
𝑡
𝑜
𝑔
𝑔
𝑙
𝑒
𝐹
𝑎
𝑣
𝑜
𝑟
𝑖
𝑡
𝑒
(
{game.id})" > ${favorite ? "♥" : "♡"} </button>

<div class="game-cover"> ${game.icon} </div>

<div class="game-info">

<h3> ${game.name} </h3>

<p> ${game.category} </p>

<div class="game-bottom">

<span class="game-price"> R$ ${formatPrice(game.price)} </span>

<button class="buy-button" onclick="addToCart(${game.id})" > Comprar </button>

</div>

</div>

`;

gamesGrid.appendChild(card);

});

}

/* ========================= FORMATAÇÃO ========================= */

function formatPrice(price) {

return price .toFixed(2) .replace(".", ",");

}

/* ========================= PESQUISA ========================= */

searchInput.addEventListener( "input", renderGames );

/* ========================= FILTROS ========================= */

document .querySelectorAll(".filter") .forEach(button => {

button.addEventListener( "click", () => {

document .querySelectorAll(".filter") .forEach(item => item.classList.remove("active") );

button.classList.add("active");

currentCategory = button.dataset.category;

renderGames();

} );

});

/* ========================= FAVORITOS ========================= */

function toggleFavorite(id) {

if (favorites.includes(id)) {

favorites = favorites.filter( item => item !== id );

showToast( "Removido dos favoritos 💔" );

} else {

favorites.push(id);

showToast( "Adicionado aos favoritos ❤️" );

}

renderGames();

}

/* ========================= CARRINHO ========================= */

function addToCart(id) {

const game = games.find(item => item.id === id);

cart.push(game);

updateCart();

showToast( ${game.name} adicionado ao carrinho 🛒 );

}

function removeFromCart(index) {

cart.splice(index, 1);

updateCart();

}

function updateCart() {

cartCount.textContent = cart.length;

if (cart.length === 0) {

cartItems.innerHTML = `

<div class="empty-cart">

<span> 🛒 </span>

<p> Seu carrinho está vazio. </p>

</div>

`;

} else {

cartItems.innerHTML = "";

cart.forEach((game, index) => {

const item = document.createElement("div");

item.className = "cart-item";

item.innerHTML = `

<div class="cart-icon"> ${game.icon} </div>

<div class="cart-info">

<h4> ${game.name} </h4>

<span> R$ ${formatPrice(game.price)} </span>

</div>

<button class="remove-item" onclick="removeFromCart(${index})" > 🗑️ </button>

`;

cartItems.appendChild(item);

});

}

const total = cart.reduce( (sum, game) => sum + game.price, 0 );

cartTotal.textContent = R$ ${formatPrice(total)};

}

/* ========================= ABRIR CARRINHO ========================= */

document .getElementById("cartButton") .addEventListener( "click", () => {

cartElement.classList.add("open");

} );

/* ========================= FECHAR CARRINHO ========================= */

document .getElementById("closeCart") .addEventListener( "click", () => {

cartElement.classList.remove("open");

} );

/* ========================= CHECKOUT ========================= */

document .getElementById("checkoutButton") .addEventListener( "click", () => {

if (cart.length === 0) {

showToast( "Seu carrinho está vazio! 🛒" );

return; }

modal.classList.add("show");

} );

/* ========================= FECHAR MODAL ========================= */

document .getElementById("closeModal") .addEventListener( "click", () => {

modal.classList.remove("show");

} );

modal.addEventListener( "click", event => {

if (event.target === modal) {

modal.classList.remove("show");

}

} );

/* ========================= COMPRA ========================= */

document .getElementById("checkoutForm") .addEventListener( "submit", event => {

event.preventDefault();

cart = [];

updateCart();

modal.classList.remove("show");

cartElement.classList.remove("open");

event.target.reset();

showToast( "Compra realizada com sucesso! 🎉" );

} );

/* ========================= TEMA ========================= */

document .getElementById("themeButton") .addEventListener( "click", () => {

document .body .classList .toggle("light");

const light = document.body.classList.contains("light");

document .getElementById("themeButton") .textContent = light ? "☀️" : "🌙";

} );

/* ========================= JOGO ALEATÓRIO ========================= */

document .getElementById("randomGame") .addEventListener( "click", () => {

const random = games[ Math.floor( Math.random() * games.length ) ];

showToast( 🎮 Experimente: ${random.name} );

} );

/* ========================= OFERTA ========================= */

document .getElementById("offerButton") .addEventListener( "click", () => {

showToast( "🔥 Você desbloqueou a área de ofertas!" );

document .getElementById("jogos") .scrollIntoView({ behavior: "smooth" });

} );

/* ========================= SOBRE ========================= */

document .getElementById("aboutButton") .addEventListener( "click", () => {

showToast( "🎮 V.O.X — feita para quem ama jogos!" );

} );

/* ========================= NOTIFICAÇÃO ========================= */

let toastTimer;

function showToast(message) {

toast.textContent = message;

toast.classList.add("show");

clearTimeout(toastTimer);

toastTimer = setTimeout( () => {

toast.classList.remove("show");

}, 2500 );

}

/* ========================= INICIALIZAÇÃO ========================= */

renderGames();

updateCart();