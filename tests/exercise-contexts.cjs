const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync('index.html','utf8'),ds=html.indexOf('const DATA=')+11,de=html.indexOf('];',ds)+1;
const data=JSON.parse(html.slice(ds,de)),c={window:{},URL};
for(const file of ['question-visuals.js','premium-bank-humanidades.js','premium-bank-exatas-artes.js','exercise-contexts.js','math-contexts.js','exercise-engine.js','context-photos.js','unsplash-exercises.js'])vm.runInNewContext(fs.readFileSync('public/'+file,'utf8'),c,{filename:file});
c.window.NEXO_PREPARE_CONTEXTS(data);
let base=0,advanced=0,premium=0,lessons=0;
function check(q,s,t){for(const solved of [false,true]){const out=c.window.NEXO_CONTEXTUAL_VISUAL(q,s,t,solved);assert(out.includes('https://images.unsplash.com/'));assert(!out.includes('<svg'));assert(!out.includes('data:image/svg'));assert(out.includes('utm_source=nexo'));assert(out.includes('utm_medium=referral'));assert(out.includes('Unsplash'));assert(out.includes('loading="lazy"'));}}
for(let s=0;s<data.length;s++)for(let t=0;t<data[s].topics.length;t++){
 const topic=data[s].topics[t];for(const q of topic.questions){assert(q.exerciseContext);if(s!==1)assert(q.exerciseContext.authored);check(q,s,t);base++;}
 for(const pool of Object.values(topic.advanced||{}))for(const q of pool){check(q,s,t);advanced++;}
 const composite={visualCases:topic.questions.slice(0,3)};assert.equal((c.window.NEXO_CONTEXTUAL_VISUAL(composite,s,t).match(/<figure /g)||[]).length,3);
 const picture=c.window.NEXO_LESSON_PHOTO(s,t,{title:topic.name});assert(picture.includes('images.unsplash.com'));assert(!picture.includes('<svg'));lessons++;
}
for(const [s,bank]of Object.entries(c.window.NEXO_PREMIUM_BANK))bank.forEach((q,i)=>{check(q,+s,Math.floor(i/2));premium++;});
assert.equal(base,770);assert.equal(lessons,77);
const oranges=data[1].topics[0].questions[7],before=c.window.NEXO_CONTEXTUAL_VISUAL(oranges,1,0),after=c.window.NEXO_CONTEXTUAL_VISUAL(oranges,1,0,true);assert(before.includes('Laranjas restantes: ?'));assert(!after.includes('Laranjas restantes: ?'));assert(after.includes('442'));assert.equal(before.match(/data-unsplash-id="([^"]+)/)[1],after.match(/data-unsplash-id="([^"]+)/)[1]);
assert(data[1].topics[5].questions[0].q.includes('maçãs'));assert(data[1].topics[1].questions[0].q.includes('maçãs'));
for(const q of data[1].topics[8].questions){assert(q.q.includes('laranjas'));assert(q.explanation.includes('Primeiro'));}
for(const p of Object.values(c.window.NEXO_CONTEXT_PHOTO_POOLS)){const u=new URL(p.url);assert.equal(u.hostname,'images.unsplash.com');assert(u.searchParams.has('ixid'));assert(p.photographer);assert.equal(new URL(p.profile).hostname,'unsplash.com');assert.equal(new URL(p.page).hostname,'unsplash.com');}
for(const file of ['sw.js','public/sw.js']){const sw=fs.readFileSync(file,'utf8');assert(sw.includes('nexo-pwa-v26'));for(const script of ['exercise-contexts.js','math-contexts.js','exercise-engine.js','context-photos.js','unsplash-exercises.js'])assert(sw.includes(script));}
for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(match[1].trim())new vm.Script(match[1]);
console.log(JSON.stringify({base,advanced,premium,lessons,photoPools:Object.keys(c.window.NEXO_CONTEXT_PHOTO_POOLS).length,status:'PASS: Unsplash, no SVG in exercise or lesson rendering'}));
