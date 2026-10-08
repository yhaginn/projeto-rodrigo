/* ========================================= V.O.X - JAVASCRIPT ========================================= */

let cartItems = [];

let favorites = [];

let selectedPlatform = "PS5";

let selectedEdition = "Standard";

/* ========================================= ELEMENTOS ========================================= */

const cartPanel = document.getElementById("cart");

const cartButton = document.getElementById("cartButton");

const closeCartButton = document.getElementById("closeCart");

const overlay = document.getElementById("overlay");

const cartList = document.getElementById("cartList");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

const checkoutModal = document.getElementById("checkoutModal");

const loginModal = document.getElementById("loginModal");

/* ========================================= CONTADOR GTA VI ========================================= */

const launchDate = new Date( "2026-11-19T00:00:00-03:00" ).getTime();

function updateCountdown() {

const now = new Date().getTime();

const difference = launchDate - now;

if (difference <= 0) {

document.getElementById("days").textContent = "00"; document.getElementById("hours").textContent = "00"; document.getElementById("minutes").textContent = "00"; document.getElementById("seconds").textContent = "00";

return; }

const days = Math.floor( difference / (1000 * 60 * 60 * 24) );

const hours = Math.floor( (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) );

const minutes = Math.floor( (difference % (1000 * 60 * 60)) / (1000 * 60) );

const seconds = Math.floor( (difference % (1000 * 60)) / 1000 );

document.getElementById("days").textContent = String(days).padStart(2, "0");

document.getElementById("hours").textContent = String(hours).padStart(2, "0");

document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");

document.getElementById("seconds").textContent = String(seconds).padStart(2, "0"); }

updateCountdown();

setInterval(updateCountdown, 1000);

/* ========================================= CARRINHO - ABRIR ========================================= */

cartButton.addEventListener("click", () => {

cartPanel.classList.add("open");

overlay.classList.add("show");

});

/* ========================================= CARRINHO - FECHAR ========================================= */

function closeCart() {

cartPanel.classList.remove("open");

overlay.classList.remove("show");

}

closeCartButton.addEventListener( "click", closeCart );

overlay.addEventListener( "click", closeCart );

/* ========================================= ADICIONAR PRODUTOS ========================================= */

document .querySelectorAll(".add-button") .forEach(button => {

button.addEventListener("click", () => {

const name = button.dataset.name;

const price = Number( button.dataset.price );

const icon = button.dataset.icon;

const existingProduct = cartItems.find( item => item.name === name );

if (existingProduct) {

existingProduct.quantity++;

} else {

cartItems.push({

name: name,

price: price,

icon: icon,

quantity: 1

});

}

updateCart();

showToast( "🎮 " + name + " adicionado ao carrinho!" );

});

});

/* ========================================= ATUALIZAR CARRINHO ========================================= */

function updateCart() {

cartList.innerHTML = "";

let total = 0;

let quantity = 0;

if (cartItems.length === 0) {

cartList.innerHTML = `

<div class="empty">

🛒

<p> Seu carrinho está vazio. </p>

</div>

`;

}

cartItems.forEach((item, index) => {

total += item.price * item.quantity;

quantity += item.quantity;

const cartItem = document.createElement("div");

cartItem.className = "cart-item";

cartItem.innerHTML = `

<div class="cart-icon"> ${item.icon} </div>

<div class="cart-details">

<h4> ${item.name} </h4>

<strong> R$ ${formatMoney(item.price)} </strong>

<div class="quantity">

<button class="minus-button" data-index="${index}" > − </button>

<span> ${item.quantity} </span>

<button class="plus-button" data-index="${index}" > + </button>

</div>

</div>

<button class="remove" data-index="${index}" > 🗑️ </button>

`;

cartList.appendChild(cartItem);

});

cartCount.textContent = quantity;

cartTotal.textContent = "R$ " + formatMoney(total);

activateCartButtons(); }

/* ========================================= BOTÕES DO CARRINHO ========================================= */

function activateCartButtons() {

document .querySelectorAll(".plus-button") .forEach(button => {

button.addEventListener( "click", () => {

const index = Number(button.dataset.index);

cartItems[index].quantity++;

updateCart();

} );

});

document .querySelectorAll(".minus-button") .forEach(button => {

button.addEventListener( "click", () => {

const index = Number(button.dataset.index);

cartItems[index].quantity--;

if ( cartItems[index].quantity <= 0 ) {

cartItems.splice(index, 1);

}

updateCart();

} );

});

document .querySelectorAll(".remove") .forEach(button => {

button.addEventListener( "click", () => {

const index = Number(button.dataset.index);

cartItems.splice(index, 1);

updateCart();

showToast( "🗑️ Produto removido." );

} );

});

}

/* ========================================= DINHEIRO ========================================= */

function formatMoney(value) {

return value .toFixed(2) .replace(".", ",");

}

/* ========================================= FAVORITOS ========================================= */

document .querySelectorAll(".favorite") .forEach(button => {

button.addEventListener( "click", () => {

const card = button.closest(".game-card");

const name = card.querySelector("h3") .textContent;

button.classList.toggle("active");

if ( button.classList.contains("active") ) {

button.textContent = "♥";

favorites.push(name);

showToast( "❤️ Adicionado aos favoritos!" );

} else {

button.textContent = "♡";

favorites = favorites.filter( item => item !== name );

}

} );

});

