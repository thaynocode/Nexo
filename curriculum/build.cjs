// Conteúdo autoral. Execute: node curriculum/build.cjs
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const subjects=[['Português','✍️','#7c3aed'],['Matemática','🧮','#0d9488'],['Ciências','🧬','#15803d'],['História','🏛️','#c2410c'],['Geografia','🌍','#2563eb'],['Inglês','🌐','#4f46e5'],['Artes','🎨','#db2777'],['Educação Física','⚡','#ca8a04']];
const grades=Object.fromEntries([1,2,3,4,5,7,8,9].map(g=>[g,subjects.filter(s=>g>5||s[0]!=='Inglês').map(([name,icon,color])=>({name,icon,color,topics:[]}))]));
function question(q,answer,wrong,explanation){const opts=[String(answer),...wrong.map(String)];if(opts.length!==4||new Set(opts.map(v=>v.toLowerCase())).size!==4)throw Error('Alternativas inválidas: '+q);return {q,opts,answer:0,explanation};}
function combine(base,level,grade){return base.map((_,i)=>{const count=level===1?2:(grade<=2?2:3),items=Array.from({length:count},(_,j)=>base[(i+j+level-1)%base.length]);const correct=items.map(q=>q.opts[q.answer]);const choices=[correct,...[0,1,2].map((v)=>items.map((q,j)=>j===v%count?q.opts[1+(i+v)%3]:q.opts[q.answer]))];if(new Set(choices.map(x=>x.join(' • '))).size<4)choices[3]=items.map(q=>q.opts[3]);return question((grade<=2?'Responda às duas perguntas. Escolha o par de respostas.':level===1?'Relacione os dois casos. Qual alternativa responde corretamente aos dois?':'Analise os três casos. Qual alternativa apresenta todas as respostas corretas?')+'\n'+items.map((q,j)=>`${j+1}) ${q.q}`).join('\n'),choices[0].join(' • '),choices.slice(1).map(x=>x.join(' • ')),items.map((q,j)=>`${j+1}) ${q.explanation}`).join('\n'));});}
function add(grade,subject,name,rows){const qs=rows.map((r,i)=>{const [q,answer,explanation,wrong]=r;const pool=[...new Set(rows.map(x=>x[1]))].filter(x=>x!==answer);return question(q,answer,wrong||Array.from({length:3},(_,j)=>pool[(i+j)%pool.length]),explanation);});if(qs.length!==10)throw Error(`${grade} ${subject} ${name}: ${qs.length} questões`);grades[grade].find(s=>s.name===subject).topics.push({name,questions:qs,advanced:{1:combine(qs,1,grade),2:combine(qs,2,grade)}});}
for(const file of ['language.cjs','math.cjs','knowledge.cjs','arts-movement.cjs','english.cjs'])require('./'+file)({add,question,grades});
// Preserva o banco original no HTML e acrescenta o 6º ano revisado no artefato.
const html=fs.readFileSync(root+'/index.html','utf8');
const begin=html.indexOf('const DATA=')+11, end=html.indexOf('];\nconst icons',begin)+1;
grades[6]=JSON.parse(html.slice(begin,end));
grades[6].forEach((s,i)=>{s.icon=subjects[i][1]});
const vm=require('node:vm'),old={window:{}};
for(const name of ['premium-bank-humanidades.js','premium-bank-exatas-artes.js'])vm.runInNewContext(fs.readFileSync(root+'/public/'+name,'utf8'),old);
const feedback=require('./sixth-feedback.cjs');
const legacyStart=html.indexOf('function advancedChallenge('),legacyEnd=html.indexOf('function start(',legacyStart);
const legacySixth=vm.runInNewContext('('+html.slice(legacyStart,legacyEnd).trim()+')');
// Guarda a associação histórica dos índices de erros antes de revisar os itens.
for(const [g,ss] of Object.entries(grades))ss.forEach((s,si)=>s.topics.forEach((t,ti)=>{
 t.legacy={0:t.questions.map(q=>({...q}))};
 for(const l of [1,2]){
  let bank=t.advanced?.[l]?.length>=10?t.advanced[l]:legacySixth(t,l);
  const premium=+g===6?old.window.NEXO_PREMIUM_BANK?.[si]?.[ti*2+l-1]:null;
  if(premium)bank=[premium,...bank.filter(q=>q.q!==premium.q)].slice(0,10);
  t.legacy[l]=bank;
 }
 if(+g===6)t.questions.forEach((q,i)=>{q.explanation=feedback[si][ti][i]});
}));
require('./editorial.cjs')({grades});
require('./distractors.cjs')({grades});
const assess=require('./assessment.cjs');
for(const [g,ss]of Object.entries(grades))ss.forEach((s,si)=>s.topics.forEach((t,ti)=>{
 t.revision=2;
 t.questions=t.questions.map((q,i)=>({...q,id:`${g}:${si}:${ti}:0:${i}`,skill:'Identificar e compreender',format:'foundation'}));
 if(s.name!=='Matemática'||(+g===1&&t.name==='Formas no cotidiano'))t.advanced={1:assess(t.questions,1,+g),2:assess(t.questions,2,+g)};
}));
require('./math-sixth.cjs')({grades,question});
require('./math-progressive.cjs')({grades,question});
for(const [g,ss]of Object.entries(grades))ss.forEach((s,si)=>s.topics.forEach((t,ti)=>{
 for(const l of [1,2])t.advanced[l]=t.advanced[l].map((q,i)=>({...q,id:`${g}:${si}:${ti}:${l}:${i}`,skill:q.skill||(l===1?'Aplicar um procedimento':'Resolver e conferir'),format:q.format||'problem'}));
}));
for(const [g,data]of Object.entries(grades))for(const s of data){if(s.topics.length<1)throw Error(`Sem conteúdo: ${g} ${s.name}`);for(const t of s.topics)for(const bank of [t.questions,t.advanced[1],t.advanced[2]]){if(bank.length!==10||new Set(bank.map(q=>q.q)).size!==10)throw Error('Banco inválido '+t.name);}}
fs.writeFileSync(root+'/public/grade-bank.js','// Gerado por curriculum/build.cjs. Não editar manualmente.\nwindow.NEXO_GRADES='+JSON.stringify(grades)+';\n');
console.log(Object.entries(grades).map(([g,ss])=>`${g}º: ${ss.length} matérias, ${ss.reduce((a,s)=>a+s.topics.length,0)} trilhas`).join('\n'));

require('./bncc/build.cjs');
