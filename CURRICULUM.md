# Questionários do Ensino Fundamental

O Nexo oferece seleção do 1º ao 9º ano. Os 77 temas e as 770 perguntas-base do 6º ano foram preservados. Nos demais anos, esta seleção reúne 126 temas, cada um com dez questões por nível (3.780 questões ao todo).

| Anos | Matérias | Trilhas por ano |
| --- | --- | --- |
| 1º a 5º | Português, Matemática, Ciências, História, Geografia, Artes e Educação Física | 15 |
| 7º a 9º | As sete anteriores e Inglês | 17 |

Há três níveis e as metas de 7, 8 e 9 acertos. Matemática usa situações numéricas com variação de dificuldade. Nas demais áreas, o iniciante trabalha uma questão por vez; os níveis seguintes relacionam dois e três casos. No 1º e 2º ano, os desafios combinados ficam limitados a dois casos e podem ser acompanhados por um adulto durante a leitura. As correções permanecem nos questionários. Não há aulas expositivas nem integração com Unsplash.

## Referência e abrangência

A seleção de temas usa como referência a [BNCC oficial do MEC](https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf), especialmente os quadros de Língua Portuguesa (p. 89–191), Arte (p. 199–211), Educação Física (p. 224–239), Inglês (p. 247–263), Matemática (p. 276–319), Ciências (p. 331–351), Geografia (p. 367–395) e História (p. 403–433), segundo a numeração impressa.

As perguntas são autorais. Não se trata de transcrição de livros, de uma avaliação oficial nem de uma cobertura exaustiva de todas as habilidades da BNCC. Alguns objetos são previstos em blocos de anos: a distribuição aqui organiza uma sequência de aprendizagem e deve ser ajustada à proposta pedagógica da escola. A seleção mantém as áreas que já existiam no Nexo; não acrescenta Ensino Religioso.

## Manutenção

- Edite os arquivos de `curriculum/` e execute `node curriculum/build.cjs`.
- O banco público gerado é `public/grade-bank.js` e funciona offline pelo service worker.
- Execute `node scripts/validate-grades.cjs` e os testes Playwright.
- Preserve a ordem de matérias e trilhas existentes: os identificadores de progresso usam seus índices.
- As chaves históricas `s-t-l` continuam representando o 6º ano. Novos anos usam `ano:s-t-l`. O formato de armazenamento e sincronização continua o mesmo.
- Notas, erros, tentativas e desbloqueios são separados por ano. XP é um total de todos os anos. O relatório CSV corresponde ao ano selecionado; apagar o progresso remove todos os anos e informa isso na confirmação.
- A escolha do ano fica salva no aparelho. Instalações existentes abrem inicialmente no 6º ano, preservando a jornada anterior.
