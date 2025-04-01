const products = [
  { id: 1, name: "Cerveja Heineken", category: "cervejas", price: 10, image: "assets/heineken.webp" },
  { id: 2, name: "Cerveja Heineken", category: "cervejas", price: 10, image: "assets/heineken.webp" },
  { id: 3, name: "Cigarro Malboro", category: "cigarros", price: 22.90, image: "assets/cigarro.jpg" },
  { id: 4, name: "Pod Ignite", category: "pods", price: 99, image: "assets/pods.webp" },
  { id: 5, name: "Vodka Absolut", category: "destilados", price: 50, image: "assets/absolut.jpg" },
  { id: 6, name: "Coca-Cola 2L", category: "refrigerantes", price: 8, image: "assets/coca.webp" }
];

const cart = [];

function loadMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  products.forEach(product => {
      const item = document.createElement("div");
      item.classList.add("product");
      item.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>R$ ${product.price},00</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">+</button>
      `;
      menu.appendChild(item);
  });
}

function filterCategory(category) {
  const filtered = products.filter(p => p.category === category);
  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  filtered.forEach(product => {
      const item = document.createElement("div");
      item.classList.add("product");
      item.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>R$ ${product.price},00</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">+</button>
      `;
      menu.appendChild(item);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  alert(`${product.name} adicionado ao carrinho!`);
}

function showCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - R$ ${item.price},00`;
      cartItems.appendChild(li);
  });
  document.getElementById("cart-modal").style.display = "block";
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function sendOrder() {
  const name = document.getElementById("customer-name").value;
  const contact = document.getElementById("customer-contact").value;
  const address = document.getElementById("customer-address").value;

  let order = cart.map(item => `${item.name} - R$ ${item.price},00`).join("\n");
  let message = `Pedido de ${name}\n${order}\nContato: ${contact}\nEndereço: ${address}`;
  let whatsappUrl = `https://api.whatsapp.com/send?phone=SEU_NUMERO&text=${encodeURIComponent(message)}`;

  window.location.href = whatsappUrl;
}

loadMenu();
