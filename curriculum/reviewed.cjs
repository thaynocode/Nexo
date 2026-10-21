// Bancos contextualizados: decisão, justificativa e avaliação de uma conclusão.
// Estes itens dão apoio conceitual; não certificam prática, crença pessoal ou habilidade integral.
module.exports=function({grades,catalog}){
 function bank(g,subject,title,rows){
  const group=grades[g].find(s=>s.name===subject);if(!group)throw Error('Componente ausente '+subject);
  const make=(r,l,i)=>{const [code,scene,prompt,correct,wrongs,reason,reasonWrongs]=r;
   const skill=catalog.skills[code];if(!skill||!skill.years.includes(g))throw Error('Vínculo inválido '+g+' '+code);
   const q=l===0?`${scene}\n${prompt}`:l===1?`${scene}\nA resposta proposta é: “${correct}”. Qual justificativa a sustenta?`:`${scene}\nUma conclusão foi: “${wrongs[0]}”. Qual análise corrige essa conclusão?`;
   const opts=l===0?[correct,...wrongs]:[reason,...reasonWrongs];
   return {id:`bncc-${g}-${code}-${title}-${i}-${l}`,q,opts,answer:0,explanation:reason,bncc:[code],evidence:'conceptual',review:'editorial',alignmentReason:`O item pede ${l===0?'uma decisão ou interpretação':l===1?'uma justificativa':'a avaliação de uma conclusão'} sobre a situação apresentada, como apoio conceitual à habilidade ${code}. Não comprova sua realização integral.`};
  };
  if(rows.length!==10)throw Error('São necessários dez cenários: '+title);
  const topic={id:`bncc-${g}-${subject}-${title}`,name:title,questions:rows.map((r,i)=>make(r,0,i)),advanced:{1:rows.map((r,i)=>make(r,1,i)),2:rows.map((r,i)=>make(r,2,i))},review:'editorial'};
  group.topics.push(topic);
 }
 return {bank};
};
