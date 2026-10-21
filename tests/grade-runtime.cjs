// Executa a lógica real do app em VM; não substitui os testes de navegador/offline.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
function boot(storage=new Map(),legacySixth=false){
 const app={innerHTML:''};
 const ctx={window:null,document:{title:'NEXO • 6º Ano',getElementById:()=>app},
  localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},
  NexoCloud:{updateBar(){},queue(){},init(){}},scrollTo(){},console};
 ctx.window=ctx;vm.createContext(ctx);
 for(const file of ['public/grade-bank.js','public/premium-bank-humanidades.js','public/premium-bank-exatas-artes.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
 if(legacySixth)delete ctx.NEXO_GRADES[6];
 const script=html.slice(html.indexOf('<script>const DATA=')+8,html.indexOf('</script>',html.indexOf('<script>const DATA=')));
 vm.runInContext(script,ctx);return {ctx,storage,run:code=>vm.runInContext(code,ctx)};
}
const {run,storage}=boot(new Map([['nexo6-v1',JSON.stringify({scores:{'0-0-0':8},attempts:{'0-0-0':2},mistakes:{'0-0-0':[2]},xp:96})]]));
assert.equal(run('grade'),6);assert.equal(run('best(0,0,0)'),8);
assert.equal(run('attempts()'),2);
run('switchGrade(1)');assert.equal(run('best(0,0,0)'),0);
assert.equal(run('attempts()'),0);assert.equal(run('start(1)'),false);
run('switchGrade(6)');assert.equal(run('best(0,0,0)'),8);
assert.equal(run('state.mistakes[id(0,0,0)][0]'),2);
let banks=run(`(()=>{
 state={scores:{},attempts:{},mistakes:{},xp:0};let count=0;
 for(const year of [1,2,3,4,5,6,7,8,9]){
  switchGrade(year);
  if(DATA.length!==(year<6?7:8))throw Error('Matérias '+year);
  for(let s=0;s<DATA.length;s++)for(let t=0;t<DATA[s].topics.length;t++)for(let l=0;l<3;l++){
   sIdx=s;tIdx=t;
   if(l>0){
    state.scores[id(s,t,l-1)]=threshold[l-1]-1;
    if(openLevel(s,t,l)||start(l)!==false)throw Error('Desbloqueio antes da meta');
    state.scores[id(s,t,l-1)]=threshold[l-1];
   }
   start(l);
   if(questions.length!==10)throw Error('Banco incompleto '+[year,s,t,l]);
   for(let i=0;i<10;i++){
    const q=questions[idx];
    if(q.choices.length!==4||q.choices.filter(c=>c.correct).length!==1||q.choices.find(c=>c.correct).text!==q.opts[q.answer])throw Error('Gabarito embaralhado');
    answer(q.choices.findIndex(c=>c.correct));next();
   }
   if(best(s,t,l)!==10||state.attempts[id(s,t,l)]!==1)throw Error('Gravação incorreta');
   start(l);
   const wrongText=questions[0].q;
   answer(questions[0].choices.findIndex(c=>!c.correct));next();
   for(let i=1;i<10;i++){answer(questions[idx].choices.findIndex(c=>c.correct));next()}
   const before=JSON.stringify(state);
   start(l,true);
   if(questions.length!==1||questions[0].q!==wrongText)throw Error('Revisão aponta outra questão');
   answer(questions[0].choices.findIndex(c=>c.correct));next();
   if(JSON.stringify(state)!==before)throw Error('Revisão altera progresso/XP');
   count++;
  }
 }
 return count;
})()`);
assert.equal(banks,609);
for(const year of [1,2,3,4,5,6,7,8,9]){
 run(`switchGrade(${year})`);
 const expected=run('JSON.stringify(state)');
 const restored=boot(storage);
 assert.equal(restored.run('grade'),year);
 assert.equal(restored.ctx.document.title,`NEXO • ${year}º Ano`);
 assert.equal(restored.run('JSON.stringify(state)'),expected);
 assert.equal(restored.run('id(0,0,0)'),year===6?'0-0-0':`${year}:0-0-0`);
}
console.log(`OK: ${banks} bancos, 12.180 respostas + 609 revisões; bloqueios, gabaritos embaralhados, chaves legadas e persistência dos nove anos.`);

// Compara o arquivo de revisão com o comportamento histórico real, inclusive
// bancos matemáticos parciais que caíam no gerador e o item premium inicial.
const historical=boot(new Map(),true);
const legacy=historical.run(`(()=>{let all=[];switchGrade(6);for(let s=0;s<DATA.length;s++)for(let t=0;t<DATA[s].topics.length;t++)for(let l=0;l<3;l++){sIdx=s;tIdx=t;for(let p=0;p<l;p++)state.scores[id(s,t,p)]=threshold[p];start(l);for(const q of questions)all.push({s,t,l,i:q.sourceIndex,q:q.q,opts:q.opts,answer:q.answer})}return all})()`);
const current=boot();
for(const item of legacy){const archived=current.run(`GRADE_BANK[6][${item.s}].topics[${item.t}].legacy[${item.l}][${item.i}]`);assert.equal(archived.q,item.q);assert.equal(JSON.stringify(archived.opts),JSON.stringify(item.opts));assert.equal(archived.answer,item.answer)}
// Índices antigos continuam apontando para a questão histórica; novas
// tentativas guardam o enunciado, sem depender da ordem de futuras versões.
const review=current.run(`(()=>{
 switchGrade(6);state={scores:{'0-0-0':8},attempts:{},mistakes:{'0-0-1':[1]},xp:96};sIdx=0;tIdx=0;start(1,true);
 const oldMatch=questions[0].q===DATA[0].topics[0].legacy[1][1].q;
 switchGrade(1);start(0);const text=questions[0].q;answer(questions[0].choices.findIndex(c=>!c.correct));next();
 while(idx<questions.length&&view==='quiz'){answer(questions[idx].choices.findIndex(c=>c.correct));next()}
 const stored=state.mistakes[id(0,0,0)][0];
 DATA[0].topics[0].questions[0]={...DATA[0].topics[0].questions[0],q:'Alteração simulada posterior'};
 start(0,true);return {oldMatch,isObject:typeof stored==='object',sameText:questions[0].q===text};
})()`);
assert.equal(review.oldMatch,true);assert.equal(review.isObject,true);assert.equal(review.sameText,true);
console.log(`OK: ${legacy.length} índices históricos comparados com a jornada original e revisão nova por cópia da questão.`);
