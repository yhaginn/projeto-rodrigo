/* ===================================== V.O.X — JAVASCRIPT ===================================== */

/* ===================================== VARIÁVEIS ===================================== */

let cart = [];

let favorites = [];

let selectedPlatform = "PS5";

let selectedEdition = "Standard";

/* ===================================== ELEMENTOS ===================================== */

const cart = document.getElementById("cart");

const cartButton = document.getElementById("cartButton");

const closeCart = document.getElementById("closeCart");

const overlay = document.getElementById("overlay");

const cartList = document.getElementById("cartList");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

const checkoutModal = document.getElementById("checkoutModal");

/* ===================================== CONTADOR GTA VI ===================================== */

const launchDate = new Date( "2026-11-19T00:00:00-03:00" ).getTime();

function updateCountdown() {

const now = new Date().getTime();

const difference = launchDate - now;

if (difference <= 0) {

document.getElementById("days") .textContent = "00";

document.getElementById("hours") .textContent = "00";

document.getElementById("minutes") .textContent = "00";

document.getElementById("seconds") .textContent = "00";

return;

}

const days = Math.floor( difference / (1000 * 60 * 60 * 24) );

const hours = Math.floor( ( difference % (1000 * 60 * 60 * 24) ) / (1000 * 60 * 60) );

const minutes = Math.floor( ( difference % (1000 * 60 * 60) ) / (1000 * 60) );

const seconds = Math.floor( ( difference % (1000 * 60) ) / 1000 );

document.getElementById("days") .textContent = String(days).padStart(2, "0");

document.getElementById("hours") .textContent = String(hours).padStart(2, "0");

document.getElementById("minutes") .textContent = String(minutes).padStart(2, "0");

document.getElementById("seconds") .textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval( updateCountdown, 1000 );

/* ===================================== ABRIR CARRINHO ===================================== */

function openCart() {

cart.classList.add("open");

overlay.classList.add("show");

}

cartButton.addEventListener( "click", openCart );

/* ===================================== FECHAR CARRINHO ===================================== */

function closeCartPanel() {

cart.classList.remove("open");

overlay.classList.remove("show");

}

closeCart.addEventListener( "click", closeCartPanel );

overlay.addEventListener( "click", closeCartPanel );

/* ===================================== ADICIONAR PRODUTO ===================================== */

document .querySelectorAll(".add-button") .forEach(button => {

button.addEventListener( "click", () => {

const name = button.dataset.name;

const price = Number( button.dataset.price );

const icon = button.dataset.icon;

const existing = cart.find( item => item.name === name );

if (existing) {

existing.quantity++;

} else {

cart.push({

name, price, icon,

quantity: 1

});

}

updateCart();

showToast( 🎮 ${name} adicionado! );

} );

});

/* ===================================== ATUALIZAR CARRINHO ===================================== */

function updateCart() {

cartList.innerHTML = "";

if (cart.length === 0) {

cartList.innerHTML = `

<div class="empty">

🛒

<p> Seu carrinho está vazio. </p>

</div>

`;

}

let total = 0;

let quantity = 0;

cart.forEach( (item, index) => {

total += item.price * item.quantity;

quantity += item.quantity;

const element = document.createElement("div");

element.className = "cart-item";

element.innerHTML = `

<div class="cart-icon"> ${item.icon} </div>

<div class="cart-details">

<h4> ${item.name} </h4>

<strong> R$ ${formatMoney( item.price )} </strong>

<div class="quantity">

<button data-action="minus" data-index="${index}" > − </button>

<span> ${item.quantity} </span>

<button data-action="plus" data-index="${index}" > + </button>

</div>

</div>

<button class="remove" data-remove="${index}" > 🗑️ </button>

`;

cartList.appendChild(element);

} );

cartCount.textContent = quantity;

cartTotal.textContent = R$ ${formatMoney(total)};

addCartButtonEvents();

}

/* ===================================== BOTÕES + / - ===================================== */

function addCartButtonEvents() {

document .querySelectorAll( "[data-action]" ) .forEach(button => {

button.addEventListener( "click", () => {

const index = Number( button.dataset.index );

const action = button.dataset.action;

if (action === "plus") {

cart[index].quantity++;

}

if ( action === "minus" ) {

cart[index].quantity--;

if ( cart[index].quantity <= 0 ) {

cart.splice( index, 1 );

}

}

updateCart();

} );

});

document .querySelectorAll( "[data-remove]" ) .forEach(button => {

button.addEventListener( "click", () => {

const index = Number( button.dataset.remove );

cart.splice( index, 1 );

updateCart();

showToast( "🗑️ Produto removido." );

} );

});

}

/* ===================================== FORMATAR DINHEIRO ===================================== */

function formatMoney(value) {

return value .toFixed(2) .replace(".", ",");

}

/* ===================================== FAVORITOS ===================================== */

document .querySelectorAll(".favorite") .forEach(button => {

button.addEventListener( "click", () => {

const card = button.closest( ".game-card" );

const name = card.querySelector("h3") .textContent;

button.classList.toggle( "active" );

if ( button.classList.contains( "active" ) ) {

button.textContent = "♥";

favorites.push(name);

showToast( "❤️ Adicionado aos favoritos!" );

} else {

button.textContent = "♡";

favorites = favorites.filter( item => item !== name );

}

} );

});

/* ===================================== PESQUISA ===================================== */

const searchInput = document.getElementById( "searchInput" );

searchInput.addEventListener( "input", () => {

const text = searchInput.value .toLowerCase() .trim();

document .querySelectorAll( ".game-card" ) .forEach(card => {

const name = card.querySelector("h3") .textContent .toLowerCase();

card.style.display = name.includes(text) ? "" : "none";

});

} );

/* ===================================== FILTROS ===================================== */

document .querySelectorAll(".filter") .forEach(filter => {

filter.addEventListener( "click", () => {

document .querySelectorAll( ".filter" ) .forEach(item => {

item.classList.remove( "active" );

});

filter.classList.add( "active" );

const category = filter.dataset.category;

document .querySelectorAll( ".game-card" ) .forEach(card => {

const cardCategory = card.dataset.category;

if ( category === "all" || category === cardCategory ) {

card.style.display = "";

} else {

card.style.display = "none";

}

});

} );

});

/* ===================================== CHECKOUT ===================================== */

const checkoutButton = document.getElementById( "checkoutButton" );

checkoutButton.addEventListener( "click", () => {

if (cart.length === 0) {

showToast( "🛒 Adicione um jogo primeiro!" );

return;

}

updateCheckout();

checkoutModal.classList.add( "show" );

} );

/* ===================================== ATUALIZAR CHECKOUT ===================================== */

function updateCheckout() {

let total = 0;

cart.forEach(item => {

total += item.price * item.quantity;

});

document.getElementById( "checkoutTotal" ).textContent = R$ ${formatMoney(total)};

document.getElementById( "checkoutProduct" ).textContent = ${cart.length} produto(s);

}

/* ===================================== FECHAR CHECKOUT ===================================== */

document .getElementById("closeCheckout") .addEventListener( "click", () => {

checkoutModal.classList.remove( "show" );

} );

/* ===================================== PLATAFORMA ===================================== */

document .querySelectorAll(".platform") .forEach(button => {

button.addEventListener( "click", () => {

document .querySelectorAll( ".platform" ) .forEach(item => item.classList.remove( "active" ) );

button.classList.add( "active" );

selectedPlatform = button.dataset.platform;

} );

});

/* ===================================== EDIÇÃO ===================================== */

document .querySelectorAll(".edition") .forEach(button => {

button.addEventListener( "click", () => {

document .querySelectorAll( ".edition" ) .forEach(item => item.classList.remove( "active" ) );

button.classList.add( "active" );

selectedEdition = button.dataset.edition;

} );

});

/* ===================================== CONFIRMAR PEDIDO ===================================== */

document .getElementById( "confirmPurchase" ) .addEventListener( "click", () => {

const payment = document.getElementById( "payment" ).value;

showToast( ✅ Pedido criado! ${selectedPlatform} • ${selectedEdition} • ${payment.toUpperCase()} );

checkoutModal.classList.remove( "show" );

cart = [];

updateCart();

closeCartPanel();

} );

/* ===================================== GTA VI COMPRAR ===================================== */

document .getElementById( "gtaBuyButton" ) .addEventListener( "click", () => {

const gta = cart.find( item => item.name === "Grand Theft Auto VI" );

if (gta) {

gta.quantity++;

} else {

cart.push({

name: "Grand Theft Auto VI",

price: 449.90,

icon: "🔥",

quantity: 1

});

}

updateCart();

openCart();

showToast( "🔥 GTA VI adicionado ao carrinho!" );

} );

/* ===================================== OFERTAS ===================================== */

document .getElementById( "offerButton" ) .addEventListener( "click", () => {

document .getElementById( "games" ) .scrollIntoView({ behavior: "smooth" });

showToast( "🔥 Confira nossos jogos!" );

} );

/* ===================================== TEMA ===================================== */

const themeButton = document.getElementById( "themeButton" );

themeButton.addEventListener( "click", () => {

document.body.classList.toggle( "light" );

const light = document.body.classList.contains( "light" );

themeButton.textContent = light ? "☀️" : "🌙";

} );

/* ===================================== LOGIN ===================================== */

const loginModal = document.getElementById( "loginModal" );

document .getElementById( "loginButton" ) .addEventListener( "click", () => {

loginModal.classList.add( "show" );

} );

document .getElementById( "closeLogin" ) .addEventListener( "click", () => {

loginModal.classList.remove( "show" );

} );

document .getElementById( "loginSubmit" ) .addEventListener( "click", () => {

const name = document.getElementById( "loginName" ).value;

if (!name) {

showToast( "⚠️ Digite seu nome!" );

return;

}

loginModal.classList.remove( "show" );

showToast( 👋 Bem-vindo, ${name}! );

} );

/* ===================================== TOAST ===================================== */

function showToast(message) {

toast.textContent = message;

toast.classList.add( "show" );

setTimeout( () => {

toast.classList.remove( "show" );

}, 3000 );

}

/* ===================================== ESC ===================================== */

document.addEventListener( "keydown", event => {

if ( event.key === "Escape" ) {

closeCartPanel();

checkoutModal.classList.remove( "show" );

loginModal.classList.remove( "show" );

}

} );

/* ===================================== INICIALIZAÇÃO ===================================== */

updateCart();

console.log( "🎮 V.O.X carregada!" );

console.log( "🔥 GTA VI chegando em 19/11/2026!" );