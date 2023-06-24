window.onload = () => {

/**** Global Variables */
    let playerHealth = 100;
    let monsterHealth = 100;
    let attackCount = 0;
    let specialAttackCount = 0;

/*** Functions */

    //Attack function: Decrease both the player and the monster health, randomly,
    //it can be used anytime , until one of the parties loose

    attack = () => {
    let attacker = Math.random() > 0.5 ? "player" : "monster"; 
    let damage = Math.floor(Math.random() * 25) + 1; 
    
    if (attacker === "player") {
        monsterHealth -= damage;
        if(monsterHealth < 0) monsterHealth = 0;
        addLog(`<span style="color: purple;">Player</span> attacks monster and deals <span style="color: red;">${damage}</span>`);
    } else {
        playerHealth -= damage;
        if(playerHealth < 0) playerHealth = 0;
        addLog(`<span style="color: orange;">Monster</span> attacks player and deals <span style="color: red;">${damage}</span>`);
    }

    attackCount++;

    if (attackCount >= 2 && specialAttackCount < 2) {
        document.getElementById('special').disabled = false;
    }
    
    updateHealthBar();

    }

    //Updates the health bar green width
    updateHealthBar = () => {
        document.getElementById('player-health').style.width = playerHealth + '%';
        document.getElementById('monster-health').style.width = monsterHealth + '%';
    }

    addLog = (logMessage) => {
        let log = document.getElementById('log');
        let newLog = document.createElement('p');
        newLog.innerHTML = logMessage;
        log.appendChild(newLog);
    }
    document.getElementById('attack').onclick = attack;

    specialAttack = () => {
        let damage = Math.floor(Math.random() * 21) + 25;
        monsterHealth -= damage;

        specialAttackCount++;

        if (specialAttackCount >= 2) {
            document.getElementById('special').disabled = true;
        }
        
        addLog(`<span style="color: purple;">Player</span> attacks monster and deals <span style="color: red;">${damage}</span>`);
        updateHealthBar();
    }

    document.getElementById('special').onclick = specialAttack;
}