const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),catalog=require('./catalog.json'),alignments=require('./alignments.cjs'),{practice}=require('./practices.cjs');
const context={window:{}};vm.runInNewContext(fs.readFileSync(root+'/public/grade-bank.js','utf8'),context);
const grades=context.window.NEXO_GRADES,byCode=new Map(catalog.skills.map(s=>[s.code,s]));
const links=alignments.map(([year,subject,topic,codes,limit])=>{
 const t=grades[year]?.[subject]?.topics[topic];if(!t)throw Error('Trilha inexistente');
 for(const code of codes)if(!byCode.get(code)?.years.includes(year))throw Error('Ano incorreto: '+code);
 return {year,subject,topic,codes,limit,name:t.name,component:grades[year][subject].name};
});
const skills=catalog.skills.map(s=>({...s,practice:practice(s),support:links.filter(l=>l.codes.includes(s.code))}));
const data={version:catalog.version,sources:catalog.sources,skills};
fs.writeFileSync(root+'/public/bncc-catalog.json',JSON.stringify(data)+'\n');
const csvCell=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
const rows=[['codigo','componente','anos','organizacao','objetivo_oficial','pagina_impressa','pagina_pdf','fonte','tipo_de_proposta','apoio_parcial_no_quiz','lacuna']];
for(const s of skills)rows.push([s.code,s.component,s.years.join(';'),s.organization,s.description,s.page,s.pdfPage,catalog.sources.find(x=>x.id===s.source).url,s.practice.kind,s.support.map(l=>`${l.year}:${l.subject}-${l.topic} ${l.name}`).join('; '),s.practice.kind==='roteiro-mediado'?'Planejar situação e recursos específicos com professor; cobertura pedagógica integral não validada.':'Atividade específica disponível; validar evidências com professor.']);
fs.writeFileSync(root+'/public/bncc-mapping.csv','\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\n')+'\n');
console.log(`BNCC: ${skills.length} códigos, ${links.length} vínculos parciais, ${skills.filter(s=>s.practice.kind==='atividade-especifica').length} atividades específicas.`);
