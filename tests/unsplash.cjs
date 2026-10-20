const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={window:{},URL};
for(const file of ['lessons.js','unsplash-photos.js','unsplash-visuals.js'])vm.runInNewContext(fs.readFileSync('public/'+file,'utf8'),c);
let count=0;
for(let s=0;s<c.window.NEXO_LESSONS.length;s++)for(let t=0;t<c.window.NEXO_LESSONS[s].length;t++){
  const entry=c.window.NEXO_UNSPLASH_PHOTOS[s][t];
  assert.equal(entry.title,c.window.NEXO_LESSONS[s][t].title);
  assert(entry.photos.length>0);
  for(const photo of entry.photos){assert.equal(new URL(photo.url).hostname,'images.unsplash.com');assert(new URL(photo.url).searchParams.has('ixid'));assert(photo.photographer);}
  for(const prompt of ['', 'Pergunta contextualizada', 'Quanto é 3 + 2?']){
    const html=c.window.NEXO_UNSPLASH_VISUAL(s,t,prompt);
    assert(html.includes('utm_source=nexo'));assert(html.includes('loading="lazy"'));assert(html.includes('use os dados do enunciado'));assert.equal(html,c.window.NEXO_UNSPLASH_VISUAL(s,t,prompt));
  }
  count++;
}
assert.equal(count,77);assert.equal(c.window.NEXO_UNSPLASH_VISUAL(99,99),'');
const entry=c.window.NEXO_UNSPLASH_PHOTOS[0][0];
const photo=entry.photos[0];photo.photographer='<img onerror=alert(1)>';assert(!c.window.NEXO_UNSPLASH_VISUAL(0,0).includes('<img onerror'));
photo.url='javascript:alert(1)';assert.equal(c.window.NEXO_UNSPLASH_VISUAL(0,0),'');
const html=fs.readFileSync('index.html','utf8');
assert.equal((html.match(/NEXO_UNSPLASH_VISUAL\?\./g)||[]).length,0,'Fotos de tema somente nas aulas');
for(const file of ['sw.js','public/sw.js']){const sw=fs.readFileSync(file,'utf8');assert(sw.includes('nexo-pwa-v26'));assert(sw.includes('/unsplash-photos.js'));assert(sw.includes('/unsplash-visuals.js'));assert(sw.includes('/question-visuals.js'));}
for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(match[1].trim())new vm.Script(match[1]);
console.log('PASS: 77 lições, créditos, URLs, estabilidade, segurança, cache offline e sintaxe.');
