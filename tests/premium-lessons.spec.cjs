const {test,expect}=require('@playwright/test');
test('guia de estudo integrado, imagem acessível e ampliação no 6º ano',async({page})=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.locator('#grade-select').selectOption('6');
 await page.locator('.subject').first().click();
 await page.locator('.topic').first().click();
 await expect(page.getByRole('button',{name:/Estudar conteúdo/})).toBeVisible();
 await page.getByRole('button',{name:/Estudar conteúdo/}).click();
 await expect(page.getByRole('heading',{name:/Gêneros textuais/i})).toBeVisible();
 await expect(page.locator('.nexo-study-card').first()).toBeVisible();
 const img=page.locator('[data-nexo-photo] img').first();
 await expect(img).toHaveAttribute('alt',/.+/);
 await expect(img).toHaveAttribute('src',/images\.unsplash\.com/);
 await page.locator('.nexo-photo-zoom').first().click();
 await expect(page.getByRole('dialog',{name:'Imagem ampliada'})).toHaveClass(/open/);
 await page.getByRole('button',{name:/Fechar imagem/}).click();
 await expect(page.getByRole('dialog',{name:'Imagem ampliada'})).not.toHaveClass(/open/);
});
test('guia de revisão gerado sem misturar a aula do 6º ano em outras séries',async({page})=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.locator('#grade-select').selectOption('1');
 await page.locator('.subject').first().click();
 await page.locator('.topic').first().click();
 await page.getByRole('button',{name:/Estudar conteúdo/}).click();
 await expect(page.getByText('REVISÃO GUIADA')).toBeVisible();
 await expect(page.locator('.nexo-study-card').first()).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3)).toBe(false);
});
test('questões mostram ilustração com alternativa acessível',async({page})=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.locator('.subject').first().click();await page.locator('.topic').first().click();
 await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 await expect(page.locator('.nexo-premium-photo img')).toHaveAttribute('alt',/.+/);
 await expect(page.locator('.answer')).toHaveCount(4);
});
