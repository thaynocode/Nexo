# Currículo e questionários do Nexo

A versão reorganiza os questionários do 1º ao 9º ano em percursos com referências à BNCC. Todos os itens ativos têm código, ano ou bloco, justificativa de vínculo e indicação do tipo de evidência. O aplicativo continua dedicado a questionários, com correção após a resposta; não exibe aulas expositivas nem usa Unsplash.

## Organização

| Ano | Componentes | Percursos ativos | Itens nos três níveis |
| --- | ---: | ---: | ---: |
| 1º | 9 | 12 | 360 |
| 2º | 9 | 13 | 390 |
| 3º | 9 | 13 | 390 |
| 4º | 9 | 14 | 420 |
| 5º | 9 | 13 | 390 |
| 6º | 10 | 16 | 480 |
| 7º | 10 | 15 | 450 |
| 8º | 10 | 14 | 420 |
| 9º | 10 | 13 | 390 |

São 123 percursos e 3.690 itens, contando as ofertas por ano e nível. Os cenários de Arte e Educação Física pertencentes a um mesmo bloco são retomados nos anos abrangidos; esses números não representam 3.690 situações-base diferentes.

Português trabalha alfabetização, leitura, usos da língua, pesquisa, argumentação e revisão; Matemática articula números, álgebra, geometria, grandezas e dados; Ciências aborda materiais, vida, ambiente, Terra e Universo. História e Geografia ampliam contextos, grupos sociais, territórios, fontes, mapas e problemas socioambientais. Arte reúne artes visuais, música, dança, teatro e integração de linguagens. Educação Física inclui jogos, esportes, ginásticas, danças, lutas e aventuras nos blocos pertinentes. Inglês começa no 6º ano. Computação tem percurso próprio e Ensino Religioso é plural, não confessional e opcional, sem bloquear as conquistas principais.

## Fontes e alcance

O catálogo contém 1.408 códigos únicos: 1.304 da BNCC consolidada e 104 do complemento de Computação.

- [BNCC consolidada — MEC](https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf).
- [Cópia consolidada utilizada na extração — UFAM](https://cefort.ufam.edu.br/tainacan/wp-content/uploads/2020/04/BNCC_EI_EF_110518_versaofinal_site.pdf).
- [Complemento de Computação — Secretaria de Educação de Goiás](https://goias.gov.br/educacao/wp-content/uploads/sites/40/2025/11/BNCCComputaoCompletodiagramado.pdf).

Cada referência guarda descrição, anos, componente e posição da página no arquivo PDF. Objetos de conhecimento cuja associação tabular não foi recuperada com segurança ficam sem preenchimento, com consulta à fonte. O código impresso EF05CO011 é normalizado para EF05CO11, preservando a origem no histórico da extração.

**Referência curricular não é certificação de domínio nem cobertura integral da BNCC.** O mapa identifica as referências com questões e as que ainda não possuem itens associados. A cobertura de habilidades continua parcial. Reconhecer uma estratégia de escrita, criação, investigação ou movimento não equivale a produzir um texto, fazer uma apresentação, experimentar ou executar uma prática corporal. Essas aprendizagens exigem outras evidências em contextos adequados. O aplicativo é material complementar, não um currículo escolar completo.

O marcador editorial identifica revisão interna do item e de seu vínculo; não representa homologação oficial nem avaliação pedagógica externa. Os níveis novos trabalham decisão/interpretação, justificativa e crítica de uma hipótese, além de variações numéricas nos bancos matemáticos específicos.

## Migração e histórico

Os bancos anteriores sem vínculo conferido foram arquivados. Não são oferecidos para novas avaliações. Seus índices e resultados não foram reutilizados nos novos percursos. As 77 trilhas e 770 perguntas-base históricas do 6º ano permanecem preservadas no código-fonte, com verificação por hash. Nos demais anos, as fontes anteriores também permanecem versionadas; o banco público leva somente seus nomes e índices para consulta ao histórico.

As notas antigas aparecem em Meu progresso e no CSV. XP é preservado entre anos. Duas trilhas de Matemática do 4º e 5º anos foram substituídas com a revisão bncc-2026; suas notas antigas ficam separadas das notas novas. As chaves históricas s-t-l continuam representando o 6º ano; outros anos usam ano:s-t-l, com sufixo de revisão quando necessário. A exclusão de progresso mantém a confirmação existente e abrange todos os anos.

## Manutenção e testes

Execute node curriculum/build.cjs e node scripts/validate-bncc.cjs; depois rode os testes Playwright. A validação confere códigos, anos, componentes, alternativas, estímulos, bancos publicados e preservação histórica. O relatório curriculum/coverage-report.json distingue itens ativos e índices arquivados; não mede domínio de habilidades. Os arquivos públicos gerados devem ser versionados junto com suas fontes.

Para reproduzir o catálogo, instale pdfplumber e execute python curriculum/extract-catalog.py --bncc-pdf caminho/BNCC.pdf --computacao-pdf caminho/Computacao.pdf. A extração requer conferência posterior nos documentos originais. O service worker armazena a interface, os questionários e as referências para uso offline após o primeiro acesso completo.
