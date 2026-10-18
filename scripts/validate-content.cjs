const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=process.cwd();
const html=fs.readFileSync(root+'/index.html','utf8');
const context={window:{}};
for(const file of ['public/lessons.js','public/lesson-illustrations.js','public/concept-visuals.js','public/visual-specs.js','public/didactic-visuals.js']){
  vm.runInNewContext(fs.readFileSync(root+'/'+file,'utf8'),context,{filename:file,timeout:5000});
}
const lessons=context.window.NEXO_LESSONS;
assert.equal(lessons.length,8,'Oito disciplinas obrigatórias');
let count=0,errors=[];
for(let s=0;s<lessons.length;s++)for(let t=0;t<lessons[s].length;t++){
  const l=lessons[s][t];count++;
  for(const field of ['title','summary','objective','hook','workedExample','checkQuestion','checkAnswer'])
    if(typeof l[field]!=='string'||l[field].trim().length<(field==='title'?2:12))errors.push(s+':'+t+' campo '+field);
  if(l.lessonSteps?.length!==3)errors.push(s+':'+t+' etapas');
  if((l.contextExamples||[]).length<2)errors.push(s+':'+t+' conceitos');
  for(const [field,value] of [['summary',l.summary],['hook',l.hook],['objective',l.objective],['workedExample',l.workedExample],...l.lessonSteps.map((v,i)=>['etapa '+i,v.body])]){
    if(/^[a-záàâãéêíóôõúç]/.test(value.trim()))errors.push(s+':'+t+' inicial minúscula em '+field);
  }
  const illustration=context.window.NEXO_LESSON_ILLUSTRATION(s,t,l);
  if(illustration){
    if(!illustration.src?.startsWith('data:image/svg+xml'))errors.push(s+':'+t+' formato de imagem');
    else {const svg=decodeURIComponent(illustration.src.split(',')[1]);if(!svg.includes('<svg')||!svg.includes('</svg>'))errors.push(s+':'+t+' SVG inválido');}
  }
  for(const ex of l.contextExamples){
    if(!context.window.NEXO_CONCEPT_VISUAL(s,t,ex.concept))errors.push(s+':'+t+' conceito sem representação');
  }
}
assert.equal(count,77);
assert.equal(context.window.NEXO_VISUAL_SPECS.flat().length,77,'Devem existir 77 roteiros visuais');
for(let s=0;s<lessons.length;s++)for(let t=0;t<lessons[s].length;t++){
 const image=context.window.NEXO_DIDACTIC_VISUAL(s,t,lessons[s][t]);
 assert(image?.src?.startsWith('data:image/svg+xml'),'Imagem didática ausente: '+s+':'+t);
 const svg=decodeURIComponent(image.src.split(',')[1]);
 assert(svg.includes('<svg')&&svg.includes('</svg>'),'SVG didático inválido');
 const rows=context.window.NEXO_VISUAL_SPECS[s][t].slice(1);
 assert(rows.every(row=>row.split('|').length>=3),'Legenda insuficiente: '+s+':'+t);
 assert(!image.caption.includes('17 — 17'),'Figura genérica incorreta');
}
assert(html.includes('/visual-specs.js')&&html.includes('/didactic-visuals.js'),'Arquivos visuais não carregados');

const dataStart=html.indexOf('const DATA=')+11;
const dataEnd=html.indexOf('];\nconst icons',dataStart)+1;
assert(dataStart>10&&dataEnd>dataStart,'Banco de questões não encontrado');
const subjects=JSON.parse(html.slice(dataStart,dataEnd));
assert.equal(subjects.length,8);
let questionCount=0;
subjects.forEach((subject,s)=>subject.topics.forEach((topic,t)=>{
  assert.equal(topic.questions.length,10,'Quantidade incorreta de questões '+s+':'+t);
  const seen=new Set();
  for(const q of topic.questions){
    questionCount++;
    assert.equal(q.opts.length,4);
    assert.equal(new Set(q.opts.map(x=>x.trim().toLowerCase())).size,4,'Alternativas duplicadas');
    assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
    assert(!seen.has(q.q),'Questão duplicada');
    seen.add(q.q);
  }
}));
assert.equal(questionCount,770);

const ops=context.window.NEXO_LESSON_ILLUSTRATION(1,0,lessons[1][0]);
const svg=decodeURIComponent(ops.src.split(',')[1]);
for(const formula of ['3 + 2 = 5','8 − 3 = 5','3 × 4 = 12','12 ÷ 3 = 4'])assert(svg.includes(formula),'Ilustração incorreta: '+formula);
assert.equal(context.window.NEXO_CONCEPT_VISUAL(1,0,'Adição'),'➕');
assert.equal(context.window.NEXO_CONCEPT_VISUAL(1,0,'Subtração'),'➖');
assert.equal(context.window.NEXO_CONCEPT_VISUAL(1,0,'Multiplicação'),'✖️');
assert.equal(context.window.NEXO_CONCEPT_VISUAL(1,0,'Divisão'),'➗');
for(const file of ['lessons.js','lesson-illustrations.js','concept-visuals.js'])assert(html.includes('/'+file),'Recurso não carregado: '+file);
assert.equal(errors.length,0,errors.slice(0,30).join('\n'));
console.log('OK: '+count+' aulas, imagens SVG, conceitos e operações validados.');
