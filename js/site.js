
function setActive(){
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a=>{
    if(a.getAttribute('href')===file){a.classList.add('active');}
  });
}
function openIntro(){document.getElementById('intro-modal').classList.add('open')}
function closeIntro(){document.getElementById('intro-modal').classList.remove('open')}
document.addEventListener('DOMContentLoaded', setActive);
