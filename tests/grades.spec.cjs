const {test,expect}=require('@playwright/test');
test('anos escolares, progresso isolado e preservação do sexto ano',async({page})=>{
 await page.addInitScript(()=>{if(!localStorage.getItem('nexo6-v1'))localStorage.setItem('nexo6-v1',JSON.stringify({scores:{'0-0-0':8},attempts:{'0-0-0':2},mistakes:{},xp:96}))});
 await page.goto((process.env.NEXO_TEST_URL||'http://127.0.0.1:4173/'));
 await expect(page.locator('#grade-select')).toHaveValue('6');
 expect(await page.evaluate(()=>best(0,0,0))).toBe(8);
 await page.locator('#grade-select').selectOption('1');
 expect(await page.evaluate(()=>best(0,0,0))).toBe(0);
 expect(await page.evaluate(()=>openLevel(0,0,1))).toBe(false);
 await expect(page.locator('.subject')).toHaveCount(9);
 await expect(page.getByRole('button',{name:/Inglês/})).toHaveCount(0);
 await page.locator('.subject').first().click();await page.locator('.topic').first().click();
 await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 const completedKey=await page.evaluate(()=>id(sIdx,tIdx,0));
 for(let i=0;i<10;i++){
  const correct=await page.evaluate(()=>questions[idx].choices.findIndex(c=>c.correct));
  await page.locator('.answer').nth(correct).click();
  await page.getByRole('button',{name:i===9?'Ver meu resultado':'Próxima pergunta →'}).click();
 }
 await expect(page.getByRole('heading',{name:'10 de 10 acertos'})).toBeVisible();
 expect(await page.evaluate(k=>state.scores[k],completedKey)).toBe(10);
 expect(await page.evaluate(()=>state.scores['0-0-0'])).toBe(8);
 await page.getByRole('button',{name:'Trocar ano'}).click();await page.locator('#grade-select').selectOption('7');
 await expect(page.locator('.subject')).toHaveCount(10);
 expect(await page.evaluate(()=>best(0,0,0))).toBe(0);
 await page.reload();await expect(page.locator('#grade-select')).toHaveValue('7');
 expect(await page.evaluate(k=>state.scores[k],completedKey)).toBe(10);
 await page.locator('#grade-select').selectOption('6');
 expect(await page.evaluate(()=>best(0,0,0))).toBe(8);
 expect(await page.evaluate(()=>DATA.reduce((n,s,si)=>n+activeTopics(si).length,0))).toBe(16);
});
test('novos questionários continuam disponíveis offline',async({page,context})=>{
 await page.goto((process.env.NEXO_TEST_URL||'http://127.0.0.1:4173/'));
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
 await page.goto((process.env.NEXO_TEST_URL||'http://127.0.0.1:4173/'));
 const count=await page.evaluate(()=>{let count=0;for(const year of [1,2,3,4,5,6,7,8,9]){switchGrade(year);for(let s=0;s<DATA.length;s++)for(const {index:t}of activeTopics(s))for(let l=0;l<3;l++){sIdx=s;tIdx=t;start(l);if(questions.length!==10||questions.some(q=>!q.bncc?.length)||document.querySelectorAll('.answer').length!==4)throw Error(`${year} ${s} ${t} ${l}`);count++}}return count});
 expect(count).toBe(369);
});
