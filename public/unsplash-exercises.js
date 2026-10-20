(function(){
'use strict';
const E=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const genres={noticia:'newspaper',reportagem:'newspaper',entrevista:'newspaper',editorial:'newspaper',convite:'invitation card',receita:'cookbook recipe',manual:'cookbook recipe',bilhete:'handwritten note',carta:'handwritten note',diario:'writing notebook',poema:'books library',conto:'books library',fabula:'books library',cronica:'books library',verbete:'dictionary',anuncio:'newspaper'};
const objects={book:'books library',livro:'books library',notebook:'writing notebook',caderno:'writing notebook',school:'school classroom',escola:'school classroom',cat:'cat',gato:'cat',dog:'dog',cachorro:'dog',window:'window',janela:'window',door:'door',porta:'door',table:'wooden table',mesa:'wooden table',apple:'apple fruit',maca:'apple fruit',orange:'oranges fruit',laranja:'oranges fruit'};
function ref(value){const u=new URL(value);u.searchParams.set('utm_source','nexo');u.searchParams.set('utm_medium','referral');return E(u.href);}
function photo(query){const p=window.NEXO_CONTEXT_PHOTO_POOLS?.[query];if(!p)return null;const u=new URL(p.url);if(u.protocol!=='https:'||u.hostname!=='images.unsplash.com')return null;u.searchParams.set('w','960');u.searchParams.set('q','80');u.searchParams.set('auto','format');return {...p,src:u.href};}
function image(p,alt){return `<img src="${E(p.src)}" alt="${E(alt||p.description||'Imagem de referência do Unsplash')}" loading="lazy" decoding="async" width="960" height="640" data-unsplash-id="${E(p.id)}" onerror="this.closest('.unsplash-image-wrap').classList.add('photo-unavailable');this.hidden=true">`;}
function credit(p){return `Imagem de <a href="${ref(p.profile)}" target="_blank" rel="noopener noreferrer">${E(p.photographer)}</a> no <a href="${ref(p.page)}" target="_blank" rel="noopener noreferrer">Unsplash</a>.`;}
function figure(query,alt,cls=''){const p=photo(query);if(!p)return '';return `<div class="unsplash-image-wrap ${cls}">${image(p,alt)}<p class="photo-failure">A imagem está indisponível nesta conexão. Os dados e a explicação do exercício permanecem disponíveis.</p><div class="unsplash-credit">${credit(p)}</div><button class="context-zoom" type="button" onclick="openLessonImage(this.parentElement.querySelector('img'))">⤢ Ampliar imagem</button></div>`;}
function queryFor(q,s,t){
 const source=norm(q.q);
 if(s===1&&/livros/.test(source))return 'books library';
 if(s===1&&/lapis/.test(source))return 'writing notebook';
 if(s===1&&/reservatorio|litros/.test(source))return 'water filter';
 if(s===1&&/xicara|receita/.test(source))return 'cookbook recipe';
 if(s===1){if(q.visual||t===0||t===8||t===6||/laranjas|laranja/.test(source))return 'oranges fruit';if(t===1||t===5||t===9)return 'apple fruit';return window.NEXO_CONTEXT_PHOTO_QUERIES['math-'+t];}
 if(/encefalo|cerebro/.test(source))return 'brain MRI';
 if(/livros|biblioteca|library/.test(source))return 'books library';
 return window.NEXO_CONTEXT_PHOTO_QUERIES[q.exerciseContext?.kind];
}
function facts(q,solved){
 if(q.visual?.type==='orange-operation'){const labels=[...q.visual.labels];if(solved)labels[2]=labels[2].replace('?',q.visual.answer);return `<div class="photo-facts">${labels.map(label=>`<div>${E(label)}</div>`).join('')}</div>`;}
 const p=q.sourcePrompt||q.q,expr=p.match(/^Quanto é (\d+) \+ (\d+) × (\d+)\?$/),percent=p.match(/^Quanto é (\d+)% de (\d+)\?$/),part=p.match(/^Quanto é (\d+)\/(\d+) de (\d+)\?$/);
 let labels=[];
 if(expr)labels=[expr[1]+' laranjas avulsas',expr[2]+' caixas',expr[3]+' laranjas em cada caixa'];
 if(percent)labels=[percent[2]+' maçãs ao todo',percent[1]+'% serão separadas'];
 if(part)labels=[part[3]+' maçãs ao todo','Parte usada: '+part[1]+'/'+part[2]];
 if(solved&&labels.length)labels.push('Resultado: '+(q.choices?.find(c=>c.correct)?.text||q.opts[q.answer]));
 return labels.length?`<div class="photo-facts">${labels.map(label=>`<div>${E(label)}</div>`).join('')}</div>`:'';
}
window.NEXO_UNSPLASH_CASE=function(q,s,t,solved=false){
 if(s===0&&t===0){
  const choices=q.choices||q.opts.map((text,i)=>({text,correct:i===q.answer}));const shown=solved?choices.filter(o=>o.correct):choices;
  const cards=shown.map(o=>{const query=genres[norm(o.text)];return query?`<section><h4>${E(o.text)}</h4>${figure(query,'Imagem de referência para '+o.text)}</section>`:'';}).join('');
  if(cards)return `<figure class="exercise-context unsplash-exercise"><figcaption>${solved?'Retome o exemplo relacionado à resposta.':'Compare os materiais de referência relacionados às alternativas.'}</figcaption><div class="genre-photo-grid">${cards}</div></figure>`;
 }
 const query=queryFor(q,s,t),p=photo(query);if(!p)throw Error('Imagem Unsplash ausente: '+s+':'+t+':'+q.exerciseContext?.kind);
 const kind=q.exerciseContext?.kind||'',caption=q.exerciseContext?.caption||'';
 const quoted=[...q.q.matchAll(/[“‘']([^”’']{3,180})[”’']/g)].map(m=>m[1]);
 const passage=(s===0||s===5)&&quoted.length?`<blockquote>${quoted.map(E).join('<br>')}</blockquote>`:'';
 const context=kind==='mixture'?'A fotografia mostra a água, um dos materiais considerados. Use o enunciado para identificar o outro material e as condições da mistura.':kind==='rainmeter'?'Uma equipe precisa medir a quantidade de chuva registrada em um lugar.':/esquem|representaç|corte|modelo|compare as camadas/i.test(caption)?'Relacione esta imagem de referência com os conceitos e as informações do enunciado.':caption;
 let content=figure(query,p.description||'Imagem do Unsplash relacionada à atividade');
 if(s===5&&kind.startsWith('position-')){
  const table=photo('wooden table'),cat=photo('cat');const pos=kind.slice(9);
  content=`<div class="photo-position photo-position-${E(pos)}"><div class="unsplash-image-wrap position-reference">${image(table,'Mesa: objeto de referência')}</div><div class="unsplash-image-wrap position-object">${image(cat,'Gato: observe sua posição em relação ao cartão da mesa')}</div>${pos==='between'?`<div class="unsplash-image-wrap position-second">${image(table,'Segunda mesa: objeto de referência')}</div>`:''}</div><div class="unsplash-credit">${credit(table)} ${credit(cat)}</div><p class="position-caption">Modelo de localização com fotografias: compare a posição do cartão do gato com a do cartão da mesa.</p>`;
 }
 return `<figure class="exercise-context unsplash-exercise" data-context-subject="${s}" data-context-topic="${t}" data-context-kind="${E(kind)}">${content}${facts(q,solved)}${passage}${context?`<figcaption>${E(context)}</figcaption>`:''}${s===3?'<p class="position-caption">Imagem de referência para o tema; não é um registro do acontecimento citado.</p>':''}${solved?'<p class="context-resolution">Use os objetos da imagem como referência e acompanhe os dados e o raciocínio da resolução.</p>':''}</figure>`;
};
window.NEXO_OPTION_PHOTO=function(value){const query=genres[norm(value)]||objects[norm(value)],p=photo(query);return p?`<span class="option-photo unsplash-image-wrap">${image(p,'Imagem de referência para '+value)}<small>Unsplash • ${E(p.photographer)}</small></span>`:'';};
window.NEXO_OPTION_PHOTO_CREDITS=function(choices){const unique=new Map();for(const {text}of choices){const query=genres[norm(text)]||objects[norm(text)],p=photo(query);if(p)unique.set(p.id,p);}return unique.size?`<div class="unsplash-credit answer-photo-credits">${[...unique.values()].map(credit).join(' ')}</div>`:'';};
window.NEXO_OPTION_EXPLANATION_TEXT=value=>window.NEXO_OPTION_EXPLANATION(value).replace(/<svg[\s\S]*?<\/svg>/g,'');
window.NEXO_LESSON_PHOTO=function(s,t,lesson){
 if(s===0&&t===0)return `<section class="genre-photo-grid">${['Convite','Receita','Reportagem','Bilhete'].map(value=>`<article><h3>${E(value)}</h3>${figure(genres[norm(value)],'Material de referência para '+value)}</article>`).join('')}</section>`;
 const context=window.NEXO_EXERCISE_CONTEXTS[s]?.[t]?.[0],query=s===1?window.NEXO_CONTEXT_PHOTO_QUERIES['math-'+t]:window.NEXO_CONTEXT_PHOTO_QUERIES[context?.kind];
 let result=figure(query,'Imagem do Unsplash relacionada a '+lesson.title);
 if(s===1&&t===0)result+='<div class="operation-photo-examples"><section><h3>Adição</h3><p>3 laranjas + 2 laranjas = 5 laranjas.</p></section><section><h3>Subtração</h3><p>8 laranjas − 3 laranjas = 5 laranjas.</p></section><section><h3>Multiplicação</h3><p>3 caixas × 4 laranjas em cada = 12 laranjas.</p></section><section><h3>Divisão</h3><p>12 laranjas ÷ 3 cestas = 4 laranjas por cesta.</p></section></div>';
 return result;
};
})();