/* ========================================= PESQUISA ========================================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener( "input", () => {

const search = searchInput.value .toLowerCase() .trim();

document .querySelectorAll(".game-card") .forEach(card => {

const name = card.querySelector("h3") .textContent .toLowerCase();

if (name.includes(search)) {

card.style.display = "";

} else {

card.style.display = "none";

}

});

} );

/* ========================================= FILTROS ========================================= */

document .querySelectorAll(".filter") .forEach(filter => {

filter.addEventListener( "click", () => {

document .querySelectorAll(".filter") .forEach(button => {

button.classList.remove( "active" );

});

filter.classList.add("active");

const category = filter.dataset.category;

document .querySelectorAll(".game-card") .forEach(card => {

if ( category === "all" || card.dataset.category === category ) {

card.style.display = "";

} else {

card.style.display = "none";

}

});

} );

});

/* ========================================= CHECKOUT ========================================= */

const checkoutButton = document.getElementById( "checkoutButton" );

checkoutButton.addEventListener( "click", () => {

if (cartItems.length === 0) {

showToast( "🛒 Seu carrinho está vazio!" );

return;

}

updateCheckout();

checkoutModal.classList.add("show");

} );

/* ========================================= ATUALIZAR CHECKOUT ========================================= */

function updateCheckout() {

let total = 0;

cartItems.forEach(item => {

total += item.price * item.quantity;

});

document.getElementById( "checkoutTotal" ).textContent = "R$ " + formatMoney(total);

document.getElementById( "checkoutProduct" ).textContent = cartItems.length + " produto(s)";

}

/* ========================================= FECHAR CHECKOUT ========================================= */

document .getElementById("closeCheckout") .addEventListener( "click", () => {

checkoutModal.classList.remove( "show" );

} );

/* ========================================= PLATAFORMAS ========================================= */

document .querySelectorAll(".platform") .forEach(button => {

button.addEventListener( "click", () => {

document .querySelectorAll(".platform") .forEach(item => {

item.classList.remove( "active" );

});

button.classList.add("active");

selectedPlatform = button.dataset.platform;

} );

});

/* ========================================= EDIÇÕES ========================================= */

document .querySelectorAll(".edition") .forEach(button => {

button.addEventListener( "click", () => {

document .querySelectorAll(".edition") .forEach(item => {

item.classList.remove( "active" );

});

button.classList.add("active");

selectedEdition = button.dataset.edition;

} );

});

/* ========================================= CONFIRMAR COMPRA ========================================= */

document .getElementById("confirmPurchase") .addEventListener( "click", () => {

const payment = document.getElementById( "payment" ).value;

showToast(

"✅ Pedido realizado! " + selectedPlatform + " • " + selectedEdition + " • " + payment.toUpperCase()

);

checkoutModal.classList.remove( "show" );

cartItems = [];

updateCart();

closeCart();

} );

/* ========================================= BOTÃO GTA VI ========================================= */

document .getElementById("gtaBuyButton") .addEventListener( "click", () => {

const gta = cartItems.find( item => item.name === "Grand Theft Auto VI" );

if (gta) {

gta.quantity++;

} else {

cartItems.push({

name: "Grand Theft Auto VI",

price: 449.90,

icon: "🔥",

quantity: 1

});

}

updateCart();

cartPanel.classList.add("open");

overlay.classList.add("show");

showToast( "🔥 GTA VI adicionado ao carrinho!" );

} );

/* ========================================= OFERTAS ========================================= */

document .getElementById("offerButton") .addEventListener( "click", () => {

document .getElementById("games") .scrollIntoView({ behavior: "smooth" });

showToast( "🔥 Confira nossos jogos!" );

} );

/* ========================================= TEMA ========================================= */

const themeButton = document.getElementById( "themeButton" );

themeButton.addEventListener( "click", () => {

document.body.classList.toggle( "light" );

if ( document.body.classList.contains( "light" ) ) {

themeButton.textContent = "☀️";

} else {

themeButton.textContent = "🌙";

}

} );

/* ========================================= LOGIN ========================================= */

document .getElementById("loginButton") .addEventListener( "click", () => {

loginModal.classList.add("show");

} );

document .getElementById("closeLogin") .addEventListener( "click", () => {

loginModal.classList.remove( "show" );

} );

document .getElementById("loginSubmit") .addEventListener( "click", () => {

const name = document.getElementById( "loginName" ).value.trim();

if (name === "") {

showToast( "⚠️ Digite seu nome!" );

return;

}

loginModal.classList.remove( "show" );

showToast( "👋 Bem-vindo, " + name + "!" );

} );

/* ========================================= NOTIFICAÇÃO ========================================= */

function showToast(message) {

toast.textContent = message;

toast.classList.add("show");

setTimeout( () => {

toast.classList.remove("show");

}, 3000 );

}

/* ========================================= TECLA ESC ========================================= */

document.addEventListener( "keydown", event => {

if (event.key === "Escape") {

closeCart();

checkoutModal.classList.remove( "show" );

loginModal.classList.remove( "show" );

}

} );

/* ========================================= INICIAR ========================================= */

updateCart();

console.log("🎮 V.O.X funcionando!");