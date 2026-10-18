(function(){
'use strict';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const colors=['#4b5c91','#356c79','#6a518e','#346f64'];
function wrap(value,max=22){
 const words=String(value).split(/\s+/),out=[];
 for(const word of words){if(!out.length||((out[out.length-1]+' '+word).length>max))out.push(word);else out[out.length-1]+=' '+word;}
 return out.slice(0,4);
}
function txt(x,y,value,size=18,color='#f8faff',weight=650){
 return '<text x="'+x+'" y="'+y+'" fill="'+color+'" font-family="system-ui,Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'" text-anchor="middle">'+escape(value)+'</text>';
}
function panel(x,y,w,h,color){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="19" fill="'+color+'"/>'}
function render(s,t,lesson){
 const entry=window.NEXO_VISUAL_SPECS?.[s]?.[t];
 if(!entry)return null;
 const [kind,...rows]=entry;
 if(rows.length<2||rows.length>4)return null;
 const width=760,height=390,gap=13,margin=23,w=(width-2*margin-gap*(rows.length-1))/rows.length;
 let art='<rect width="760" height="390" rx="25" fill="#152039"/><circle cx="706" cy="38" r="112" fill="#223253" opacity=".55"/>';
 const parsed=rows.map(row=>row.split('|'));
 const title=String(lesson?.title||'Aula');
 art+=txt(380,40,title.toUpperCase(),20,'#e5ddff',750);
 parsed.forEach((parts,i)=>{
  const [heading,example='',note='']=parts;
  const x=margin+i*(w+gap),cx=x+w/2;
  art+=panel(x,65,w,281,colors[i]);
  wrap(heading,rows.length===4?15:20).slice(0,2).forEach((line,j)=>{art+=txt(cx,104+j*24,line,rows.length===4?16:18,'#ffffff',800)});
  art+='<line x1="'+(x+14)+'" y1="155" x2="'+(x+w-14)+'" y2="155" stroke="#dce5ff" opacity=".38" stroke-width="2"/>';
  const exampleLines=wrap(example,rows.length===4?15:23);
  exampleLines.slice(0,3).forEach((line,j)=>{art+=txt(cx,205+j*26,line,rows.length===4?17:19,'#ffffff',700)});
  wrap(note,rows.length===4?16:23).slice(0,2).forEach((line,j)=>{art+=txt(cx,297+j*21,line,rows.length===4?13:15,'#dbe9ff',500)});
  if(kind==='process'&&i<rows.length-1)art+=txt(x+w+gap/2,213,'›',26,'#e5d6ff',900);
 });
 const description=parsed.map(row=>row.filter(Boolean).join(': ')).join('; ');
 const caption=(kind==='process'?'Sequência explicada: ':'Comparação de conceitos: ')+description+'.';
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 390" role="img" aria-label="'+escape(caption)+'">'+art+'</svg>';
 return {src:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg),caption};
}
window.NEXO_DIDACTIC_VISUAL=render;
})();