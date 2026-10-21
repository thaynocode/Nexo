const {test,expect}=require('@playwright/test');
test('anos escolares, progresso isolado e preservação do sexto ano',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('nexo6-v1'))localStorage.setItem('nexo6-v1',JSON.stringify({scores:{'0-0-0':8},attempts:{'0-0-0':2},mistakes:{},xp:96}))});
 await page.goto('http://127.0.0.1:4173/');
 await expect(page.locator('#grade-select')).toHaveValue('6');
 expect(await page.evaluate(()=>best(0,0,0))).toBe(8);
 await page.locator('#grade-select').selectOption('1');
 expect(await page.evaluate(()=>best(0,0,0))).toBe(0);
 expect(await page.evaluate(()=>openLevel(0,0,1))).toBe(false);
 await expect(page.locator('.subject')).toHaveCount(7);
 await expect(page.getByRole('button',{name:/Inglês/})).toHaveCount(0);
 await page.locator('.subject').first().click();await page.locator('.topic').first().click();
 await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 for(let i=0;i<10;i++){
  const correct=await page.evaluate(()=>questions[idx].choices.findIndex(c=>c.correct));
  await page.locator('.answer').nth(correct).click();
  await page.getByRole('button',{name:i===9?'Ver meu resultado':'Próxima pergunta →'}).click();
 }
 await expect(page.getByRole('heading',{name:'10 de 10 acertos'})).toBeVisible();
 expect(await page.evaluate(()=>state.scores['1:0-0-0'])).toBe(10);
 expect(await page.evaluate(()=>state.scores['0-0-0'])).toBe(8);
 await page.getByRole('button',{name:'Trocar ano'}).click();await page.locator('#grade-select').selectOption('7');
 await expect(page.locator('.subject')).toHaveCount(8);
 expect(await page.evaluate(()=>best(0,0,0))).toBe(0);
 await page.reload();await expect(page.locator('#grade-select')).toHaveValue('7');
 expect(await page.evaluate(()=>state.scores['1:0-0-0'])).toBe(10);
 await page.locator('#grade-select').selectOption('6');
 expect(await page.evaluate(()=>best(0,0,0))).toBe(8);
 expect(await page.evaluate(()=>DATA.reduce((n,s)=>n+s.topics.length,0))).toBe(77);
});
test('novos questionários continuam disponíveis offline',async({page,context})=>{
 await page.goto('http://127.0.0.1:4173/');
 await page.evaluate(()=>navigator.serviceWorker.ready);
 await page.reload();
 await context.setOffline(true);
 await page.reload();
 await page.locator('#grade-select').selectOption('9');
 await page.locator('.subject').nth(1).click();await page.locator('.topic').first().click();
 await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 await expect(page.locator('.answer')).toHaveCount(4);
 await expect(page.locator('.chip')).toHaveText('1 / 10');
});
test('todas as séries e níveis abrem dez questões com quatro alternativas',async({page})=>{
 test.setTimeout(120000);
 await page.goto('http://127.0.0.1:4173/');
 const count=await page.evaluate(()=>{let count=0;for(const year of [1,2,3,4,5,6,7,8,9]){switchGrade(year);for(let s=0;s<DATA.length;s++)for(let t=0;t<DATA[s].topics.length;t++)for(let l=0;l<3;l++){sIdx=s;tIdx=t;for(let prior=0;prior<l;prior++)state.scores[id(s,t,prior)]=threshold[prior];start(l);if(questions.length!==10||document.querySelectorAll('.answer').length!==4)throw Error(`${year} ${s} ${t} ${l}`);count++}}return count});
 expect(count).toBe(609);
});

