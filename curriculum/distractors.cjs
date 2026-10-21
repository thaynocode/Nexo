// Alternativas do mesmo campo semântico para enunciados delimitados.
module.exports=({grades})=>{
 const rules=[
  [/instrumento.*mede.*temperatura/i,['Termômetro','Pluviômetro','Anemômetro','Barômetro']],
  [/instrumento.*mede.*(?:chuva|precipitação)/i,['Pluviômetro','Termômetro','Anemômetro','Barômetro']],
  [/instrumento.*mede.*velocidade.*vento/i,['Anemômetro','Termômetro','Pluviômetro','Barômetro']],
  [/qual.*(?:partícula|particula).*carga.*negativa/i,['Elétron','Próton','Nêutron','Núcleo']],
  [/qual.*partícula.*carga.*positiva/i,['Próton','Elétron','Nêutron','Eletrosfera']],
  [/qual.*partícula.*(?:não possui|sem).*carga/i,['Nêutron','Próton','Elétron','Íon']],
  [/qual.*(?:propriedade|característica|elemento).*som.*(?:grave|agudo)/i,['Altura','Intensidade','Timbre','Duração']],
  [/qual.*(?:característica|elemento).*som.*(?:forte|fraco)/i,['Intensidade','Altura','Duração','Timbre']],
  [/qual.*(?:característica|elemento).*som.*(?:curto|longo)/i,['Duração','Altura','Intensidade','Timbre']],
  [/qual.*(?:característica|elemento).*distinguir.*(?:flauta|violão)|qual.*elemento.*diferencia.*(?:violino|flauta)/i,['Timbre','Altura','Intensidade','Andamento']],
  [/qual.*continente.*(?:origem humana|origem.*human)/i,['África','Europa','Ásia','Oceania']],
  [/qual.*(?:medida|coordenada).*distância angular.*Equador/i,['Latitude','Longitude','Altitude','Escala']],
  [/qual.*(?:medida|coordenada).*distância angular.*Greenwich/i,['Longitude','Latitude','Altitude','Escala']]
 ];
 const norm=s=>s.toLocaleLowerCase('pt-BR');
 for(const [g,ss]of Object.entries(grades))for(const s of ss)for(const t of s.topics)for(const q of t.questions){
  for(const [pattern,opts]of rules)if(pattern.test(q.q)&&norm(q.opts[q.answer])===norm(opts[0])){q.opts=[...opts];q.answer=0;break;}
 }
 // Tempos e flexões: a escolha exige reconhecer a forma, não descartar uma
 // tradução ou um substantivo que nada tem a ver com a pergunta.
 const inflections={went:['go','goes','going'],read:['reads','reading','readed'],played:['play','plays','playing'],were:['was','are','be'],was:['were','is','be'],taller:['tallest','more tall','tall'],better:['best','gooder','good'],worse:['worst','badder','bad'],biggest:['bigger','most big','big']};
 for(const g of [7,8])for(const t of grades[g].find(s=>s.name==='Inglês').topics)for(const q of t.questions){const a=q.opts[q.answer];if(inflections[a]&&/(?:passado|comparativo|superlativo)/i.test(q.q)){q.opts=[a,...inflections[a]];q.answer=0;}}
};
