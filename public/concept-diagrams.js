(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rect=(x,y,w,h,f,r=12)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+f+'"/>';
const circle=(x,y,r,f,stroke='none',sw=1)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
const line=(x,y,X,Y,color='#aac9ea',sw=3)=>'<line x1="'+x+'" y1="'+y+'" x2="'+X+'" y2="'+Y+'" stroke="'+color+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
const text=(x,y,v,size=19,color='#f3f8ff',weight=600)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'" fill="'+color+'">'+esc(v)+'</text>';
const wrap=(v,n=20)=>{let a=[''];for(const word of String(v||'').split(/\s+/)){let i=a.length-1;if((a[i]+' '+word).trim().length>n&&a[i])a.push(word);else a[i]=(a[i]+' '+word).trim()}return a.slice(0,3)};
const multiline=(x,y,v,n=20,size=18)=>wrap(v,n).map((s,i)=>text(x,y+i*24,s,size)).join('');
const path=(d,color='#8cdecf',sw=4)=>'<path d="'+d+'" stroke="'+color+'" stroke-width="'+sw+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
const palettes=['#314b78','#265d71','#5b487d','#42664f'];
function draw(s,t,lesson){
const spec=window.NEXO_VISUAL_SPECS?.[s]?.[t];if(!spec)return null;
const [kind,...raw]=spec,rows=raw.map(v=>v.split('|'));let a=rect(0,0,760,440,'#101d34',24);
a+=text(380,36,String(lesson.title).toUpperCase(),21,'#f0edff',800);
let caption='';
const dotGrid=(x,y,n,per=6,color='#8fdfc8')=>{let v='';for(let i=0;i<n;i++)v+=circle(x+(i%per)*21,y+Math.floor(i/per)*21,8,color);return v};
const axis=(x,y,w,h)=>line(x,y,x+w,y,'#e6d69a',3)+line(x,y,x,y-h,'#e6d69a',3);
if(s===1){
switch(t){
case 0:{
// Cada maçã representa uma unidade. Os cestos mostram os grupos iguais.
const apple=(x,y,color='#ee7775',opacity=1)=>'<g class="fruit" transform="translate('+x+' '+y+')" opacity="'+opacity+'"><path d="M0-8 C-12-18-20-5-16 6 C-13 18-6 20 0 16 C6 20 13 18 16 6 C20-5 12-18 0-8Z" fill="'+color+'" stroke="#ffe2b5" stroke-width="1.3"/><path d="M0-8q-1-8 4-12" fill="none" stroke="#dbb680" stroke-width="3"/><path d="M2-14q6-10 14-4q-3 9-14 4" fill="#82ce9b"/></g>';
const basket=(x,y,label)=>rect(x,y,96,95,'#12263c',12)+line(x+8,y+79,x+88,y+79,'#d5b586',3)+text(x+48,y+113,label,14);
let fruitArt=rect(0,0,760,650,'#101d34',24)+text(380,35,'OPERAÇÕES COM MAÇÃS',24,'#f0edff',800);
const panels=[['ADIÇÃO','3 + 2 = 5','Junte 3 maçãs com 2 maçãs.'],['SUBTRAÇÃO','8 − 3 = 5','Retire 3 das 8 maçãs.'],['MULTIPLICAÇÃO','3 × 4 = 12','3 cestos com 4 maçãs em cada.'],['DIVISÃO','12 ÷ 3 = 4','Reparta 12 maçãs em 3 cestos.']];
panels.forEach((panel,i)=>{
 const x=20+(i%2)*375,y=60+Math.floor(i/2)*285;
 fruitArt+=rect(x,y,345,270,palettes[i])+text(x+172,y+29,panel[0],20);
 if(i===0){
  for(let j=0;j<3;j++)fruitArt+=apple(x+61+j*36,y+100);
  fruitArt+=text(x+172,y+106,'+',25);
  for(let j=0;j<2;j++)fruitArt+=apple(x+231+j*36,y+100,'#94c86e');
  fruitArt+=text(x+97,y+159,'3 maçãs',17)+text(x+249,y+159,'2 maçãs',17);
 } else if(i===1){
  for(let j=0;j<8;j++){
   const fx=x+80+(j%4)*61,fy=y+80+Math.floor(j/4)*62;
   fruitArt+=apple(fx,fy,'#ee7775',j<3?0.35:1);
   if(j<3)fruitArt+=line(fx-18,fy-21,fx+19,fy+21,'#fff0dc',3);
  }
 } else {
  for(let group=0;group<3;group++){
   const bx=x+16+group*106,by=y+65;
   fruitArt+=basket(bx,by,i===2?'4 maçãs':'4 para cada');
   for(let j=0;j<4;j++)fruitArt+=apple(bx+29+(j%2)*39,by+30+Math.floor(j/2)*38,['#ee7775','#94c86e','#efb96d'][group]);
  }
 }
 fruitArt+=text(x+172,y+224,panel[1],25,'#fff5d4',800)+text(x+172,y+250,panel[2],15);
});
fruitArt+=text(380,638,'Cada maçã representa 1 unidade.',17,'#c2d3e8');
const fruitCaption='Operações com frutas: 3 maçãs mais 2 são 5; de 8, retire 3 e ficam 5; 3 grupos de 4 são 12; 12 repartidas em 3 cestos dão 4 em cada.';
const fruitSvg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 650" role="img" aria-label="'+esc(fruitCaption)+'">'+fruitArt+'</svg>';
return {src:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(fruitSvg),caption:fruitCaption};
}
case 1:{for(let i=0;i<4;i++)a+=rect(90+i*145,127,120,110,i===0?'#f0c66f':'#385779');a+=text(380,97,'1 INTEIRO DIVIDIDO EM 4 PARTES IGUAIS',22);a+=text(380,301,'1/4 = 0,25 = 25%',28);a+=text(380,363,'QUATRO QUARTOS FORMAM UM INTEIRO',17);caption='Modelo de área com um quarto destacado';break;}
case 2:{a+=rect(200,105,350,190,'#316d74');a+=rect(216,121,318,158,'#182d46');a+=line(200,320,550,320,'#f1ce7b',4);a+=text(375,345,'6 m',20);a+=text(162,205,'4 m',20);a+=text(380,198,'ÁREA = 24 m²',25);a+=text(380,383,'PERÍMETRO = 20 m',21);caption='Retângulo de seis por quatro metros com área e perímetro';break;}
case 3:{const ns=[['MILHAR','2','2.000'],['CENTENA','3','300'],['DEZENA','4','40'],['UNIDADE','7','7']];ns.forEach((v,i)=>{let x=25+i*180;a+=rect(x,95,169,235,palettes[i]);a+=text(x+84,135,v[0],18);a+=text(x+84,240,v[1],64);a+=text(x+84,295,v[2],24)});a+=text(380,385,'2.000 + 300 + 40 + 7 = 2.347',23);caption='Quadro de valor posicional do número 2.347';break;}
case 4:{[['4',4,8,12,16,20,24],['6',6,12,18,24,30,36]].forEach((r,i)=>{let y=133+i*110;a+=text(85,y,r[0]+' ×',23);r.slice(1).forEach((n,j)=>{let x=150+j*94;a+=rect(x-36,y-34,72,59,n===12?'#2a947d':'#385579');a+=text(x,y+5,n,23)})});a+=text(380,365,'MMC(4, 6) = 12',27,'#9ce5d4');caption='Sequências dos múltiplos de quatro e seis com o primeiro comum destacado';break;}
case 5:{for(let i=0;i<100;i++)a+=rect(213+(i%10)*34,69+Math.floor(i/10)*29,28,23,i<25?'#f3ca76':'#36557b',2);a+=text(380,403,'25 DE 100 = 25%',26);caption='Malha de cem quadrinhos com vinte e cinco destacados';break;}
case 6:{a+=axis(110,325,550,220);[3,7,11,15].forEach((n,i)=>{let x=170+i*145,y=315-n*12;a+=circle(x,y,11,'#f5c97c');a+=text(x,352,n,22);if(i)a+=line(x-145,y+48,x,y,'#9adfcf',3)});a+=text(380,89,'SOME 4 A CADA TERMO',24);caption='Sequência crescente de três, sete, onze e quinze';break;}
case 7:{[2,4,4,6].forEach((n,i)=>{let x=195+i*95;a+=rect(x,320-n*27,64,n*27,'#3e8c9d');a+=text(x+32,346,n,20)});a+=text(380,92,'DADOS: 2, 4, 4, 6',24);a+=text(380,391,'MÉDIA = 4  •  MODA = 4',23);caption='Gráfico de barras com quatro observações';break;}
case 8:{a+=text(380,130,'( 2 + 3 ) × 4',37);a+=path('M 245 149 L 245 174 L 485 174 L 485 149','#e7be78',4);a+=text(380,217,'5 × 4',36);a+=path('M 380 233 L 380 263','#92dcd1',4);a+=text(380,321,'20',56,'#a5efdb');caption='Ordem das operações: parênteses antes da multiplicação';break;}
case 9:{a+=rect(156,104,448,225,'#2c5479');a+=text(380,156,'PREÇO ORIGINAL: R$ 80,00',24);a+=text(380,221,'DESCONTO DE 10%: R$ 8,00',23);a+=line(205,243,555,243);a+=text(380,299,'PREÇO FINAL: R$ 72,00',25,'#b2f4df');caption='Cálculo de desconto de dez por cento';break;}
case 10:{a+=axis(185,341,425,250);for(let i=0;i<=5;i++){a+=line(185+i*65,341,185+i*65,92,'#344b65',1);a+=line(185,341-i*48,610,341-i*48,'#344b65',1);a+=text(185+i*65,365,i,15);if(i)a+=text(163,346-i*48,i,15)}a+=circle(315,197,12,'#f6c56d');a+=text(367,181,'(2, 3)',23);caption='Plano cartesiano com o ponto de coordenadas dois e três';break;}
}
}else if(s===2){
const names=['MISTURAS','CÉLULAS E TECIDOS','TERRA E UNIVERSO','CÉLULA VEGETAL','SISTEMA NERVOSO','MÚSCULOS E OSSOS','ROCHAS','MOVIMENTOS DA TERRA','SISTEMAS DO CORPO','CADEIA ALIMENTAR'];
a+=text(380,86,names[t],24,'#cce6fa',800);
if(t===0){a+=rect(130,137,170,178,'#2c6385');a+=rect(460,137,170,178,'#2c6385');a+=rect(140,221,150,84,'#7cb5d2');a+=rect(470,230,150,75,'#7cb5d2');a+=rect(470,200,150,30,'#e2bb77');a+=text(215,345,'SAL + ÁGUA',19);a+=text(545,345,'ÓLEO + ÁGUA',19)}
else if(t===1||t===3){a+=circle(380,228,116,'#346d7d','#92dfcb',5)+circle(380,228,46,'#a78bd0');for(let i=0;i<7;i++){let an=i*6.28/7;a+=circle(380+80*Math.cos(an),228+80*Math.sin(an),11,'#e2bc77')}a+=text(380,235,'NÚCLEO',15);a+=text(380,386,'MEMBRANA • CITOPLASMA • NÚCLEO',18)}
else if(t===2||t===7){a+=circle(200,230,71,'#e7b85c')+circle(542,230,88,'#367ca2');a+=path('M 380 135 Q 460 65 565 118 M 565 118 L 549 102 M 565 118 L 546 126','#a5e2d6',4);a+=text(200,344,'SOL',22);a+=text(542,344,'TERRA',22);a+=text(380,390,'ROTAÇÃO: GIRO NO PRÓPRIO EIXO',18)}
else if(t===4||t===5||t===8){a+=circle(380,165,46,'#ddbe9c')+rect(356,213,48,112,'#517aa3');for(let i=0;i<2;i++){a+=line(356,229,280,294,'#e5c29f',12)+line(404,229,480,294,'#e5c29f',12)+line(365+i*30,325,342+i*76,389,'#e5c29f',12)}a+=text(380,417,'CORPO HUMANO: SISTEMAS INTEGRADOS',17)}
else if(t===6){for(let i=0;i<3;i++){let x=115+i*210;a+=path('M '+x+' 310 L '+(x+35)+' 167 L '+(x+142)+' 190 L '+(x+157)+' 310 Z',['#6e86b7','#bd997b','#a38fc1'][i],3);a+=text(x+79,358,['ÍGNEA','SEDIMENTAR','METAMÓRFICA'][i],18)}}
else if(t===9){['CAPIM','COELHO','RAPOSA'].forEach((n,i)=>{let x=130+i*230;a+=circle(x,217,61,palettes[i]);a+=text(x,226,n,20);if(i<2)a+=text(x+113,229,'→',48,'#c9e8ff')});a+=text(380,355,'ENERGIA FLUI ENTRE OS SERES VIVOS',20)}
caption='Representação científica do tema '+lesson.title;
}else{
const kindNames=['DOCUMENTO','EVIDÊNCIA','ANÁLISE'];
const count=rows.length,gap=14,w=(700-(count-1)*gap)/count;
if(s===3&&kind==='timeline'){
a+=line(86,210,677,210,'#8edbce',6);rows.forEach((r,i)=>{let x=124+i*240;a+=circle(x,210,17,'#e9c379');a+=multiline(x,147,r[0],16,19);a+=multiline(x,270,r[1],18,17)});caption='Linha do tempo histórica';}
else if(s===4&&(t===1||t===4||t===8)){
a+=circle(380,228,130,'#346d9d','#a3cbe9',4);a+=line(250,228,510,228,'#f0c879',5)+line(380,98,380,358,'#b6a0ee',5);a+=text(380,82,'N',22);a+=text(380,391,'S',22);a+=text(586,224,'EQUADOR',17);a+=text(158,266,'GREENWICH',17);caption='Orientação geográfica e linhas de referência';}
else if(s===5&&(t===1||t===5||t===6||t===9)){
rows.forEach((r,i)=>{let x=27+i*(706/rows.length);a+=rect(x,110,706/rows.length-13,240,palettes[i]);a+=multiline(x+(706/rows.length-13)/2,167,r[0],15,19);a+=multiline(x+(706/rows.length-13)/2,239,r[1],17,20);a+=multiline(x+(706/rows.length-13)/2,301,r[2],18,15)});caption='Exemplos reais de frases e estruturas da língua inglesa';}
else if(s===6&&t===2){
for(let i=0;i<3;i++){let x=155+i*220;a+=circle(x,220,68,palettes[i]);a+=text(x,226,['♪ ♫','GRAVE','VIOLINO'][i],21);a+=text(x,329,['RITMO','ALTURA','TIMBRE'][i],20)}caption='Elementos da música: ritmo, altura e timbre';}
else if(s===7&&(t===1||t===3||t===4||t===7)){
rows.forEach((r,i)=>{let x=130+i*225;a+=circle(x,212,65,palettes[i]);a+=circle(x,212,34,'none','#e7d99a',4);a+=text(x,316,r[0],18)});caption='Comparação visual de modalidades e habilidades corporais';}
else{
rows.forEach((r,i)=>{let x=25+i*(710/count),cw=710/count-12;a+=rect(x,101,cw,274,palettes[i]);a+=multiline(x+cw/2,153,r[0],count===4?14:20,19);a+=line(x+20,194,x+cw-20,194,'#e5d7b5',2);a+=multiline(x+cw/2,252,r[1],count===4?14:20,19);a+=multiline(x+cw/2,325,r[2],count===4?15:21,15)});caption='Exemplos comparativos específicos: '+lesson.title;}
}
a+=text(380,425,'OBSERVE • INVESTIGUE • EXPLIQUE',14,'#a7bcd4');
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" role="img" aria-label="'+esc(caption)+'">'+a+'</svg>';
return {src:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg),caption};
}
window.NEXO_CONCEPT_DIAGRAM=draw;
})();