const produtos = [
  {
    codigo: "7404",
    nome: "Disco de Corte Inox 4.1/2”",
    categoria: "Abrasivos",
    descricao: "Disco para cortes em aço inoxidável, chapas, tubos e barras."
  },
  {
    codigo: "7902",
    nome: "Eletrodo 6013",
    categoria: "Solda",
    descricao: "Indicado para soldagem em estruturas leves em aço carbono."
  },
  {
    codigo: "10351",
    nome: "Andaime Padrão 1m x 1,5m",
    categoria: "Construção",
    descricao: "Estrutura tubular para trabalhos em altura com segurança."
  },
  {
    codigo: "10352",
    nome: "Escora Padrão",
    categoria: "Construção",
    descricao: "Equipamento para sustentação temporária em obras."
  }
];

function renderProducts() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const container = document.getElementById("products");

  const filtrados = produtos.filter(p => {
    return (
      p.nome.toLowerCase().includes(term) ||
      p.codigo.toLowerCase().includes(term) ||
      p.categoria.toLowerCase().includes(term)
    );
  });

  container.innerHTML = filtrados.map(p => `
    <article class="product">
      <small>${p.categoria} • Cód. ${p.codigo}</small>
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <a target="_blank" href="https://wa.me/558530318830?text=${encodeURIComponent('Olá, quero saber mais sobre: ' + p.nome + ' - Código ' + p.codigo)}">
        Falar sobre este produto
      </a>
    </article>
  `).join("");
}

function openSection(section) {
  const messages = {
    catalogo: "O catálogo oficial abre pelo botão superior ou menu inferior.",
    solda: "Solda Certa será conectado aqui na próxima versão.",
    fixa: "Fixa Certo será conectado aqui na próxima versão.",
    calculadoras: "Calculadoras serão adicionadas aqui na próxima versão."
  };

  alert(messages[section]);
}

renderProducts();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
