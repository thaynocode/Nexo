const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const source=require('../curriculum/bncc/catalog.json'),catalog=JSON.parse(fs.readFileSync('public/bncc-catalog.json','utf8'));
assert.equal(catalog.skills.length,1408);assert.equal(catalog.skills.filter(s=>s.organization!=='etapa').length,1387);
assert.equal(new Set(catalog.skills.map(s=>s.code)).size,1408);
const totals={LP:391,MA:247,CI:111,HI:151,GE:123,AR:61,EF:69,LI:88,ER:63,CO:104};
for(const [component,n]of Object.entries(totals))assert.equal(catalog.skills.filter(s=>s.code.slice(4,6)===component).length,n);
for(const s of catalog.skills){
 const original=source.skills.find(x=>x.code===s.code);assert.equal(s.description,original.description);assert.equal(s.pdfPage,original.pdfPage);
 assert.match(s.code,/^EF\d{2}[A-Z]{2}\d{2}$/);assert.ok(s.description.length>25);assert.ok(s.page>0);
 assert.equal(s.practice.steps.length,3);assert.ok(s.practice.steps.every(x=>x.length>25));assert.equal(s.practice.criteria.length,3);
 for(const l of s.support)assert.ok(s.years.includes(l.year));
 const block=s.code.slice(2,4);assert.deepEqual(s.years,block[0]==='0'?[+block]:Array.from({length:+block[1]-+block[0]+1},(_,i)=>+block[0]+i));
}
assert.equal(catalog.skills.find(s=>s.code==='EF05CO11').sourceCode,'EF05CO011');
assert.deepEqual(catalog.skills.find(s=>s.code==='EF15AR04').years,[1,2,3,4,5]);
assert.ok(!catalog.skills.some(s=>s.code.slice(4,6)==='LI'&&s.years.some(y=>y<6)));
for(let year=1;year<=9;year++)for(const component of ['CO','ER'])assert.ok(catalog.skills.some(s=>s.code.slice(4,6)===component&&s.years.includes(year)&&s.practice.kind==='atividade-especifica'));
// Exercita o módulo real, inclusive falha de armazenamento, XSS e separação por conta/ano.
const storage=new Map(),elements={'bncc-evidence':{value:'<img src=x onerror=alert(1)>'},'bncc-status':{value:'feedback'},'bncc-save-status':{textContent:''}};
let year=6,paint='';
const ctx={console,URL,Blob,setTimeout,clearTimeout,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{getElementById:k=>elements[k]},fetch:async()=>({ok:true,json:async()=>catalog}),view:'bncc',render(){paint=vm.runInContext(`NexoBNCC.render(${year})`,ctx)},scrollTo(){},confirm:()=>true};vm.createContext(ctx);vm.runInContext(fs.readFileSync('public/bncc.js','utf8'),ctx);
(async()=>{
 vm.runInContext('NexoBNCC.render(6)',ctx);await new Promise(r=>setImmediate(r));
 vm.runInContext("NexoBNCC.select('EF06MA13');NexoBNCC.save(6,'EF06MA13')",ctx);
 const before=JSON.stringify([...storage]);ctx.render();assert.ok(paint.includes('&lt;img'));assert.ok(!paint.includes('<img src=x'));
 assert.ok(paint.includes('Recebi retorno e revisei'));assert.ok(!storage.has('nexo6-v1'));
 year=7;vm.runInContext("NexoBNCC.clearFilters();NexoBNCC.select('EF07MA18')",ctx);assert.ok(!paint.includes('&lt;img'));
 storage.set('nexo6-progress-owner','outra-conta');year=6;vm.runInContext("NexoBNCC.select('EF06MA13')",ctx);assert.ok(!paint.includes('&lt;img'));
 storage.delete('nexo6-progress-owner');vm.runInContext("NexoBNCC.save(6,'EF06MA13')",ctx);assert.match(elements['bncc-save-status'].textContent,/A conta mudou/);vm.runInContext("NexoBNCC.select('EF06MA13')",ctx);ctx.localStorage.setItem=()=>{throw Error('QuotaExceeded')};vm.runInContext("NexoBNCC.save(6,'EF06MA13')",ctx);assert.match(elements['bncc-save-status'].textContent,/Não foi possível salvar/);assert.equal(JSON.stringify([...storage]),before);
 console.log('BNCC: fontes, 1.408 códigos, blocos, atividades, isolamento, XSS e falha de armazenamento OK.');
})().catch(e=>{console.error(e);process.exitCode=1});
