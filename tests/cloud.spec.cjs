const {test,expect}=require('@playwright/test');
test('login simulado, sincronização e exclusão segura em falha',async({page})=>{
 const requests=[];
 await page.route('https://mmhcyvryxcqvirklrxky.supabase.co/**',async route=>{
  const req=route.request(),url=req.url();requests.push(req.method()+' '+url);
  if(url.includes('/auth/v1/token'))return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({access_token:'fake-test-token',refresh_token:'fake-test-refresh',expires_in:3600,user:{id:'00000000-0000-4000-8000-000000000001',email:'teste@example.invalid'}})});
  if(url.includes('/rest/v1/learning_progress')&&req.method()==='GET')return route.fulfill({status:200,contentType:'application/json',body:'[]'});
  if(url.includes('/rest/v1/learning_progress')&&req.method()==='DELETE')return route.fulfill({status:503,contentType:'application/json',body:'{"message":"Offline simulado"}'});
  return route.fulfill({status:201,contentType:'application/json',body:'{}'});
 });
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:/Entrar \/ Criar conta/}).click();
 await page.locator('#cloud-email').fill('teste@example.invalid');
 await page.locator('#cloud-pass').fill('senha-de-teste');
 await page.locator('#cloud-in').click();
 await expect(page.getByText(/Progresso na nuvem/)).toBeVisible();
 expect(requests.some(x=>x.includes('/auth/v1/token'))).toBe(true);
 expect(requests.some(x=>x.includes('/rest/v1/learning_progress'))).toBe(true);
 await page.evaluate(()=>{state.xp=24;save()});
 await page.getByRole('button',{name:/Ver análise de aprendizagem/}).click();
 page.on('dialog',dialog=>dialog.accept().catch(()=>{}));
 await page.getByRole('button',{name:/Apagar meu progresso/}).click();
 const xp=await page.evaluate(()=>state.xp);
 expect(xp).toBe(24);
});
