const {test,expect}=require('@playwright/test');
const url=process.env.NEXO_TEST_URL||'http://127.0.0.1:4173/';
test('mapa filtra referências e abre o questionário vinculado',async({page})=>{
 await page.goto(url);await page.getByRole('button',{name:'Trocar ano'}).click();await page.locator('#grade-select').selectOption('7');
 await page.getByRole('button',{name:'Mapa BNCC'}).click();
 await page.locator('input[name=query]').fill('EF07CI15');await page.getByRole('button',{name:'Filtrar',exact:true}).click();
 await expect(page.locator('.bncc-list article')).toHaveCount(1);
 await expect(page.getByText('Apoio conceitual / avaliação parcial.',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:/Ozônio, placas tectônicas/}).click();await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 await expect(page.locator('.answer')).toHaveCount(4);
 await page.locator('.curriculum-objective summary').click();await expect(page.locator('.curriculum-objective')).toContainText(/EF07CI1[456]/);
});
test('ensino religioso é opcional, disponível em todos os anos e separado das notas antigas',async({page})=>{
 await page.goto(url);
 for(const g of [1,2,3,4,5,6,7,8,9]){
  await page.evaluate(g=>switchGrade(g),g);
  await page.getByRole('button',{name:/Ensino Religioso/}).click();
  await expect(page.getByText(/Este componente é opcional/)).toBeVisible();
  const score=await page.evaluate(()=>{const before=totalComplete();state.scores[id(sIdx,0,0)]=10;return {before,after:totalComplete()}});
  expect(score.after).toBe(score.before);
  await page.locator('.topic').first().click();await page.getByRole('button',{name:'Começar questionário →'}).first().click();await expect(page.locator('.answer')).toHaveCount(4);
 }
});
test('tabela e gráfico têm dados acessíveis; computação apresenta referência CO',async({page})=>{
 await page.goto(url);
 await page.evaluate(()=>{switchGrade(1);sIdx=1;tIdx=DATA[1].topics.findIndex(t=>t.name==='Leitura de tabelas e gráficos');start(0)});
 await expect(page.locator('.quiz-stimulus table')).toBeVisible();await expect(page.locator('caption')).toContainText('Frutas');
 await page.evaluate(()=>{state.scores[id(sIdx,tIdx,0)]=7;start(1)});await expect(page.locator('.quiz-bars')).toBeVisible();
 await page.getByText('Ver os dados em tabela',{exact:true}).click();await expect(page.locator('.quiz-stimulus table')).toBeVisible();
 await page.evaluate(()=>{switchGrade(9);sIdx=DATA.findIndex(s=>s.name==='Computação');tIdx=0;state.scores[id(sIdx,tIdx,0)]=7;state.scores[id(sIdx,tIdx,1)]=8;start(2)});
 await page.locator('.curriculum-objective summary').click();await expect(page.locator('.curriculum-objective')).toContainText('EF09CO');
});
test('banco anterior sem vínculo fica arquivado e não pode iniciar nova avaliação',async({page})=>{
 await page.goto(url);await page.evaluate(()=>{switchGrade(6);sIdx=0;tIdx=0;start(0)});
 await expect(page.locator('.answer')).toHaveCount(0);await expect(page.locator('.topic')).not.toHaveCount(0);
 expect(await page.evaluate(()=>DATA[0].topics[0].archived)).toBe(true);
});

test('revisões preservam a nota antiga sem creditar o novo questionário e exibem a malha',async({page})=>{
 await page.goto(url);await page.evaluate(()=>{switchGrade(4);state.scores['4:1-2-0']=9;state.attempts['4:1-2-0']=2;sIdx=1;tIdx=2;navigate('topic')});
 await expect(page.getByText('Questionário revisado',{exact:true})).toBeVisible();
 const result=await page.evaluate(()=>({key:id(1,2,0),best:best(1,2,0),old:state.scores['4:1-2-0']}));
 expect(result).toEqual({key:'4:1-2-0:bncc-2026',best:0,old:9});
 await page.evaluate(()=>{const q=DATA[1].topics[2].questions[0];document.querySelector('main').innerHTML=NexoCurriculum.stimulus(q.stimulus)});
 await expect(page.getByRole('img',{name:'Malha com 2 linhas e 3 colunas de quadradinhos iguais'})).toBeVisible();
 const downloadPromise=page.waitForEvent('download');await page.evaluate(()=>exportProgress());const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe('nexo-4ano-relatorio.csv');
});
