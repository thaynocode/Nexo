const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const sharp=require('sharp');
const ctx={window:{},console};
vm.createContext(ctx);
for(const f of ['lessons.js','visual-specs.js','concept-diagrams.js']){
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../public',f),'utf8'),ctx,{filename:f});
}
const lessons=ctx.window.NEXO_LESSONS;
const output=path.join(__dirname,'../public/images/lessons');
fs.mkdirSync(output,{recursive:true});
(async()=>{
 let total=0;
 for(let s=0;s<lessons.length;s++){
  for(let t=0;t<lessons[s].length;t++){
   const diagram=ctx.window.NEXO_CONCEPT_DIAGRAM(s,t,lessons[s][t]);
   if(!diagram?.src)throw Error('Missing image '+s+':'+t);
   const svg=decodeURIComponent(diagram.src.split(',')[1]);
   const target=path.join(output,String(s+1).padStart(2,'0')+'-'+String(t+1).padStart(2,'0')+'.webp');
   await sharp(Buffer.from(svg)).resize(1280,720,{fit:'contain',background:'#101d34'}).webp({quality:88,effort:5}).toFile(target);
   total++;
  }
 }
 if(total!==77)throw Error('Expected 77 images, got '+total);
 console.log('Generated '+total+' WEBP lesson images');
})().catch(e=>{console.error(e);process.exit(1)});
