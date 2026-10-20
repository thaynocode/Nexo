(function(){'use strict';const reasons={
  "convite": "O convite chama alguém para um evento e informa quando e onde ele acontece.",
  "receita": "A receita orienta o preparo de um alimento, com ingredientes e etapas.",
  "reportagem": "A reportagem aprofunda um tema por meio de investigação, dados, entrevistas e diferentes fontes.",
  "bilhete": "O bilhete transmite uma mensagem breve e direta a uma pessoa.",
  "noticia": "A notícia informa um fato recente de interesse do público, indicando o que aconteceu.",
  "fabula": "A fábula narra uma história, muitas vezes com animais, e apresenta um ensinamento ou moral.",
  "entrevista": "A entrevista apresenta uma conversa organizada em perguntas e respostas.",
  "poema": "O poema explora a linguagem expressiva e pode se organizar em versos e estrofes.",
  "conto": "O conto apresenta uma narrativa geralmente curta, com personagens e acontecimentos.",
  "verbete": "O verbete apresenta informações e definições sobre uma palavra ou um assunto.",
  "anuncio": "O anúncio divulga produtos, serviços ou ideias e procura persuadir seu público.",
  "manual": "O manual orienta o uso de algo por meio de instruções e procedimentos.",
  "cronica": "A crônica parte de acontecimentos do cotidiano para narrar ou refletir sobre eles.",
  "editorial": "O editorial expressa a posição do veículo de comunicação sobre um assunto.",
  "diario": "O diário registra acontecimentos, sentimentos e experiências pessoais.",
  "carta": "A carta estabelece uma comunicação escrita com um destinatário e pode incluir saudação e despedida."
};
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.NEXO_OPTION_EXPLANATION=function(value){const key=String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(),reason=reasons[key];return reason?'<div class="answer-example"><strong>Observe o exemplo de '+escape(value)+'</strong><p>'+escape(reason)+'</p></div>':'';};})();
