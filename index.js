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
    
    updateHealthBar();
    gameOver();

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

    // It can be only used by the player, it cannot be used at the start of the game (disabled)
    //until the 2-3 attack, and it can be used at most 2 times during the match.
    //and it decrease the life of the monster more than the normal attack.
    specialAttack = () => {
        

        if (attackCount >= 2 && specialAttackCount < 2) {
            let damage = Math.floor(Math.random() * 21) + 25;
            monsterHealth -= damage;

            specialAttackCount++;
            addLog(`<span style="color: purple;">Player</span> attacks monster and deals <span style="color: red;">${damage}</span>`);
            updateHealthBar();
            gameOver();
        }

        else{
            alert("It can be used after2-3 attack, and at most 2 times during the match")
        }

        
        
    }

    document.getElementById('special').onclick = specialAttack;

    //It can be only used by the player after the 4th attack,
    //and only if the player health is less then the monster health by 30%
    heal = () => {
        if (attackCount >= 4 && monsterHealth > playerHealth * 1.3) {
          let healing = Math.floor(Math.random() * 20) + 10; 
          playerHealth += healing;
          if (playerHealth > 100) playerHealth = 100;
          addLog(`<span style="color: purple;">Player</span> heals himself for <span style="color: green;">${healing}</span>`);
        }
        else {
            alert("Your health should be less then 30%");
        }
        updateHealthBar();
    }   
    
    document.getElementById('heal').onclick = heal;

    giveUp = () => {
        playerHealth = 0;
        gameOver();
    }

    gameOver = () => {
        if(playerHealth <= 0){
            document.getElementById('winner').innerText = 'Monster Won!'
            document.getElementById('log').style.display = 'none';
            document.getElementById('game-over').style.display = 'flex'
        }
        else if ( monsterHealth <= 0) {
            document.getElementById('winner').innerText = 'You Won!'
            document.getElementById('log').style.display = 'none';
            document.getElementById('game-over').style.display = 'flex'
        }
    }
    document.getElementById('giveup').onclick = giveUp;

    restartGame = () => {
        playerHealth = 100;
        monsterHealth = 100;
        attackCount = 0;
        specialAttackCount = 0;

        document.getElementById('log').innerHTML = '<h3 >Battle Log</h3>'
        document.getElementById('log').style.display = 'flex';
        document.getElementById('game-over').style.display = 'none'

        updateHealthBar();

    }

    document.getElementById('restart-button').onclick = restartGame;

}