for(const year of [1,2,3,4,5,6,7,8,9]){
 test(`limites, gravação e revisão isolados — ${year}º ano`,async({page})=>{
  await page.goto('http://127.0.0.1:4173/');
  const result=await page.evaluate(year=>{
   state={scores:{},attempts:{},mistakes:{},xp:0};switchGrade(year);
   const keys=[0,1,2].map(l=>id(0,0,l));
   const denied=start(1)===false&&view==='home';
   const boundaries=[];
   for(const [l,goal] of [[0,7],[1,8],[2,9]]){
    for(const score of [goal-1,goal]){
     start(l);correct=score;missed=questions.slice(score);finish();
     boundaries.push({l,score,open:l<2?openLevel(0,0,l+1):null,pass:result().includes('Excelente!')});
    }
   }
   const snapshot=JSON.stringify(state),xp=state.xp;
   start(2,true);const reviewed=questions.length;
   correct=questions.length;finish();const reviewUnchanged=JSON.stringify(state)===snapshot;
   const stored=JSON.parse(localStorage.getItem(key));
   switchGrade(year===6?1:6);
   const other={best:best(0,0,0),attempts:attempts(),unlocked:openLevel(0,0,1),mistakes:state.mistakes[id(0,0,2)]||[]};
   switchGrade(year);
   return {keys,denied,boundaries,reviewed,reviewUnchanged,other,xp,stored,attempts:attempts()};
  },year);
  expect(result.denied).toBe(true);
  expect(result.keys).toEqual([0,1,2].map(l=>`${year===6?'':year+':'}0-0-${l}`));
  expect(result.boundaries.map(b=>b.pass)).toEqual([false,true,false,true,false,true]);
  expect(result.boundaries.slice(0,4).map(b=>b.open)).toEqual([false,true,false,true]);
  expect(result.reviewed).toBe(1);expect(result.reviewUnchanged).toBe(true);
  expect(result.other).toEqual({best:0,attempts:0,unlocked:false,mistakes:[]});
  expect(result.xp).toBe(288);expect(result.attempts).toBe(6);
  await page.reload();await expect(page.locator('#grade-select')).toHaveValue(String(year));
  await expect(page).toHaveTitle(`NEXO • ${year}º Ano`);
  expect(await page.evaluate(()=>state)).toEqual(result.stored);
 });
}
test('justificativas preservam separação visual',async({page})=>{
 await page.goto('http://127.0.0.1:4173/');
 await page.evaluate(()=>{switchGrade(9);state.scores[id(0,0,0)]=7;start(1)});
 expect(await page.locator('.question').evaluate(el=>getComputedStyle(el).whiteSpace)).toBe('pre-line');
});

test('bancos revisados do sexto ano usam feedback específico e preservam revisão antiga',async({page})=>{
 await page.goto('http://127.0.0.1:4173/');
 const previous=await page.evaluate(()=>{switchGrade(6);state.scores['0-0-0']=8;state.mistakes['0-0-1']=[1];start(1,true);return DATA[0].topics[0].legacy[1][1].q});
 await expect(page.locator('.question')).toHaveText(previous);
 await page.getByRole('button',{name:'Trocar ano',exact:true}).click();
 await page.locator('#grade-select').selectOption('6');
 await page.evaluate(()=>{sIdx=1;tIdx=0;start(0)});
 await expect(page.locator('.question')).not.toHaveText(/^Quanto é/);
 await page.locator('.answer').first().click();
 await expect(page.locator('.feedback')).toContainText('Resposta correta:');
 expect(await page.locator('.feedback').innerText()).not.toContain('Confira a operação e suas etapas');
});
test('Mestre avalia respostas propostas em vez de concatenar alternativas',async({page})=>{
 await page.goto('http://127.0.0.1:4173/');
 await page.evaluate(()=>{switchGrade(4);sIdx=0;tIdx=0;state.scores[id(0,0,0)]=7;state.scores[id(0,0,1)]=8;start(2)});
 await expect(page.locator('.question')).toContainText('Resposta apresentada:');
 const choices=await page.locator('.answer span').allTextContents();
 expect(choices.every(text=>/correta|corretas/.test(text))).toBe(true);
});

test('desafios avançados continuam legíveis em tela estreita',async({page})=>{
 await page.setViewportSize({width:360,height:800});
 await page.goto('http://127.0.0.1:4173/');
 for(const year of [1,6,9])for(const level of [1,2]){
  await page.evaluate(({year,level})=>{switchGrade(year);sIdx=0;tIdx=0;for(let l=0;l<level;l++)state.scores[id(0,0,l)]=threshold[l];start(level)},{year,level});
  await expect(page.locator('.answer')).toHaveCount(4);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3)).toBe(false);
  await page.locator('.answer').first().click();
  await expect(page.locator('.feedback')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3)).toBe(false);
 }
});
