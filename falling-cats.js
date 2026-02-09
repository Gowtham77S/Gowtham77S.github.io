(function(){
  const container = document.querySelector('.falling-cats');
  if(!container) return;
  const count = 20;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'cat';
    s.textContent = '😻';
    const left = Math.random()*100;
    const delay = Math.random()*-10;
    const dur = 6 + Math.random()*8;
    const scale = 0.6 + Math.random()*0.9;
    s.style.left = left + '%';
    s.style.animationDelay = delay + 's';
    s.style.animationDuration = dur + 's';
    s.style.transform = `translateY(-10vh) scale(${scale})`;
    container.appendChild(s);
  }
})();
