// Formatos de avaliação. As relações usadas nas alternativas são verificáveis
// a partir dos itens de origem; não cria fatos nem explicações por negação automática.
module.exports=function assess(base,level,grade){
 if(level===1)return base.map((q,i)=>{
  const correct=q.opts[q.answer];
  const wrong=q.opts.filter((_,j)=>j!==q.answer);
  return {q:`${q.q}\n${grade<=2?'Escolha a resposta com a explicação que combina.':'Escolha a resposta acompanhada de uma justificativa adequada ao enunciado.'}`,
   opts:[`${correct}\n${q.explanation}`,...wrong.map((text,j)=>`${text}\n${base[(i+j+1)%base.length].explanation}`)],answer:0,
   explanation:q.explanation,skill:'Relacionar resposta e justificativa',format:'reasoning',sourceItems:[i]};
 });
 // Julgar respostas propostas exige verificar cada conclusão; o gabarito não
 // fica sempre na mesma posição e não depende de uma alternativa “mais longa”.
 const count=grade<=2?2:3;
 const masks=count===2?[0,1,2,3]:[1,2,4,3,5,6,7,0];
 function label(mask){const yes=Array.from({length:count},(_,i)=>i+1).filter((_,i)=>mask&(1<<i));if(!yes.length)return 'Nenhuma resposta está correta.';if(yes.length===count)return 'Todas as respostas estão corretas.';return `Apenas ${yes.length===1?'a resposta':'as respostas'} ${yes.join(' e ')} ${yes.length===1?'está correta.':'estão corretas.'}`;}
 return base.map((_,i)=>{
  const ids=Array.from({length:count},(_,j)=>(i+j)%base.length),mask=masks[i%masks.length];
  const claims=ids.map((n,j)=>{const q=base[n],valid=!!(mask&(1<<j)),wrong=q.opts.filter((_,k)=>k!==q.answer);return {item:q,valid,response:valid?q.opts[q.answer]:wrong[(i+j)%wrong.length]};});
  const alternatives=count===2?[0,1,2,3]:[mask,...masks.filter(m=>m!==mask).slice(i%4,i%4+3)];
  if(alternatives.length!==4)throw Error('Alternativas insuficientes na análise');
  const explanations=claims.map(({item:q,valid,response},j)=>`${j+1}) A resposta “${response}” ${valid?'está correta':'precisa ser corrigida para “'+q.opts[q.answer]+'”'}. ${q.explanation}`);
  return {q:`${grade<=2?'Confira as respostas abaixo.':'Uma atividade foi resolvida com as respostas abaixo. Confira cada uma usando o conteúdo estudado.'}\n${claims.map(({item:q,response},j)=>`${j+1}) ${q.q}\nResposta apresentada: ${response}`).join('\n\n')}\nQuais respostas estão corretas?`,opts:alternatives.map(label),answer:alternatives.indexOf(mask),explanation:explanations.join('\n\n'),skill:'Avaliar respostas e identificar erros',format:'analysis',sourceItems:ids,proposedAnswers:claims.map(c=>c.response)};
 });
};
