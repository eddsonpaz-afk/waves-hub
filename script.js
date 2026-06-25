const WHATSAPP = "558530318830";

const produtos = [
  {
    codigo: "7404",
    nome: "Disco de Corte Inox 4.1/2”",
    categoria: "Abrasivos",
    subcategoria: "Disco de Corte",
    medida: "115mm",
    embalagem: "50 un. inner / 400 un. master",
    aplicacao: "Aço inox, chapas, tubos e barras",
    descricao: "Disco para cortes em aço inoxidável, com foco em corte rápido e acabamento limpo."
  },
  {
    codigo: "7506",
    nome: "Disco de Corte Inox 7”",
    categoria: "Abrasivos",
    subcategoria: "Disco de Corte",
    medida: "180mm",
    embalagem: "50 un. inner / 200 un. master",
    aplicacao: "Aço inox, tubos e barras",
    descricao: "Disco de corte 7 polegadas para aplicações profissionais em aço inoxidável."
  },
  {
    codigo: "7902",
    nome: "Eletrodo 6013",
    categoria: "Solda",
    subcategoria: "Eletrodo",
    medida: "4,00mm",
    embalagem: "5kg inner / 20kg master",
    aplicacao: "Serralheria, manutenção e estruturas leves",
    descricao: "Eletrodo indicado para soldagem em estruturas leves em aço carbono."
  },
  {
    codigo: "6885",
    nome: "Eletrodo 6013 PRO Blue",
    categoria: "Solda",
    subcategoria: "Eletrodo",
    medida: "2,50mm",
    embalagem: "5kg inner / 20kg master",
    aplicacao: "Serralheria e manutenção",
    descricao: "Linha PRO Blue com boa estabilidade de arco e excelente acabamento."
  },
  {
    codigo: "7819",
    nome: "Eletrodo 7018",
    categoria: "Solda",
    subcategoria: "Eletrodo",
    medida: "2,50mm",
    embalagem: "5kg inner / 20kg master",
    aplicacao: "Estruturas metálicas e soldagens críticas",
    descricao: "Eletrodo básico para soldagem em estruturas pesadas e aplicações com maior exigência."
  },
  {
    codigo: "6907",
    nome: "Solda MIG",
    categoria: "Solda",
    subcategoria: "Arame MIG",
    medida: "0,8mm",
    embalagem: "15kg",
    aplicacao: "MIG/MAG, oficinas e indústria",
    descricao: "Arame sólido para soldagem MIG/MAG com boa estabilidade e acabamento."
  },
  {
    codigo: "10351",
    nome: "Andaime Padrão 1m x 1,5m",
    categoria: "Construção",
    subcategoria: "Andaime",
    medida: "1m x 1,5m",
    embalagem: "1 unidade",
    aplicacao: "Obras, manutenção e montagem",
    descricao: "Estrutura tubular para trabalhos em altura com segurança, praticidade e resistência."
  },
  {
    codigo: "10352",
    nome: "Escora Padrão",
    categoria: "Construção",
    subcategoria: "Escora",
    medida: "1,6m x 2,9m",
    embalagem: "1 unidade",
    aplicacao: "Sustentação temporária em obras",
    descricao: "Escora metálica para sustentação de lajes, vigas e formas."
  },
  {
    codigo: "10287",
    nome: "Escova Manual de Aço",
    categoria: "Ferramentas",
    subcategoria: "Escova",
    medida: "240mm",
    embalagem: "12 un. inner / 120 un. master",
    aplicacao: "Limpeza, remoção de ferrugem e rebarbas",
    descricao: "Escova manual de aço com cabo plástico para limpeza pesada."
  },
  {
    codigo: "10402",
    nome: "Jogo de Escovas com 3 peças",
    categoria: "Ferramentas",
    subcategoria: "Escova",
    medida: "7”",
    embalagem: "20 jogos inner / 120 jogos master",
    aplicacao: "Limpeza de superfícies e acabamento",
    descricao: "Jogo com escovas de aço inox, latão e nylon para diferentes aplicações."
  }
];

let categoriaAtual = "Todos";

const categorias = ["Todos", "Abrasivos", "Solda", "Construção", "Ferramentas"];

function buildChips() {
  const chips = document.getElementById("chips");
  chips.innerHTML = categorias.map(cat => `
    <button class="${cat === categoriaAtual ? "active" : ""}" onclick="filterByCategory('${cat}')">${cat}</button>
  `).join("");
}

function filterByCategory(cat) {
  categoriaAtual = cat;
  document.getElementById("searchInput").value = "";
  buildChips();
  renderProducts();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
}

function clearFilters() {
  categoriaAtual = "Todos";
  document.getElementById("searchInput").value = "";
  buildChips();
  renderProducts();
}

function renderProducts() {
  const term = document.getElementById("searchInput").value.toLowerCase().trim();
  const container = document.getElementById("products");

  const filtrados = produtos.filter(p => {
    const inCategory = categoriaAtual === "Todos" || p.categoria === categoriaAtual;
    const text = `${p.codigo} ${p.nome} ${p.categoria} ${p.subcategoria} ${p.medida} ${p.aplicacao} ${p.descricao}`.toLowerCase();
    const inSearch = !term || text.includes(term);
    return inCategory && inSearch;
  });

  document.getElementById("resultCount").textContent =
    `${filtrados.length} ${filtrados.length === 1 ? "produto encontrado" : "produtos encontrados"}`;

  if (!filtrados.length) {
    container.innerHTML = `
      <div class="empty">
        Nenhum produto encontrado. Tente buscar por categoria, código ou aplicação.
      </div>
    `;
    return;
  }

  container.innerHTML = filtrados.map(p => {
    const msg = `Olá, quero saber mais sobre este produto:\n\n${p.nome}\nCódigo: ${p.codigo}\nCategoria: ${p.categoria}\nMedida: ${p.medida}`;
    return `
      <article class="product">
        <small>${p.categoria} • ${p.subcategoria} • Cód. ${p.codigo}</small>
        <h3>${p.nome}</h3>

        <div class="meta">
          <span>${p.medida}</span>
          <span>${p.embalagem}</span>
        </div>

        <p><strong>Aplicação:</strong> ${p.aplicacao}</p>
        <p>${p.descricao}</p>

        <a target="_blank" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}">
          Falar sobre este produto
        </a>
      </article>
    `;
  }).join("");
}

buildChips();
renderProducts();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
