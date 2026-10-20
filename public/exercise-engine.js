(function(){
'use strict';
const E=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const rules=[
 [/nuvens|guarda.chuva|choveu|chuva recente/,'rain'],[/microscop/,'microscope'],[/neuron|impulsos nervosos/,'neuron'],[/retina|iris|olho|visao/,'eye'],[/foss|extint/,'fossil'],[/crosta|manto|nucleo interno|camadas da terra/,'earthlayers'],[/rotacao|translacao|equinocio|fusos|solsticio|estacoes do ano/,'orbit'],[/membrana|mitocondria|celula|cloroplast/,'cell'],[/cotovelo|muscul|tendao/,'muscle'],[/osso|esquelet|cranio/,'skeleton'],[/articula|cartilag|ligamento/,'joint'],[/pulmao|trocas gasosas|respirator/,'lungs'],[/coracao|bombeia/,'heart'],[/rim|urina|filtra.*sangue/,'kidney'],[/intestino|digestao|nutrientes/,'digestion'],[/sangue|circulator/,'circulation'],[/agua e oleo|agua e sal|mistura|fases visiveis/,'mixture'],[/filtra|areia.*agua/,'filter'],[/\bima\b|imantacao|magnet/,'magnet'],[/evapora|condensa|vapor/,'watercycle'],[/fotossintese/,'plant'],[/decomposit|alimentar|herbivor/,'foodchain'],[/biodivers|biotico|ecossistema/,'ecosystem'],
 [/equador|greenwich|longitude|latitude|hemisfer/,'globe'],[/rosa dos ventos|norte|sul|oeste|leste|bussola/,'compass'],[/escala.*mapa|distancia.*mapa/,'scale'],[/legenda.*mapa|simbolo.*mapa/,'map'],[/temperatur|termometr/,'thermometer'],[/pluviomet|quantidade de chuva/,'rainmeter'],[/vento|eolic|anemometr/,'wind'],[/relevo|planalt|planici/,'relief'],[/afluente|nascente|foz|bacia hidro/,'river'],[/erosao/,'erosion'],[/solar/,'solar'],[/recicla|residuos solidos/,'recycle'],[/desmata|habitat|conservacao/,'forest'],[/polui/,'pollution'],[/migracao|exodo/,'journey'],[/industr|setor secundario/,'factory'],[/setor primario|agricul/,'farm'],[/urbani|cidade|transito/,'city'],
 [/mesopotamia|tigre|eufrates/,'rivers'],[/nilo/,'nile'],[/piramid|farao|egito/,'egypt'],[/machu|inca|terraco.*andin/,'terraces'],[/maia|mesoamerica/,'maya'],[/chinampa|tenochtitlan|astec/,'chinampa'],[/seculo|decada|cronolog|ano \d|anos.*\d/,'timeline'],[/arqueolog|escavacao/,'archaeology'],[/cuneiform|hieroglif|escrita antiga/,'writing'],[/democracia|assembleia|atenas|senado/,'assembly'],[/aquedut/,'aqueduct'],[/coliseu|anfiteatro/,'colosseum'],[/rupestre/,'cave'],[/ceramica|argila/,'pottery'],[/nomad/,'journey'],
 [/futebol|soccer|futsal/,'soccer'],[/voleibol|volei/,'volleyball'],[/basquete/,'basketball'],[/handebol/,'handball'],[/badminton|peteca/,'badminton'],[/tenis/,'tennis'],[/bocha/,'bowls'],[/golfe/,'golf'],[/arco|precisao|alvo/,'target'],[/natacao|agua.*distancia/,'swim'],[/equilibrio/,'balance'],[/flexibilidade|amplitude/,'stretch'],[/corrida|resistencia|atletismo|velocidade/,'track'],[/aquecimento/,'warmup'],[/hidrat|beber agua/,'waterbottle'],[/capacete|ciclismo/,'helmet'],[/trilha|aventura/,'trail'],[/fair play|jogo limpo/,'fairplay'],[/xadrez|tabuleiro/,'chess'],[/danca|coreograf|breaking/,'dance'],
 [/gravura|matriz/,'print'],[/colagem|recorte/,'collage'],[/escultura|tridimensional/,'sculpture'],[/contraste|claro.*escuro/,'light'],[/textura/,'texture'],[/cores primarias/,'palette'],[/altura.*som|graves|agudos/,'pitch'],[/intensidade|fortes.*fracos/,'volume'],[/duracao.*sons|ritmo/,'rhythm'],[/timbre/,'instruments'],[/percuss/,'drum'],[/cordas/,'strings'],[/sopro/,'flute'],[/teatro|personagens em cena|cenario/,'stage'],[/bonecos/,'puppet'],[/museu|acervo/,'museum'],[/patrimonio.*\bmaterial\b/,'museum'],[/patrimonio.*imaterial|tradicao oral/,'culture'],[/esboco|rascunho|revisao|reescrev/,'draft'],
 [/under the table/,'position-under'],[/on the desk/,'position-on'],[/between/,'position-between'],[/behind/,'position-behind'],[/next to/,'position-next'],[/in front of/,'position-front'],[/inside/,'position-inside'],[/outside/,'position-outside'],[/above/,'position-above'],[/near/,'position-near'],[/good morning|bom dia/,'morning'],[/good night|dormir/,'night'],[/library|biblioteca/,'library'],[/classroom|sala de aula/,'classroom'],[/breakfast/,'breakfast'],[/notebook/,'notebook'],[/mother|brother|mae|irmao/,'family'],[/open the door/,'door'],[/blue|azul/,'blue'],[/monday|january|segunda.feira/,'calendar'],[/twelve|doze|dez|ten\b/,'count'],
 [/entrevista|depoimento|fonte oral/,'conversation'],[/convite/,'invitation'],[/receita/,'recipe'],[/poema|estrofe|rima|eu lirico/,'poem'],[/noticia|manchete|reportagem/,'news'],[/carta/,'letter'],[/inferir|inferencia/,'rain'],[/conectivo|conclusao|causa|condicao/,'flow'],[/pronome|sujeito/,'people']
];
function inferred(s,t,q){
 const source=normalize(q.q);let found;
 for(const [pattern,kind] of rules)if(pattern.test(source)){found=kind;break;}
 const base=window.NEXO_EXERCISE_CONTEXTS[s]?.[t]?.[0];
 return {kind:found||base?.kind||'document',caption:'Observe os elementos e os dados desta situação: '+q.q,authored:false};
}
function assign(q,s,t,context){
 if(!q||q.exerciseContext)return q;
 q.exerciseContext=context||inferred(s,t,q);q.exerciseSubject=s;q.exerciseTopic=t;
 if(s===1)window.NEXO_CONTEXTUALIZE_MATH(q,t);
 return q;
}
window.NEXO_PREPARE_CONTEXTS=function(data){
 data.forEach((subject,s)=>subject.topics.forEach((topic,t)=>{
  topic.questions.forEach((q,i)=>{const spec=window.NEXO_EXERCISE_CONTEXTS[s]?.[t]?.[i];if(s!==1&&!spec)throw Error('Falta roteiro '+s+':'+t+':'+i);assign(q,s,t,spec?{...spec,authored:true}:undefined);});
  for(const pool of Object.values(topic.advanced||{}))pool.forEach(q=>assign(q,s,t));
 }));
 for(const [subject,bank] of Object.entries(window.NEXO_PREMIUM_BANK||{}))bank.forEach((q,i)=>assign(q,+subject,Math.floor(i/2)));
};
window.NEXO_ASSIGN_CONTEXT=assign;
window.NEXO_CONTEXTUAL_VISUAL=function(q,s,t,solved=false){
 if(q.visualCases?.length)return `<div class="exercise-cases">${q.visualCases.map((item,i)=>`<section><h3>Situação ${i+1}</h3>${window.NEXO_CONTEXTUAL_VISUAL(item,s,t,solved)}</section>`).join('')}</div>`;
 assign(q,s,t);
 return window.NEXO_UNSPLASH_CASE(q,s,t,solved);
};
window.NEXO_ZOOM_CONTEXT=function(button){const svg=button.closest('figure').querySelector('svg');if(!svg)return;const src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg));openLessonImage({src,alt:svg.getAttribute('aria-label')||'Ilustração do exercício'});};
})();
