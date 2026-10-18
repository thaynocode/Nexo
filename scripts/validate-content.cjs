const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=process.cwd();
const html=fs.readFileSync(root+'/index.html','utf8');
const context={window:{}};
for(const file of ['public/lessons.js','public/lesson-illustrations.js','public/concept-visuals.js']){
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
  if(!illustration?.src?.startsWith('data:image/svg+xml'))errors.push(s+':'+t+' imagem ausente');
  const svg=decodeURIComponent(illustration.src.split(',')[1]);
  if(!svg.includes('<svg')||!svg.includes('</svg>'))errors.push(s+':'+t+' SVG inválido');
  for(const ex of l.contextExamples){
    if(!context.window.NEXO_CONCEPT_VISUAL(s,t,ex.concept))errors.push(s+':'+t+' conceito sem representação');
  }
}
assert.equal(count,77);
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
