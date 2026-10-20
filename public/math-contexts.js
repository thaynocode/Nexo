(function(){
'use strict';
window.NEXO_CONTEXTUALIZE_MATH=function(q,t){
 if(q.sourcePrompt)return;q.sourcePrompt=q.q;
 const percent=q.q.match(/^Quanto é (\d+)% de (\d+)\?$/),expr=q.q.match(/^Quanto é (\d+) \+ (\d+) × (\d+)\?$/),part=q.q.match(/^Quanto é (\d+)\/(\d+) de (\d+)\?$/),decimal=q.q.match(/^Quanto é (\d+,\d+) ([+−]) (\d+,\d+)\?$/);
 if(percent){q.q=`Uma feira reuniu ${percent[2]} maçãs e vai separar ${percent[1]}% dessa coleção para uma atividade. Quantas maçãs serão separadas?`;q.explanation=`Separe ${percent[1]} partes a cada 100 maçãs: ${percent[2]} × ${percent[1]} ÷ 100 = ${q.opts[q.answer]}. Essa é a quantidade de maçãs separadas.`;}
 else if(expr){q.q=`Uma feira tem ${expr[1]} laranjas avulsas e ${expr[2]} caixas com ${expr[3]} laranjas em cada caixa. Quantas laranjas há ao todo?`;q.explanation=`Primeiro conte as laranjas das caixas: ${expr[2]} × ${expr[3]} = ${+expr[2]*+expr[3]}. Depois acrescente as avulsas: ${expr[1]} + ${+expr[2]*+expr[3]} = ${q.opts[q.answer]} laranjas.`;}
 else if(part){q.q=`Uma caixa tem ${part[3]} maçãs. Uma turma vai usar ${part[1]}/${part[2]} dessas maçãs em uma receita. Quantas maçãs serão usadas?`;q.explanation=`Divida ${part[3]} maçãs em ${part[2]} partes iguais e use ${part[1]} dessas partes: ${part[3]} ÷ ${part[2]} × ${part[1]} = ${q.opts[q.answer]} maçãs.`;}
 else if(decimal){q.q=decimal[2]==='+'?`Uma pessoa comprou uma porção de laranjas por R$ ${decimal[1]} e outra por R$ ${decimal[3]}. Quanto gastou ao todo?`:`Uma pessoa tinha R$ ${decimal[1]} e gastou R$ ${decimal[3]} em laranjas na feira. Quanto dinheiro sobrou?`;q.explanation=`${decimal[1]} ${decimal[2]} ${decimal[3]} = R$ ${q.opts[q.answer]}. Alinhe as casas decimais ao calcular os valores da compra.`;}
};
})();
