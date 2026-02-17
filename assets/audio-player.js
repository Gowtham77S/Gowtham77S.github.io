document.addEventListener('DOMContentLoaded', function(){
  var audio = document.getElementById('page-audio');
  if(!audio){
    // create audio element if not present
    audio = document.createElement('audio');
    audio.id = 'page-audio';
    audio.src = 'assets/melody.mp3';
    audio.preload = 'auto';
    audio.loop = true;
    document.body.appendChild(audio);
  }

  audio.loop = true;

  var btn = document.getElementById('audio-toggle');
  if(!btn){
    btn = document.createElement('button');
    btn.id = 'audio-toggle';
    btn.className = 'audio-toggle';
    btn.setAttribute('aria-label','Play music');
    btn.innerHTML = '▶';
    document.body.appendChild(btn);
  }

  function setPlaying(playing){
    if(playing){
      btn.classList.add('playing');
      if(audio.muted) {
        btn.innerHTML = '🔈';
        btn.setAttribute('aria-label','Playing (muted). Click to unmute');
      } else {
        btn.innerHTML = '⏸';
        btn.setAttribute('aria-label','Pause music');
      }
    } else {
      btn.classList.remove('playing');
      btn.innerHTML = '▶';
      btn.setAttribute('aria-label','Play music');
    }
  }

  // Attempt normal autoplay first. If blocked, try muted autoplay (more likely to succeed),
  // then try to unmute programmatically. If unmute is blocked, keep muted and show control.
  function tryAutoplay(){
    audio.play().then(function(){
      setPlaying(true);
    }).catch(function(){
      // try muted autoplay
      audio.muted = true;
      audio.play().then(function(){
        // played muted; try to unmute after a short delay
        setPlaying(true);
        setTimeout(function(){
          audio.muted = false;
          // attempt a silent play to validate unmute; many browsers will allow if user gesture
          audio.play().then(function(){
            setPlaying(true);
          }).catch(function(){
            // can't unmute programmatically — keep muted state visible
            audio.muted = true;
            setPlaying(true);
          });
        }, 300);
      }).catch(function(){
        // autoplay fully blocked
        audio.muted = true;
        setPlaying(false);
      });
    });
  }

  tryAutoplay();

  btn.addEventListener('click', function(){
    if(audio.paused){
      // user-initiated play should allow unmuting
      audio.muted = false;
      audio.play().then(function(){ setPlaying(true); }).catch(function(){ setPlaying(false); });
    } else {
      // if currently playing but muted, unmute on click
      if(audio.muted){
        audio.muted = false;
        setPlaying(true);
        return;
      }
      audio.pause();
      setPlaying(false);
    }
  });

  // pause when page hidden
  document.addEventListener('visibilitychange', function(){
    if(document.hidden){
      if(!audio.paused){ audio.pause(); btn.dataset._wasPlaying = '1'; setPlaying(false); }
    } else {
      if(btn.dataset._wasPlaying === '1'){
        audio.play().then(function(){ setPlaying(true); btn.dataset._wasPlaying = ''; }).catch(function(){});
      }
    }
  });
});
