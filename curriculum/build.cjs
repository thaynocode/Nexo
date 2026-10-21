// Conteúdo autoral. Execute: node curriculum/build.cjs
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const subjects=[['Português','✍️','#7c3aed'],['Matemática','🧮','#0d9488'],['Ciências','🧬','#15803d'],['História','🏛️','#c2410c'],['Geografia','🌍','#2563eb'],['Inglês','🌐','#4f46e5'],['Artes','🎨','#db2777'],['Educação Física','⚡','#ca8a04'],['Ensino Religioso','🤝','#7c5d9b'],['Computação','💻','#0891b2']];
const grades=Object.fromEntries([1,2,3,4,5,6,7,8,9].map(g=>[g,subjects.filter(s=>g>5||s[0]!=='Inglês').map(([name,icon,color])=>({name,icon,color,topics:[],...(name==='Ensino Religioso'?{optional:true}:{})}))]));
function question(q,answer,wrong,explanation){const opts=[String(answer),...wrong.map(String)];if(opts.length!==4||new Set(opts.map(v=>v.toLowerCase())).size!==4)throw Error('Alternativas inválidas: '+q);return {q,opts,answer:0,explanation};}
function combine(base,level){return base.map((q,i)=>{const c=q.opts[q.answer],w=q.opts.filter((_,j)=>j!==q.answer);return {...q,q:level===1?q.q+'\nQual alternativa apresenta uma resposta coerente com a explicação?':q.q+'\nUma resolução propôs “'+w[i%w.length]+'”. Qual correção é adequada?',opts:level===1?[c+'. '+q.explanation,...w.map(x=>x+'. '+q.explanation)]:[c+'. '+q.explanation,...w.map(x=>'Manter “'+x+'” como resposta.')],answer:0,review:'pending'};});}
function add(grade,subject,name,rows){const qs=rows.map((r,i)=>{const [q,answer,explanation,wrong]=r;const pool=[...new Set(rows.map(x=>x[1]))].filter(x=>x!==answer);return question(q,answer,wrong||Array.from({length:3},(_,j)=>pool[(i+j)%pool.length]),explanation);});if(qs.length!==10)throw Error(`${grade} ${subject} ${name}: ${qs.length} questões`);grades[grade].find(s=>s.name===subject).topics.push({name,questions:qs,advanced:{1:combine(qs,1,grade),2:combine(qs,2,grade)}});}
for(const file of ['language.cjs','math.cjs','knowledge.cjs','arts-movement.cjs','english.cjs'])require('./'+file)({add,question,grades});
// Conservar índices e histórico, mas substituir a oferta antiga sem vínculos
// conferidos pelos percursos revisados. Não converter notas antigas em evidência nova.
for(const subjects of Object.values(grades))for(const s of subjects)for(const t of s.topics)t.archived=true;
require('./revisions.cjs')({grades});
const catalog=require('./bncc-catalog.json');
const reviewed=require('./reviewed.cjs')({grades,catalog});
require('./religion.cjs')(reviewed);
require('./computing.cjs')(reviewed);
require('./gaps-math.cjs')({grades,catalog});
require('./gaps-context.cjs')(reviewed);
const scenarios=require('./scenarios.cjs')({grades,catalog});
for(const file of ['complete-language.cjs','complete-geography.cjs','complete-history.cjs','complete-science.cjs','complete-arts.cjs','complete-movement.cjs','complete-math.cjs','complete-english.cjs'])require('./'+file)(scenarios);
for(const [g,data]of Object.entries(grades))for(const s of data){if(s.topics.length<1&&Number(g)!==6)throw Error(`Sem conteúdo: ${g} ${s.name}`);for(const t of s.topics)for(const bank of [t.questions,t.advanced[1],t.advanced[2]]){if(bank.length!==10||new Set(bank.map(q=>q.q)).size!==10)throw Error('Banco inválido '+t.name);}}
const published=Object.fromEntries(Object.entries(grades).map(([g,subjects])=>[g,subjects.map(s=>({...s,topics:s.topics.map(t=>t.archived?{name:t.name,archived:true,questions:[],advanced:{1:[],2:[]}}:t)}))]));
fs.writeFileSync(root+'/public/grade-bank.js','// Gerado por curriculum/build.cjs. Não editar manualmente.\nwindow.NEXO_GRADES='+JSON.stringify(published)+';\n');
console.log(Object.entries(grades).map(([g,ss])=>`${g}º: ${ss.length} matérias, ${ss.reduce((a,s)=>a+s.topics.length,0)} trilhas`).join('\n'));

fs.writeFileSync(root+'/public/bncc-catalog.js','window.NEXO_BNCC='+JSON.stringify(catalog)+';\n');
