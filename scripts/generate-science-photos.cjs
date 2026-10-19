const fs=require('node:fs');
const path=require('node:path');
const sharp=require('sharp');
const vm=require('node:vm');
const ctx={window:{}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/lessons.js'),'utf8'),ctx);
const lessons=ctx.window.NEXO_LESSONS;
const science=lessons[2];
const api='https://commons.wikimedia.org/w/api.php';
const headers={'User-Agent':'NEXO6Education/1.0 (noncommercial educational Wikimedia attribution)','Accept':'application/json'};
const out=path.join(__dirname,'../public/images/concepts');
fs.mkdirSync(out,{recursive:true});
const credits=[];
const searchTerms={
'célula':'animal cell microscope','tecido':'muscle tissue histology microscope','órgão':'human heart anatomy specimen',
'sistema':'human nervous system anatomy','mistura':'salt water glass photograph','rocha':'granite rock photograph',
'fóssil':'fossil ammonite museum','terra':'planet Earth NASA photograph','sol':'Sun NASA solar observatory',
'ecossistema':'forest ecosystem nature photograph','ambiente':'tropical rainforest wildlife',
'corpo':'human anatomy skeleton museum','sentido':'human eye macro photography',
'neurônio':'neuron microscopy','músculo':'skeletal muscle anatomy specimen',
'osso':'human skeleton bone museum','lua':'moon NASA photograph','água':'water river landscape',
'planeta':'planet Earth NASA photograph','movimento':'earth orbit space NASA'
};
function termFor(x,lesson){const q=(x||'').toLocaleLowerCase('pt-BR');for(const [k,v] of Object.entries(searchTerms))if(q.includes(k))return v;return lesson.title+' science photograph';}
async function photo(query){
 const p=new URLSearchParams({action:'query',generator:'search',gsrsearch:'filetype:bitmap '+query,gsrnamespace:'6',gsrlimit:'15',prop:'imageinfo',iiprop:'url|mime|extmetadata',iiurlwidth:'950',format:'json'});
 const res=await fetch(api+'?'+p,{headers,signal:AbortSignal.timeout(18000)});
 if(!res.ok)throw Error('Wikimedia '+res.status);
 const data=await res.json();
 const pages=Object.values(data.query?.pages||{});
 for(const page of pages){
  const info=page.imageinfo?.[0];
  if(!info||!/^image\/(jpeg|png|webp)$/.test(info.mime||''))continue;
  if(/diagram|drawing|illustration|icon|logo|cartoon|map|graph/i.test(page.title))continue;
  const license=info.extmetadata?.LicenseShortName?.value||'';
  if(!/CC|Public domain|PD-|PDM/i.test(license))continue;
  try{
   const rr=await fetch(info.thumburl||info.url,{headers,signal:AbortSignal.timeout(15000)});
   if(!rr.ok)continue;
   const buf=Buffer.from(await rr.arrayBuffer());
   const meta=await sharp(buf).metadata();
   if(meta.width<420||meta.height<280)continue;
   return {buf,source:info.descriptionurl,title:page.title,license,artist:info.extmetadata?.Artist?.value||''};
  }catch(e){console.warn('Skipped',page.title,e.message)}
 }
 return null;
}
(async()=>{
 let saved=0;
 for(let t=0;t<science.length;t++){
  const lesson=science[t];
  const concepts=lesson.contextExamples||[];
  for(let i=0;i<concepts.length;i++){
   const q=termFor(concepts[i].concept,lesson);
   try{
    const image=await photo(q);
    if(!image){console.warn('No photo',t,i,q);continue;}
    const filename='03-'+String(t+1).padStart(2,'0')+'-'+String(i+1).padStart(2,'0')+'.webp';
    await sharp(image.buf).resize(900,600,{fit:'cover',position:'attention'}).webp({quality:83}).toFile(path.join(out,filename));
    credits.push({filename,concept:concepts[i].concept,source:image.source,license:image.license,artist:image.artist});
    saved++;
   }catch(e){console.warn('Failed',t,i,q,e.message)}
  }
 }
 fs.writeFileSync(path.join(out,'science-credits.json'),JSON.stringify(credits,null,2));
 console.log('Saved',saved,'science concept photos');
 if(saved<5)throw Error('Too few science photographs; check Wikimedia network and search terms');
})().catch(e=>{console.error(e);process.exit(1)});
