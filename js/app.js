const WHATSAPP = "558530318830";
const PDF_URL = "https://drive.google.com/file/d/1JUZRykitPg1_Isv2_Fz4SB7yy80ilMc0/view";

let lastScreen = "homeScreen";
let currentCategory = "Todos";
let currentSubcategory = "Todos";
let products = [];
let categories = [];

const defaultImage = "assets/produtos/eletrodo-6013-pro-blue.png";

async function loadData() {
  const [productsResponse, categoriesResponse] = await Promise.all([
    fetch("data/produtos.json"),
    fetch("data/categorias.json")
  ]);

  products = await productsResponse.json();
  categories = await categoriesResponse.json();

  renderFeatured();
  renderCategories();
}

function openScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
  const activeNav = document.querySelector(`[data-screen="${screenId}"]`);
  if (activeNav) activeNav.classList.add("active");

  if (screenId === "searchScreen") {
    renderSearchProducts();
    setTimeout(() => document.getElementById("searchInput").focus(), 200);
  }

  if (screenId === "categoriesScreen") renderCategories();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openWhatsApp(text) {
  const msg = text || "Olá, quero atendimento pelo Catálogo Waves Plus.";
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}

function renderFeatured() {
  const featured = products.slice(0, 4);
  document.getElementById("featuredProducts").innerHTML = featured.map(product => `
    <article class="featured-card" onclick="openProduct('${product.id}', 'homeScreen')">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='${defaultImage}'">
      <strong>${product.name}</strong>
      <small>${product.measure}</small>
    </article>
  `).join("");
}

function renderSearchProducts() {
  const input = document.getElementById("searchInput");
  const term = input ? input.value.toLowerCase().trim() : "";

  const filtered = products.filter(product => {
    const text = `${product.code} ${product.name} ${product.category} ${product.subcategory} ${product.measure} ${product.description} ${product.applications.join(" ")}`.toLowerCase();
    return !term || text.includes(term);
  });

  document.getElementById("resultCount").textContent =
    `${filtered.length} resultado${filtered.length === 1 ? "" : "s"} encontrado${filtered.length === 1 ? "" : "s"}`;

  document.getElementById("productsList").innerHTML = filtered.map(productRow).join("");
}

function productRow(product) {
  return `
    <article class="product-row" onclick="openProduct('${product.id}', currentCategory === 'Todos' ? 'searchScreen' : 'categoryProductsScreen')">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='${defaultImage}'">
      <div>
        <h3>${product.name}</h3>
        <p>${product.measure}</p>
        <small>Cód. ${product.code}</small>
      </div>
      <b>›</b>
    </article>
  `;
}

function renderCategories() {
  document.getElementById("categoryList").innerHTML = categories.map(category => `
    <button class="category-item" onclick="openCategory('${category.name}')">
      <span class="category-icon">${category.icon}</span>
      <span>
        <strong>${category.name}</strong>
        <small>${category.description}</small>
      </span>
      <b>›</b>
    </button>
  `).join("");
}

function openCategory(categoryName) {
  currentCategory = categoryName;
  currentSubcategory = "Todos";

  document.getElementById("categoryTitle").textContent = categoryName;
  openScreen("categoryProductsScreen");
  renderCategoryProducts();
}

function renderCategoryProducts() {
  const categoryProducts = products.filter(p => p.category === currentCategory);
  const subcategories = ["Todos", ...new Set(categoryProducts.map(p => p.subcategory))];

  document.getElementById("subCategoryChips").innerHTML = subcategories.map(sub => `
    <button class="${sub === currentSubcategory ? "active" : ""}" onclick="setSubcategory('${sub}')">${sub}</button>
  `).join("");

  const filtered = categoryProducts.filter(p => currentSubcategory === "Todos" || p.subcategory === currentSubcategory);

  document.getElementById("categoryProducts").innerHTML = filtered.map(productRow).join("");
}

function setSubcategory(subcategory) {
  currentSubcategory = subcategory;
  renderCategoryProducts();
}

function openProduct(productId, fromScreen) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  lastScreen = fromScreen || "homeScreen";

  document.getElementById("productDetail").innerHTML = `
    <img class="detail-image" src="${product.image}" alt="${product.name}" onerror="this.src='${defaultImage}'">

    <h2>${product.name}</h2>
    <p class="code">Código: ${product.code}</p>

    <div class="detail-block">
      <h3>Descrição</h3>
      <p>${product.description}</p>
    </div>

    <div class="detail-block">
      <h3>Informações</h3>
      <p><strong>Categoria:</strong> ${product.category}</p>
      <p><strong>Medida:</strong> ${product.measure}</p>
      <p><strong>Embalagem:</strong> ${product.package}</p>
    </div>

    <div class="detail-block">
      <h3>Aplicações</h3>
      <ul>
        ${product.applications.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-actions">
      <a class="catalog-btn" target="_blank" href="${PDF_URL}">Ver no Catálogo</a>
      <button class="whats-btn" onclick="openWhatsApp('Olá, quero saber mais sobre o produto: ${product.name} | Código: ${product.code}')">WhatsApp</button>
    </div>
  `;

  openScreen("productScreen");
}

function goBackFromProduct() {
  openScreen(lastScreen);
}

function clearSearch() {
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  renderSearchProducts();
}

loadData();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
