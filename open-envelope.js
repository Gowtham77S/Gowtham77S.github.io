(function(){
  const envelope = document.getElementById('envelope');

  if(!envelope) return;

  function openInvitation(){
    envelope.classList.add('opening');
    // small delay for visual effect
    setTimeout(()=>{
      window.location.href = 'invitation.html';
    }, 300);
  }

  envelope.addEventListener('click', openInvitation);
  envelope.addEventListener('keydown', (e)=>{ 
    if(e.key === 'Enter' || e.key === ' ') { 
      e.preventDefault(); 
      openInvitation(); 
    }
  });
})();
