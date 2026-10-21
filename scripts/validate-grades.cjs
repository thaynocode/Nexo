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
// A experiência de estudo fica isolada em um módulo carregado após o app principal.
assert(html.includes('<script src="/premium-lessons.js"></script>'));
const premium=fs.readFileSync('public/premium-lessons.js','utf8');
const lessonContext={window:{}};
vm.runInNewContext(fs.readFileSync('public/lessons.js','utf8'),lessonContext);
assert.equal(lessonContext.window.NEXO_LESSONS.reduce((n,s)=>n+s.length,0),77);
assert(premium.includes("view==='study'"));
assert(premium.includes('data-nexo-photo'));
assert(premium.includes('fm=webp'));
assert(premium.includes('openLessonImage'));
assert(premium.includes('api.unsplash.com/search/photos'));
assert(!/sk_(?:live|test)_[A-Za-z0-9]+/.test(premium),'Não embuta chaves secretas no módulo público');
assert(fs.readFileSync('sw.js','utf8').includes('/premium-lessons.js'));
console.log(`OK: ${topics} novas trilhas, ${questions-770} novas questões nos três níveis e 770 questões originais preservadas.`);
