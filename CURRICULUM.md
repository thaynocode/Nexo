# Questionários do Ensino Fundamental — revisão 2

O NEXO organiza 203 trilhas do 1º ao 9º ano, com dez questões em cada um dos três níveis: 6.090 itens disponíveis. Os nomes, índices e a ordem das trilhas foram mantidos para preservar a jornada existente.

| Anos | Matérias | Trilhas por ano |
| --- | --- | --- |
| 1º a 5º | Português, Matemática, Ciências, História, Geografia, Artes e Educação Física | 15 |
| 6º | As sete áreas e Inglês (incluindo a denominação histórica Arte) | 77 |
| 7º a 9º | As sete áreas e Inglês | 17 |

## Demanda por nível

- **Iniciante:** identificar informações e compreender conceitos. Enunciados delimitados; o feedback deve explicar o conceito ou as etapas do cálculo.
- **Explorador:** relacionar uma resposta à justificativa ou aplicar procedimentos em uma situação matemática. São 1.610 itens de resposta justificada e 420 problemas matemáticos.
- **Mestre:** conferir respostas propostas, detectar erros e verificar soluções; em Matemática, planejar etapas, trabalhar incógnitas ou comparar resultados. São 1.610 itens de análise e 420 problemas matemáticos.

Os formatos de justificativa e análise são derivados das questões-base, com vínculo explícito a seus itens de origem. Não devem ser apresentados como milhares de situações totalmente independentes. A seleção do Mestre exige verificar as respostas propostas; não basta escolher uma lista de respostas básicas concatenadas. No 1º e 2º ano, a análise envolve duas respostas; nos demais, três. A leitura pode exigir apoio conforme a autonomia da criança.

Os 840 problemas matemáticos avançados possuem geradores específicos por eixo e nível. Exemplos: descobrir uma quantidade inicial, calcular o que sobra após duas ações, distinguir área e perímetro, comparar bases de porcentagem e planejar deslocamentos. A revisão inclui 770 comentários específicos para o 6º ano, enunciados corrigidos e alternativas do mesmo campo semântico em itens delimitados. As metas continuam em 7, 8 e 9 acertos.

## Referência e abrangência

A seleção de temas usa como referência a [BNCC oficial do MEC](https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf), especialmente os quadros de Língua Portuguesa (p. 89–191), Arte (p. 199–211), Educação Física (p. 224–239), Inglês (p. 247–263), Matemática (p. 276–319), Ciências (p. 331–351), Geografia (p. 367–395) e História (p. 403–433), segundo a numeração impressa.

As perguntas são autorais. Não se trata de transcrição de livros, de uma avaliação oficial nem de uma cobertura exaustiva de todas as habilidades da BNCC. Alguns objetos são previstos em blocos de anos: a distribuição aqui organiza uma sequência de aprendizagem e deve ser ajustada à proposta pedagógica da escola. A seleção mantém as áreas que já existiam no Nexo; não acrescenta Ensino Religioso.

## Manutenção e compatibilidade

- Edite as fontes em `curriculum/` e execute `node curriculum/build.cjs`. O artefato reproduzível é `public/grade-bank.js`, que inclui agora o 6º ano revisado.
- `sixth-feedback.cjs` contém comentários específicos por índice; `editorial.cjs` registra correções de enunciado; `distractors.cjs` trata alternativas de enunciados delimitados. `assessment.cjs` produz os formatos de justificativa e análise. `math-sixth.cjs` e `math-progressive.cjs` produzem os problemas avançados por eixo.
- O banco original do 6º ano no HTML e seu hash permanecem intactos como referência de compatibilidade; ele não substitui o banco revisado exibido. Não reordene matérias nem trilhas.
- As chaves históricas `s-t-l` continuam sendo do 6º ano; os demais anos usam `ano:s-t-l`. Notas, tentativas e desbloqueios não são apagados nem migrados para outra trilha. XP permanece global.
- Erros antigos salvos como índices usam o banco histórico correspondente, inclusive o antigo fallback de bancos parciais e a inserção premium do 6º ano. Novas tentativas guardam uma cópia da questão errada, de modo que uma revisão posterior do currículo não mude seu enunciado.
- O service worker inclui o artefato e usa cache v31. O banco contém também os itens históricos necessários para revisar erros antigos. Estes são conteúdo de compatibilidade, não os novos desafios.
- Execute `node scripts/validate-grades.cjs`, `node tests/question-quality.cjs`, `node tests/grade-runtime.cjs` e os testes Playwright. Os testes verificam estrutura, gabaritos derivados, referências matemáticas, índices históricos e fluxos; não representam uma validação pedagógica externa da cobertura integral da BNCC.
- O relatório CSV continua correspondendo ao ano selecionado. A exclusão informa que remove o progresso de todos os anos.
