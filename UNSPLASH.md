# Fotografias nas aulas e nos questionários

As lições usam fotos de contexto do Unsplash para complementar os diagramas existentes. Os questionários não usam fotografias escolhidas apenas pelo tema da aula: alternativas de gêneros textuais recebem exemplos autorais específicos e a explicação retoma o gênero correto. Alternativas sem um exemplo específico permanecem em texto, sem fotografia genérica. A lição de gêneros textuais usa uma galeria dos gêneros e a de operações mostra maçãs para representar unidades e grupos. Os termos em inglês usados na busca de fotos ficam no gerador; a interface é em português.

O navegador carrega somente metadados públicos e imagens diretamente do CDN do Unsplash, sem chamar a API e sem receber a chave. Os créditos incluem links para o fotógrafo e a foto com parâmetros de referência. O parâmetro `ixid` é preservado. O aplicativo continua funcionando sem rede; fotos não disponíveis ficam ocultas e as ilustrações didáticas locais permanecem disponíveis.

As 10 questões básicas de operações agora trazem situações de feira, com laranjas, caixas e cestas no enunciado, nas alternativas e na explicação. Os cartões visuais mostram as quantidades do próprio problema; o resultado aparece no cartão de resolução somente após a resposta. Quantidades grandes são indicadas por números para evitar que uma pequena quantidade de desenhos seja confundida com o total.

A revisão pedagógica de todos os demais questionários ainda está pendente. Esta mudança não deve ser apresentada como cobertura integral de ilustrações específicas por pergunta. As fotografias genéricas foram retiradas dos quizzes enquanto os exemplos específicos são elaborados.

Para atualizar as fotos, configure o segredo **UNSPLASH_ACCESS_KEY** em GitHub → Settings → Secrets and variables → Actions. Execute **Atualizar fotografias Unsplash** em Actions. O workflow propõe uma atualização por pull request; pode ser necessário permitir criação de pull requests por workflows nas configurações de Actions do repositório.

Localmente, configure a variável de ambiente e execute `node scripts/generate-unsplash.cjs`. O gerador reaproveita consultas já concluídas; `--refresh` atualiza todas. São menos de 50 consultas por geração completa, agrupando contextos relacionados. Uma falha de quota encerra o processo preservando os resultados já obtidos. Não grave a chave nos arquivos ou commits.

Revise a adequação pedagógica das fotografias antes de publicar atualizações: o filtro `content_filter=high` reduz conteúdo sensível, mas não substitui revisão humana. Ajuste as consultas por lição em `scripts/unsplash-topics.cjs`.

Documentação: https://unsplash.com/documentation
