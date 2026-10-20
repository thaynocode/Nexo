# Imagens do Unsplash nas aulas e nos questionários

As 77 lições e os questionários dos três níveis usam imagens do Unsplash. A etapa “Observe” não mostra os antigos painéis SVG. Os renderizadores dos problemas, das explicações e das revisões também usam imagens do CDN do Unsplash. Os termos em inglês usados na busca ficam no gerador; a interface é em português.

O navegador carrega somente metadados públicos e imagens diretamente do CDN do Unsplash, sem chamar a API e sem receber a chave. Os créditos incluem links para o autor e a imagem com parâmetros de referência. O parâmetro `ixid` é preservado. Sem rede, os textos e os dados dos exercícios continuam disponíveis e a interface informa quando a imagem não pode ser carregada.

As questões básicas de operações e expressões numéricas trazem situações de feira com laranjas; frações e porcentagens usam maçãs. O enunciado, os cartões de dados e a explicação retomam os mesmos objetos. A imagem é uma referência ao objeto, não uma fotografia da quantidade calculada. Nas operações básicas, o resultado aparece no cartão de resolução somente após a resposta. Os gêneros textuais usam imagens dos materiais associados às alternativas; depois da resposta, o feedback retoma o material correto e sua finalidade.

`exercise-contexts.js` contém roteiros por pergunta básica. Desafios compostos preservam os contextos de cada caso. Casos autorais usam o objeto ou a situação identificada no enunciado. `context-photos.js` contém 93 conjuntos de metadados públicos, reutilizados por contextos relacionados. Cobertura de renderização não significa que cada pergunta tenha uma foto exclusiva nem que a revisão pedagógica humana esteja concluída. Consulte CURADORIA-IMAGENS.md para limitações e itens pendentes.

Para atualizar as fotos, configure o segredo **UNSPLASH_ACCESS_KEY** em GitHub → Settings → Secrets and variables → Actions. Execute **Atualizar fotografias Unsplash** em Actions. O workflow propõe uma atualização por pull request; pode ser necessário permitir criação de pull requests por workflows nas configurações de Actions do repositório.

Localmente, configure a variável de ambiente e execute `node scripts/generate-context-photos.cjs`. O gerador reaproveita as imagens já escolhidas e busca somente consultas ausentes. `context-photo-queries.cjs` define as associações por contexto. O gerador legado de capas é `generate-unsplash.cjs`. Uma geração completa dos dois bancos pode exceder a quota da conta: retome a geração local após o restabelecimento da API. Não grave a chave nos arquivos ou commits.

Revise a adequação pedagógica das fotografias antes de publicar atualizações: o filtro `content_filter=high` reduz conteúdo sensível, mas não substitui revisão humana. Ajuste as consultas por lição em `scripts/unsplash-topics.cjs`.

Documentação: https://unsplash.com/documentation
