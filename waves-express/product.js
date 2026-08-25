const params=new URLSearchParams(location.search),id=params.get('id')||'01';
const p=window.WAVES_PRODUCTS.find(x=>x.id===id)||window.WAVES_PRODUCTS[0];
const root=document.querySelector('#productPage');
document.title=`${p.name} — Waves Express`;
function productSrc(key){const known={6885:'https://raw.githubusercontent.com/eddsonpaz-afk/waves-hub/main/assets/produtos/6885.png',7953:'https://wavesplus.com.br/wp-content/uploads/7953-600x450.png',7941:'https://wavesplus.com.br/wp-content/uploads/7941-600x450.png'};return known[key]||`https://wavesplus.com.br/wp-content/uploads/${key}.jpg`}
window.productImgError=(el,key)=>{const n=Number(el.dataset.try||0)+1;el.dataset.try=n;if(n===1){el.src=`https://wavesplus.com.br/wp-content/uploads/${key}.png`;return}if(n===2){el.src=`https://wavesplus.com.br/wp-content/uploads/${key}-600x450.png`;return}el.onerror=null;el.src=`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="100%" height="100%" fill="white"/><circle cx="400" cy="330" r="145" fill="none" stroke="%23ddd7cc" stroke-width="18"/><text x="400" y="570" text-anchor="middle" font-family="Arial" font-size="38" fill="%23071b29">WAVES EXPRESS</text><text x="400" y="620" text-anchor="middle" font-family="Arial" font-size="24" fill="%23ff7417">CÓD. ${key}</text></svg>`)}`}
const imageKeys=p.images.map(x=>x.replace('.jpg',''));
const productSlides=imageKeys.map((key,i)=>`<section class="media-slide"><img src="${productSrc(key)}" onerror="productImgError(this,'${key}')" alt="${p.name} — foto ${i+1}">${i===0?'<div class="swipe-hint">↑ PUXE PARA CIMA</div>':''}</section>`);
const workshop=`<section class="media-slide workshop"><img src="https://images.unsplash.com/photo-1748348812466-8e29e1348f73?auto=format&fit=crop&fm=jpg&q=75&w=1600" alt="Produto em ambiente de oficina"></section>`;
const video=`<section class="media-slide video"><div class="video-placeholder"><div class="play">▶</div><h2>VÍDEO DO PRODUTO</h2><p>Área pronta para receber demonstração, aplicação real, tutorial curto ou vídeo 360°. O conteúdo entra na mesma rolagem vertical das fotos.</p></div></section>`;
const slides=[...productSlides,workshop,video].filter(Boolean);
const wa=`https://wa.me/558530318830?text=${encodeURIComponent(`Olá! Vim pelo Waves Express e quero comprar: ${p.name}. Código: ${p.code}. Pode me passar o valor e a condição?`)}`;
const related=window.WAVES_PRODUCTS.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4);
const chips=(p.variantChips||p.specs.slice(0,4));
root.innerHTML=`<div class="product-shell">
 <section class="product-media-column"><div class="media-header"><span>FOTOS + VÍDEO · ROLE PARA CIMA</span><span class="media-progress">${slides.map((_,i)=>`<i class="${i===0?'active':''}"></i>`).join('')}</span></div><div class="media-wrap"><div class="media-stack" id="mediaStack">${slides.join('')}</div></div></section>
 <aside class="product-info"><div class="crumb">Início / ${p.category} / ${p.name}</div><div class="category">${p.category} · CÓD. ${p.code}</div><h1>${p.name}</h1>
 <div class="product-rating"><span class="stars">★★★★★</span><small>Produto selecionado Waves Express</small></div><p class="lead">${p.desc}</p>
 <div class="chips">${chips.map(x=>`<span>${x}</span>`).join('')}</div>
 <div class="price-box"><small>CONDIÇÃO WAVES EXPRESS</small><div class="consult">FALE COM A GENTE</div><small class="price-help">Valor, disponibilidade e entrega confirmados direto pelo WhatsApp.</small></div>
 <a class="buy-big" href="${wa}" target="_blank" rel="noopener">◉ &nbsp; QUERO COMPRAR PELO WHATSAPP</a>
 <div class="benefit-grid"><div><strong>Entrega rápida</strong><span>confirmada no atendimento</span></div><div><strong>Compra assistida</strong><span>sem cadastro complicado</span></div><div><strong>Qualidade profissional</strong><span>produto para quem trabalha</span></div><div><strong>Atendimento humano</strong><span>fale com especialista</span></div></div>
 <div class="specs"><div class="spec-row"><span>Composição</span><strong>${p.composition}</strong></div>${p.specs.map((s,i)=>`<div class="spec-row"><span>${['Especificação','Aplicação','Conteúdo','Detalhe'][i]||'Detalhe'}</span><strong>${s}</strong></div>`).join('')}</div>
 <div class="feature-note"><strong>Por que este produto?</strong><p>${p.longDesc||p.desc}</p></div>
 ${related.length?`<div class="related"><h3>VOCÊ TAMBÉM PODE PRECISAR</h3>${related.map(r=>`<a href="produto.html?id=${r.id}"><span>${r.name}</span><b>→</b></a>`).join('')}</div>`:''}
 </aside></div>`;
document.querySelector('#mobileBuy').innerHTML=`<a href="${wa}" target="_blank" rel="noopener">QUERO COMPRAR · WHATSAPP</a>`;
const stack=document.querySelector('#mediaStack');const dots=[...document.querySelectorAll('.media-progress i')];stack?.addEventListener('scroll',()=>{const idx=Math.round(stack.scrollTop/stack.clientHeight);dots.forEach((d,i)=>d.classList.toggle('active',i===idx))},{passive:true});
