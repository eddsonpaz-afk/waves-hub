const P=window.WAVES_PRODUCTS;
const grid=document.querySelector('#productGrid');
const filters=document.querySelector('#filters');
const taskPills=document.querySelector('#taskPills');
const searchInput=document.querySelector('#searchInput');
const cats=['Todos',...new Set(P.map(p=>p.category))];
const tasks=[
 ['Tudo','Todos','ver catálogo completo'],['Cortar','Corte','discos para corte'],['Desbastar','Abrasivos','acabamento e desbaste'],
 ['Soldar','Solda','eletrodos profissionais'],['Medir','Medição','medição rápida'],['Fixar','Fixação','buchas e parafusos']
];
let activeCat='Todos',query='';
function productSrc(key){const known={6885:'https://raw.githubusercontent.com/eddsonpaz-afk/waves-hub/main/assets/produtos/6885.png',7953:'https://wavesplus.com.br/wp-content/uploads/7953-600x450.png',7941:'https://wavesplus.com.br/wp-content/uploads/7941-600x450.png'};return known[key]||`https://wavesplus.com.br/wp-content/uploads/${key}.jpg`}
window.productImgError=(el,key)=>{const n=Number(el.dataset.try||0)+1;el.dataset.try=n;if(n===1){el.src=`https://wavesplus.com.br/wp-content/uploads/${key}.png`;return}if(n===2){el.src=`https://wavesplus.com.br/wp-content/uploads/${key}-600x450.png`;return}el.onerror=null;el.src=`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="100%" height="100%" fill="white"/><circle cx="400" cy="330" r="145" fill="none" stroke="%23ddd7cc" stroke-width="18"/><text x="400" y="570" text-anchor="middle" font-family="Arial" font-size="38" fill="%23071b29">WAVES EXPRESS</text><text x="400" y="620" text-anchor="middle" font-family="Arial" font-size="24" fill="%23ff7417">CÓD. ${key}</text></svg>`)}`}
function wa(p){const t=`Olá! Vim pelo Waves Express e quero comprar: ${p.name}. Código: ${p.code}. Pode me passar o valor e a condição?`;return `https://wa.me/558530318830?text=${encodeURIComponent(t)}`}
function renderFilters(){filters.innerHTML=cats.map(c=>`<button class="${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`).join('')}
function renderTasks(){taskPills.innerHTML=tasks.map(([label,cat,sub])=>`<button data-cat="${cat}" class="${cat===activeCat?'active':''}"><b>${label}</b><span>${sub}</span></button>`).join('')}
function matches(p){const q=query.trim().toLowerCase();const cat=activeCat==='Todos'||p.category===activeCat;const txt=`${p.name} ${p.code} ${p.category} ${p.composition}`.toLowerCase();return cat&&(!q||txt.includes(q))}
function card(p){return `<article class="card">
 <div class="card-image"><span class="badge">${p.category}</span><span class="card-index">${p.id}</span><img src="${productSrc(p.images[0].replace('.jpg',''))}" onerror="productImgError(this,'${p.images[0].replace('.jpg','')}')" alt="${p.name}" loading="lazy"></div>
 <div class="card-body"><div class="code">CÓD. ${p.code}</div><h3>${p.name}</h3><p>${p.composition}</p>
 <div class="card-price"><strong>WAVES EXPRESS</strong><small>valor pelo WhatsApp</small></div>
 <div class="card-actions"><a class="details" href="produto.html?id=${p.id}">VER DETALHES</a><a class="buy" href="${wa(p)}" target="_blank" rel="noopener" aria-label="Comprar ${p.name} pelo WhatsApp">↗</a></div></div></article>`}
function render(){const list=P.filter(matches);grid.innerHTML=list.length?list.map(card).join(''):`<div class="empty-state"><strong>Nenhum produto encontrado.</strong><br>Teste outro termo ou categoria.</div>`;renderFilters();renderTasks()}
filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;activeCat=b.dataset.cat;render()});
taskPills.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;activeCat=b.dataset.cat;render();document.querySelector('#produtos').scrollIntoView({behavior:'smooth'})});
searchInput.addEventListener('input',e=>{query=e.target.value;render()});
document.querySelector('#searchToggle')?.addEventListener('click',()=>{document.querySelector('#produtos').scrollIntoView({behavior:'smooth'});setTimeout(()=>searchInput.focus(),500)});
render();
