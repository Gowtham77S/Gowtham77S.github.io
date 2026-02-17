// Countdown/count-up script. Reads ISO date from #hero data-date attribute.
(function(){
    function pad(n){ return String(n).padStart(2,'0'); }
    const hero = document.getElementById('hero');
    if(!hero) return;
    const dateAttr = hero.dataset.date;
    if(!dateAttr) return;
    const target = new Date(dateAttr);
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('countdown');

    function computeParts(ms){
        const s = Math.floor(ms/1000);
        const days = Math.floor(s/86400);
        const hours = Math.floor((s % 86400)/3600);
        const minutes = Math.floor((s % 3600)/60);
        const seconds = s % 60;
        return { days, hours, minutes, seconds };
    }

    function update(){
        const now = new Date();
        let diff = target - now;
        const isFuture = diff >= 0;
        if(!isFuture) diff = Math.abs(diff);

        const parts = computeParts(diff);
        if(daysEl) daysEl.textContent = pad(parts.days);
        if(hoursEl) hoursEl.textContent = pad(parts.hours);
        if(minutesEl) minutesEl.textContent = pad(parts.minutes);
        if(secondsEl) secondsEl.textContent = pad(parts.seconds);

        // set state class for styling or to show 'ago' if needed
        if(countdownEl){
            if(isFuture){
                countdownEl.classList.remove('past');
                countdownEl.classList.add('future');
            } else {
                countdownEl.classList.remove('future');
                countdownEl.classList.add('past');
            }
        }
    }

    update();
    const timer = setInterval(update, 1000);
})();
