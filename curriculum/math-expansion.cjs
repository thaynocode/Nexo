// Expansão inicial das trilhas matemáticas: 10 desafios distintos por tema.
// Cada questão possui quatro alternativas, resposta única e justificativa.
module.exports=({add})=>{
const wrong=(answer,options)=>options.filter(x=>x!==answer).slice(0,3);
const rows=[];
function addMath(g,name,items){if(items.length!==10)throw Error('Trilha incompleta '+g+' '+name);add(g,'Matemática',name,items.map(([q,a,e,w])=>[q,String(a),e,w.map(String)]));}
addMath(1,'Sequências e padrões',Array.from({length:10},(_,i)=>{
 const a=i+1,d=i%3+1,seq=[a,a+d,a+2*d],next=a+3*d;
 return ['Continue a sequência: '+seq.join(', ')+', __.',next,'A sequência aumenta '+d+' unidade(s) a cada passo.',wrong(String(next),[next+d,next-d,next+2*d,next+1].map(String))];
}));
addMath(2,'Dezenas e unidades',Array.from({length:10},(_,i)=>{
 const tens=i+1,units=(i*3+2)%10,n=tens*10+units;
 return ['Qual número tem '+tens+' dezena(s) e '+units+' unidade(s)?',n,'Cada dezena vale 10; portanto '+tens+' × 10 + '+units+' = '+n+'.',wrong(String(n),[n+10,n+1,n-10,n+2].map(String))];
}));
addMath(3,'Frações no cotidiano',Array.from({length:10},(_,i)=>{
 const d=i%4+2,parts=i%d+1,total=d*(i%3+2),a=parts*(total/d);
 return ['Uma coleção tem '+total+' objetos. Quanto é '+parts+'/'+d+' dessa coleção?',a,'Dividimos '+total+' por '+d+' e multiplicamos por '+parts+': '+a+'.',wrong(String(a),[a+total/d,a-total/d,a+2*total/d,a+1].map(String))];
}));
addMath(4,'Conversão de medidas',Array.from({length:10},(_,i)=>{
 const cm=(i+2)*10,mm=cm*10;
 return ['Quantos milímetros correspondem a '+cm+' centímetros?',mm,'Cada centímetro equivale a 10 milímetros: '+cm+' × 10 = '+mm+'.',wrong(String(mm),[cm,mm+10,mm-10,mm+100].map(String))];
}));
addMath(5,'Porcentagem em situações reais',Array.from({length:10},(_,i)=>{
 const pct=[10,20,25,50,75][i%5],total=[40,60,80,100,120,160,200,240,320,400][i],a=total*pct/100;
 return ['Quanto é '+pct+'% de '+total+'?',a,'Multiplicamos '+total+' por '+pct+' e dividimos por 100: '+a+'.',wrong(String(a),[a+total/10,a+total/20,a+total/4,a+1].map(String))];
}));
addMath(7,'Expressões algébricas',Array.from({length:10},(_,i)=>{
 const x=i+1,k=i%4+2,b=i%5+1,a=k*x+b;
 return ['Se x = '+x+', quanto vale '+k+'x + '+b+'?',a,'Substituímos x por '+x+': '+k+' × '+x+' + '+b+' = '+a+'.',wrong(String(a),[a+k,a-k,a+b,a+1].map(String))];
}));
addMath(8,'Funções e relações entre grandezas',Array.from({length:10},(_,i)=>{
 const x=i+1,m=i%4+2,b=i%3+1,a=m*x+b;
 return ['Na função f(x) = '+m+'x + '+b+', qual é f('+x+')?',a,'Aplicamos a regra da função: '+m+' × '+x+' + '+b+' = '+a+'.',wrong(String(a),[a+m,a-m,a+m+1,a+m+2].map(String))];
}));
addMath(9,'Razões trigonométricas no triângulo retângulo',Array.from({length:10},(_,i)=>{
 const triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,12,15]],t=triples[i%5],scale=i<5?1:2,[op,adj,hyp]=t.map(x=>x*scale),a=op+'/'+hyp;
 return ['Em um triângulo retângulo, em relação ao ângulo indicado, o cateto oposto mede '+op+' e a hipotenusa mede '+hyp+'. Qual é o seno desse ângulo?',a,'Seno = cateto oposto ÷ hipotenusa, logo '+a+'.',wrong(a,[adj+'/'+hyp,op+'/'+adj,hyp+'/'+op,adj+'/'+op])];
}));
};