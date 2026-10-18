(function(){
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=(x,y,s,size=20,color='#edf3ff',weight=700)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'" fill="'+color+'">'+esc(s)+'</text>';
const rect=(x,y,w,h,fill,r=15,stroke='none')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'"/>';
const circle=(x,y,r,fill,stroke='none',sw=2)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
const line=(x1,y1,x2,y2,color='#b9a9ff',width=4)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round"/>';
function render(s,t,lesson){
let art='',caption='',labels=lesson.visual?.labels||['OBSERVE','COMPREENDA','APLIQUE'];
if(s===1&&t===1){caption='Uma unidade dividida em quatro partes iguais: três estão coloridas.';art=rect(105,100,430,112,'#28364f',12);for(let i=0;i<4;i++){art+=rect(109+i*106,104,102,104,i<3?'#aa8bff':'#35445f',6);art+=text(160+i*106,169,i<3?'1/4':'1/4',18,i<3?'#10172a':'#f3f5ff')}art+=text(320,264,'3 partes de 4 = 3/4',24);}
else if(s===1&&t===2){caption='Retângulo: o perímetro contorna a figura e a área ocupa seu interior.';art=rect(168,83,305,174,'#33496b',8,'#ae96ff');art+='<rect x="168" y="83" width="305" height="174" rx="8" fill="none" stroke="#b99cff" stroke-width="8"/>';art+=text(320,174,'ÁREA',30);art+=text(320,69,'6 m',20);art+=text(492,175,'4 m',19);art+=text(320,293,'6 × 4 = 24 m²',22);}
else if(s===1&&t===10){caption='No ponto (2,3), avance 2 unidades no eixo horizontal e 3 no vertical.';art=line(120,254,500,254,'#d7e3fa',3)+line(160,280,160,57,'#d7e3fa',3);for(let i=1;i<=5;i++){art+=line(160+i*56,249,160+i*56,259,'#b5c8e6',2);art+=text(160+i*56,280,String(i),14)}for(let i=1;i<=4;i++){art+=line(155,254-i*45,165,254-i*45,'#b5c8e6',2);art+=text(137,259-i*45,String(i),14)}art+=circle(272,119,10,'#f9c978')+line(272,254,272,119,'#b99cff',2)+line(160,119,272,119,'#b99cff',2)+text(310,105,'(2, 3)',23);}
else if(s===2&&(t===1||t===3)){caption='Modelo simplificado de uma célula: membrana, citoplasma e núcleo.';art='<ellipse cx="320" cy="165" rx="164" ry="104" fill="#315c78" stroke="#9de6dd" stroke-width="6"/>'+circle(320,165,47,'#a88bff','#ddd0ff',4)+circle(320,165,15,'#6147aa')+text(320,171,'NÚCLEO',11);art+=line(180,88,112,60)+text(95,50,'MEMBRANA',15);art+=line(423,220,510,245)+text(521,267,'CITOPLASMA',14);}
else if(s===2&&t===7){caption='Rotação: giro da Terra sobre seu eixo; translação: movimento ao redor do Sol.';art=circle(160,170,56,'#f9c978')+circle(450,170,61,'#4a90e2','#9cceff',3)+'<path d="M425 120 Q475 155 446 190 Q420 215 472 215" fill="none" stroke="#8be0b8" stroke-width="18"/>'+line(450,94,450,246,'#d9e4ff',3)+'<path d="M260 95 Q345 22 425 95" fill="none" stroke="#b8a6ff" stroke-width="4" stroke-dasharray="9 8"/>'+text(160,263,'SOL',20)+text(450,263,'TERRA',20);}
else if(s===2&&t===0){caption='Água e óleo formam duas fases; sal dissolvido em água forma uma fase visível.';for(let i=0;i<2;i++){let x=170+i*235;art+='<path d="M'+x+' 83 v155 q0 20 22 20 h96 q22 0 22-20 v-155" fill="#34577a" stroke="#c6e3f9" stroke-width="4"/>';art+=rect(x+4,166,132,87,i===0?'#a0c8ef':'#6fb7da',2);if(i===0)art+=rect(x+4,113,132,53,'#e3b36c',2);art+=text(x+70,286,i===0?'ÁGUA + ÓLEO':'SAL + ÁGUA',18)}}
else if(s===4&&(t===1||t===4||t===8)){caption='Os pontos cardeais ajudam na orientação: norte, sul, leste e oeste.';art=circle(320,165,100,'#283852','#c7b4ff',4)+line(320,60,320,270)+line(213,165,427,165)+text(320,53,'N',26)+text(320,298,'S',26)+text(442,174,'L',26)+text(196,174,'O',26)+circle(320,165,13,'#f9ca7a');}
else if(s===4&&t===5){caption='O tempo descreve o dia; o clima é estudado com registros de muitos anos.';art=text(160,80,'HOJE',23)+circle(160,153,40,'#f6c86e')+text(160,247,'TEMPO',23)+text(440,80,'MUITOS ANOS',22);for(let i=0;i<4;i++)art+=rect(344+i*51,205-[56,93,70,115][i],30,[56,93,70,115][i],'#8c9bea',5);art+=text(440,247,'CLIMA',23);}
else if(s===5&&(t===1||t===5)){caption='No presente, o verbo to be muda de acordo com o pronome.';const words=['I  →  AM','SHE  →  IS','THEY  →  ARE'];words.forEach((w,i)=>{art+=rect(170,70+i*76,300,60,['#46558a','#5b4c8e','#315f78'][i],13);art+=text(320,108+i*76,w,25)});}
else if(s===6&&(t===0||t===1)){caption='As cores primárias tradicionais podem ser usadas para criar novas combinações.';['#e86671','#f2d36c','#6099ed'].forEach((color,i)=>art+=circle(210+i*110,151,61,color));art+=text(320,263,'CORES E FORMAS',23);}
else if(s===7&&(t===3||t===4||t===7)){caption='Esportes têm objetivos diferentes: alcançar uma marca, acertar um alvo ou ocupar espaços.';for(let i=0;i<3;i++)art+=circle(192+i*127,157,52,'#283b58','#ae98f9',4);art+=circle(192,157,28,'none','#f6d18e',4)+circle(192,157,8,'#f6d18e');art+=line(320,126,320,188,'#a5c8ff',4)+line(295,156,345,156,'#a5c8ff',4);art+=circle(446,157,17,'#f5c16f');art+=text(192,250,'ALVO',17)+text(320,250,'ESPAÇO',17)+text(446,250,'BOLA',17);}
else {caption='Compare os conceitos de '+lesson.title.toLowerCase()+' e observe os exemplos apresentados na aula.';const xs=[112,266,420],colors=['#4d5b91','#3f6480','#65508c'];labels.forEach((label,i)=>{art+=rect(xs[i],105,115,114,colors[i],18);let words=String(label).split(/\s+/);if(label.length>13||words.length>2){let mid=Math.ceil(words.length/2);if(words.length===1){let cut=Math.ceil(label.length/2);art+=text(xs[i]+57,150,label.slice(0,cut),12);art+=text(xs[i]+57,172,label.slice(cut),12)}else{art+=text(xs[i]+57,150,words.slice(0,mid).join(' '),12);art+=text(xs[i]+57,172,words.slice(mid).join(' '),12)}}else{art+=text(xs[i]+57,161,label.length>10?13:17)}if(i<2)art+=line(xs[i]+119,162,xs[i]+145,162,'#e4c5ff',4)});}

// Os conceitos das aulas são apresentados em português, com destaque visual legível.
// Textos em inglês permanecem somente quando fazem parte do próprio conteúdo de Língua Inglesa.
if(s===0&&t===0){caption='Uma notícia informa um fato; uma fábula narra uma história; uma receita ensina um procedimento.';art='';const items=[['NOTÍCIA','Informa um fato'],['FÁBULA','Conta uma história'],['RECEITA','Ensina etapas']];items.forEach((it,i)=>{let x=32+i*206;art+=rect(x,91,190,148,['#385a82','#5e4c8a','#326c73'][i],18);art+=text(x+95,143,it[0],21);art+=text(x+95,185,it[1],15);});}
if(s===1&&t===0){
caption='Adição junta, subtração retira, multiplicação reúne grupos iguais e divisão reparte igualmente.';
art='';
const panels=[
{title:'ADIÇÃO',equation:'3 + 2 = 5',dots:[3,2],mode:'add'},
{title:'SUBTRAÇÃO',equation:'8 − 3 = 5',dots:[8,3],mode:'subtract'},
{title:'MULTIPLICAÇÃO',equation:'3 × 4 = 12',dots:[4,4,4],mode:'multiply'},
{title:'DIVISÃO',equation:'12 ÷ 3 = 4',dots:[4,4,4],mode:'divide'}
];
panels.forEach((p,i)=>{
const x=22+(i%2)*310,y=20+Math.floor(i/2)*151;
art+=rect(x,y,286,140,['#385a82','#5e4c8a','#326c73','#555c92'][i],14);
art+=text(x+143,y+25,p.title,17);
if(p.mode==='add'){
for(let j=0;j<5;j++)art+=circle(x+66+j*34,y+66,10,j<3?'#ffd080':'#84dcd0');
}else if(p.mode==='subtract'){
for(let j=0;j<8;j++){let dx=x+49+j*27;art+=circle(dx,y+66,9,j<3?'#52617d':'#84dcd0');if(j<3)art+=line(dx-9,y+55,dx+9,y+77,'#f6c0c0',2)}
}else{
for(let row=0;row<3;row++)for(let col=0;col<4;col++)art+=circle(x+79+col*35,y+46+row*24,8,['#f5cb83','#84dcd0','#c6a6ff'][row]);
if(p.mode==='divide')art+=line(x+62,y+36,x+62,y+105,'#d9e3ff',2)+line(x+208,y+36,x+208,y+105,'#d9e3ff',2);
}
art+=text(x+143,y+123,p.equation,22);
});
}
if(s===0&&t===1){caption='Substantivo nomeia, adjetivo caracteriza e verbo indica ação, estado ou fenômeno.';art='';const items=[['SUBSTANTIVO','MENINA'],['ADJETIVO','CURIOSA'],['VERBO','LÊ']];items.forEach((it,i)=>{let x=25+i*209;art+=rect(x,103,197,130,['#385a82','#5e4c8a','#326c73'][i],15);art+=text(x+98,149,it[0],18);art+=text(x+98,192,it[1],22);});}
if(s===4&&t===5){caption='Tempo é a condição da atmosfera em um momento; clima é o padrão observado ao longo de muitos anos.';}
if(!art||art.includes('OBSERVE')||art.includes('COMPREENDA')){
const examples=(lesson.contextExamples||[]).slice(0,3);
art='';
examples.forEach((example,i)=>{
const x=17+i*209;
art+=rect(x,56,196,224,['#354e79','#365d6d','#5a477d'][i],16);
const name=String(example.concept||'').split(' ');
const mid=Math.ceil(name.length/2);
art+=text(x+98,109,name.slice(0,mid).join(' '),16);
if(name.length>1)art+=text(x+98,133,name.slice(mid).join(' '),16);
art+=line(x+22,156,x+174,156,'#b6c7e8',2);
art+=text(x+98,204,'EXEMPLO',15);
});
caption='Três conceitos reais desta aula, identificados pelos seus nomes. Leia os exemplos completos abaixo.';
}
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 330" role="img" aria-label="'+esc(caption)+'"><rect width="640" height="330" rx="25" fill="#17243b"/><circle cx="550" cy="30" r="120" fill="#273558" opacity=".45"/>'+art+'</svg>';return {src:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg),caption};
}
window.NEXO_LESSON_ILLUSTRATION=render;
})();