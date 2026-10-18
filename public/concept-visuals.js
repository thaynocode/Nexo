(function(){
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const perSubject=[
[['noticia','📰'],['fabula','📖'],['receita','🧑‍🍳'],['substantivo','🏷️'],['adjetivo','🎨'],['verbo','🏃'],['virgula','✍️'],['interrogacao','❓'],['infer','🔎'],['texto','📄']],
[['adicao','➕'],['subtracao','➖'],['multiplicacao','✖️'],['divisao','➗'],['metade','◐'],['quartos','◴'],['decimal','🔢'],['perimetro','📐'],['area','▦'],['numero','🔢'],['valor posicional','🔢'],['mmc','🔁'],['porcentagem','💯'],['desconto','🏷️'],['equacao','⚖️'],['media','📊'],['probabilidade','🎲'],['eixo','📍'],['coordenada','📍']],
[['mistura','🧪'],['filtracao','🧫'],['celula','🔬'],['membrana','🦠'],['citoplasma','🔬'],['cloroplasto','🌿'],['tecido','🧬'],['orgao','🫀'],['sistema','🫁'],['rotacao','🌍'],['translacao','☀️'],['fossil','🦴'],['rocha','🪨'],['musculo','💪'],['osso','🦴'],['ecossistema','🌳'],['produtor','🌱'],['consumidor','🐇']],
[['fonte','📜'],['cronologia','🕰️'],['nomadismo','🚶'],['agricultura','🌾'],['aldeia','🏘️'],['egito','🏺'],['mesopotamia','📜'],['grecia','🏛️'],['roma','🏛️'],['indigena','🌿'],['inca','⛰️'],['maia','🗿'],['asteca','🏛️']],
[['paisagem','🏞️'],['relevo','⛰️'],['solo','🌱'],['agua','💧'],['clima','🌤️'],['tempo','🌦️'],['latitude','🌐'],['longitude','🌐'],['coordenada','📍'],['escala','📏'],['legenda','🗺️'],['orientacao','🧭'],['reciclar','♻️'],['migra','🧳'],['urbaniza','🏙️']],
[['book','📖'],['school','🏫'],['teacher','🧑‍🏫'],['am','💬'],['is','💬'],['are','💬'],['rotina','📅'],['pergunta','❓'],['familia','👨‍👩‍👧'],['saudacao','👋'],['in','📦'],['on','📦'],['under','📦']],
[['linha','✏️'],['cor','🎨'],['desenho','✏️'],['pintura','🖌️'],['fotografia','📷'],['ritmo','🥁'],['altura','🎼'],['timbre','🎻'],['teatro','🎭'],['danca','💃'],['patrimonio','🏛️'],['material','🗿'],['imaterial','🎶']],
[['regra','📋'],['estrategia','♟️'],['respeito','🤝'],['equilibrio','⚖️'],['agilidade','🏃'],['coordenacao','🤹'],['cooperacao','🤝'],['inclusao','🫶'],['marca','⏱️'],['precisao','🎯'],['invasao','⚽'],['rede','🏐'],['aquecimento','🤸'],['flexibilidade','🧘'],['danca','💃'],['aventura','🥾']]
];
window.NEXO_CONCEPT_VISUAL=(s,t,concept)=>{
const value=normalize(concept);const pair=(perSubject[s]||[]).find(([term])=>value.includes(term));
return pair?pair[1]:['📖','🔢','🔬','🏺','🗺️','💬','🎨','🏅'][s]||'📘';
};
})();