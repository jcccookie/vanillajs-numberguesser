/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

const getRandomNumber = () => {
   return Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
}

let minNum = 1;
    maxNum = 10;
    winningNum = getRandomNumber();
    guessCount = 3;

const game = document.querySelector('#game');
const min = document.querySelector('.min-num');
const max = document.querySelector('.max-num');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');
const message = document.querySelector('.message');

min.textContent = minNum;
max.textContent = maxNum;

game.addEventListener('mousedown', function(e){
   if(e.target.className === 'play-again'){
      window.location.reload();
   }
})

const output = (input) => {
   const guess = parseInt(input.value);

   // Number that out of range
   if(isNaN(guess) || guess > maxNum || guess < minNum){
      setMessage(`Please enter a number between ${minNum} and ${maxNum}`, 'red');
      setInputBox('red');
   }
   //GAME OVER: WIN
   else if(guess === winningNum){
      gameOver(true, `You got it! YOU WIN!`);
   }
   //LOST
   else{
      guessCount--;
      if(guessCount <= 0){
         //GAME OVER: LOST
         gameOver(false, `YOU LOST.. The answer was ${winningNum}`);
      }
      else{
         setMessage(`Guess again! (remaining count: ${guessCount})`, 'red');
         setInputBox('red');
      }
   }
}

guessBtn.addEventListener('click', function(){
   output(guessInput);
   
})

guessInput.addEventListener('keypress', function(e){
   if(e.keyCode === 13){
      output(guessInput);
   }
})

const gameOver = (bool, msg) => {
   let color;
   bool ? color = 'green' : color = 'red';

   setMessage(msg, color);
   setInputBox(color);

   //Make input box disabled
   guessInput.disabled = true;

   guessBtn.value = 'Play Again';
   guessBtn.className += 'play-again';
}

//Set message to player
const setMessage = (msg, color) => {
   message.textContent = msg;
   message.style.color = color;
}

//Style input box
const setInputBox = (color) => {
   guessInput.style.borderColor = color;
   guessInput.style.borderWidth = '3px';
}

