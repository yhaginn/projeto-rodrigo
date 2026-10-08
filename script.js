/* ====================================== V.O.X JAVASCRIPT ====================================== */

/* ====================================== CARRINHO ====================================== */

let products = [];

const cartButton = document.getElementById("cartButton");

const cartModal = document.getElementById("cartModal");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

/* ABRIR */

cartButton.onclick = function () {

cartModal.classList.add("show");

};

/* FECHAR */

closeCart.onclick = function () {

cartModal.classList.remove("show");

};

/* ====================================== COMPRAR ====================================== */

const buyButtons = document.querySelectorAll(".buy-button");

buyButtons.forEach(function (button) {

button.onclick = function () {

const name = button.getAttribute("data-name");

const price = Number( button.getAttribute("data-price") );

const existing = products.find( function (product) {

return product.name === name;

} );

if (existing) {

existing.quantity++;

} else {

products.push({

name: name,

price: price,

quantity: 1

});

}

updateCart();

showMessage( "🎮 " + name + " foi adicionado!" );

};

});

/* ====================================== ATUALIZAR CARRINHO ====================================== */

function updateCart() {

cartItems.innerHTML = "";

let total = 0;

let quantity = 0;

if (products.length === 0) {

cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";

}

products.forEach( function (product, index) {

total += product.price * product.quantity;

quantity += product.quantity;

const div = document.createElement("div");

div.className = "cart-product";

div.innerHTML = `

<div>

<strong> ${product.name} </strong>

<br>

<span> 
𝑝
𝑟
𝑜
𝑑
𝑢
𝑐
𝑡
.
𝑞
𝑢
𝑎
𝑛
𝑡
𝑖
𝑡
𝑦
𝑥
𝑅
 ${product.price .toFixed(2) .replace(".", ",")} </span>

</div>

<button data-index="${index}" class="remove-product" > X </button>

`;

cartItems.appendChild(div);

} );

cartCount.textContent = quantity;

cartTotal.textContent = "R$ " + total .toFixed(2) .replace(".", ",");

activateRemoveButtons();

}

/* ====================================== REMOVER PRODUTO ====================================== */

function activateRemoveButtons() {

const buttons = document.querySelectorAll( ".remove-product" );

buttons.forEach(function (button) {

button.onclick = function () {

const index = Number( button.getAttribute( "data-index" ) );

products.splice( index, 1 );

updateCart();

};

});

}

/* ====================================== GTA VI ====================================== */

const gtaButton = document.getElementById("gtaButton");

gtaButton.onclick = function () {

const existing = products.find( function (product) {

return product.name === "GTA VI";

} );

if (existing) {

existing.quantity++;

} else {

products.push({

name: "GTA VI",

price: 449.90,

quantity: 1

});

}

updateCart();

cartModal.classList.add("show");

showMessage( "🔥 GTA VI adicionado ao carrinho!" );

};

/* ====================================== EXPLORAR ====================================== */

const exploreButton = document.getElementById( "exploreButton" );

exploreButton.onclick = function () {

document .getElementById("jogos") .scrollIntoView({ behavior: "smooth" });

};

/* ====================================== FILTROS ====================================== */

const filters = document.querySelectorAll(".filter");

filters.forEach(function (filter) {

filter.onclick = function () {

filters.forEach( function (item) {

item.classList.remove( "active" );

} );

filter.classList.add( "active" );

const selected = filter.getAttribute( "data-filter" );

const cards = document.querySelectorAll( ".game-card" );

cards.forEach(function (card) {

const category = card.getAttribute( "data-category" );

if ( selected === "all" || selected === category ) {

card.style.display = "";

} else {

card.style.display = "none";

}

});

};

});

/* ====================================== LOGIN ====================================== */

const loginButton = document.getElementById( "loginButton" );

const closeLogin = document.getElementById( "closeLogin" );

loginButton.onclick = function () {

document .getElementById("loginModal") .classList.add("show");

};

closeLogin.onclick = function () {

document .getElementById("loginModal") .classList.remove("show");

};

/* ====================================== LOGIN ====================================== */

const loginSubmit = document.getElementById( "loginSubmit" );

loginSubmit.onclick = function () {

const name = document .getElementById("loginName") .value .trim();

if (name === "") {

showMessage( "⚠️ Digite seu nome!" );

return;

}

document .getElementById("loginModal") .classList.remove("show");

showMessage( "👋 Bem-vindo, " + name + "!" );

};

/* ====================================== TEMA ====================================== */

const themeButton = document.getElementById( "themeButton" );

themeButton.onclick = function () {

document.body.classList.toggle( "light" );

if ( document.body.classList.contains( "light" ) ) {

themeButton.textContent = "☀️";

} else {

themeButton.textContent = "🌙";

}

};

/* ====================================== CHECKOUT ====================================== */

const checkoutButton = document.getElementById( "checkoutButton" );

checkoutButton.onclick = function () {

if (products.length === 0) {

showMessage( "🛒 Seu carrinho está vazio!" );

return;

}

showMessage( "✅ Compra iniciada!" );

};

/* ====================================== CONTADOR GTA VI ====================================== */

const launchDate = new Date( "2026-11-19T00:00:00-03:00" ).getTime();

function updateCountdown() {

const now = new Date().getTime();

const difference = launchDate - now;

if (difference <= 0) {

document.getElementById( "days" ).textContent = "00";

document.getElementById( "hours" ).textContent = "00";

document.getElementById( "minutes" ).textContent = "00";

document.getElementById( "seconds" ).textContent = "00";

return;

}

const days = Math.floor( difference / (1000 * 60 * 60 * 24) );

const hours = Math.floor( ( difference % (1000 * 60 * 60 * 24) ) / (1000 * 60 * 60) );

const minutes = Math.floor( ( difference % (1000 * 60 * 60) ) / (1000 * 60) );

const seconds = Math.floor( ( difference % (1000 * 60) ) / 1000 );

document.getElementById( "days" ).textContent = String(days).padStart(2, "0");

document.getElementById( "hours" ).textContent = String(hours).padStart(2, "0");

document.getElementById( "minutes" ).textContent = String(minutes).padStart(2, "0");

document.getElementById( "seconds" ).textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval( updateCountdown, 1000 );

/* ====================================== MENSAGEM ====================================== */

const toast = document.getElementById("toast");

function showMessage(message) {

toast.textContent = message;

toast.classList.add("show");

setTimeout( function () {

toast.classList.remove( "show" );

}, 2500 );

}

/* ====================================== FINAL ====================================== */

console.log( "V.O.X carregada com sucesso!" );

updateCart();