function rollDice() {
    let goldCoins = 0;
    for (let i = 0; i < 10; i++) {
        const roll = Math.floor(Math.random()*6) + 1;
        alert('You roll a ' + roll + ".");
        if (roll === 1) {
            alert('Game over, no more rolls!');
            break;
        }
        if (roll < 5) {
            continue;
        }
        if (roll === 4 && goldCoins > 0) {
            goldCoins -= 1;
            alert('You rolled a 4. You lose 1 gold coin. You now have ' + goldCoins + ' gold coins.');
        }
        alert('Congratulations, you win ' + roll + ' gold coins! You now have a total of ' + goldCoins + ' gold coins.');
        goldCoins += roll;
    }
    alert('You have won a total of ' + goldCoins + ' gold coins!');
}