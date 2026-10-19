(function () {
  'use strict';
  const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  // Exemplos autorais: o desenho e o texto representam o gênero, não a resposta da questão.
  const examples = {
    convite: {kind:'invite',lines:['VOCÊ ESTÁ CONVIDADO!','Feira de Ciências','Sábado • 10h','Pátio da escola'],description:'Convite para a Feira de Ciências, com dia, horário e local.',reason:'O convite chama alguém para um evento e informa quando e onde ele acontece.'},
    receita: {kind:'recipe',lines:['SALADA DE FRUTAS','Ingredientes','1 banana • 1 maçã','Modo de preparo','1. Lave e corte as frutas.','2. Misture e sirva.'],description:'Receita de salada de frutas com ingredientes e modo de preparo em etapas.',reason:'A receita orienta o preparo de um alimento, com ingredientes e etapas.'},
    reportagem: {kind:'report',lines:['ESPECIAL • MEIO AMBIENTE','De onde vem nossa água?','Uma investigação sobre o rio','Entrevistas com moradores','Dados e análise de especialistas'],description:'Reportagem sobre a água da cidade, reunindo investigação, entrevistas e dados.',reason:'A reportagem aprofunda um tema por meio de investigação, dados, entrevistas e diferentes fontes.'},
    bilhete: {kind:'note',lines:['Bia,','Deixei seu livro na mesa.','Até amanhã!','Lia'],description:'Bilhete de Lia para Bia avisando que deixou um livro na mesa.',reason:'O bilhete transmite uma mensagem breve e direta a uma pessoa.'},
    noticia: {kind:'news',lines:['JORNAL DA ESCOLA','Biblioteca abre nesta segunda','A escola inaugurou hoje','uma nova sala de leitura.'],description:'Notícia que informa a abertura da biblioteca nesta segunda-feira.',reason:'A notícia informa um fato recente de interesse do público, indicando o que aconteceu.'},
    fabula: {kind:'story',lines:['A RAPOSA E AS UVAS','A raposa não alcançou as uvas.','Então disse: estão verdes!','Moral: é fácil desprezar','o que não conseguimos obter.'],description:'Fábula da raposa e das uvas com uma lição ao final.',reason:'A fábula narra uma história, muitas vezes com animais, e apresenta um ensinamento ou moral.'},
    entrevista: {kind:'interview',lines:['CONVERSA COM A CIENTISTA','Pergunta: O que você pesquisa?','Resposta: A água dos rios.','Pergunta: Como faz isso?','Resposta: Coleto amostras.'],description:'Entrevista com uma cientista organizada em perguntas e respostas.',reason:'A entrevista apresenta uma conversa organizada em perguntas e respostas.'},
    poema: {kind:'poem',lines:['CHUVA NA JANELA','A gota toca o vidro,','o vento vem cantar.','No ritmo da chuva,','eu paro para escutar.'],description:'Poema com versos distribuídos em linhas e linguagem expressiva.',reason:'O poema explora a linguagem expressiva e pode se organizar em versos e estrofes.'},
    conto: {kind:'story',lines:['A CHAVE MISTERIOSA','Ao abrir a gaveta, Nina','encontrou uma chave dourada.','Que porta ela abriria?','A aventura começava ali.'],description:'Início de um conto sobre Nina e uma chave misteriosa.',reason:'O conto apresenta uma narrativa geralmente curta, com personagens e acontecimentos.'},
    verbete: {kind:'dictionary',lines:['DICIONÁRIO','rio','substantivo masculino','Curso natural de água','que segue por um leito.'],description:'Verbete de dicionário que apresenta a palavra rio, sua classe e definição.',reason:'O verbete apresenta informações e definições sobre uma palavra ou um assunto.'},
    anuncio: {kind:'advert',lines:['FEIRA DO LIVRO','Descubra sua próxima aventura!','Livros para todos os gostos','Venha conhecer!'],description:'Anúncio de uma feira do livro com uma chamada persuasiva.',reason:'O anúncio divulga produtos, serviços ou ideias e procura persuadir seu público.'},
    manual: {kind:'recipe',lines:['COMO USAR O MICROSCÓPIO','1. Apoie-o sobre a mesa.','2. Coloque a lâmina.','3. Ajuste o foco com cuidado.'],description:'Manual com instruções numeradas para usar um microscópio.',reason:'O manual orienta o uso de algo por meio de instruções e procedimentos.'},
    cronica: {kind:'story',lines:['O ÔNIBUS ATRASADO','Naquela manhã, todos','olhavam para o relógio.','O atraso virou uma conversa','entre desconhecidos.'],description:'Crônica que parte de uma cena do cotidiano em um ponto de ônibus.',reason:'A crônica parte de acontecimentos do cotidiano para narrar ou refletir sobre eles.'},
    editorial: {kind:'news',lines:['OPINIÃO DO JORNAL','Mais espaços para ler','Nossa escola precisa investir','em ambientes de leitura.','Esse é o compromisso do jornal.'],description:'Editorial que expressa a posição de um jornal sobre espaços de leitura.',reason:'O editorial expressa a posição do veículo de comunicação sobre um assunto.'},
    diario: {kind:'note',lines:['SEGUNDA-FEIRA, 12 DE MAIO','Querido diário,','Hoje apresentei meu trabalho.','Fiquei nervosa, mas consegui!'],description:'Página de diário com data e relato pessoal de sentimentos e acontecimentos.',reason:'O diário registra acontecimentos, sentimentos e experiências pessoais.'},
    carta: {kind:'note',lines:['Recife, 12 de maio','Querida avó,','Estou com saudades!','Como foi sua viagem?','Com carinho, Ana'],description:'Carta de Ana para a avó com local, data, saudação e despedida.',reason:'A carta estabelece uma comunicação escrita com um destinatário e pode incluir saudação e despedida.'}
  };
  function example(value) { return examples[normalize(value)]; }
  function drawing(value) {
    const item=example(value);if(!item)return '';
    const ink='#253451',muted='#54647b';
    let art='<rect x="10" y="8" width="300" height="210" rx="12" fill="#fff9ed" stroke="#d5c7ad" stroke-width="2"/>';
    if(item.kind==='invite') art+='<path d="M28 24l18 5-9 15zm242 4l18-7-4 20z" fill="#9571d1"/><circle cx="282" cy="188" r="12" fill="#f4c66c"/><circle cx="37" cy="180" r="9" fill="#76bfb0"/>';
    if(item.kind==='recipe') art+='<rect x="10" y="8" width="15" height="210" rx="5" fill="#78bfae"/>';
    if(item.kind==='note') art+='<path d="M260 8h50v44z" fill="#eadbad"/><rect x="126" y="4" width="70" height="14" rx="3" fill="#c5b2df"/>';
    if(['report','news'].includes(item.kind)) art+='<path d="M28 48h264M28 52h264" stroke="#536779"/><rect x="28" y="163" width="65" height="35" rx="3" fill="#b7d5d1"/><path d="M30 194l20-20 15 12 12-8 14 16" fill="#689b8e"/><path d="M107 172h180m-180 10h172m-172 10h180" stroke="#a6a294" stroke-width="3"/>';
    if(item.kind==='dictionary') art+='<rect x="10" y="8" width="11" height="210" fill="#9774bb"/>';
    if(item.kind==='advert') art+='<rect x="22" y="19" width="276" height="40" rx="8" fill="#f4d184"/><path d="M60 167l25-12 25 12v30l-25-12-25 12zm50 0l25-12 25 12v30l-25-12-25 12z" fill="#81b3b3"/>';
    const compact=item.lines.length>5;
    item.lines.forEach((line,i)=>{
      const y=i===0?35:68+(i-1)*(compact?24:27);
      art+=`<text x="${item.kind==='invite'||item.kind==='poem'?'160':'32'}" y="${y}" text-anchor="${item.kind==='invite'||item.kind==='poem'?'middle':'start'}" font-family="system-ui,sans-serif" font-size="${i===0?13:12}" font-weight="${i<2?'700':'400'}" fill="${i===0?ink:muted}">${esc(line)}</text>`;
    });
    return `<svg viewBox="0 0 320 226" role="img" aria-label="${esc(item.description)}" xmlns="http://www.w3.org/2000/svg">${art}</svg>`;
  }
  window.NEXO_OPTION_VISUAL = value => {const svg=drawing(value);return svg?`<span class="option-visual">${svg}</span>`:'';};
  window.NEXO_PROBLEM_VISUAL = function(question,solved=false) {
    const v=question.visual;if(v?.type!=='orange-operation')return '';
    const labels=[...v.labels];
    if(solved)labels[2]=labels[2].replace('?',v.answer);
    const orange='<circle cx="0" cy="0" r="22" fill="#f4a238" stroke="#ffd18a" stroke-width="2"/><path d="M0-22q8-17 23-10q-4 15-23 10" fill="#89c787"/><path d="M-9-9q-6 5-6 14" fill="none" stroke="#ffe0a2" stroke-width="3"/>';
    const cards=labels.map((label,i)=>{
      let art;
      if((v.op==='×'&&i===0)||(v.op==='÷'&&i===1))art='<path d="M10 24h60l-6 38h-48z" fill="#b69066" stroke="#e2c392" stroke-width="3"/><path d="M18 20q22-30 44 0" fill="none" stroke="#e2c392" stroke-width="4"/>';
      else if(i<2)art=`<g transform="translate(40 43)">${orange}</g>`;
      else art=`<text x="40" y="54" text-anchor="middle" font-family="system-ui,sans-serif" font-size="36" fill="#c3f1d3">${solved?esc(v.answer):'?'}</text>`;
      return `<div class="problem-card"><svg viewBox="0 0 80 80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${art}</svg><strong>${esc(label)}</strong></div>`;
    }).join('');
    return `<figure class="problem-visual"><div class="problem-cards">${cards}</div><figcaption>Leia a quantidade indicada em cada cartão. O desenho da laranja identifica o objeto contado.</figcaption></figure>`;
  };
  window.NEXO_OPTION_EXPLANATION = value => {const item=example(value);return item?`<div class="answer-example"><strong>Observe este exemplo de ${esc(value)}</strong>${drawing(value)}<p>${esc(item.reason)}</p></div>`:'';};
  window.NEXO_GENRE_GALLERY = () => `<section class="panel genre-gallery"><h2>Compare os gêneros na prática</h2><p>Observe a organização e a finalidade de cada exemplo.</p><div>${['Convite','Receita','Reportagem','Bilhete','Notícia','Fábula','Entrevista','Poema','Conto','Verbete'].map(value=>`<figure><figcaption>${esc(value)}</figcaption>${drawing(value)}<p>${esc(example(value).reason)}</p></figure>`).join('')}</div></section>`;
})();
