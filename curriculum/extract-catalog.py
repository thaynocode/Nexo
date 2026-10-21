import pdfplumber,re,json,pathlib,hashlib,argparse
parser=argparse.ArgumentParser(description='Extrair quadros de habilidades dos PDFs nacionais da BNCC e Computação.')
parser.add_argument('--bncc-pdf',required=True,type=pathlib.Path)
parser.add_argument('--computacao-pdf',required=True,type=pathlib.Path)
parser.add_argument('--output',type=pathlib.Path,default=pathlib.Path(__file__).parent/'bncc-catalog.json')
args=parser.parse_args()
root=pathlib.Path('.')
target=args.output.parent
pattern=re.compile(r'\(?(EF\d{2}(?:LP|MA|CI|HI|GE|AR|EF|LI|ER|CO)\d{2,3})\)\s*')
records={}; aliases=[]
for name,file,url,first in [('bncc',args.bncc_pdf,'https://cefort.ufam.edu.br/tainacan/wp-content/uploads/2020/04/BNCC_EI_EF_110518_versaofinal_site.pdf',80),('computacao',args.computacao_pdf,'https://goias.gov.br/educacao/wp-content/uploads/sites/40/2025/11/BNCCComputaoCompletodiagramado.pdf',12)]:
 with pdfplumber.open(root/file) as pdf:
  for i,page in enumerate(pdf.pages):
   if i<first:continue
   previous=pdf.pages[i-1].extract_tables({'text_x_tolerance':1}) if i and name=='bncc' else []
   tables=page.extract_tables({'text_x_tolerance':1})
   for ti,table in enumerate(tables):
    strand=None;obj=None
    left=previous[ti] if ti<len(previous) and len(previous[ti])==len(table) and any('OBJETOS DE CONHECIMENTO' in re.sub(r'\s+',' ',str(c)) for row in previous[ti][:3] for c in row) else None
    for ri,row in enumerate(table):
     source_row=left[ri] if left else (row if name=='computacao' else [])
     if len(source_row)>=3:
      if source_row[0] and not pattern.search(source_row[0]):strand=re.sub(r'\s+',' ',source_row[0]).strip()
      if source_row[1] and not pattern.search(source_row[1]):obj=re.sub(r'\s+',' ',source_row[1]).strip()
     if name=='computacao' and strand:
      compact=re.sub(r'\s+','',strand).upper()
      if 'LANOICATUPMOC' in compact or 'PENSAMENTO' in compact:strand='Pensamento Computacional'
      elif 'ARUTLUC' in compact or 'CULTURA' in compact:strand='Cultura Digital'
      elif 'ODNUM' in compact or 'MUNDO' in compact:strand='Mundo Digital'
     for cell in row:
      if not cell:continue
      matches=list(pattern.finditer(cell))
      for j,m in enumerate(matches):
       code=m.group(1); desc=cell[m.end():matches[j+1].start() if j+1<len(matches) else len(cell)]
       desc=re.sub(r'\s+',' ',desc).strip()
       if len(desc)<20:continue
       original=code
       if code=='EF05CO011':
        code='EF05CO11';aliases.append({'sourceCode':original,'code':code,'page':i+1,'reason':'Zero excedente na numeração impressa do anexo; preservado em sourceCode.'})
       grade=code[2:4];years=list(range(int(grade[0]),int(grade[1])+1)) if grade in ['12','15','35','67','69','89'] else [int(grade)]
       if any(g<1 or g>9 for g in years):continue
       record={'code':code,'years':years,'subjectCode':code[4:6],'description':desc,'strand':strand,'objectOfKnowledge':obj,'source':{'url':url,'pdfPage':i+1,'sourceCode':original},'kind':'complement' if name=='computacao' else 'base'}
       if code not in records or len(desc)>len(records[code]['description']):records[code]=record
  print(name,'páginas lidas',len(pdf.pages),flush=True)
target.mkdir(exist_ok=True)
data={'sources':[{'url':'https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf','label':'BNCC — MEC'},{'url':url,'label':'Computação — complemento à BNCC'}],'sourceAliases':list({a['sourceCode']:a for a in aliases}.values()),'skills':dict(sorted(records.items()))}
args.output.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Catálogo:',len(records),'códigos únicos; aliases:',data['sourceAliases'])
for sub in ['LP','MA','CI','HI','GE','AR','EF','LI','ER','CO']:print(sub,sum(x['subjectCode']==sub for x in records.values()))
