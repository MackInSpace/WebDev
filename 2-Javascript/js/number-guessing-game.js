function runGame() {

    let guessString = ''; //prompts the user for a guess, prompts always provide a string, always initialize to an empty string
    let guessNumber = 0; 
    let correct = false; //boolean
    let numTries = 0; //keeps track of your tries

    const randomNumber = Math.random() * 100; //random integer between 1 and 99.999
    const randomInteger = Math.floor(randomNumber); //whole number with no fractional parts
    const target = randomInteger + 1; //this makes it between 1 - 100
    // const target = Math.floor(Math.random() * 100) + 1; This is the other way to do the above

    do {
        guessString = prompt('I am thinking of a number in the range 1 to 100.\n\nWhat is the number?'); // \n is an escape sequence and will bring the statement down on a new line(two lines)
        guessNumber = +guessString; // + turns the string into a number
        numTries += 1; //keeps track of your tries
        correct = checkGuess(guessNumber, target); 
    } while (!correct); //not correct; as soon as its true, we will exit the loop

    alert('You got it! The number was ' + target + '.\n\nIt took you ' + numTries + ' tries to guess correctly.');

}

function checkGuess(guessNumber, target) { //this is the function after the player has given their number or guess
    let correct = false;

    if (isNaN(guessNumber)) { //NaN = not a number
        alert('You have not entered a number. \n\nPlease enter a number in the 1-100 range.');
    } else if ((guessNumber < 1) || (guessNumber > 100)) { // || = or, this is also asking them to enter a number in the 1-100 range not outside of it
        alert('Please enter an integer in the 1-100 range.');
    } else if (guessNumber > target) {
        alert('Your number is too large!');
    } else if (guessNumber < target) {
        alert('Your number is too small!');
    } else {
        correct = true; //only block that sets correct to true, leave rest to false
    }
    return correct; //this will go back to checkGuess function in the do-while loop
}