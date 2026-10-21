/* NEXO Premium Study Experience
 * Adds guided study screens, accessible real-photo illustrations and optional
 * Unsplash search. No API key is embedded: set window.NEXO_UNSPLASH_ACCESS_KEY
 * through the deployment's public configuration only if you choose to enable it.
 */
(function(){
'use strict';
const photoSets=[
 {subject:/portugu|literatura|leitura|escrita|gramática|texto|inglês/i,urls:[
  'photo-1455390582262-044cdead277a','photo-1516979187457-637abb4f9353','photo-1456513080510-7bf3a84b82f8']},
 {subject:/matemática/i,urls:[
  'photo-1509228468518-180dd4864904','photo-1635070041078-e363dbe005cb','photo-1509869175650-a1d97972541a']},
 {subject:/ciências/i,urls:[
  'photo-1532094349884-543bc11b234d','photo-1532187863486-abf9dbad1b69','photo-1507413245164-6160d8298b31']},
 {subject:/história/i,urls:[
  'photo-1461360228754-6e81c478b882','photo-1461360370896-922624d12aa1','photo-1519682337058-a94d519337bc']},
 {subject:/geografia/i,urls:[
  'photo-1441974231531-c6227db76b6e','photo-1470071459604-3b5ec3a7fe05','photo-1500530855697-b586d89ba3ee']},
 {subject:/artes/i,urls:[
  'photo-1513364776144-60967b0f800f','photo-146 painting','photo-1513475382585-d06e58bcb0e0']},
 {subject:/educação física/i,urls:[
  'photo-1461896836934-ffe607ba8211','photo-1530549387789-4c1017266635','photo-1517649763962-0c623066013b']},
 {subject:/natureza|planta|animal|ecossistema|ambiente|terra|água|energia|corpo|célula|universo|clima/i,urls:[
  'photo-1470071459604-3b5ec3a7fe05','photo-1518837695005-2083093ee35b','photo-1462331940025-496dfbfc7564']}
];
const photoCacheKey='nexo-premium-photo-cache-v1';
const escText=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const titleFor=(s,t)=>String(t?.name||t?.title||'Conteúdo');
function photoUrl(id){return 'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1400&q=82&fm=webp'}
function photoFor(subject,title){
 const topic=String(title||'').toLowerCase();
 const subjectSet=photoSets.find(x=>x.subject.test(subject||''))||photoSets[2];
 const topicSet=photoSets.find(x=>x.subject.test(topic));
 const set=topicSet||subjectSet;
 const valid=set.urls.filter(x=>!x.includes(' '));
 const n=[...String(subject||''),...topic].reduce((a,c)=>a+c.charCodeAt(0),0);
 return photoUrl(valid[n%valid.length]||'photo-1503676260728-1c00da094a0b');
}
function figure(subject,title,caption){
 const alt='Fotografia ilustrativa de '+String(title||subject||'conteúdo escolar').toLowerCase();
 return '<figure class="nexo-premium-photo" data-nexo-photo data-subject="'+escText(subject)+'" data-topic="'+escText(title)+'"><button class="nexo-photo-zoom" type="button" aria-label="Ampliar imagem" onclick="openLessonImage(this.closest(\'figure\').querySelector(\'img\'))"><img loading="lazy" decoding="async" src="'+photoFor(subject,title)+'" alt="'+escText(alt)+'" referrerpolicy="no-referrer"><span>⤢ Ampliar</span></button><figcaption>'+escText(caption||('Explore visualmente: '+title+'.'))+' <small>Imagem ilustrativa · Unsplash</small></figcaption></figure>';
}

function nexoPhotoFallback(img){
 const pool=['photo-1503676260728-1c00da094a0b','photo-1509062522246-3755977927d7','photo-1516979187457-637abb4f9353'];
 const n=Number(img.dataset.fallbackAttempt||0)+1;img.dataset.fallbackAttempt=String(n);
 if(n>pool.length){img.closest('figure')?.classList.add('nexo-photo-unavailable');img.alt='Imagem ilustrativa indisponível';return}
 img.src=photoUrl(pool[n-1]);
}

function getAuthoredLesson(){
 const all=window.NEXO_LESSONS;
 return grade===6&&Array.isArray(all)&&Array.isArray(all[sIdx])?all[sIdx][tIdx]||null:null;
}
function buildStudy(){
 const topic=DATA[sIdx]?.topics?.[tIdx];
 const subject=DATA[sIdx]?.name||'Conteúdo';
 if(!topic)return '<section class="panel"><h2>Conteúdo indisponível</h2><button class="ghost" onclick="navigate(\'topic\')">Voltar</button></section>';
 const lesson=getAuthoredLesson();
 const title=lesson?.title||topic.name;
 const summary=lesson?.summary||('Nesta revisão guiada de '+topic.name+', vamos retomar as ideias principais de '+subject.toLowerCase()+' e relacioná-las às questões da trilha. Leia cada conceito e observe por que ele é importante antes de iniciar o desafio.');
 const objective=lesson?.objective||('Compreender os conceitos centrais de '+topic.name+' e aplicá-los às situações apresentadas no questionário.');
 const sections=Array.isArray(lesson?.sections)?lesson.sections:[];
 const steps=Array.isArray(lesson?.lessonSteps)?lesson.lessonSteps:[];
 const examples=Array.isArray(lesson?.examples)?lesson.examples:[];
 const contexts=Array.isArray(lesson?.contextExamples)?lesson.contextExamples:[];
 const questions=(topic.questions||[]).filter(q=>q&&q.q&&Array.isArray(q.opts)&&Number.isInteger(q.answer));
 const cards=[];
 if(steps.length)steps.forEach((x,i)=>cards.push('<article class="nexo-study-card"><span class="nexo-step">ETAPA '+(i+1)+'</span><h3>'+escText(x.title||'Ideia principal')+'</h3><p>'+escText(x.body||'')+'</p></article>'));
 else if(sections.length)sections.forEach((x,i)=>cards.push('<article class="nexo-study-card"><span class="nexo-step">CONCEITO '+(i+1)+'</span><h3>'+escText(x.heading||'Ideia principal')+'</h3><p>'+escText(x.text||'')+'</p></article>'));
 else questions.slice(0,3).forEach((q,i)=>cards.push('<article class="nexo-study-card"><span class="nexo-step">PONTO-CHAVE '+(i+1)+'</span><h3>'+escText(q.q)+'</h3><p><strong>Resposta:</strong> '+escText(q.opts[q.answer])+'</p><p>'+escText(q.explanation||'Compare as alternativas e explique o motivo da escolha.')+'</p></article>'));
 const extraExamples=[...examples.map(x=>({title:x.title||'Exemplo explicado',text:x.text||''})),...contexts.map(x=>({title:x.concept||'No cotidiano',text:x.explanation||''}))];
 const photoCaption=lesson?.visual?.labels?.length?'Observe os elementos visuais e conecte-os às ideias da aula.':'Observe a fotografia e relacione-a ao assunto estudado.';
 return '<button class="back" onclick="navigate(\'topic\')">← Voltar à trilha</button><section class="nexo-study-hero"><span class="eyebrow">NEXO • ROTA DE APRENDIZAGEM</span><h1>'+escText(title)+'</h1><p>'+escText(summary)+'</p><div class="nexo-objective"><strong>O QUE VOCÊ VAI APRENDER</strong><p>'+escText(objective)+'</p></div></section>'+figure(subject,title,photoCaption)+'<section class="nexo-study-section"><div class="section-head"><h2>Vamos entender</h2><span class="muted">'+(lesson?'AULA GUIADA':'REVISÃO GUIADA')+'</span></div><div class="nexo-study-grid">'+cards.join('')+'</div></section>'+(extraExamples.length?'<section class="nexo-study-section"><div class="section-head"><h2>Exemplos e conexões</h2></div><div class="nexo-study-grid">'+extraExamples.slice(0,6).map(x=>'<article class="nexo-study-card"><h3>'+escText(x.title)+'</h3><p>'+escText(x.text)+'</p></article>').join('')+'</div></section>':'')+(lesson?.studyTip?'<aside class="nexo-study-tip"><strong>💡 DICA DE ESTUDO</strong><p>'+escText(lesson.studyTip)+'</p></aside>':'')+'<section class="nexo-study-start"><div><span class="eyebrow">HORA DE PRATICAR</span><h2>Vamos testar o que você aprendeu?</h2><p>Responda às questões, leia o feedback e use os erros como pistas para aprender.</p></div><button class="primary" onclick="navigate(\'topic\');start(0)">Começar nível iniciante →</button></section>';
}
function addStyles(){
 if(document.getElementById('nexo-premium-styles'))return;
 const s=document.createElement('style');s.id='nexo-premium-styles';s.textContent=`
 .nexo-study-hero{padding:clamp(24px,4vw,42px);border:1px solid #554a8d;border-radius:26px;background:radial-gradient(circle at 90% 10%,#433779 0,transparent 40%),linear-gradient(135deg,#20234a,#121b31);margin:18px 0}
 .nexo-study-hero h1{max-width:850px;font-size:clamp(30px,5vw,48px);margin:12px 0}
 .nexo-study-hero>p{max-width:850px;font-size:17px}
 .nexo-objective{margin-top:22px;padding:17px 19px;border-radius:16px;background:#ffffff0b;border:1px solid #ffffff18}
 .nexo-objective strong,.nexo-step{font-size:11px;letter-spacing:1.3px;color:#c5b8ff;font-weight:800}
 .nexo-objective p{margin:8px 0 0;color:#f0edff}
 .nexo-premium-photo{margin:22px 0 28px;overflow:hidden;border:1px solid var(--line);border-radius:22px;background:var(--surface)}
 .nexo-photo-zoom{display:block;position:relative;width:100%;padding:0;border:0;background:#10182b;cursor:zoom-in;text-align:left}
 .nexo-photo-zoom img{display:block;width:100%;height:clamp(210px,42vw,420px);object-fit:cover;transition:transform .3s}
 .nexo-photo-zoom:hover img{transform:scale(1.015)}
 .nexo-photo-zoom span{position:absolute;right:14px;bottom:14px;background:#080d20d9;color:white;border:1px solid #ffffff55;border-radius:12px;padding:10px 13px;font-size:13px;font-weight:700}
 .nexo-premium-photo figcaption{padding:13px 17px;color:var(--muted);font-size:13px;line-height:1.55}.nexo-photo-unavailable .nexo-photo-zoom img{display:none}.nexo-photo-unavailable .nexo-photo-zoom span{position:static;display:block;padding:22px;color:var(--muted)}
 .nexo-premium-photo figcaption small{display:block;margin-top:4px;opacity:.7}
 .nexo-study-section{margin:30px 0}
 .nexo-study-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}
 .nexo-study-card{background:var(--surface);border:1px solid var(--line);border-radius:19px;padding:23px;min-width:0}
 .nexo-study-card h3{font-size:19px;line-height:1.35;margin:10px 0}
 .nexo-study-card p{line-height:1.7;margin:8px 0}
 .nexo-study-card strong{color:#e7e0ff}
 .nexo-study-tip{border:1px solid #7b6ac8;background:#201c43;border-radius:18px;padding:20px;margin:22px 0}
 .nexo-study-tip p{margin:7px 0 0;color:#f1edff}
 .nexo-study-start{display:flex;justify-content:space-between;align-items:center;gap:20px;border:1px solid #554a8d;border-radius:23px;padding:24px;background:linear-gradient(115deg,#211e48,#172a3c);margin:28px 0}
 .nexo-study-start h2{margin:7px 0;font-size:clamp(20px,3vw,28px)}
 .nexo-study-start p{margin:0}
 .nexo-study-start .primary{flex-shrink:0}
 @media(max-width:650px){.nexo-study-grid{grid-template-columns:1fr}.nexo-study-start{align-items:stretch;flex-direction:column}.nexo-study-start .primary{width:100%}.nexo-study-card{padding:19px}.nexo-photo-zoom img{height:240px}}
 `;document.head.appendChild(s);
}
function parseCache(){try{return JSON.parse(localStorage.getItem(photoCacheKey)||'{}')}catch{return {}}}
function cachePhoto(key,url){try{const c=parseCache();c[key]=url;localStorage.setItem(photoCacheKey,JSON.stringify(c))}catch{}}
async function enrichUnsplash(){
 const key=window.NEXO_UNSPLASH_ACCESS_KEY;
 if(!key)return;
 const figures=[...document.querySelectorAll('[data-nexo-photo]')];
 for(const f of figures){
  const img=f.querySelector('img');if(!img)continue;
  const subject=f.dataset.subject||'',topic=f.dataset.topic||'';
  const cacheKey=(subject+'|'+topic).toLowerCase();
  const cached=parseCache()[cacheKey];if(cached){img.src=cached;continue}
  try{
   const q=encodeURIComponent(subject+' '+topic+' education real photography');
   const res=await fetch('https://api.unsplash.com/search/photos?per_page=1&orientation=landscape&content_filter=high&query='+q,{headers:{Authorization:'Client-ID '+key}});
   if(!res.ok)continue;
   const data=await res.json();const p=data.results?.[0];if(!p?.urls?.regular)continue;
   const url=p.urls.raw+'?fit=crop&w=1400&q=82&fm=webp';
   cachePhoto(cacheKey,url);img.src=url;
   if(p.links?.html)f.querySelector('figcaption').insertAdjacentHTML('beforeend',' · <a href="'+escText(p.links.html)+'" target="_blank" rel="noopener noreferrer">Fonte</a>');
  }catch(e){console.warn('NEXO: imagem premium indisponível; mantendo alternativa.',e)}
 }
}
const originalTopic=topic;
topic=function(){return originalTopic().replace('<div class="levels">','<section class="panel nexo-study-entry" style="margin:18px 0;display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap"><div><span class="eyebrow">ANTES DO DESAFIO</span><h2 style="margin:7px 0">Estude primeiro, pratique depois</h2><p style="margin:0">Leia a explicação, explore a imagem e só então comece o questionário.</p></div><button class="primary" onclick="navigate(\'study\')">📖 Estudar conteúdo →</button></section><div class="levels">')};
const originalQuiz=quiz;
quiz=function(){let html=originalQuiz();if(!questions[idx])return html;return html.replace('<div class="panel"><div class="statline">',''+figure(DATA[sIdx]?.name,DATA[sIdx]?.topics?.[tIdx]?.name,'Imagem de apoio para esta trilha.')+'<div class="panel"><div class="statline">')};
const originalRender=render;
render=function(){
 if(view==='study'){
  addStyles();
  app.innerHTML=header()+'<div id="nexo-cloudbar" class="cloudbar"></div>'+buildStudy()+'<div class="foot">NEXO • Aprender é evoluir. Guia de estudo e prática complementar.</div>';
  NexoCloud.updateBar();
  enrichUnsplash();
  return;
 }
 originalRender();
 if(view==='quiz'){addStyles();enrichUnsplash()}
};
addStyles();
render();
})();