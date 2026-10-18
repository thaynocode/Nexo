(function(){
'use strict';
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T=(x,y,s,n=18,color='#f8fbff',w=650)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="'+n+'" font-weight="'+w+'" fill="'+color+'">'+E(s)+'</text>';
const R=(x,y,w,h,color,r=16)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+color+'"/>';
const L=(x,y,X,Y,color='#c6d4f4',w=3)=>'<line x1="'+x+'" y1="'+y+'" x2="'+X+'" y2="'+Y+'" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round"/>';
const C=(x,y,r,color)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+color+'"/>';
const palette=['#586bc0','#329c99','#a076ce','#d5a15e'];
const wrap=(value,n=24)=>{const words=String(value||'').split(/\s+/),lines=[];for(const word of words){if(!lines.length||((lines.at(-1)+' '+word).length>n))lines.push(word);else lines[lines.length-1]+=' '+word;}return lines.slice(0,3)};
const lines=(x,y,s,n=22,size=19,dy=25)=>wrap(s,n).map((v,i)=>T(x,y+i*dy,v,size)).join('');
const icon=(s,t,i,x,y)=>{
 const id=(s*17+t*7+i)%7;
 let a='';
 if(id===0){a+=C(x,y,30,'#263c6e')+C(x,y,17,'#80d6cb')+C(x,y,7,'#f6d88b')}
 if(id===1){a+=R(x-30,y-28,60,56,'#253f6a',12)+L(x-18,y-10,x+18,y-10,'#a8d8f5',4)+L(x-18,y+3,x+12,y+3,'#a8d8f5',4)+L(x-18,y+16,x+2,y+16,'#a8d8f5',4)}
 if(id===2){a+='<path d="M'+(x-28)+' '+(y+15)+' L'+x+' '+(y-26)+' L'+(x+28)+' '+(y+15)+' Z" fill="#8bb7f6"/>'+R(x-20,y+15,40,15,'#466d99')}
 if(id===3){a+=C(x,y,29,'#2d5273')+'<path d="M'+(x-24)+' '+y+' Q'+x+' '+(y-38)+' '+(x+24)+' '+y+' Q'+x+' '+(y+38)+' '+(x-24)+' '+y+'" fill="none" stroke="#85e2cb" stroke-width="4"/>'+L(x-26,y,x+26,y,'#f4d58a',3)}
 if(id===4){a+=R(x-29,y-29,58,58,'#2b4677',10);for(let j=0;j<3;j++)a+=C(x-16+j*16,y-10,5,'#f2d28a')+C(x-16+j*16,y+11,5,'#8cdbd2')}
 if(id===5){a+='<path d="M'+(x-31)+' '+(y+17)+' Q'+(x-15)+' '+(y-33)+' '+x+' '+(y-5)+' Q'+(x+14)+' '+(y-35)+' '+(x+31)+' '+(y+17)+'" fill="none" stroke="#92ddca" stroke-width="7" stroke-linecap="round"/>'+C(x,y+20,7,'#ffdb92')}
 if(id===6){a+=C(x,y,28,'#2c4674')+L(x-15,y+11,x,y-12,'#f7d593',5)+L(x,y-12,x+16,y+6,'#8de0d1',5)}
 return a;
};
function render(s,t,lesson){
 const spec=window.NEXO_VISUAL_SPECS?.[s]?.[t];if(!spec)return null;
 const [kind,...raw]=spec,rows=raw.map(x=>x.split('|')),count=rows.length;
 if(count<2||count>4)return null;
 const title=lesson?.title||'Estudo',w=760,h=440;
 let a=R(0,0,w,h,'#111e34',25)+'<circle cx="722" cy="22" r="154" fill="#263955" opacity=".48"/>';
 a+=T(380,36,title.toUpperCase(),21,'#e4e6ff',800);
 if(kind==='timeline'||kind==='process'){
   const gap=17,margin=24,cw=(712-(count-1)*gap)/count;
   a+=L(65,163,695,163,'#5a7798',5);
   rows.forEach(([name,example='',note=''],i)=>{
    const x=margin+i*(cw+gap),cx=x+cw/2;
    a+=R(x,76,cw,322,'#223653',19)+R(x,76,cw,7,palette[i],3);
    a+=C(cx,163,35,palette[i])+T(cx,171,String(i+1),25,'#0f2037',800);
    a+=lines(cx,119,name,count===4?14:20,count===4?15:17,21);
    a+=lines(cx,243,example,count===4?15:21,count===4?17:19,25);
    a+=L(x+20,300,x+cw-20,300,'#536b8b',2);
    a+=lines(cx,334,note,count===4?16:23,15,22);
    if(i<count-1)a+=T(x+cw+gap/2,171,'›',26,'#e5c8ff');
   });
 }else{
   const margin=22,gap=15,cw=(716-(count-1)*gap)/count;
   rows.forEach(([name,example='',note=''],i)=>{
    const x=margin+i*(cw+gap),cx=x+cw/2;
    a+=R(x,65,cw,334,'#213650',19)+R(x,65,cw,8,palette[i],3);
    a+=icon(s,t,i,cx,138);
    a+=lines(cx,205,name,count===4?14:21,count===4?16:19,23);
    a+=L(x+18,254,x+cw-18,254,'#54718f',2);
    a+=lines(cx,296,example,count===4?14:22,count===4?16:18,23);
    a+=lines(cx,369,note,count===4?15:24,14,20);
   });
 }
 a+=T(380,427,'OBSERVE • COMPARE • EXPLIQUE',13,'#a5b9d4',700);
 const caption=(kind==='process'?'Sequência: ':'Comparação: ')+rows.map(r=>r.join(' — ')).join('; ')+'.';
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" role="img" aria-label="'+E(caption)+'">'+a+'</svg>';
 return {src:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg),caption};
}
window.NEXO_RICH_VISUAL=render;
})();