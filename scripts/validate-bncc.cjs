const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),crypto=require('crypto');
const root=process.cwd(),catalog=require(root+'/curriculum/bncc-catalog.json'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync('public/grade-bank.js','utf8'),ctx);
const grades=ctx.window.NEXO_GRADES;
const html=fs.readFileSync('index.html','utf8'),a=html.indexOf('const DATA=')+11,b=html.indexOf('];\nconst icons',a)+1,sixth=JSON.parse(html.slice(a,b));
assert.equal(crypto.createHash('sha256').update(JSON.stringify(sixth)).digest('hex'),fs.readFileSync('curriculum/sixth-data.sha256','utf8').trim(),'O conteúdo histórico mudou sem migração');
assert.equal(Object.keys(catalog.skills).length,1408,'Catálogo extraído do documento consolidado e complemento');
assert.equal(catalog.skills.EF04LP25.years[0],4);assert(catalog.skills.EF04LP25.description.includes('Representar'));
assert.equal(catalog.skills.EF05CO11.source.sourceCode,'EF05CO011');
for(const s of Object.values(catalog.skills))assert(!/^\d[ºo]?\s*ANO$/i.test(s.objectOfKnowledge||''),s.code+' objeto extraído de cabeçalho');
const counts={topics:0,questions:0,linked:0,activeTopics:0,activeQuestions:0,archivedTopics:0,byYear:{}};
for(const [g,subjects]of Object.entries(grades)){
 assert.equal(subjects.length,+g<=5?9:10);
 assert(subjects.find(s=>s.name==='Ensino Religioso')?.optional);
 assert(subjects.find(s=>s.name==='Computação')?.topics.length);
 counts.byYear[g]={topics:0,linkedQuestions:0,unlinkedQuestions:0};
 for(const s of subjects){assert(s.topics.some(t=>!t.archived),`${g} ${s.name} sem percurso revisado`);for(const t of s.topics){counts.topics++;counts.byYear[g].topics++;if(t.archived){counts.archivedTopics++;assert.equal(t.questions.length,0,'Banco arquivado não deve ser distribuído');continue;}else counts.activeTopics++;
  for(const [level,bank]of Object.entries({0:t.questions,...t.advanced})){
   assert.equal(bank.length,10,`${g} ${s.name} ${t.name} ${level}`);
   assert.equal(new Set(bank.map(q=>q.q)).size,10,`${g} ${t.name} questões repetidas`);
   for(const q of bank){counts.questions++;if(!t.archived){counts.activeQuestions++;assert(q.bncc?.length,`${g} ${t.name} questão ativa sem vínculo`);assert.equal(q.review,'editorial');}assert.equal(q.opts.length,4);assert.equal(new Set(q.opts.map(x=>x.toLowerCase().trim())).size,4,q.q);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);assert(q.explanation?.length>8);
    if(q.review==='editorial'){assert(q.bncc?.length,q.q);assert(q.alignmentReason?.length>30);assert(['conceptual','closed-task'].includes(q.evidence));}
    if(q.bncc?.length){counts.linked++;counts.byYear[g].linkedQuestions++;for(const code of q.bncc){const skill=catalog.skills[code];assert(skill,code);assert(skill.years.includes(+g),`${g} ${code}`);const subjectCodes={Português:'LP',Matemática:'MA',Ciências:'CI',História:'HI',Geografia:'GE',Artes:'AR','Educação Física':'EF',Inglês:'LI','Ensino Religioso':'ER',Computação:'CO'};assert.equal(skill.subjectCode,subjectCodes[s.name]);}}
    else counts.byYear[g].unlinkedQuestions++;
    assert(!/Responda às duas perguntas|Analise os três casos|Relacione os dois casos/.test(q.q),'Recombinação antiga não deve ser publicada');
    if(q.stimulus){const d=q.stimulus;assert(d.title);if(d.type==='squares'){assert(Number.isInteger(d.width)&&Number.isInteger(d.height)&&d.width>0&&d.height>0&&d.width*d.height<=200);}else{assert(['table','bars'].includes(d.type));assert(d.columns.length===2);assert(d.rows.every(r=>r.length===2&&Number.isFinite(+r[1])));}}
   }
  }
 }}
}
assert(grades[7].find(s=>s.name==='Ciências').topics.some(t=>t.name.includes('tectônicas')));
assert(grades[6].find(s=>s.name==='História').topics.some(t=>t.name.includes('medieval')));
assert(grades[8].find(s=>s.name==='Matemática').topics.some(t=>t.name.includes('Dízimas')));
const factoring=grades[9].find(s=>s.name==='Matemática').topics.find(t=>t.name.includes('Fatoração'));assert(factoring);for(const q of factoring.advanced[2])assert(q.bncc.includes('EF09MA09'));
assert.equal(fs.readFileSync('sw.js','utf8'),fs.readFileSync('public/sw.js','utf8'));
for(const p of ['/grade-bank.js','/bncc-catalog.js','/bncc-ui.js'])assert(fs.readFileSync('sw.js','utf8').includes(p));
for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(m[1].trim())new Function(m[1]);
for(const f of ['public/grade-bank.js','public/bncc-catalog.js','public/bncc-ui.js'])new Function(fs.readFileSync(f,'utf8'));
fs.writeFileSync('curriculum/coverage-report.json',JSON.stringify({definition:'Contagem de itens e vínculos, não de domínio ou cobertura integral de habilidades.',...counts},null,2)+'\n');
console.log(JSON.stringify(counts));
