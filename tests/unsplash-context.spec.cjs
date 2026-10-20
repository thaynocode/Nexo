const {test,expect}=require('@playwright/test');
test('Unsplash em todas as perguntas, explicações e revisões',async({page})=>{
 test.setTimeout(300000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
 const result=await page.evaluate(()=>{
  const count={questions:0,feedback:0,reviews:0,topics:0};
  for(let s=0;s<DATA.length;s++)for(let t=0;t<DATA[s].topics.length;t++){
   sIdx=s;tIdx=t;count.topics++;
   for(let l=0;l<3;l++){
    start(l);
    for(let i=0;i<questions.length;i++){
     idx=i;selected=null;render();
     if(!document.querySelector('.quizwrap img[data-unsplash-id]'))throw Error('Imagem ausente '+s+':'+t+':'+l+':'+i);
     if(document.querySelector('.quizwrap svg'))throw Error('SVG visível no exercício');
     if(document.querySelectorAll('.answer').length!==4)throw Error('Alternativas ausentes');
     if(document.documentElement.scrollWidth>innerWidth+3)throw Error('Overflow horizontal');
     selected=questions[i].choices.findIndex(choice=>choice.correct);render();
     if(!document.querySelector('.feedback img[data-unsplash-id]'))throw Error('Imagem ausente na explicação');
     count.questions++;count.feedback++;
    }
    state.mistakes[id(s,t,l)]=[0];start(l,true);if(!document.querySelector('img[data-unsplash-id]'))throw Error('Imagem ausente na revisão');count.reviews++;
   }
  }
  return count;
 });
 expect(result).toEqual({questions:2310,feedback:2310,reviews:231,topics:77});expect(errors).toEqual([]);
});
