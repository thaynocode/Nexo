// Exercita a lógica real, incluindo embaralhamento, gravação e revisão.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
function boot(storage=new Map()){
 const app={innerHTML:''};const ctx={window:null,document:{title:'',getElementById:()=>app},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},NexoCloud:{updateBar(){},queue(){},init(){}},scrollTo(){},console};ctx.window=ctx;vm.createContext(ctx);
 for(const f of ['public/grade-bank.js','public/bncc-catalog.js','public/bncc-ui.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
 const start=html.indexOf('<script>const DATA=');assert(start>=0);
 vm.runInContext(html.slice(start+8,html.indexOf('</script>',start)),ctx);
 return {run:s=>vm.runInContext(s,ctx),storage,ctx};
}
const {run,storage}=boot(new Map([['nexo6-v1',JSON.stringify({scores:{'0-0-0':8},attempts:{'0-0-0':2},mistakes:{},xp:96})]]));
assert.equal(run('best(0,0,0)'),8);assert.equal(run('historicalRows()[0].score'),8);
const banks=run(`(()=>{
 state={scores:{},attempts:{},mistakes:{},xp:0};let count=0;
 for(const g of [1,2,3,4,5,6,7,8,9]){switchGrade(g);
  for(let si=0;si<DATA.length;si++)for(const {index:ti}of activeTopics(si))for(let l=0;l<3;l++){
   sIdx=si;tIdx=ti;
   if(l){state.scores[id(si,ti,l-1)]=threshold[l-1]-1;if(start(l)!==false)throw Error('Nível bloqueado iniciou');state.scores[id(si,ti,l-1)]=threshold[l-1];}
   start(l);if(questions.length!==10)throw Error('Banco incompleto');
   for(let i=0;i<10;i++){const q=questions[idx];if(q.choices.filter(c=>c.correct).length!==1||q.choices.find(c=>c.correct).text!==q.opts[q.answer])throw Error('Gabarito após embaralhamento');answer(q.choices.findIndex(c=>c.correct));next();}
   if(best(si,ti,l)!==10||state.attempts[id(si,ti,l)]!==1)throw Error('Resultado não persistido');
   start(l);const wrongQuestion=questions[0].q;answer(questions[0].choices.findIndex(c=>!c.correct));next();
   for(let i=1;i<10;i++){answer(questions[idx].choices.findIndex(c=>c.correct));next();}
   const before=JSON.stringify(state);start(l,true);
   if(questions.length!==1||questions[0].q!==wrongQuestion)throw Error('Revisão não corresponde ao erro');
   answer(questions[0].choices.findIndex(c=>c.correct));next();
   if(JSON.stringify(state)!==before)throw Error('Revisão alterou nota, tentativas ou XP');
   count++;
  }
 }
 return count;
})()`);
assert.equal(banks,369);
for(const year of [1,2,3,4,5,6,7,8,9]){run(`switchGrade(${year})`);const expected=run('JSON.stringify(state)'),restored=boot(storage);assert.equal(restored.run('grade'),year);assert.equal(restored.ctx.document.title,`NEXO • ${year}º Ano`);assert.equal(restored.run('JSON.stringify(state)'),expected);}
console.log(`OK: ${banks} bancos ativos, ${banks*20} respostas e ${banks} revisões; bloqueio, gabarito, notas, XP, chaves e recarga dos nove anos.`);
