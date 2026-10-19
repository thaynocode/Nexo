# Fotografias nas aulas e nos questionários

As 77 lições e os desafios de todos os níveis usam fotos de contexto do Unsplash. As fotos complementam os diagramas existentes. Elas não são evidência para resolver perguntas nem substituem figuras com medidas, mapas ou modelos científicos. Os termos em inglês usados na busca ficam no gerador; a interface é em português.

O navegador carrega somente metadados públicos e imagens diretamente do CDN do Unsplash, sem chamar a API e sem receber a chave. Os créditos incluem links para o fotógrafo e a foto com parâmetros de referência. O parâmetro `ixid` é preservado. O aplicativo continua funcionando sem rede; fotos não disponíveis ficam ocultas e as ilustrações didáticas locais permanecem disponíveis.

Para atualizar as fotos, configure o segredo **UNSPLASH_ACCESS_KEY** em GitHub → Settings → Secrets and variables → Actions. Execute **Atualizar fotografias Unsplash** em Actions. O workflow propõe uma atualização por pull request; pode ser necessário permitir criação de pull requests por workflows nas configurações de Actions do repositório.

Localmente, configure a variável de ambiente e execute `node scripts/generate-unsplash.cjs`. O gerador reaproveita consultas já concluídas; `--refresh` atualiza todas. São menos de 50 consultas por geração completa, agrupando contextos relacionados. Uma falha de quota encerra o processo preservando os resultados já obtidos. Não grave a chave nos arquivos ou commits.

Revise a adequação pedagógica das fotografias antes de publicar atualizações: o filtro `content_filter=high` reduz conteúdo sensível, mas não substitui revisão humana. Ajuste as consultas por lição em `scripts/unsplash-topics.cjs`.

Documentação: https://unsplash.com/documentation
