/* NEXO — fotografias de apoio aos questionários, sem aulas ou área de estudo. */
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
  'photo-1513364776144-60967b0f800f','photo-1460661419201-fd4cecdf8a8b','photo-1513475382585-d06e58bcb0e0']},
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

function addStyles(){
 if(document.getElementById('nexo-premium-styles'))return;
 const s=document.createElement('style');s.id='nexo-premium-styles';s.textContent=`
 .nexo-premium-photo{margin:22px 0 28px;overflow:hidden;border:1px solid var(--line);border-radius:22px;background:var(--surface)}
 .nexo-photo-zoom{display:block;position:relative;width:100%;padding:0;border:0;background:#10182b;cursor:zoom-in;text-align:left}
 .nexo-photo-zoom img{display:block;width:100%;height:clamp(210px,42vw,420px);object-fit:cover;transition:transform .3s}
 .nexo-photo-zoom:hover img{transform:scale(1.015)}
 .nexo-photo-zoom span{position:absolute;right:14px;bottom:14px;background:#080d20d9;color:white;border:1px solid #ffffff55;border-radius:12px;padding:10px 13px;font-size:13px;font-weight:700}
 .nexo-premium-photo figcaption{padding:13px 17px;color:var(--muted);font-size:13px;line-height:1.55}.nexo-photo-unavailable .nexo-photo-zoom img{display:none}.nexo-photo-unavailable .nexo-photo-zoom span{position:static;display:block;padding:22px;color:var(--muted)}
 .nexo-premium-photo figcaption small{display:block;margin-top:4px;opacity:.7}
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
const originalQuiz=quiz;
quiz=function(){let html=originalQuiz();if(!questions[idx])return html;return html.replace('<div class="panel"><div class="statline">',''+figure(DATA[sIdx]?.name,DATA[sIdx]?.topics?.[tIdx]?.name,'Imagem de apoio para esta trilha.')+'<div class="panel"><div class="statline">')};
const originalRender=render;
render=function(){originalRender();if(view==='quiz'){addStyles();enrichUnsplash()}};
addStyles();
render();
})();