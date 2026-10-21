const {test,expect}=require('@playwright/test');
test('questões exibem fotografia WebP acessível, carregada e ampliável',async({page})=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.locator('#grade-select').selectOption('6');
 await page.locator('.subject').first().click();await page.locator('.topic').first().click();
 await expect(page.getByRole('button',{name:/Estudar conteúdo/})).toHaveCount(0);
 await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 const figure=page.locator('.nexo-premium-photo').first(),img=figure.locator('img');
 await expect(img).toHaveAttribute('alt',/.+/);
 await expect(img).toHaveAttribute('src',/images\.unsplash\.com/);
 await page.waitForFunction(()=>{const el=document.querySelector('.nexo-premium-photo img');return !!el&&el.complete&&el.naturalWidth>0;},null,{timeout:20000});
 await figure.locator('.nexo-photo-zoom').click();
 await expect(page.locator('#nexo-viewer')).toHaveClass(/open/);
 await page.getByRole('button',{name:/Fechar imagem/}).click();
 await expect(page.locator('#nexo-viewer')).not.toHaveClass(/open/);
 await page.locator('.answer').first().click();
 await expect(page.locator('.feedback')).toBeVisible();
 await expect(page.locator('.nexo-premium-photo')).toBeVisible();
});
test('imagens e questionários continuam responsivos nas séries iniciais e finais',async({page})=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 for(const year of ['1','9']){
  await page.locator('#grade-select').selectOption(year);
  await page.locator('.subject').first().click();await page.locator('.topic').first().click();
  await expect(page.getByRole('button',{name:/Estudar conteúdo/})).toHaveCount(0);
  await page.getByRole('button',{name:'Começar questionário →'}).first().click();
  await expect(page.locator('.nexo-premium-photo img')).toHaveAttribute('alt',/.+/);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3)).toBe(false);
  await page.getByRole('button',{name:/Sair do desafio/}).click();
  if(year==='1')await page.getByRole('button',{name:'Trocar ano'}).click();
 }
});
