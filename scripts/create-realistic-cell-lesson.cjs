const fs=require('node:fs');
const path=require('node:path');
const sharp=require('sharp');
const target=path.join(__dirname,'../public/images/lessons/03-02.webp');
const queries=['animal cell microscope histology','skeletal muscle tissue microscope','human heart anatomy'];
const api='https://commons.wikimedia.org/w/api.php';
const headers={'User-Agent':'NEXO6-Educational/1.0 (educational visual materials)','Accept':'application/json'};
async function findPhoto(query){
 const p=new URLSearchParams({action:'query',generator:'search',gsrsearch:'filetype:bitmap '+query,gsrnamespace:'6',gsrlimit:'12',prop:'imageinfo',iiprop:'url|mime|extmetadata',iiurlwidth:'1200',format:'json',origin:'*'});
 const response=await fetch(api+'?'+p,{headers});
 if(!response.ok)throw Error('Wikimedia search '+response.status);
 const data=await response.json();
 const pages=Object.values(data.query?.pages||{});
 for(const page of pages){
  const ii=page.imageinfo?.[0];
  const mime=ii?.mime||'';
  const url=ii?.thumburl||ii?.url;
  if(!url||!/^image\/(jpeg|png|webp)$/.test(mime))continue;
  if(/\.svg|icon|diagram|cartoon|illustration|drawing|logo/i.test(page.title))continue;
  try{
   const img=await fetch(url,{headers});
   if(!img.ok)continue;
   const buf=Buffer.from(await img.arrayBuffer());
   const meta=await sharp(buf).metadata();
   if(meta.width<400||meta.height<250)continue;
   return {buf,title:page.title,source:ii.descriptionurl,license:ii.extmetadata?.LicenseShortName?.value||'Check Wikimedia Commons',artist:ii.extmetadata?.Artist?.value||''};
  }catch(e){console.warn('Skipped image',page.title,e.message)}
 }
 throw Error('No suitable photograph for '+query);
}
(async()=>{
 const selected=[];
 for(const q of queries)selected.push(await findPhoto(q));
 const tileWidth=600,tileHeight=380;
 const tiles=await Promise.all(selected.map(async (im,i)=>{
  const buf=await sharp(im.buf).resize(tileWidth,tileHeight,{fit:'cover',position:'attention'}).png().toBuffer();
  return {input:buf,left:i===0?0:600,top:i===2?380:0};
 }));
 const first=await sharp(selected[0].buf).resize(1200,760,{fit:'cover'}).png().toBuffer();
 // Two-column photographic teaching board: microscopy / muscle tissue / heart
 const muscle=await sharp(selected[1].buf).resize(600,380,{fit:'cover'}).png().toBuffer();
 const heart=await sharp(selected[2].buf).resize(600,380,{fit:'cover'}).png().toBuffer();
 const board=await sharp({create:{width:1200,height:760,channels:4,background:'#071427'}})
  .composite([{input:first,left:0,top:0},{input:muscle,left:600,top:0},{input:heart,left:600,top:380}])
  .webp({quality:87,effort:5}).toBuffer();
 fs.mkdirSync(path.dirname(target),{recursive:true});
 fs.writeFileSync(target,board);
 fs.writeFileSync(path.join(__dirname,'../public/images/lessons/03-02-credits.json'),JSON.stringify(selected.map(({title,source,license,artist})=>({title,source,license,artist})),null,2));
 console.log('Photographic cell lesson published:',selected.map(x=>x.title));
})().catch(e=>{console.error(e);process.exit(1)});
