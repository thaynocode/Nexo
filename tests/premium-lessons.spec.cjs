const {test,expect}=require('@playwright/test');
test('NEXO oferece somente questões e imagens de apoio',async({page})=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.locator('#grade-select').selectOption('6');
 await page.locator('.subject').first().click();
 await page.locator('.topic').first().click();
 await expect(page.getByRole('button',{name:/Estudar conteúdo/})).toHaveCount(0);
 await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 await expect(page.locator('.answer')).toHaveCount(4);
 await expect(page.locator('.nexo-premium-photo img')).toHaveAttribute('alt',/.+/);
 await expect(page.locator('.nexo-premium-photo img')).toHaveAttribute('src',/images\\.unsplash\\.com/);
 await page.locator('.nexo-photo-zoom').first().click();
 await expect(page.getByRole('dialog',{name:'Imagem ampliada'})).toHaveClass(/open/);
 await page.getByRole('button',{name:/Fechar imagem/}).click();
 await expect(page.locator('#nexo-viewer')).not.toHaveClass(/open/);
});
test('NEXO mantém a navegação direta em outras séries',async({page})=>{
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.locator('#grade-select').selectOption('1');
 await page.locator('.subject').first().click();
 await page.locator('.topic').first().click();
 await expect(page.getByRole('button',{name:/Estudar conteúdo/})).toHaveCount(0);
 await page.getByRole('button',{name:'Começar questionário →'}).first().click();
 await expect(page.locator('.answer')).toHaveCount(4);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3)).toBe(false);
});
