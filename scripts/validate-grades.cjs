const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('const DATA=')+11,end=html.indexOf('];\nconst icons',start)+1;
const sixth=JSON.parse(html.slice(start,end));
const context={window:{}};
vm.runInNewContext(fs.readFileSync('public/grade-bank.js','utf8'),context);
const grades=context.window.NEXO_GRADES;
assert.deepEqual(Object.keys(grades).map(Number),[1,2,3,4,5,7,8,9]);
assert.equal(sixth.length,8);assert.equal(sixth.reduce((n,s)=>n+s.topics.length,0),77);
assert.equal(sixth.reduce((n,s)=>n+s.topics.reduce((v,t)=>v+t.questions.length,0),0),770);
// Os dados históricos do 6º ano permanecem byte a byte equivalentes como JSON.
assert.equal(crypto.createHash('sha256').update(JSON.stringify(sixth)).digest('hex'),fs.readFileSync('curriculum/sixth-data.sha256','utf8').trim());
let topics=0,questions=0;
function check(bank,label){assert.equal(bank.length,10,label);assert.equal(new Set(bank.map(q=>q.q)).size,10,label+' repetição');for(const q of bank){assert(q.q&&q.explanation?.length>=8,label);assert.equal(q.opts.length,4,label);assert.equal(new Set(q.opts.map(x=>x.trim().toLowerCase())).size,4,label);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,label);assert(q.opts.every(x=>typeof x==='string'&&x.trim()),label);assert(!/\b(?:undefined|NaN|placeholder)\b/i.test(JSON.stringify(q)),label);questions++;}}
for(const [g,subjects]of Object.entries(grades)){assert.equal(subjects.length,+g<6?7:8);assert.equal(subjects.some(s=>s.name==='Inglês'),+g>6);for(const s of subjects){assert(s.icon&&s.topics.length);for(const t of s.topics){topics++;for(const [l,b]of Object.entries({0:t.questions,...t.advanced}))check(b,`${g} ${s.name} ${t.name} ${l}`);}}}
for(const s of sixth)for(const t of s.topics)check(t.questions,'6 '+s.name+' '+t.name);
// Amostras de referência independentes para todos os eixos de matemática.
const golden={1:['4','4','Triângulo','2 reais'],2:['23','4','3','15 reais'],3:['171','6','12 m','60 min'],4:['405','3','6 m²','7,75 reais'],5:['4','12,75 m','12 cm³','6'],7:['3 °C','3','100°','6'],8:['4','2','12 cm²','90 reais'],9:['2 × 10^3','−2 e 2','5 cm','5']};
for(const [g,expected]of Object.entries(golden)){const math=grades[g].find(s=>s.name==='Matemática');math.topics.forEach((t,i)=>assert.equal(t.questions[0].opts[0],expected[i],`${g} ${t.name}`));}
assert.equal(grades[7].find(s=>s.name==='Matemática').topics[0].advanced[2][0].opts[0],'-3 °C');
assert.equal(grades[9].find(s=>s.name==='Matemática').topics[2].advanced[2][0].opts[0],'15 cm');
assert.equal(fs.readFileSync('sw.js','utf8'),fs.readFileSync('public/sw.js','utf8'));
assert(fs.readFileSync('sw.js','utf8').includes('/grade-bank.js'));
assert(!/unsplash/i.test(html));assert(!html.includes("if(view==='study')"));
console.log(`OK: ${topics} novas trilhas, ${questions-770} novas questões nos três níveis e 770 questões originais preservadas.`);
// Cada alternativa combinada deve resolver os casos na ordem apresentada.
// Reconstrói o gabarito a partir das questões-base, sem usar combine().
let combined=0;
for(const [g,subjects] of Object.entries(grades))for(const s of subjects)for(const t of s.topics){
 if(s.name==='Matemática'&&!(+g===1&&t.name==='Formas no cotidiano'))continue;
 for(const [level,bank] of Object.entries(t.advanced))for(const q of bank){
  const cases=q.q.split(/\n(?=\d+\) )/).slice(1).map(line=>line.replace(/^\d+\) /,''));
  assert.equal(cases.length,+level===1||+g<=2?2:3,`${g} ${t.name}: casos`);
  const answers=cases.map(text=>{const base=t.questions.find(item=>item.q===text);assert(base,`Caso sem origem: ${text}`);return base.opts[base.answer]});
  const matching=q.opts.map(opt=>opt.split(' • ').every((value,i)=>value===answers[i])&&opt.split(' • ').length===answers.length);
  assert.equal(matching.filter(Boolean).length,1,`${g} ${t.name}: gabarito combinado ambíguo`);
  assert.equal(matching[q.answer],true,`${g} ${t.name}: gabarito combinado errado`);
  combined++;
 }
}
// Referências calculadas separadamente para o primeiro problema de cada eixo,
// em TODOS os níveis (não apenas o iniciante).
const advancedGolden={
 1:[['4','24','44'],['4','5','6'],null,['2 reais','3 reais','4 reais']],
 2:[['23','53','83'],['4','6','8'],['3','6','9'],['15 reais','22 reais','29 reais']],
 3:[['171','271','371'],['6','10','14'],['12 m','28 m','44 m'],['60 min','60 min','60 min']],
 4:[['405','1.005','1.605'],['3','3','3'],['6 m²','9 m²','12 m²'],['7,75 reais','8,75 reais','9,75 reais']],
 5:[['4','10','20'],['12,75 m','13,75 m','14,75 m'],['12 cm³','18 cm³','24 cm³'],['6','7','8']],
 7:[['3 °C','0 °C','-3 °C'],['3','3','3'],['100°','95°','90°'],['6','7','8']],
 8:[['4','8','16'],['2','2','2'],['12 cm²','15 cm²','18 cm²'],['90 reais','85 reais','80 reais']],
 9:[['2 × 10^3','2 × 10^4','2 × 10^5'],['−2 e 2','−2 e 2','−2 e 2'],['5 cm','10 cm','15 cm'],['5','6','7']]
};
for(const [g,topics] of Object.entries(advancedGolden)){
 const math=grades[g].find(s=>s.name==='Matemática');
 topics.forEach((levels,i)=>levels?.forEach((answer,l)=>{const q=(l?math.topics[i].advanced[l]:math.topics[i].questions)[0];assert.equal(q.opts[q.answer],answer,`${g} ${math.topics[i].name} nível ${l}`)}));
}
console.log(`OK: ${combined} gabaritos combinados reconstruídos e 93 referências matemáticas nos três níveis.`);
