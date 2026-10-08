let cart = [];

let favorites = [];

/* ========================= ELEMENTOS ========================= */

const cartPanel = document.getElementById("cart");

const cartButton = document.getElementById("cartButton");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

/* ========================= CARRINHO ========================= */

cartButton.addEventListener("click", () => {

cartPanel.classList.add("open");

});

closeCart.addEventListener("click", () => {

cartPanel.classList.remove("open");

});

/* ========================= COMPRAR ========================= */

document.querySelectorAll(".buy-button").forEach(button => {

button.addEventListener("click", () => {

const card = button.closest(".game-card");

const name = card.querySelector("h3").textContent;

const price = parseFloat( card.querySelector(".game-price") .textContent .replace("R$", "") .replace(",", ".") );

const icon = card.querySelector(".game-cover") .textContent .trim();

const existing = cart.find(item => item.name === name);

if (existing) {

existing.quantity++;

} else {

cart.push({ name: name, price: price, icon: icon, quantity: 1 });

}

updateCart();

showToast( 🎮 ${name} adicionado ao carrinho! );

});

});

/* ========================= ATUALIZAR CARRINHO ========================= */

function updateCart() {

cartItems.innerHTML = "";

let total = 0;

let quantity = 0;

if (cart.length === 0) {

cartItems.innerHTML = <div class="empty-cart"> <span>🛒</span> <p>Seu carrinho está vazio.</p> </div> ;

}

cart.forEach((item, index) => {

total += item.price * item.quantity;

quantity += item.quantity;

const div = document.createElement("div");

div.className = "cart-item";

div.innerHTML = `

<div class="cart-icon"> ${item.icon} </div>

<div class="cart-info">

<h4> ${item.name} </h4>

<span> R$ ${item.price .toFixed(2) .replace(".", ",")} </span>

<small> x${item.quantity} </small>

</div>

<button class="remove-item" data-index="${index}" > ✕ </button>

`;

cartItems.appendChild(div);

});

cartCount.textContent = quantity;

cartTotal.textContent = R$ ${total .toFixed(2) .replace(".", ",")};

document .querySelectorAll(".remove-item") .forEach(button => {

button.addEventListener("click", () => {

const index = Number(button.dataset.index);

if ( cart[index].quantity > 1 ) {

cart[index].quantity--;

} else {

cart.splice(index, 1);

}

updateCart();

});

});

}

/* ========================= FAVORITOS ========================= */

document .querySelectorAll(".favorite-button") .forEach(button => {

button.addEventListener("click", () => {

const card = button.closest(".game-card");

const name = card.querySelector("h3") .textContent;

button.classList.toggle("active");

if ( button.classList.contains("active") ) {

button.textContent = "♥";

favorites.push(name);

showToast( ❤️ ${name} favoritado! );

} else {

button.textContent = "♡";

favorites = favorites.filter( item => item !== name );

}

});

});

/* ========================= PESQUISA ========================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

const search = searchInput.value .toLowerCase() .trim();

document .querySelectorAll(".game-card") .forEach(card => {

const name = card.querySelector("h3") .textContent .toLowerCase();

card.style.display = name.includes(search) ? "" : "none";

});

});

/* ========================= FILTROS ========================= */

document .querySelectorAll(".filter") .forEach(filter => {

filter.addEventListener("click", () => {

document .querySelectorAll(".filter") .forEach(item => item.classList.remove("active") );

filter.classList.add("active");

const category = filter.dataset.category;

document .querySelectorAll(".game-card") .forEach(card => {

const cardCategory = card.dataset.category;

if ( category === "all" || category === cardCategory ) {

card.style.display = "";

} else {

card.style.display = "none";

}

});

});

});

/* ========================= TEMA ========================= */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

document.body.classList.toggle("light");

const isLight = document.body.classList.contains("light");

themeButton.textContent = isLight ? "🌙" : "☀️";

});

/* ========================= LOGIN ========================= */

const loginButton = document.getElementById("loginButton");

const loginModal = document.getElementById("loginModal");

const closeModal = document.getElementById("closeModal");

loginButton.addEventListener("click", () => {

loginModal.classList.add("show");

});

closeModal.addEventListener("click", () => {

loginModal.classList.remove("show");

});

loginModal.addEventListener("click", event => {

if (event.target === loginModal) {

loginModal.classList.remove("show");

}

});

/* ========================= FORMULÁRIO ========================= */

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", event => {

event.preventDefault();

const name = document.getElementById("loginName").value;

loginModal.classList.remove("show");

showToast( 👋 Bem-vindo à V.O.X, ${name}! );

loginForm.reset();

});

/* ========================= OFERTAS ========================= */

const offerButton = document.getElementById("offerButton");

offerButton.addEventListener("click", () => {

document .getElementById("games") .scrollIntoView({ behavior: "smooth" });

showToast( "🔥 Confira nossos jogos!" );

});

/* ========================= FINALIZAR COMPRA ========================= */

document .querySelector(".checkout") .addEventListener("click", () => {

if (cart.length === 0) {

showToast( "🛒 Seu carrinho está vazio!" );

return;

}

showToast( "🎉 Compra iniciada!" );

setTimeout(() => {

cart = [];

updateCart();

cartPanel.classList.remove("open");

}, 1500);

});

/* ========================= NOTIFICAÇÃO ========================= */

function showToast(message) {

toast.textContent = message;

toast.classList.add("show");

setTimeout(() => {

toast.classList.remove("show");

}, 3000);

}

/* ========================= ESC ========================= */

document.addEventListener("keydown", event => {

if (event.key === "Escape") {

cartPanel.classList.remove("open");

loginModal.classList.remove("show");

}

});

/* ========================= INICIAR ========================= */

updateCart();

console.log( "🎮 V.O.X carregada com sucesso!" );