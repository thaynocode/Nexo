"""Reextrai o catálogo de PDFs oficiais: python extract.py BASE.pdf COMPUTACAO.pdf.
Requer PyMuPDF. A extração respeita a área visível (a base contém objetos fora da página).
"""
import sys,re,json,hashlib
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[2]
SOURCES=[dict(id='base',url='https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf',mirror='https://cefort.ufam.edu.br/repositoriocp/wp-content/uploads/tainacan-items/71/3916/BNCC_EI_EF_110518_versaofinal.pdf'),dict(id='computacao',url='https://goias.gov.br/educacao/wp-content/uploads/sites/40/2025/11/BNCCComputaoCompletodiagramado.pdf',norm='https://portal.mec.gov.br/docman/outubro-2022-pdf/241671-rceb001-22/file')]
NAMES=dict(LP='Língua Portuguesa',MA='Matemática',CI='Ciências',HI='História',GE='Geografia',AR='Arte',EF='Educação Física',LI='Língua Inglesa',ER='Ensino Religioso',CO='Computação')
records=[]
for source,filename in zip(SOURCES,sys.argv[1:]):
 source['sha256']=hashlib.sha256(Path(filename).read_bytes()).hexdigest()
 doc=fitz.open(filename)
 for i,page in enumerate(doc):
  if source['id']=='base' and not 90<i<462: continue
  for block in page.get_text('blocks'):
   text=block[4]; matches=list(re.finditer(r'\((EF\d{2}[A-Z]{2}\d{2,3})\)',text))
   for j,m in enumerate(matches):
    original=m[1];code=original.replace('EF05CO011','EF05CO11')
    desc=' '.join(text[m.end():matches[j+1].start() if j+1<len(matches) else None].split())
    desc=desc.replace('fonema- -grafema','fonema-grafema')
    group=code[2:4];years=[int(group)] if group.startswith('0') else list(range(int(group[0]),int(group[1])+1))
    item=dict(code=code,component=NAMES[code[4:6]],years=years,description=desc,source=source['id'],pdfPage=i+1,page=i+1-(2 if source['id']=='base' else 4),organization='etapa' if code[4:6]=='CO' and not group.startswith('0') else 'ano-ou-bloco')
    if original!=code:item['sourceCode']=original
    records.append(item)
assert len(records)==1408,len(records)
assert len({s['code'] for s in records})==len(records)
out=dict(version=1,sources=SOURCES,skills=sorted(records,key=lambda s:s['code']))
(ROOT/'curriculum/bncc/catalog.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('Catálogo:',len(records),'códigos; 1.387 na organização por ano/bloco + 21 alternativas por etapa de Computação.')
