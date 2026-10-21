const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('const DATA=')+11,end=html.indexOf('];\nconst icons',start)+1;
const sixth=JSON.parse(html.slice(start,end));
assert.equal(crypto.createHash('sha256').update(JSON.stringify(sixth)).digest('hex'),fs.readFileSync('curriculum/sixth-data.sha256','utf8').trim(),'Banco histórico alterado');
const context={window:{}};vm.runInNewContext(fs.readFileSync('public/grade-bank.js','utf8'),context);
const grades=context.window.NEXO_GRADES;
assert.deepEqual(Object.keys(grades).map(Number),[1,2,3,4,5,6,7,8,9]);
let topics=0,questions=0,reasoning=0,analysis=0;const ids=new Set();
for(const [g,ss]of Object.entries(grades)){
 assert.equal(ss.length,+g<6?7:8);assert.equal(ss.some(s=>s.name==='Inglês'),+g>=6);
 ss.forEach((s,si)=>s.topics.forEach((t,ti)=>{
  topics++;assert.equal(t.revision,2);
  if(+g===6)assert.equal(t.name,sixth[si].topics[ti].name,'Índice de trilha histórica alterado');
  for(const l of [0,1,2]){
   const bank=l?t.advanced[l]:t.questions;
   assert.equal(bank.length,10);assert.equal(new Set(bank.map(q=>q.q)).size,10,`${g}:${si}:${ti}:${l} repetição`);
   assert.equal(t.legacy[l].length,10,'Revisão histórica incompleta');
   if(l>0)assert(bank.every(q=>!t.questions.some(base=>base.q===q.q)),`${g}:${si}:${ti} nível repetido`);
   bank.forEach((q,i)=>{
    const key=`${g}:${si}:${ti}:${l}:${i}`;assert.equal(q.id,key);assert(!ids.has(key));ids.add(key);questions++;
    assert(q.q.trim()&&q.explanation?.length>=8&&q.skill&&q.format,key);
    assert.equal(q.opts.length,4,key);assert.equal(new Set(q.opts.map(v=>v.trim().toLowerCase())).size,4,key);
    assert(q.opts.every(v=>typeof v==='string'&&v.trim()),key);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,key);
    assert(!/\b(?:undefined|NaN|placeholder)\b/i.test(JSON.stringify(q)),key);
    assert(!/Confira a operação e suas etapas|Relacione a definição científica|Analise as pistas do enunciado e descarte/.test(q.explanation),key+' comentário genérico');
    if(q.format==='reasoning'){
     reasoning++;const source=t.questions[q.sourceItems[0]];
     assert.equal(q.opts[q.answer],source.opts[source.answer]+'\n'+source.explanation,key);
     assert.equal(new Set(q.opts.map(v=>v.split('\n')[0])).size,4,key);
    }
    if(q.format==='analysis'){
     analysis++;assert.equal(q.sourceItems.length,+g<=2?2:3,key);
     const correct=q.sourceItems.map((n,j)=>t.questions[n].opts[t.questions[n].answer]===q.proposedAnswers[j]);
     const selected=correct.map((v,j)=>v?j+1:null).filter(Boolean);
     const text=q.opts[q.answer];const numbers=(text.match(/\d+/g)||[]).map(Number);
     if(!selected.length)assert.equal(text,'Nenhuma resposta está correta.',key);
     else if(selected.length===correct.length)assert.equal(text,'Todas as respostas estão corretas.',key);
     else assert.deepEqual(numbers,Array.from(selected),key+' seleção incorreta');
     for(const n of q.sourceItems)assert(q.explanation.includes(t.questions[n].explanation),key+' explicação ausente');
    }
   });
  }
 }));
}
assert.equal(topics,203);assert.equal(questions,6090);assert.equal(reasoning,1610);assert.equal(analysis,1610);
assert.equal(fs.readFileSync('sw.js','utf8'),fs.readFileSync('public/sw.js','utf8'));
assert(fs.readFileSync('sw.js','utf8').includes('/grade-bank.js'));
assert(!/unsplash/i.test(html));assert(!html.includes("if(view==='study')"));
const golden={1:['4','4','Triângulo','2 reais'],2:['23','4','3','15 reais'],3:['171','6','12 m','60 min'],4:['405','3','6 m²','7,75 reais'],5:['4','12,75 m','12 cm³','6'],7:['3 °C','3','100°','6'],8:['4','2','12 cm²','90 reais'],9:['2 × 10^3','−2 e 2','5 cm','5']};
for(const [g,expected]of Object.entries(golden)){const math=grades[g].find(s=>s.name==='Matemática');math.topics.forEach((t,i)=>assert.equal(t.questions[0].opts[0],expected[i],`${g} ${t.name}`));}


const advancedGolden={
 1:[['4','10','8'],['4','6','5'],null,['2 reais','3 reais','2 reais']],
 2:[['23','27','24'],['4','8','2'],['3','11','11'],['15 reais','9 reais','21 reais']],
 3:[['171','167','125'],['6','7','3'],['12 m','16 m','14 m'],['60 min','80 min','70 min']],
 4:[['405','71','12'],['3','10','5'],['6 m²','36','14 m²'],['7,75 reais','12,25 reais','15,5 reais']],
 5:[['4','60','30'],['12,75 m','6 m','17,25 m'],['12 cm³','48 cm³','2 cm'],['6','8','7']],
 7:[['3 °C','3 °C','2 °C'],['3','4','5'],['100°','40°','72 cm'],['6','9','20']],
 8:[['4','32','16 m²'],['2','3','6 reais'],['12 cm²','24 cm²','5 cm'],['90 reais','98 reais','96 reais']],
 9:[['2 × 10^3','4.000 g','1 × 10^6'],['−2 e 2','−2 e 2','2 m'],['5 cm','5 m','24 cm²'],['5','2/90','6/1320']]
};
for(const [g,topics] of Object.entries(advancedGolden)){
 const math=grades[g].find(s=>s.name==='Matemática');
 topics.forEach((levels,i)=>levels?.forEach((answer,l)=>{const q=(l?math.topics[i].advanced[l]:math.topics[i].questions)[0];assert.equal(q.opts[q.answer],answer,`${g} ${math.topics[i].name} nível ${l}`)}));
}
console.log(`OK: ${topics} trilhas, ${questions} questões, ${reasoning} justificativas e ${analysis} análises; referências matemáticas e banco histórico preservados.`);
