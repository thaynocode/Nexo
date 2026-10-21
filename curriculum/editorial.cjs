// Correções editoriais com referência explícita aos índices estáveis de cada trilha.
module.exports=({grades})=>{
const patch=(g,s,t,i,changes)=>Object.assign(grades[g].find(v=>v.name===s).topics[t].questions[i],changes);
patch(6,'Ciências',3,1,{q:'Nas células eucarióticas, qual estrutura abriga a maior parte do DNA e participa do controle de muitas atividades celulares?'});
patch(6,'Ciências',3,3,{q:'Qual organela participa da respiração celular, disponibilizando energia para as atividades da célula?'});
patch(6,'Ciências',3,4,{q:'Qual organela realiza fotossíntese nas células vegetais fotossintéticas?'});
patch(6,'História',6,6,{q:'Qual conselho formado por membros da elite teve grande influência política durante a República Romana?'});
patch(6,'História',1,5,{q:'Qual ambiente favoreceu a agricultura em sociedades como o Egito Antigo e as cidades da Mesopotâmia?'});
patch(6,'Geografia',6,0,{q:'Em qual forma de relevo predominam processos de desgaste em relação à deposição de sedimentos?'});
patch(6,'Geografia',7,0,{q:'Qual fonte de energia é considerada renovável por seu fluxo se recompor na escala de tempo humana?'});
patch(6,'Educação Física',1,0,{q:'Ao atravessar uma linha desenhada no chão, uma criança mantém a postura sem cair. Qual capacidade está sendo mobilizada?'});
patch(6,'Educação Física',7,9,{q:'Qual modalidade de invasão é jogada em quadra, com cinco jogadores por equipe e uso predominante dos pés para buscar o gol?'});
patch(6,'Português',8,5,{q:'Leia: “Ela abriu um sorriso e comemorou ao receber a notícia”. Que sentimento as duas ações sugerem?'});
patch(6,'Português',10,2,{q:'Uma carta formal foi escrita para a direção da escola. A quem o texto é dirigido?',explanation:'A direção da escola é o destinatário definido dessa carta. O objetivo e a relação com quem recebe orientam o registro formal.'});
const texts=[
'A biblioteca tinha 48 livros de contos e recebeu mais 27. Quantos livros de contos tem agora?',
'Uma turma reuniu 93 tampinhas e usou 46 em um trabalho. Quantas sobraram?',
'Há 12 caixas com 8 lápis em cada. Quantos lápis há no total?',
'144 cartões foram repartidos igualmente em 12 envelopes. Quantos cartões ficaram em cada envelope?',
'Quatro grupos receberam 25 folhas cada. Quantas folhas foram distribuídas?',
'360 figurinhas foram repartidas igualmente entre 9 crianças. Quantas cada uma recebeu?',
'Uma campanha recebeu 125 livros na primeira semana e 375 na segunda. Quantos recebeu ao todo?',
'Um depósito tinha 700 cadernos e enviou 258 às escolas. Quantos ficaram no depósito?',
'Uma sala tem 15 mesas com 6 lugares cada. Quantos lugares há?',
'81 sementes foram repartidas igualmente em 3 canteiros. Quantas ficaram em cada canteiro?'];
texts.forEach((q,i)=>patch(6,'Matemática',0,i,{q}));
patch(1,'Artes',0,7,{q:'Uma música tem um momento em que ninguém toca nem canta. Como chamamos essa ausência de som?'});
patch(2,'Português',0,5,{q:'Complete a frase: “Tenho um lápis. Agora tenho dois ___”.',explanation:'A forma lápis é a mesma no singular e no plural. As palavras um e dois ajudam a identificar a quantidade.'});
patch(6,'Educação Física',5,2,{q:'Ao empurrar um objeto com resistência, os músculos produzem tensão para movê-lo. Qual capacidade física está em destaque?'});
patch(8,'Inglês',0,0,{q:'Complete a frase afirmativa com o auxiliar de futuro: “I ___ visit my grandmother tomorrow”.',opts:['will','wills','will to','willing'],answer:0});
patch(9,'Inglês',0,0,{q:'Complete a previsão no primeiro condicional: “If it rains, we ___ stay home”.',opts:['will','wills','will to','willing'],answer:0});
patch(9,'História',1,3,{q:'Qual ideologia racista e totalitária fundamentou o regime liderado por Hitler na Alemanha?'});
};
