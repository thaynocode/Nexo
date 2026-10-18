const {test,expect}=require('@playwright/test');
const devices=[{name:'Android 360',width:360,height:800},{name:'iPhone 390',width:390,height:844},{name:'Tablet 768',width:768,height:1024}];
for(const device of devices){
 test.describe(device.name,()=>{
  test.use({viewport:{width:device.width,height:device.height},isMobile:true,hasTouch:true});
  test('navegação, estudo, imagem e quiz',async({page})=>{
   const errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
   await expect(page.getByText('NEXO',{exact:false}).first()).toBeVisible();
   await page.locator('.subject-card, .subject').first().click();
   await page.locator('.topic').first().click();
   await page.getByRole('button',{name:/Estudar este conteúdo/}).click();
   await expect(page.getByText('EXPLICAÇÃO DA PROFESSORA')).toBeVisible();
   await expect(page.locator('figure img')).toHaveAttribute('src',/^data:image\/svg\+xml/);
   await page.locator('.panel button.primary:enabled').last().click();
   await expect(page.locator('.answer')).toHaveCount(4);
   await page.locator('.answer').first().click();
   await expect(page.locator('.feedback')).toBeVisible();
   expect(errors).toEqual([]);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3);
   expect(overflow,'Rolagem horizontal inesperada').toBe(false);
  });
 });
}
