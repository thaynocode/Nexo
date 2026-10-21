// Comentários específicos para as 770 questões históricas. Os índices são estáveis.
const feedback={};
function topic(s,t,text){const rows=text.trim().split('\n');if(rows.length!==10)throw Error(`Feedback ${s}:${t}: ${rows.length}`);(feedback[s]??={})[t]=rows;}
topic(0,0,`
A notícia informa um acontecimento verificável e costuma apresentar o que ocorreu, com quem, onde e quando.
A fábula conta uma narrativa que permite refletir sobre comportamentos, frequentemente com uma moral.
A entrevista organiza a participação de quem pergunta e de quem responde.
A receita apresenta ingredientes, quantidades e uma sequência de preparo.
O poema pode organizar a linguagem em versos e estrofes; não precisa ter rimas.
O conto desenvolve uma narrativa relativamente breve, com personagens, acontecimentos e um conflito.
A reportagem aprofunda um assunto por meio de contextualização, fontes e diferentes informações.
O anúncio procura influenciar o público, divulgando um produto, serviço ou ideia.
O convite informa um evento e apresenta dados para a participação, como data, horário e local.
O verbete explica o significado de uma palavra ou conceito em uma obra de consulta.
`);
topic(0,1,`
Menina nomeia um ser e funciona como substantivo; leu é o verbo da frase.
Bonita atribui uma característica a casa, por isso funciona como adjetivo.
Os acompanha livros e indica masculino plural; é um artigo definido.
Nós é um pronome pessoal que inclui quem fala e outras pessoas.
Correr é um verbo no infinitivo e pode indicar uma ação.
Brincou indica uma ação concluída no passado, no pretérito perfeito.
Viajaremos indica uma ação futura e concorda com nós.
Papel termina em -el e forma o plural papéis, com mudança na terminação e acento.
Quatro expressa uma quantidade exata e funciona como numeral cardinal.
Os alunos é o termo com o qual estudam concorda; o verbo está no plural.
`);
topic(0,2,`
O ponto de interrogação encerra uma pergunta direta, como em Você vem?
O ponto de exclamação pode marcar surpresa, entusiasmo ou uma ordem enfática.
A grafia padrão é exceção, com xc e ç; significa algo que foge a uma regra.
A grafia padrão é pesquisa, com s; a pronúncia não permite trocar esse s por z na escrita.
A vírgula separa itens de uma enumeração simples: lápis, borracha e caderno.
O travessão pode introduzir a fala de um personagem em um diálogo escrito.
Também tem acento na última sílaba e termina em -ém; expressa adição ou inclusão.
Necessário se escreve com c e ss e recebe acento em sá.
O ponto final encerra uma frase declarativa, como em A turma chegou.
Lápis recebe acento porque é uma paroxítona terminada em -is; a sílaba forte é lá.
`);
topic(0,3,`
A ideia principal reúne o assunto central; detalhes ajudam a desenvolvê-la.
Inferir é construir uma conclusão apoiada em pistas do texto, sem inventar informações.
A manchete destaca o assunto da notícia e deve ser coerente com seu conteúdo.
A informação explícita está enunciada no texto; pode ser localizada diretamente na leitura.
Gênero, público e situação de circulação ajudam a identificar para que o texto foi produzido.
O narrador é a voz que conta a história; ele não se confunde necessariamente com o autor.
Um fato é um acontecimento que pode ser verificado por registros ou evidências.
Uma opinião expressa um julgamento ou ponto de vista e pode ser sustentada por argumentos.
A legenda acrescenta informações que ajudam a compreender ou contextualizar uma imagem.
Comparar textos exige observar tanto aproximações quanto diferenças de informações e perspectivas.
`);
topic(0,4,`
O planejamento define objetivo, público e organização das ideias antes da versão final.
Porém introduz um contraste: Queria sair, porém começou a chover.
Portanto apresenta uma conclusão: Estudou com atenção; portanto, compreendeu a explicação.
Porque pode introduzir uma causa: Ficou em casa porque chovia.
Um pronome pode retomar um nome já citado: Ana chegou. Ela trouxe livros.
Revisar envolve avaliar clareza, organização, adequação e escrita, fazendo melhorias.
A linguagem deve considerar quem vai ler, o objetivo e a situação de comunicação.
O parágrafo organiza uma unidade de sentido; suas frases desenvolvem uma ideia relacionada ao texto.
O título orienta a leitura, apresentando ou sugerindo o assunto, sem precisar resumir tudo.
O conflito cria uma dificuldade ou tensão que impulsiona os acontecimentos da narrativa.
`);
topic(0,5,`
Recife nomeia uma cidade específica e é um substantivo próprio, escrito com inicial maiúscula.
Cardume nomeia um conjunto de peixes; é um substantivo coletivo.
Interessante caracteriza o livro e funciona como adjetivo nessa expressão.
Aquele é um pronome demonstrativo; situa um referente no contexto da comunicação.
Minha é um pronome possessivo e pode indicar a quem algo pertence.
Três quantifica amigos; é um numeral cardinal.
A acompanha o substantivo menina, indicando feminino singular; é artigo definido.
Estudar está no infinitivo, uma forma que nomeia o verbo sem marcar pessoa.
Ontem situa o acontecimento no tempo, em um dia anterior ao de referência.
Entre é uma preposição que pode relacionar posições, pessoas ou elementos.
`);
topic(0,6,`
As crianças é o sujeito; o verbo brincam concorda com esse termo no plural.
Correu cedo é o predicado: apresenta o que se declara sobre Pedro.
Viajarão está no futuro do presente; amanhã reforça a referência a um momento posterior.
Cantou está no pretérito perfeito; ontem reforça a referência a uma ação passada.
Alunos está no plural, por isso o verbo deve ser estudam.
As, casas e bonitas estão no feminino plural e concordam entre si.
Há dois verbos, chegou e saiu, cada um constituindo uma oração.
O ponto de interrogação marca o encerramento de uma pergunta direta.
Lemos pode ter mais de uma referência temporal; agora indica que, nesta frase, é presente.
Feche está no imperativo e, no contexto, apresenta uma ordem ou solicitação.
`);
topic(0,7,`
A personificação atribui ações ou características humanas a seres não humanos.
A comparação aproxima ideias explicitamente, neste caso por meio de como.
A hipérbole exagera uma ideia para intensificar um efeito de sentido.
A estrofe é um agrupamento de versos dentro de um poema.
A rima aproxima palavras por seus sons, frequentemente no final de versos.
A linguagem verbal utiliza palavras, na modalidade oral ou escrita.
Um símbolo pode comunicar uma orientação sem usar palavras, como em certas placas.
A linguagem informal depende da situação e pode ser mais espontânea, sem ser inferior à formal.
O eu lírico é a voz que se expressa no poema; não é necessariamente a pessoa do autor.
O conto costuma concentrar uma narrativa relativamente breve em poucos acontecimentos centrais.
`);
topic(0,8,`
Uma inferência precisa ter apoio no texto; não basta ser uma possibilidade imaginada pelo leitor.
Nuvens escuras e a escolha do guarda-chuva são pistas de que João considera possível chover.
O assunto central reúne as informações essenciais em torno das quais o texto se organiza.
Uma informação explícita pode ser localizada nas palavras do próprio texto.
As palavras próximas e a situação apresentada ajudam a formular uma hipótese de significado.
No contexto apresentado, o sorriso sugere alegria; a conclusão é uma inferência, não uma certeza universal.
O título pode antecipar o tema e orientar as expectativas do leitor.
A pergunta Por que aconteceu? solicita uma causa ou explicação para o acontecimento.
O argumento apresenta razões ou evidências para sustentar uma opinião.
O conteúdo divulgado e os recursos de convencimento ajudam a reconhecer a finalidade do anúncio.
`);
topic(0,9,`
Porém relaciona ideias em contraste; não indica causa ou conclusão.
Porque pode explicar a causa de um fato, como em Não saiu porque chovia.
Portanto introduz uma conclusão que decorre das informações anteriores.
Ela pode retomar Marina se o contexto deixar clara essa referência.
A sequência apresenta uma ordem temporal possível: acordar, tomar café e ir à escola.
Além disso acrescenta uma informação ao que já foi dito.
Mas cria contraste entre estudar e não obter o resultado esperado.
Pronomes podem retomar referentes e evitar repetições, desde que não gerem ambiguidade.
Se pode apresentar uma condição: Se chover, ficaremos em casa.
A coerência depende de relações de sentido entre as ideias e de sua compatibilidade com o contexto.
`);
topic(0,10,`
Planejar ajuda a definir o que dizer, para quem escrever e como organizar o texto.
A revisão considera clareza, organização e convenções de escrita, inclusive a pontuação.
A carta é dirigida a um destinatário; a finalidade e a relação com ele orientam o registro formal.
A introdução apresenta o tema e orienta o leitor para o desenvolvimento.
A conclusão retoma ou encerra o percurso das ideias, de acordo com o gênero.
O rascunho é uma versão de trabalho: pode receber acréscimos, cortes e reorganização.
Considerar o leitor ajuda a escolher vocabulário, explicações e grau de formalidade adequados.
Agrupar ideias relacionadas evita saltos de assunto e ajuda cada parágrafo a ter unidade.
Reescrever envolve tomar decisões para melhorar uma versão, e não apenas copiá-la.
Instruções claras ordenam ações para que o leitor saiba o que fazer em cada etapa.
`);
topic(2,0,`
Água e óleo não se misturam completamente e formam duas fases visíveis em repouso.
Quando todo o sal se dissolve, observamos uma única fase; a mistura é homogênea.
Na filtração, o filtro retém os grãos de areia e permite a passagem da água.
A imantação utiliza um ímã para retirar materiais com resposta magnética, como certos objetos de ferro.
Ao derreter, o gelo muda de estado físico, mas continua sendo água.
A combustão do papel forma novas substâncias, como gases e cinzas; é uma transformação química.
A evaporação remove a água em forma de vapor e pode deixar o sal no recipiente.
O náilon é um polímero produzido por síntese industrial; não é uma fibra obtida diretamente de um ser vivo.
Uma mistura heterogênea tem mais de uma fase; elas podem ser identificadas conforme a escala de observação.
Na decantação de água e óleo, a separação usa a diferença de densidade e a formação de camadas.
`);
topic(2,1,`
A célula é a unidade estrutural e funcional básica dos seres vivos celulares.
O cérebro integra informações e participa do controle de movimentos, percepções e outras funções.
Os ossos do crânio envolvem e protegem o encéfalo.
O esqueleto oferece sustentação e pontos de apoio para a ação dos músculos.
O olho recebe a luz; estruturas internas participam da formação e da transmissão da informação visual.
Neurônios são células especializadas em receber e transmitir sinais nervosos.
Músculos esqueléticos se contraem e atuam com ossos e articulações na movimentação do corpo.
Diferentes tecidos organizados e integrados podem formar um órgão, como o coração.
A íris altera o diâmetro da pupila e regula a quantidade de luz que entra no olho.
Atividades físicas adequadas às condições da pessoa contribuem para a manutenção da saúde óssea.
`);
topic(2,2,`
A crosta é a camada sólida mais externa da Terra, acima do manto.
Fósseis são registros de organismos ou de suas atividades e ajudam a estudar a vida do passado.
Na rotação, diferentes partes da superfície ficam voltadas para o Sol ou deixam de receber sua luz direta.
A Terra se aproxima de um esferoide: apresenta leve achatamento nos polos e irregularidades na superfície.
A translação é o movimento da Terra em sua órbita ao redor do Sol.
Rochas ígneas resultam da solidificação de material fundido, como magma ou lava.
Rochas sedimentares podem resultar do acúmulo, compactação e cimentação de sedimentos.
O manto fica abaixo da crosta; ele não é um oceano de magma totalmente líquido.
Fósseis e as rochas em que são encontrados ajudam a reconstruir organismos e ambientes antigos.
Uma rotação em relação ao Sol dura aproximadamente 24 horas e se relaciona ao ciclo diário.
`);
topic(2,3,`
A célula realiza funções essenciais à vida; seres unicelulares têm apenas uma célula.
Nas células eucarióticas, o núcleo abriga a maior parte do DNA e participa do controle das atividades celulares.
A membrana plasmática delimita a célula e controla trocas com o meio.
Mitocôndrias participam da respiração celular, processo que disponibiliza energia para as atividades da célula.
Cloroplastos contêm pigmentos que captam luz e participam da fotossíntese em células vegetais fotossintéticas.
Células organizadas que exercem funções relacionadas constituem tecidos.
Órgãos que atuam de forma integrada compõem um sistema, como o sistema digestório.
O microscópio permite ampliar estruturas pequenas demais para serem vistas com detalhes a olho nu.
Bactérias são organismos unicelulares e não possuem núcleo delimitado por membrana.
A parede celular oferece sustentação e proteção; nas células vegetais, contém celulose.
`);
topic(2,4,`
O encéfalo inclui cérebro, cerebelo e tronco encefálico e participa da coordenação de várias funções.
Neurônios recebem e transmitem sinais; suas conexões permitem a comunicação no sistema nervoso.
As vértebras envolvem o canal em que passa a medula espinhal, ajudando a protegê-la.
O olho capta estímulos luminosos; a percepção visual envolve também o sistema nervoso.
A retina contém células sensíveis à luz que transformam estímulos luminosos em sinais nervosos.
O olfato envolve a detecção de substâncias presentes no ar por receptores especializados.
Estruturas do ouvido interno informam sobre movimentos e posição da cabeça, contribuindo para o equilíbrio.
Um reflexo é uma resposta rápida e involuntária a um estímulo, como retirar a mão de algo muito quente.
A medula espinhal conduz informações entre o encéfalo e o corpo e participa de reflexos.
Volumes elevados podem danificar estruturas auditivas; reduzir a intensidade e o tempo de exposição ajuda a protegê-las.
`);
topic(2,5,`
O tecido ósseo forma os ossos e combina resistência com atividade de células vivas.
O esqueleto sustenta o corpo, protege órgãos e oferece apoio aos músculos.
Ligamentos conectam ossos a outros ossos e ajudam a estabilizar articulações.
Tendões conectam músculos aos ossos e transmitem a força da contração.
O bíceps participa da flexão do cotovelo; outros músculos também atuam nesse movimento.
A cartilagem reveste superfícies de muitas articulações e ajuda a reduzir atrito e impactos.
O fêmur fica na coxa e é o maior osso do corpo humano.
A contração muscular produz força que pode movimentar um braço por meio de ossos e articulações.
Alimentação adequada e atividade física compatível com as condições da pessoa favorecem a saúde óssea.
O sistema muscular atua de forma integrada ao esquelético, sob coordenação do sistema nervoso.
`);
topic(2,6,`
A crosta é a camada mais externa da estrutura sólida da Terra.
O manto se estende abaixo da crosta; a maior parte dele é sólida e pode deformar-se lentamente.
O resfriamento e a solidificação de magma ou lava originam rochas ígneas.
Sedimentos podem ser compactados e cimentados, formando rochas sedimentares.
Rochas metamórficas resultam de transformações por pressão e calor, sem fusão completa da rocha.
Fósseis incluem restos de organismos e vestígios de suas atividades preservados no registro geológico.
A erosão remove e transporta materiais; não se confunde com a alteração da rocha no próprio local.
Fósseis oferecem evidências de organismos de outras épocas, inclusive de espécies extintas.
A Terra apresenta leve achatamento nos polos e não é uma esfera perfeitamente regular.
O solo pode conter partículas minerais, matéria orgânica, água, ar e seres vivos.
`);
topic(2,7,`
A rotação faz diferentes regiões receberem iluminação solar em momentos distintos, produzindo dias e noites.
O dia solar médio corresponde a aproximadamente 24 horas.
A translação é o movimento da Terra ao redor do Sol.
Uma volta orbital dura aproximadamente 365 dias e cerca de seis horas, não exatamente 365 dias.
A inclinação do eixo altera a incidência de luz e a duração dos dias ao longo da órbita.
Os hemisférios têm estações opostas porque recebem iluminação de maneiras diferentes no mesmo período.
O Sol emite a luz que ilumina a Terra; a Lua reflete parte da luz solar.
O deslocamento aparente diário do Sol decorre principalmente da rotação da Terra.
A rotação faz o horário solar variar com a longitude; os fusos organizam convencionalmente essa diferença.
Nos equinócios, dia e noite têm durações aproximadamente iguais, com pequenas diferenças conforme o local.
`);
topic(2,8,`
O sistema circulatório transporta sangue, distribuindo substâncias e recolhendo outras pelo organismo.
O coração é um órgão muscular que impulsiona o sangue pelos vasos.
A maior parte da absorção dos nutrientes da digestão ocorre no intestino delgado.
O sistema respiratório possibilita trocas de oxigênio e gás carbônico entre o organismo e o ambiente.
Os rins filtram o sangue e participam da formação da urina e do equilíbrio de água e sais.
Lavar as mãos reduz a transferência de microrganismos; é uma das medidas de prevenção de infecções.
Proteínas participam da estrutura e da manutenção de tecidos, além de muitas outras funções.
O sono adequado participa da recuperação e da regulação de funções do organismo.
O cérebro integra informações e coordena diversas atividades do corpo, em conjunto com outras estruturas.
Articulações são regiões de encontro entre ossos; algumas permitem movimentos amplos e outras, limitados.
`);
topic(2,9,`
Plantas fotossintéticas produzem matéria orgânica utilizando luz, água e gás carbônico.
O coelho herbívoro se alimenta de produtores, ocupando o nível de consumidor primário nessa relação.
Muitos fungos decompõem matéria orgânica, contribuindo para a reciclagem de nutrientes.
A cadeia alimentar representa relações de alimentação e o fluxo de energia entre organismos.
Na fotossíntese, a energia da luz é utilizada na produção de matéria orgânica.
A biodiversidade abrange a variedade de organismos, genes e ecossistemas.
Proteger áreas naturais contribui para conservar habitats e as espécies que dependem deles.
A retirada de uma espécie pode modificar alimentos disponíveis e populações conectadas na teia.
Temperatura é um componente não vivo do ambiente e, portanto, um fator abiótico.
Bactérias são seres vivos; sua participação no ambiente constitui um fator biótico.
`);
function copy(s,t,from,indices,extra={}){(feedback[s]??={})[t]=indices.map((i,j)=>extra[j]??feedback[s][from][i]);}
topic(3,0,`
Uma carta registra palavras e informações de uma época; por isso pode ser uma fonte escrita.
O historiador investiga ações humanas no tempo por meio de perguntas e análise de fontes.
Um depoimento transmite lembranças ou experiências pela fala e pode ser uma fonte oral.
Um século corresponde a um período de cem anos.
O século XV vai de 1401 a 1500; o ano 1500 é seu último ano.
O século XXI vai de 2001 a 2100, intervalo que inclui 2026.
A arqueologia investiga vestígios materiais e seus contextos para compreender sociedades.
Uma fotografia pode fornecer evidências visuais; enquadramento, autoria e contexto também precisam ser analisados.
Uma década corresponde a dez anos; um século corresponde a cem.
A cronologia organiza acontecimentos segundo suas relações temporais, frequentemente por datas.
`);
topic(3,1,`
O nomadismo envolve deslocamentos relacionados a recursos, modos de vida e necessidades de cada grupo.
A agricultura favoreceu permanências mais longas em alguns locais; a mudança não ocorreu igualmente em todos os povos.
A pedra foi usada em ferramentas de diferentes períodos, trabalhada por técnicas como lascamento e polimento.
Cultivar plantas ampliou as possibilidades de produção e armazenamento, sem eliminar riscos de escassez.
A arte rupestre é um vestígio material que pode ajudar a estudar sociedades, mesmo sem registros escritos.
Vales de rios favoreceram diferentes sociedades agrícolas pela disponibilidade de água e solos férteis.
A caça, a pesca e a coleta forneciam alimentos, com práticas variadas entre os grupos.
No sedentarismo, grupos estabelecem moradias mais duradouras; isso não significa ausência de mobilidade.
Recipientes cerâmicos permitiram armazenar e cozinhar alimentos; seu uso variou entre sociedades.
O crescimento de aldeias podia ampliar a especialização e a divisão de tarefas, sem um único modelo universal.
`);
topic(3,2,`
O Nilo fornecia água e favorecia o cultivo nas áreas próximas às suas margens no Egito Antigo.
Mesopotâmia significa entre rios; a região se desenvolveu entre o Tigre e o Eufrates.
A democracia ateniense permitia a participação de cidadãos, mas excluía mulheres, estrangeiros e pessoas escravizadas.
Esparta é conhecida por sua organização social e pela formação militar de seus cidadãos homens.
Roma teve um período republicano antes do estabelecimento do Império.
Hieróglifos compunham um sistema de escrita egípcio, usado em diferentes suportes e contextos.
Algumas pirâmides foram construídas como monumentos funerários de faraós; não eram moradias comuns.
O Mediterrâneo conectava regiões por rotas comerciais, deslocamentos e conflitos.
Os faraós eram governantes do Egito Antigo e exerciam funções políticas e religiosas.
O latim era uma língua importante no mundo romano e influenciou línguas como o português.
`);
copy(3,3,0,[0,2,0,3,4,5,6,9,0,0],{2:'Ferramentas podem revelar técnicas e modos de trabalho; são fontes materiais.',6:'O arqueólogo analisa objetos, estruturas e outros vestígios em seu contexto.',8:'Saberes e práticas transmitidos entre pessoas podem compor o patrimônio imaterial.',9:'Fontes diferentes podem expressar experiências e interesses distintos; compará-las amplia a análise.'});
copy(3,4,1,[0,1,4,2,6,3,0,0,8,7],{2:'Pinturas rupestres são representações produzidas em superfícies rochosas; seus significados exigem análise contextual.',5:'Domesticar animais permitiu criar rebanhos, embora caça e coleta continuassem em muitas sociedades.',6:'O continente africano reúne as evidências mais antigas da origem da linhagem humana e do Homo sapiens.',7:'A arqueologia analisa vestígios materiais e seus contextos para investigar sociedades.'});
copy(3,5,2,[1,0,5,5,8,6,0,0,0,0],{2:'A escrita cuneiforme usava sinais marcados, frequentemente em argila, e foi desenvolvida na Mesopotâmia.',6:'As cheias do Nilo forneciam água e depositavam sedimentos, favorecendo áreas de cultivo.',7:'Cidades-Estado possuíam governo próprio e controlavam territórios próximos; não formavam um único Estado permanente.',8:'O Código de Hamurábi é uma importante coleção de normas da antiga Babilônia.',9:'A mumificação utilizava procedimentos para conservar corpos, ligados a crenças e práticas funerárias.'});
copy(3,6,2,[2,3,2,9,6,0,4,4,7,9],{2:'A ágora era um espaço público de encontros e atividades políticas, comerciais e sociais em muitas cidades gregas.',4:'O Coliseu era um anfiteatro romano que recebia espetáculos públicos.',5:'Aquedutos conduziam água a cidades e outras instalações, aproveitando canais e desníveis.',6:'O Senado reunia membros da elite e exerceu diferentes funções políticas ao longo da história romana.',7:'A República antecedeu o Império Romano; antes dela, Roma teve uma monarquia.',9:'O direito romano influenciou tradições jurídicas posteriores, sem ser idêntico às leis atuais.'});
topic(3,7,`
Machu Picchu foi construída pelos incas na região dos Andes, no atual Peru.
Os maias desenvolveram cidades, escrita e sistemas de contagem do tempo na Mesoamérica.
Tenochtitlán foi a capital mexica, povo frequentemente associado à denominação asteca.
O território inca se estendia pela região andina, com diferentes ambientes e altitudes.
Povos indígenas apresentam línguas, histórias e modos de vida diversos, também no presente.
O milho foi domesticado nas Américas e teve importância em diferentes culturas e sistemas agrícolas.
Tradições orais e vestígios materiais oferecem evidências que devem ser analisadas com os contextos e as vozes dos povos.
Os terraços criavam superfícies de cultivo nas encostas e ajudavam no manejo da água e do solo.
Respeitar povos indígenas exige reconhecer sua diversidade, seus direitos e sua presença contemporânea.
A Mesoamérica compreende áreas do atual México e de parte da América Central, onde floresceram cidades maias.
`);
copy(3,8,0,[0,2,0,6,3,8,4,5,9,9],{2:'Um vaso arqueológico é um objeto material que pode informar sobre técnicas, usos e relações sociais.',9:'Comparar autoria, época e contexto das fontes permite avaliar evidências e diferentes perspectivas.'});
copy(3,9,7,[0,2,1,3,5,7,7,9,3,4],{6:'Chinampas eram áreas agrícolas construídas em ambientes lacustres, importantes na região de Tenochtitlán.',8:'Os incas organizaram uma extensa rede de caminhos para comunicação e circulação em regiões andinas.'});
topic(4,0,`
A paisagem reúne elementos percebidos em um lugar, incluindo aspectos visuais, sons e outras sensações.
Um rio tem origem em processos naturais, embora possa sofrer transformações humanas.
Uma avenida é construída e organizada pela sociedade e integra a paisagem humanizada.
A agricultura transforma o uso do solo e pode modificar vegetação e outras características da paisagem rural.
O espaço geográfico resulta das relações entre sociedades e natureza ao longo do tempo.
A construção de edifícios modifica formas, usos e circulação no espaço urbano.
Proteger áreas verdes contribui para conservar habitats e processos naturais.
Barragens são obras humanas que alteram cursos de água e podem transformar extensas paisagens.
Uma plantação cultivada registra trabalho humano e produção econômica na paisagem.
Fotografias de momentos diferentes permitem observar permanências e mudanças; é preciso considerar o ponto de vista de cada imagem.
`);
topic(4,1,`
Norte e sul são direções opostas na rosa dos ventos.
Leste e oeste são direções opostas; não devem ser confundidos com norte e sul.
A agulha da bússola responde ao campo magnético terrestre; o norte magnético não coincide exatamente com o geográfico.
A legenda explica o que símbolos e cores representam no mapa.
A escala relaciona uma distância representada no mapa à distância correspondente na realidade.
O Equador é o paralelo de latitude zero e separa os hemisférios Norte e Sul.
O meridiano de Greenwich foi adotado como referência de longitude zero.
A latitude é uma distância angular em relação ao Equador, indicada para norte ou sul.
A longitude é uma distância angular em relação ao meridiano de Greenwich, indicada para leste ou oeste.
A rosa dos ventos indica direções e ajuda na orientação da representação cartográfica.
`);
topic(4,2,`
Na evaporação, moléculas passam da água líquida para o estado gasoso na superfície do líquido.
Na condensação, o vapor de água passa para o estado líquido, formando gotículas.
O termômetro mede temperatura; não mede diretamente chuva ou velocidade do vento.
O pluviômetro mede a quantidade de precipitação acumulada em determinado período.
O tempo atmosférico descreve as condições da atmosfera em um lugar e momento.
O clima considera padrões e variações das condições atmosféricas observados por longos períodos.
A retirada da vegetação pode deixar o solo mais exposto ao escoamento e à erosão.
Rios são cursos superficiais de água; sua qualidade e disponibilidade variam conforme as condições ambientais.
Consertar vazamentos evita a perda contínua de água sem uma finalidade de uso.
Montanhas apresentam grandes elevações e, em geral, encostas acentuadas.
`);
copy(4,3,0,[0,1,2,4,0,0,3,5,5,9],{4:'O lugar é o espaço vivido, relacionado a experiências, pertencimento e vínculos.',5:'O território envolve relações de poder, controle e apropriação do espaço.',7:'As paisagens mudam tanto por ações humanas quanto por processos naturais.',8:'Edifícios e vias, associados a usos urbanos, caracterizam o centro de uma cidade.'});
copy(4,4,1,[0,1,2,5,6,7,8,3,4,9],{9:'O globo representa a Terra em uma superfície aproximadamente esférica, reduzindo certas distorções de mapas planos.'});
copy(4,5,2,[4,5,2,3,2,4,5,0,1,1],{4:'O anemômetro mede a velocidade do vento; a direção pode ser indicada por uma biruta ou cata-vento.',5:'Na troposfera se concentra a maior parte do vapor de água e ocorrem os principais fenômenos meteorológicos.',6:'Em muitas situações, a temperatura do ar diminui com a altitude; há variações e inversões térmicas.',9:'Gotículas ou cristais de gelo nas nuvens podem crescer e precipitar; nem toda nuvem produz chuva.'});
topic(4,6,`
Nos planaltos predominam processos de desgaste em relação à deposição; a altitude, sozinha, não define essa forma de relevo.
Nas planícies predominam processos de deposição de sedimentos; elas costumam apresentar baixas declividades.
A erosão desgasta e remove materiais, que podem ser transportados pela água, vento ou gelo.
Um afluente é um curso de água que deságua em outro rio.
A nascente é o local de origem de um curso de água; sua proteção favorece a conservação hídrica.
A foz é o local onde um rio deságua em outro corpo de água.
A bacia hidrográfica compreende a área drenada por um rio principal e sua rede de afluentes.
A vegetação protege o solo do impacto da chuva e ajuda a reduzir o escoamento superficial.
A infiltração é a entrada da água no solo; parte dela pode alimentar reservatórios subterrâneos.
Esgoto sem tratamento pode levar microrganismos e outras substâncias aos rios, prejudicando sua qualidade.
`);
topic(4,7,`
A energia solar é considerada renovável porque o fluxo de energia do Sol se repõe na escala de tempo humana.
A energia eólica aproveita o movimento do ar para gerar eletricidade ou realizar trabalho.
Reutilizar prolonga a vida útil de uma embalagem e pode evitar o descarte e a produção de outra.
O desmatamento remove habitats e pode reduzir a variedade de organismos e relações ecológicas.
Vazamentos desperdiçam água continuamente; repará-los reduz perdas no sistema de abastecimento.
A reciclagem transforma resíduos em matérias-primas ou novos produtos; difere da reutilização direta.
Unidades de conservação protegem ambientes e têm regras de uso conforme sua categoria.
Curvas de nível orientam o plantio acompanhando linhas de mesma altitude, ajudando a reduzir o escoamento e a erosão.
O consumo consciente considera necessidade, durabilidade e impactos sociais e ambientais das escolhas.
Emissões de fumaça podem lançar partículas e gases no ar, comprometendo sua qualidade.
`);
copy(4,8,1,[5,6,7,8,9,3,4,0,1,2]);
topic(4,9,`
Migração é o deslocamento de pessoas com mudança de residência, temporária ou permanente.
A urbanização envolve o aumento da participação da população urbana e transformações nos espaços e modos de vida.
A agricultura integra o setor primário, que obtém produtos diretamente da natureza.
A indústria integra o setor secundário ao transformar matérias-primas em outros produtos.
O comércio integra o setor terciário, associado à circulação e à prestação de serviços.
A densidade demográfica relaciona o número de habitantes à área do território, geralmente em habitantes por km².
A falta de saneamento prejudica condições ambientais e de vida; não é uma característica inevitável de toda cidade.
O tratamento de esgoto reduz contaminantes antes da devolução da água ao ambiente.
O êxodo rural é uma modalidade de migração do campo para a cidade, relacionada a diferentes fatores.
Transporte coletivo acessível e eficiente pode reduzir viagens individuais e melhorar a mobilidade urbana.
`);
topic(5,0,`
Book significa livro. Em I read a book, a pessoa diz que lê um livro.
School significa escola. Em I go to school, a pessoa informa que vai à escola.
Mother significa mãe. My mother identifica a mãe de quem fala.
Blue corresponde à cor azul, como em a blue pencil.
Monday é segunda-feira; em inglês, nomes dos dias da semana começam com letra maiúscula.
Dog significa cachorro. A dog é um cachorro, enquanto cat significa gato.
Window significa janela. Open the window pede que alguém abra a janela.
Teacher significa professor ou professora, sem indicar obrigatoriamente o gênero.
Thank you é uma expressão de agradecimento, diferente de please, que acompanha um pedido.
Ten representa o número dez; twelve representa doze.
`);
topic(5,1,`
Com I, usamos am: I am a student significa Eu sou estudante.
Com she, usamos is: She is happy significa Ela está feliz.
Com they, usamos are: They are friends significa Eles ou elas são amigos.
Com we, usamos are: We are ready significa Nós estamos prontos.
Com he, usamos is: He is my brother significa Ele é meu irmão.
You se combina com are tanto no singular quanto no plural.
A negativa de to be recebe not depois do verbo: She is not tired.
Na pergunta com to be, o verbo vem antes do sujeito: Are you okay?
Com it, usamos is: It is cold today informa que está frio hoje.
Em inglês, a idade é expressa com to be: I am twelve, e não I have twelve.
`);
topic(5,2,`
No presente simples afirmativo, she exige plays, com -s, para indicar uma ação habitual.
Com they, o verbo fica na forma básica: They study English.
Perguntas no presente simples com you usam o auxiliar do antes do sujeito.
Com he, she ou it, perguntas no presente simples usam does.
Na negativa com he, usamos does not seguido da forma básica: like, sem -s.
Com I, usamos eat na forma básica; breakfast at seven indica uma rotina.
My mother equivale à terceira pessoa do singular, por isso o verbo é works.
Com they, a negativa usa do not e o verbo na forma básica: run.
The cat equivale a it; no presente afirmativo, usamos sleeps.
Depois de does, o verbo principal não recebe -s: Does she read books?
`);
topic(5,3,`
Good morning é um cumprimento usado pela manhã.
Good night é usado ao despedir-se à noite ou antes de dormir; ao chegar, pode-se usar good evening.
What is your name? pergunta como a pessoa se chama, não sua idade.
My name is Ana apresenta o nome de quem fala: Meu nome é Ana.
Thank you expressa agradecimento; não é uma saudação de chegada.
Please torna um pedido mais cortês e corresponde a por favor.
See you later é uma expressão de despedida, equivalente a até mais tarde.
How old are you? pergunta a idade de uma pessoa.
I am twelve years old informa que a pessoa tem doze anos; o verbo usado é to be.
Nice to meet you é usado ao conhecer alguém e expressa satisfação pelo encontro.
`);
topic(5,4,`
Mother significa mãe; father significa pai.
Brother significa irmão; sister significa irmã.
Teacher designa a pessoa que ensina e pode corresponder a professor ou professora.
No contexto de material escolar, notebook pode significar caderno; o contexto distingue esse uso de computador portátil.
Library significa biblioteca, e não livraria; livraria é bookstore ou bookshop.
Breakfast é a refeição da manhã; lunch é almoço e dinner pode ser jantar.
Monday é segunda-feira; nomes dos dias começam com letra maiúscula em inglês.
January é janeiro; nomes dos meses começam com letra maiúscula em inglês.
Blue corresponde a azul; a blue bag é uma bolsa azul.
Twelve significa doze, enquanto ten significa dez.
`);
copy(5,5,1,[1,3,0,1,2,4,6,7,8,2],{0:'She é o pronome pessoal que pode substituir uma pessoa referida como ela.',1:'We significa nós e inclui quem está falando.',5:'He se combina com is: He is my brother.',7:'Em Are you ready?, o verbo are vem antes do sujeito you.',8:'The book é um objeto no singular; pode ser retomado por it.',9:'Ana and Leo é uma referência plural e pode ser retomada por they.'});
copy(5,6,2,[0,2,3,6,8,2,2,2,2,5],{3:'A negativa com I usa do not seguido da forma básica: I do not like milk.',4:'Com he no presente simples afirmativo, go muda para goes.',5:'Where pergunta sobre lugar ou localização.',6:'When pergunta sobre tempo, data ou momento.',7:'Why pede uma razão ou explicação.',8:'Who pergunta sobre uma pessoa ou identidade.',9:'Every day significa todos os dias e indica frequência habitual.'});
topic(5,7,`
Open está no imperativo e the door significa a porta; a orientação é Abra a porta.
Read the text orienta alguém a ler o texto; read é o verbo ler.
City significa cidade, como em a big city, uma cidade grande.
Country significa país nesse contexto; pode ter outros sentidos em outras situações.
Always indica uma frequência equivalente a sempre.
Never indica que algo não ocorre, correspondendo a nunca.
I like music expressa uma preferência: Eu gosto de música.
No Canadá, inglês e francês são línguas oficiais federais; a diversidade linguística do país é mais ampla.
Halloween é conhecido em português como Dia das Bruxas e tem práticas diferentes conforme o contexto cultural.
Can you help me? é uma forma de pedir ajuda, não uma afirmação de que a ajuda já ocorreu.
`);
topic(5,8,`
Good morning é um cumprimento que corresponde a bom dia.
Thank you é uma expressão usada para agradecer.
How old are you? solicita a idade, e não o nome ou o lugar de origem.
Where é usado para perguntar sobre lugar ou localização.
When é usado para perguntar sobre tempo, data ou momento.
Who é usado para perguntar sobre pessoas ou identidade.
Because apresenta uma razão ou explicação, como em I stayed because it rained.
Library significa biblioteca; é um falso cognato de livraria.
Classroom é a sala onde ocorrem atividades de uma turma: sala de aula.
See you later é uma despedida equivalente a até mais tarde.
`);
topic(5,9,`
Under indica uma posição inferior: under the table significa debaixo da mesa.
On indica contato com uma superfície: on the desk significa sobre a carteira ou mesa.
Between indica uma posição entre referências, como em between the chairs.
Behind indica uma posição atrás de uma referência.
Next to indica proximidade lateral: ao lado de.
In front of indica uma posição à frente de uma referência.
Inside indica posição no interior de um espaço ou recipiente.
Outside indica posição fora de um espaço ou recipiente.
Above indica posição acima de uma referência, sem exigir contato com ela.
Near indica proximidade; não exige que os objetos estejam encostados.
`);
topic(6,0,`
No modelo tradicional escolar RYB, vermelho, amarelo e azul são tratados como primários; outros modelos usam outras cores.
Linhas podem delimitar contornos e organizar formas em uma composição visual.
A colagem reúne materiais fixados em uma base, como recortes de papel e tecido.
A música organiza sons e silêncios no tempo, com diferentes escolhas expressivas.
O andamento se refere à velocidade ou pulsação de uma execução musical.
O teatro organiza ações e personagens em uma situação cênica.
A argila pode ser modelada para criar volumes e formas escultóricas.
A dança utiliza o corpo em movimento como meio expressivo e pode relacionar-se ao ritmo.
O patrimônio cultural reúne bens, práticas e referências valorizados por comunidades por seus significados culturais.
O ritmo organiza durações, acentos e pausas; não se confunde com a velocidade do andamento.
`);
copy(6,1,0,[2,1,1,0,2,2,6,1,8,8],{0:'A pintura cria imagens com pigmentos sobre uma superfície e integra as artes visuais.',2:'O valor tonal se refere às diferenças entre claros e escuros em uma composição.',5:'Na gravura, uma matriz é preparada e usada para produzir impressões.',6:'A escultura ocupa três dimensões e pode ser observada de diferentes pontos de vista.',7:'A textura visual sugere características de uma superfície por meio de marcas e padrões.',8:'A curadoria seleciona obras e organiza relações e percursos para uma exposição.',9:'A arte pública estabelece relações com o espaço coletivo e com quem o utiliza.'});
topic(6,2,`
O ritmo organiza durações e pausas; sons de durações diferentes podem formar um padrão rítmico.
A altura se relaciona à frequência sonora e permite distinguir graves e agudos.
A intensidade permite perceber sons mais fortes ou fracos; não é a mesma coisa que altura.
O timbre permite distinguir fontes sonoras, mesmo quando executam a mesma nota.
O tambor produz som pela vibração de uma membrana percutida.
O violão produz som pela vibração de cordas, que pode ser amplificada por sua caixa de ressonância.
Na flauta, o sopro coloca uma coluna de ar em vibração.
Uma pausa musical indica um intervalo de silêncio com duração na organização da música.
A melodia organiza uma sequência de alturas e durações sonoras.
No canto coral, diferentes vozes cantam em conjunto, podendo executar uma ou mais linhas musicais.
`);
topic(6,3,`
Atores e atrizes interpretam personagens utilizando recursos como voz, gesto e movimento.
O cenário ajuda a construir o espaço da ação; ele pode ser realista, simbólico ou minimalista.
O figurino participa da caracterização dos personagens por roupas, acessórios e outras escolhas visuais.
A improvisação envolve criar durante a ação, mesmo quando há combinações ou uma proposta inicial.
A dança usa movimentos corporais expressivos em relações de espaço, tempo e energia.
A coreografia organiza movimentos, percursos e relações entre os participantes de uma dança.
O espaço envolve direções, níveis, trajetórias e relações entre corpos na dança.
A expressão corporal pode comunicar ideias e emoções sem depender apenas de palavras.
O maracatu reúne música, cortejo e movimentos em manifestações de matriz afro-brasileira, com formas distintas.
Escutar propostas e colaborar permite negociar escolhas e construir uma criação coletiva.
`);
topic(6,4,`
O patrimônio material inclui bens físicos com valor cultural, como edifícios, objetos e conjuntos urbanos.
O patrimônio imaterial inclui práticas, conhecimentos e expressões transmitidos e recriados pelas comunidades.
A roda de capoeira é uma prática cultural; sua transmissão e realização compõem uma referência imaterial.
Uma igreja histórica é um bem físico; seu valor cultural depende de suas referências e significados sociais.
O IPHAN atua na identificação, proteção e promoção do patrimônio cultural brasileiro.
O samba reúne expressões musicais e corporais e apresenta formas diferentes conforme as comunidades e os contextos.
Preservar envolve cuidado, conhecimento e participação das comunidades relacionadas aos bens culturais.
Estudar produções indígenas requer reconhecer povos, contextos e autorias, evitando tratá-las como uma expressão única.
A diversidade artística envolve diferentes linguagens, escolhas, tradições e formas de produção.
Museus podem conservar, pesquisar e comunicar acervos; não se limitam a guardar objetos antigos.
`);
topic(6,5,`
Pesquisar referências amplia repertórios e ajuda a formular escolhas para um projeto artístico.
O esboço é um registro inicial para explorar uma ideia; pode ser modificado durante o processo.
O caderno de processos reúne registros, testes, referências e decisões da criação.
A releitura interpreta e transforma uma referência, reconhecendo sua origem; não é simples cópia.
A composição organiza relações entre elementos como linhas, formas, cores e espaços.
O contraste destaca diferenças entre elementos, como claros e escuros ou cores e tamanhos.
A apreciação articula observação, interpretação e reflexão sobre uma obra e seus contextos.
Indicar autores e referências reconhece a participação de outras pessoas na produção cultural.
Uma exposição apresenta criações ao público e pode propor percursos e relações entre obras.
Trocar ideias com respeito amplia possibilidades e permite negociar escolhas na criação coletiva.
`);
copy(6,6,4,[0,1,5,6,5,2,7,5,5,7],{1:'Uma tradição oral é transmitida entre pessoas; não se reduz a um objeto físico.',2:'Festas juninas articulam músicas, danças, comidas e outras tradições, com variações regionais.',3:'A preservação pode manter referências de memória e identidade, respeitando a participação das comunidades.',4:'No teatro de bonecos, a animação de objetos e personagens participa da construção da narrativa.',5:'A capoeira articula jogo corporal, musicalidade e tradição cultural afro-brasileira.',6:'A arte popular se relaciona a práticas e referências de comunidades, sem ser inferior a outras produções.',7:'A música organiza sons e silêncios em relações de tempo e expressão.',8:'O teatro cria ações cênicas que podem envolver personagens e diferentes modos de relação com o público.',9:'Conhecer contextos e ouvir os participantes ajuda a valorizar diferenças sem estereótipos.'});
topic(7,0,`
Em um jogo coletivo, decisões e ações dos participantes se relacionam; cooperação e regras organizam a prática.
No voleibol, a bola é enviada por cima da rede, normalmente por contatos com as mãos ou os braços.
No basquetebol, as equipes procuram marcar pontos nas cestas adversárias.
No futebol, o objetivo é marcar gols e o jogo usa predominantemente os pés, com regras específicas para o goleiro.
O atletismo reúne provas de corrida, marcha, saltos, arremessos e lançamentos.
Respeitar adversários e cumprir regras faz parte do jogo limpo, mesmo ao perder uma partida.
O xadrez é um jogo de tabuleiro com decisões estratégicas sobre movimentos de peças.
No handebol, passes e arremessos com as mãos são usados para buscar gols.
A comunicação ajuda a combinar ações e a resolver desafios de maneira cooperativa.
O aquecimento prepara gradualmente o corpo para a atividade; deve ser adequado à prática e às pessoas.
`);
topic(7,1,`
O equilíbrio permite manter ou recuperar uma posição estável do corpo.
A agilidade envolve mudar rapidamente de direção ou posição com controle.
A técnica adequada, a progressão e as condições do espaço ajudam a reduzir riscos de lesões.
O breaking tem vínculos históricos com culturas urbanas e com o hip-hop.
Alongamentos adequados podem trabalhar a amplitude de movimento, respeitando condições e limites individuais.
O sono participa da recuperação após esforços físicos e de outras funções do organismo.
O capacete adequado ajuda a proteger a cabeça em quedas e impactos; não elimina todos os riscos.
A escalada envolve superar percursos verticais com técnicas e cuidados de segurança específicos.
A resistência se relaciona à capacidade de sustentar um esforço ao longo do tempo.
Adaptar regras e materiais pode remover barreiras e ampliar a participação de diferentes pessoas.
`);
topic(7,2,`
Nos jogos cooperativos, os participantes se articulam em torno de objetivos compartilhados.
Cumprir regras construídas e compreendidas pelo grupo contribui para uma convivência respeitosa.
Na queimada, lançar a bola e desviar-se dela mobilizam arremesso, percepção e esquiva.
A amarelinha usa um percurso desenhado no chão, com saltos conforme as regras da brincadeira.
O xadrez envolve planejar jogadas e considerar possibilidades de resposta do adversário.
Adaptar regras permite ajustar o desafio às condições dos participantes, mantendo uma prática significativa.
Reconhecer os limites do espaço ajuda a evitar choques, quedas e outras situações de risco.
Fair play significa jogo limpo, com respeito às regras e às pessoas.
Variar materiais e desafios oferece diferentes formas de participação e aprendizagem.
A cooperação envolve escutar, combinar ações e agir em relação a um objetivo compartilhado.
`);
topic(7,3,`
Na corrida de velocidade, o resultado é comparado por uma marca de tempo para uma distância definida.
Na bocha, busca-se aproximar bolas de um alvo; por isso é um esporte de precisão.
Esportes de marca comparam medidas como tempo, distância, altura ou massa, conforme a modalidade.
No arremesso de peso, mede-se a distância alcançada dentro das regras da prova.
No tiro com arco, o controle do lançamento procura atingir regiões de um alvo.
O aquecimento deve preparar gradualmente as ações que serão exigidas, respeitando condições individuais.
No salto em altura, o atleta busca superar uma barra horizontal sem derrubá-la, conforme as regras.
Na natação, provas podem comparar o tempo necessário para percorrer uma distância definida na água.
Se o tempo de corrida é o mesmo, percorrer uma distância maior indica aumento da distância alcançada nesse período.
Competições escolares devem respeitar regras, diferenças e oportunidades de participação e aprendizagem.
`);
topic(7,4,`
No futebol, as equipes ocupam o campo adversário para buscar a meta; é um esporte de invasão.
No voleibol, a rede separa os espaços e a bola é enviada ao campo adversário.
O basquete busca marcar pontos na cesta defendida pela outra equipe, dentro das regras.
No handebol, as equipes buscam gols por arremessos, articulando passes e deslocamentos.
O saque coloca a bola em jogo e inicia a disputa de um ponto no voleibol.
O passe permite transferir a bola a um colega, articulando ações da equipe.
O drible permite avançar com a bola no basquete, quicando-a conforme as regras.
Ocupar espaços livres e cooperar cria alternativas de passe e de continuidade da jogada.
No badminton, jogadores usam raquetes para enviar uma peteca por cima da rede.
No tênis, raquetes são usadas para enviar uma bola por cima da rede.
`);
topic(7,5,`
A flexibilidade se relaciona à amplitude possível dos movimentos nas articulações.
A resistência permite sustentar esforços ao longo do tempo, conforme a tarefa.
A força muscular permite produzir tensão para vencer ou sustentar uma resistência.
Manter-se sobre um pé mobiliza o controle postural; o desafio deve ser realizado com segurança.
A atividade física regular e adequada pode contribuir para o condicionamento e a qualidade de vida.
O sono participa da recuperação do organismo; não deve ser substituído por mais esforço.
A aprendizagem progressiva e a técnica adequada ajudam a reduzir riscos; aumentar dificuldade abruptamente pode ampliá-los.
Dor intensa é um sinal para interromper a atividade e buscar orientação, em vez de insistir no esforço.
Beber água conforme as necessidades participa da hidratação; a demanda varia com a atividade e o ambiente.
Coordenar uma sequência exige organizar movimentos no tempo e no espaço com controle.
`);
topic(7,6,`
O ritmo pode orientar durações, acentos e relações entre movimentos de uma dança.
O breaking se desenvolveu em contextos urbanos ligados à cultura hip-hop.
Conhecer a história e ouvir os participantes ajuda a respeitar as práticas e seus significados.
Uma trilha orientada relaciona deslocamento, leitura do ambiente e cuidados com riscos e impactos.
Um capacete apropriado ajuda a reduzir riscos de lesões na cabeça no ciclismo.
A bússola ajuda a identificar direções, mas deve ser usada com conhecimento do percurso e outras referências.
Recolher resíduos evita deixá-los no ambiente e contribui para reduzir impactos da visita.
O parkour trabalha deslocamentos e superação de obstáculos, com aprendizagem gradual e avaliação de riscos.
Planejar, avaliar riscos e usar equipamentos adequados integra o cuidado com a segurança.
Danças coletivas podem articular expressão, escuta e cooperação na relação entre participantes.
`);
copy(7,7,4,[3,0,2,3,0,7,0,8,7,0],{0:'O handebol é um esporte de invasão: busca-se a meta no território defendido pela outra equipe.',1:'Na bocha, o objetivo é aproximar as bolas de uma bola-alvo, priorizando a precisão.',4:'O jogo limpo exige respeito às regras e aos participantes, inclusive em situações de disputa.',5:'A cooperação ajuda uma equipe a articular decisões, passes, apoios e outras ações.',6:'Na bocha, a posição das bolas em relação à bola-alvo participa da definição do resultado.',7:'No golfe, o taco é usado para impulsionar a bola em direção aos buracos do percurso.',8:'Respeitar diferenças envolve oferecer formas reais de participação, ajustando barreiras e desafios.',9:'No futsal, a meta defendida pelo goleiro é o alvo; a modalidade é jogada predominantemente com os pés.'});
topic(1,0,`
Some as dezenas e as unidades: 48 + 20 = 68; 68 + 7 = 75.
Retire por etapas: 93 − 40 = 53; 53 − 6 = 47. Confira: 47 + 46 = 93.
Decomponha 12: 10 × 8 + 2 × 8 = 80 + 16 = 96.
Procure quantos grupos de 12 formam 144: 12 × 12 = 144, então 144 ÷ 12 = 12.
Quatro grupos de 25 formam 100: 25 + 25 + 25 + 25 = 100.
Como 9 × 4 = 36, temos 9 × 40 = 360; portanto, 360 ÷ 9 = 40.
125 + 375 = 500; completar a próxima centena também ajuda a conferir a soma.
700 − 200 = 500; 500 − 50 = 450; 450 − 8 = 442.
Decomponha 15: 10 × 6 + 5 × 6 = 60 + 30 = 90.
Separe 81 em 60 e 21: 60 ÷ 3 + 21 ÷ 3 = 20 + 7 = 27.
`);
topic(1,1,`
Metade corresponde a dividir por dois: 20 ÷ 2 = 10.
Divida numerador e denominador por dois: 2/4 = 1/2; o valor da fração não muda.
Alinhe as casas decimais: 0,50 + 0,25 = 0,75.
Divida 40 em quatro partes iguais e tome três: 40 ÷ 4 × 3 = 30.
0,8 tem oito décimos. Compare as alternativas na mesma escala: 0,8 = 0,80.
Some unidades e décimos: 1,2 + 2,3 = 3,5.
Alinhe as casas decimais: 5,0 − 1,7 = 3,3. Confira: 3,3 + 1,7 = 5,0.
25% = 25/100; dividindo numerador e denominador por 25, obtemos 1/4.
10% corresponde a um décimo: 90 ÷ 10 = 9.
Uma terça parte de 24 é 24 dividido em três grupos iguais: 24 ÷ 3 = 8.
`);
topic(1,2,`
Hexa indica seis; um hexágono é um polígono com seis lados.
O perímetro soma os quatro lados: 5 + 5 + 5 + 5 = 20 cm.
A área do retângulo é comprimento × largura: 4 × 3 = 12 cm².
Um ângulo reto mede 90°, equivalente a um quarto de uma volta completa.
Um triângulo tem três lados e três vértices.
O prefixo centi indica a centésima parte do metro: 1 m = 100 cm.
O prefixo mili indica a milésima parte do litro: 1 L = 1.000 mL.
Um cubo tem seis faces quadradas; faces não são a mesma coisa que vértices.
O transferidor permite medir a abertura de ângulos, geralmente em graus.
Área do quadrado: lado × lado = 6 × 6 = 36 cm²; perímetro seria 24 cm.
`);
topic(1,3,`
O algarismo 7 ocupa a ordem dos milhares, por isso representa 7 × 1.000 = 7.000.
Três milhares são 3.000 e duas dezenas são 20: 3.000 + 20 = 3.020.
O sucessor é obtido somando um: 999 + 1 = 1.000.
O antecessor é obtido subtraindo um: 2.000 − 1 = 1.999.
4.305 contém quatro milhares, três centenas e cinco unidades; a dezena é zero.
8.091 é maior: compare os algarismos da esquerda para a direita, começando pela ordem dos milhares.
Cada centena vale 100: 1.200 ÷ 100 = 12 centenas.
Em 15.204, o 5 ocupa a ordem dos milhares e vale 5 × 1.000 = 5.000.
6.040 reúne seis milhares e quatro dezenas: seis mil e quarenta.
2.000 + 300 + 8 = 2.308; o zero registra que não há dezenas.
`);
topic(1,4,`
42 = 6 × 7; por isso é um múltiplo de 6.
36 ÷ 9 = 4, sem resto; portanto, 9 é divisor de 36.
13 tem exatamente dois divisores positivos: 1 e 13; é um número primo.
21 = 3 × 7 e possui outros divisores além de 1 e 21; é composto.
Múltiplos de 4: 4, 8, 12; múltiplos de 6: 6, 12. O menor positivo comum é 12.
Divisores comuns de 12 e 18 incluem 1, 2, 3 e 6; o maior é 6.
Um número inteiro terminado em 0 ou 5 é divisível por 5; 135 termina em 5.
A soma dos algarismos de 123 é 1 + 2 + 3 = 6, múltiplo de 3.
12 = 2 × 6 = 2 × 2 × 3, em que todos os fatores são primos.
Um primo tem exatamente dois divisores positivos; os de 11 são 1 e 11.
`);
topic(1,5,`
10% é um décimo: 200 ÷ 10 = 20.
25% é um quarto: 80 ÷ 4 = 20.
50% é metade: 46 ÷ 2 = 23.
75% de 100 corresponde a 75 de cada 100, portanto é 75.
20% = 1/5; 150 ÷ 5 = 30.
50/100 pode ser simplificada dividindo ambos os termos por 50: 1/2.
30% significa 30/100, que corresponde ao decimal 0,30 ou 0,3.
O desconto é 10% de 100 = 10 reais; preço final: 100 − 10 = 90 reais.
5% é metade de 10%: 10% de 60 = 6; metade de 6 é 3.
1/4 = 25/100, que corresponde a 25%.
`);
topic(1,6,`
Cada termo aumenta duas unidades: depois de 8 vem 8 + 2 = 10.
Cada termo é o dobro do anterior: 24 × 2 = 48.
Para desfazer a soma de cinco, subtraia cinco dos dois lados: x = 12 − 5 = 7.
Divida os dois lados por três: n = 21 ÷ 3 = 7.
Dobrar x significa multiplicar x por dois; a expressão pode ser escrita 2x.
O triplo de 4 corresponde a três grupos de quatro: 3 × 4.
Substitua a por cinco: a + 8 = 5 + 8 = 13.
A sequência aumenta três unidades por vez: 10 + 3 = 13.
Os dois lados têm o mesmo valor: 8 + 2 = 10 e 5 + 5 = 10.
Some quatro aos dois lados: y = 9 + 4 = 13.
`);
topic(1,7,`
O gráfico de barras usa comprimentos para comparar valores associados a categorias.
Some os valores e divida pela quantidade: (4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6.
A moda é o valor mais frequente; 3 aparece duas vezes, enquanto 2 e 5 aparecem uma.
Com três valores ordenados, a mediana é o valor central: 4.
Em uma moeda equilibrada, cara e coroa têm a mesma chance: 1 resultado favorável entre 2 possíveis.
Um dado comum é um cubo com seis faces numeradas de 1 a 6.
Não há uma face com 7; assim, existem zero resultados favoráveis entre seis possíveis.
Amplitude é maior valor menos menor valor: 9 − 2 = 7.
A moda identifica o valor mais frequente; média e mediana usam critérios diferentes.
Há quatro bolas ao todo e uma é azul: 1/4 dos resultados possíveis, com retirada equiprovável entre bolas.
`);
(feedback[1]??={})[8]=[[5,3,4],[7,2,6],[9,4,3],[8,5,2],[6,7,3],[12,2,5],[4,6,7],[11,3,4],[15,2,8],[10,9,2]].map(([a,b,c])=>`Sem parênteses, multiplique antes de somar: ${b} × ${c} = ${b*c}; depois ${a} + ${b*c} = ${a+b*c}.`);
feedback[1][9]=[[10,80],[25,200],[50,90],[20,150],[5,200],[75,80],[30,300],[40,50],[10,250],[25,120]].map(([p,n])=>`${p}% de ${n} = ${n} × ${p}/100 = ${n*p/100}. A porcentagem é calculada sobre o total informado.`);
topic(1,10,`
No par ordenado (x, y), a abscissa é a primeira coordenada: em (3, 5), x = 3.
A ordenada é a segunda coordenada: em (−2, 4), y = 4.
A origem é o encontro dos eixos e tem coordenadas (0, 0).
A coordenada horizontal é a primeira do par: em (7, 2), ela vale 7.
Pontos no eixo horizontal têm ordenada zero; em (4, 0), y = 0.
Pontos no eixo vertical têm abscissa zero; em (0, 6), x = 0.
No primeiro quadrante, x é positivo e y também é positivo.
A ordenada é a segunda coordenada; em (8, −3), ela vale −3.
Direita corresponde a x positivo e acima a y positivo; o ponto é (2, 3).
No terceiro quadrante, as duas coordenadas são negativas, como em (−2, −5).
`);
module.exports=feedback;
