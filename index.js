window.onload = () => {

/**** Global Variables */
    let playerHealth = 100;
    let monsterHealth = 100;
    let attackCount = 0;
    let specialAttackCount = 0;

    let healButton = document.getElementById('heal')
    let specialButton = document.getElementById('special')

/*** Functions */

    //Attack function: Decrease both the player and the monster health, randomly,
    //it can be used anytime , until one of the parties loose

    attack = () => {
    let attacker = Math.random() > 0.5 ? "player" : "monster"; 
    let damage = Math.floor(Math.random() * 25) + 1; 
    
    if (attacker === "player") {
        monsterHealth -= damage;
    } else {
        playerHealth -= damage;
    
    }

    updateHealthBar();
    }

    //Updates the health bar green width
    updateHealthBar = () => {
        document.getElementById('player-health').style.width = playerHealth + '%';
        document.getElementById('monster-health').style.width = monsterHealth + '%';
    }

    document.getElementById('attack').onclick = attack;
}