# Mapeamento BNCC do NEXO

## Resultado e limites

O inventário contém **1.387 habilidades** na organização por ano/bloco: 1.304 da base e 83 do complemento de Computação. Outros 21 códigos de Computação por etapa são preservados como organização alternativa, não somados como obrigações extras. Códigos de blocos valem para todo o bloco; sua aparição em vários anos não cria novas habilidades.

**Implementação pedagógica parcial:** 43 habilidades têm atividades específicas. As outras 1.344 têm somente roteiros comuns ao componente, exigindo escolha de situação, recursos e intervenção docente. Esses roteiros não são aulas completas nem evidência de cobertura integral. Há 33 vínculos revisados de apoio parcial entre trilhas e habilidades; os demais vínculos continuam pendentes. Não inferimos cobertura por semelhança de título ou quantidade de questões.

O mapa e o CSV expõem essa distinção. Salvar uma produção, marcar que recebeu retorno ou acertar um quiz não certifica domínio da habilidade.

## Distribuição por componente

| Componente | Habilidades únicas | Atividades específicas |
| --- | ---: | ---: |
| Ciências | 111 | 8 |
| Computação | 83 | 10 |
| Ensino Religioso | 63 | 9 |
| Geografia | 123 | 1 |
| História | 151 | 1 |
| Língua Portuguesa | 391 | 4 |
| Matemática | 247 | 7 |
| Língua Inglesa | 88 | 1 |
| Educação Física | 69 | 1 |
| Arte | 61 | 1 |

## Distribuição por ano

As habilidades de blocos aparecem em cada ano aplicável. Não some as linhas para obter o total de habilidades únicas.

| Ano | Habilidades aplicáveis | Com atividade específica | Com roteiro inicial |
| --- | ---: | ---: | ---: |
| 1º | 162 | 9 | 153 |
| 2º | 171 | 8 | 163 |
| 3º | 194 | 6 | 188 |
| 4º | 194 | 6 | 188 |
| 5º | 197 | 6 | 191 |
| 6º | 285 | 9 | 276 |
| 7º | 288 | 4 | 284 |
| 8º | 297 | 4 | 293 |
| 9º | 292 | 4 | 288 |

## Fontes e reprodução

- `curriculum/bncc/catalog.json` guarda enunciado normativo, ano/bloco, componente, página impressa, página do PDF e proveniência. Não inclui Educação Infantil nem Ensino Médio.
- `extract.py` usa a área visível dos PDFs: a base contém textos de páginas vizinhas fora da área de impressão. Extração ingênua duplica habilidades e erra as páginas.
- A fonte de Computação imprime `EF05CO011`. O catálogo normaliza para `EF05CO11`, mantém a grafia original em `sourceCode` e mostra a nota no app.
- Reproduza com `python curriculum/bncc/extract.py BASE.pdf COMPUTACAO.pdf` (PyMuPDF), seguido de `node curriculum/build.cjs`. As fontes abaixo têm hash SHA-256 registrado; uma nova edição exige revisão das contagens e diferenças, não apenas atualização dos testes.

- base: https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf
  - SHA-256: `81cd44ba5444ff1e8ff7b82d83512a49de9ce54efa72c4d285a452d3321128a4`
- computacao: https://goias.gov.br/educacao/wp-content/uploads/sites/40/2025/11/BNCCComputaoCompletodiagramado.pdf
  - SHA-256: `60aab0b192acf867bc582dc06678cd8f3bc597e8f1b65256fc7bf04190bb793d`

## Uso no app

Abra **Mapa BNCC**. Escolha componente, código ou conteúdo; abra um objetivo. Cada entrada distingue objetivo oficial, tipo de proposta, evidências esperadas, apoio parcial dos quizzes e lacunas. O CSV contém todas as entradas e pode ser usado como backlog de revisão.

Os registros das práticas usam `nexo-bncc-v1:<conta>:<ano>:<codigo>`. São locais, separados também entre anos de um mesmo bloco, e podem ser exportados em JSON por ano. Não são sincronizados pela integração de progresso existente. O app avisa esse limite antes de registrar. Não inclua dados pessoais sensíveis nos relatos.

Ensino Religioso recebe tratamento não confessional, com respeito a convicções religiosas e não religiosas, sem pedir adesão ou exposição de crenças pessoais. Computação inclui propostas desplugadas e, quando a habilidade pede, programação real em ambiente acompanhado pelo professor.

## Compatibilidade e validação

As 203 trilhas, seus índices e os bancos de questionários existentes não foram reordenados. O mapa é uma área complementar: não altera notas, tentativas, XP, metas de 7/8/9, desbloqueios, cópias de erros ou chaves históricas do 6º ano. Não substitui nem renomeia as antigas matérias.

O build produz `public/bncc-catalog.json` e `public/bncc-mapping.csv`. O cache v32 inclui os novos recursos para uso offline após instalação completa. Os testes verificam distribuição dos códigos, blocos, fontes, geração reproduzível, referências, registros separados, tratamento de falha de armazenamento e escape de conteúdo. A interface testa persistência, troca de ano e recuperação após falha de rede. Isso não substitui validação pedagógica especializada.

## Trabalho curricular ainda necessário

1. Especificar e revisar as 1.344 situações que hoje têm apenas um roteiro de componente. A descrição normativa sozinha não serve como atividade.
2. Revisar os vínculos das demais trilhas e cada item que se pretende usar como evidência. Um vínculo de trilha é apoio parcial, não etiqueta automática para todos os seus itens e níveis.
3. Criar avaliações e rubricas próprias para os objetivos, incluindo práticas corporais, escuta, oralidade, experimentação, programação e produção autoral. Não converter essas habilidades em domínio por múltipla escolha.
4. Validar sequenciamento de habilidades de blocos com o currículo da rede e as condições da escola. O catálogo não inventa uma distribuição normativa anual para esses blocos.
