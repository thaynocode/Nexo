// Formato: código | situação e pergunta | resposta | três distratores separados por ~ | explicação.
// Níveis posteriores confrontam a mesma situação com justificativas e hipóteses.
module.exports=({grades,catalog})=>{
 return function add(g,subject,title,text){
  const rows=text.trim().split('\n').map(line=>line.split('|').map(s=>s.trim()));
  if(rows.length!==10)throw Error(title+': são necessários dez cenários');
  const make=(row,l,i)=>{const [code,prompt,correct,wrongText,reason]=row,wrong=wrongText.split('~');
   const skill=catalog.skills[code];if(!skill||!skill.years.includes(g))throw Error(`${g} ${title}: ${code}`);
   if(wrong.length!==3||!reason)throw Error('Linha incompleta '+prompt);
   const otherReasons=row[5]?row[5].split('~'):rows.filter((_,j)=>j!==i).map(r=>r[4]).filter(r=>r!==reason).slice(0,3);
   if(otherReasons.length!==3)throw Error('Justificativas insuficientes '+prompt);
   let q=prompt,opts=[correct,...wrong];
   if(l===1){q=prompt+`\nA resposta proposta é “${correct}”. Qual explicação a justifica nesta situação?`;opts=[reason,...otherReasons];}
   if(l===2){q=prompt+`\nUma pessoa sugeriu: “${wrong[0]}”. Qual explicação permite corrigir essa hipótese?`;opts=[reason,...otherReasons];}
   return {id:`scenario-${g}-${code}-${title}-${i}-${l}`,q,opts,answer:0,explanation:reason,bncc:[code],evidence:'conceptual',review:'editorial',alignmentReason:`Interpretação de uma situação relacionada a ${code}. A evidência é conceitual e parcial; ações de produção, experimentação ou participação previstas na habilidade exigem outras atividades.`};
  };
  grades[g].find(s=>s.name===subject).topics.push({name:title,review:'editorial',questions:rows.map((r,i)=>make(r,0,i)),advanced:{1:rows.map((r,i)=>make(r,1,i)),2:rows.map((r,i)=>make(r,2,i))}});
 };
};
