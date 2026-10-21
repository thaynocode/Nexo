const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('public/grade-bank.js','utf8'),ctx);
const grades=ctx.window.NEXO_GRADES,math=grades[6][1];
const fmt=n=>Number(n.toFixed(4)).toLocaleString('pt-BR',{maximumFractionDigits:4});
// Referências calculadas à parte para cada eixo novo do 6º ano.
const expected=[['30 reais','74 reais'],['12','4'],['18 m','11'],['100','2.131'],['12 min','6'],['72 reais','64,8 reais'],['4','13'],['7','14'],['11','18'],['6','30'],['(3, 3)','(0, 1)']];
expected.forEach((levels,t)=>levels.forEach((answer,l)=>{const q=math.topics[t].advanced[l+1][0];assert.equal(q.opts[q.answer],answer,q.q)}));
// Confere todos os 220 problemas novos usando os dados dos enunciados,
// sem chamar o gerador nem usar suas explicações como gabarito.
let checked=0;
math.topics.forEach((t,ti)=>{for(const l of [1,2])for(const q of t.advanced[l]){
 const n=(q.q.match(/\d+/g)||[]).map(Number);let value,unit='';
 switch(ti){
  case 0:if(l===1)value=n[0]*n[1]+n[2];else value=n[0]-(n[1]*n[2]-n[3]+n[4]);unit=' reais';break;
  case 1:{const total=n[0],den=n[2];value=total*(1-(l===1?1:3)/den);break;}
  case 2:value=l===1?2*(n[0]+n[1])-n[2]:Math.ceil(n[0]*n[1]/n[2]);unit=l===1?' m':'';break;
  case 3:if(l===1){const digits=q.q.match(/mostra ([\d.]+) pontos/)[1].replaceAll('.','');value=Number(digits[digits.length-3])*100;}else{const [a,b,d,sum]=n;value=a*1000+b*100+(sum-a-b-d)*10+d;}break;
  case 4:if(l===1){let m=Math.max(...n);while(m%n[0]||m%n[1])m++;value=m;unit=' min';}else{value=Math.min(...n);while(n[0]%value||n[1]%value)value--;}break;
  case 5:value=n[0]*(1-n[1]/100)*(l===2?1-n[2]/100:1);unit=' reais';break;
  case 6:if(l===1)value=(n[2]-n[0])/n[1];else value=n[0]+(n[2]-1)*n[1];break;
  case 7:if(l===1)value=n.reduce((a,b)=>a+b,0)/n.length;else value=4*n[0]-n[1]-n[2]-n[3];break;
  case 8:if(l===1)value=n[0]+n[1]*n[2];else value=(n[0]+n[1])*n[2]-n[3];break;
  case 9:value=l===1?n[2]*3/2:n[0]+n[1];break;
  case 10:{const [x,y,dx,dy,left]=n;value=l===1?`(${x+dx}, ${y+dy})`:`(${x+dx-left}, ${y-dy})`;break;}
 }
 const answer=typeof value==='string'?value:fmt(value)+unit;
 assert.equal(q.opts[q.answer],answer,q.q);checked++;
}});
// Registra o que foi corrigido e impede o retorno das ambiguidades.
assert(grades[6][2].topics[3].questions[1].q.includes('eucarióticas'));
assert(grades[6][4].topics[6].questions[0].q.includes('desgaste'));
assert(grades[6][7].topics[7].questions[9].q.includes('cinco jogadores'));
assert.equal(grades[2][0].topics[0].questions[5].opts[0],'lápis');
assert(!grades[9][3].topics[1].questions[3].q.includes('regime nazista'));
console.log(`OK: ${checked} problemas matemáticos novos conferidos pelos enunciados e regressões editoriais verificadas.`);

for(const q of grades[5][1].topics[0].advanced[2]){const v=Number(q.opts[q.answer].replaceAll('.','').replace(',','.'));assert(Number.isInteger(v),'Quantidade fracionária de sementes: '+q.q)}
for(const [g,t] of [[5,2],[8,2]])assert(new Set(grades[g][1].topics[t].advanced[2].map(q=>q.opts[q.answer])).size>1,'Altura não pode ser sempre a mesma em toda a etapa');
