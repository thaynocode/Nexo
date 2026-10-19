const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const context={window:{}};
for(const file of ['question-visuals.js','visual-specs.js','concept-diagrams.js'])vm.runInNewContext(fs.readFileSync('public/'+file,'utf8'),context);
for(const genre of ['Convite','Receita','Reportagem','Bilhete','Notícia','Fábula','Entrevista','Poema','Conto','Verbete','Anúncio','Manual','Crônica','Editorial','Diário','Carta']){
 const visual=context.window.NEXO_OPTION_VISUAL(genre);
 assert(visual.includes('<svg'));assert(visual.includes('aria-label='));
 assert(context.window.NEXO_OPTION_EXPLANATION(genre).includes('<p>'));
}
assert(context.window.NEXO_OPTION_VISUAL('Reportagem').includes('Entrevistas com moradores'));
assert(context.window.NEXO_OPTION_VISUAL('Receita').includes('Ingredientes'));
assert(context.window.NEXO_OPTION_VISUAL('Bilhete').includes('Deixei seu livro na mesa.'));
assert(context.window.NEXO_OPTION_VISUAL('Convite').includes('Sábado • 10h'));
assert.equal(context.window.NEXO_OPTION_VISUAL('Alternativa sem exemplo autoral'),'');
assert.equal(context.window.NEXO_OPTION_VISUAL('<img onerror=alert(1)>'),'');
const image=context.window.NEXO_CONCEPT_DIAGRAM(1,0,{title:'Operações'});
const svg=decodeURIComponent(image.src.split(',')[1]);
assert.equal((svg.match(/class="fruit"/g)||[]).length,37,'5 + 8 + 12 + 12 maçãs');
assert.equal((svg.match(/opacity="0.35"/g)||[]).length,3,'Três maçãs retiradas na subtração');
assert(svg.includes('3 × 4 = 12'));assert(svg.includes('12 ÷ 3 = 4'));assert(image.caption.includes('cestos'));
const html=fs.readFileSync('index.html','utf8');
assert(html.includes('NEXO_OPTION_VISUAL(o.text)'));assert(html.includes('NEXO_OPTION_EXPLANATION(q.choices.find(o=>o.correct).text)'));
assert(!html.includes('NEXO_UNSPLASH_VISUAL?.(sIdx,tIdx,q.q)'));
const dataStart=html.indexOf('const DATA=')+11,dataEnd=html.indexOf('];',dataStart)+1;
const data=JSON.parse(html.slice(dataStart,dataEnd));
for(const q of data[1].topics[0].questions){
 assert(q.q.includes('laranjas'));assert(q.opts.every(o=>o.includes('laranjas')));assert(q.explanation.includes('laranjas'));
 const v=q.visual;const expected=v.op==='+'?v.a+v.b:v.op==='−'?v.a-v.b:v.op==='×'?v.a*v.b:v.a/v.b;
 assert.equal(v.answer,expected);assert.equal(parseInt(q.opts[q.answer]),expected);
 const before=context.window.NEXO_PROBLEM_VISUAL(q),after=context.window.NEXO_PROBLEM_VISUAL(q,true);
 assert(before.includes('?'));assert(!after.includes('?'));assert(after.includes(String(expected)));
}
const oranges=data[1].topics[0].questions.find(q=>q.visual.a===700);
assert(oranges.q.includes('vendeu 258 laranjas'));assert(oranges.explanation.includes('442 laranjas'));
console.log('PASS: 16 gêneros com exemplos, explicação correta, alternativas desconhecidas sem imagens genéricas e 37 maçãs com agrupamentos.');
