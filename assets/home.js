'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
document.querySelectorAll('input[name="band-color"]').forEach(input=>input.addEventListener('change',()=>{document.querySelector('#color-status').textContent=`目前選擇：${input.value}`;document.querySelector('#band-inquiry').dataset.inquiry=`PURNOTE 器械識別帶（${input.value}）`;}));
document.querySelectorAll('[data-inquiry]').forEach(a=>a.addEventListener('click',()=>{const field=document.querySelector('#message');const line=`我想詢問：${a.dataset.inquiry}`;if(!field.value.trim()){field.value=line+'\n';}else if(!field.value.includes(line)){field.value+='\n'+line+'\n';}}));
document.querySelector('#year').textContent=new Date().getFullYear();
const form=document.querySelector('#contact-form');
form.addEventListener('submit',async e=>{e.preventDefault();const button=form.querySelector('button[type="submit"]');const status=document.querySelector('#form-status');if(!form.reportValidity())return;button.disabled=true;status.textContent='訊息傳送中…';const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});if(!response.ok)throw new Error('Submission failed');status.textContent='訊息已送出，謝謝您的詢問。豐鉅將依您提供的聯絡方式回覆。';form.reset();}catch{status.textContent='目前無法確認訊息是否送達，內容已保留。請稍後再試，或透過下方 Email 與我們聯繫。';}finally{clearTimeout(timeout);button.disabled=false;}});
