let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let dealerCardsEl = document.getElementById("dealer-cards-el");
let dealerSumEl = document.getElementById("dealer-sum-el");
//
//

// Player setup
let firstCard = Math.floor(Math.random() * 10 + 2);
let secondCard = Math.floor(Math.random() * 10 + 2);
let sum = firstCard + secondCard;
let cardsInHand = firstCard + " " + secondCard;
let hasBlackjack = false;
let isAlive = true;

// Dealer Setup
let dealerFirstCard = Math.floor(Math.random() * 10 + 2);
let dealerSum = dealerFirstCard;
let dealerCards = dealerFirstCard;
let dealerIsDone = false;

// Game Start Setup
let gameSession = false;
let message = "";

// dealer starts with 1 card, so needed to separate it from player
const dealerDraw = () => {
  let dealerNewCard = Math.floor(Math.random() * 10 + 2);
  dealerCards += " " + dealerNewCard;
  dealerSum += dealerNewCard;
  console.log("DealerDraw invoked");
};

// renders game to the field
const startGame = () => {
  dealerCardsEl.textContent = dealerCards;
  dealerSumEl.textContent = dealerSum;
  sumEl.textContent = sum;
  cardsEl.textContent = cardsInHand;
  if (sum < 21 && dealerSum < 22) {
    message = "Do you want to draw another card?";
  } else if (sum === 21 && dealerSum !== 21) {
    message = "WHOOO! You've got Blackjack!";
    hasBlackjack = true;
  } else if (sum < 21 && dealerSum > 21) {
    message = "Dealer Busted! You win!";
  } else if (sum > 21) {
    message = "Sum of cards is over 21! You're out!";
    isAlive = false;
  }
  messageEl.textContent = message;
};

// Draw new card for player, dealer is supposed to draw if his cards are below 17
const newCard = () => {
  if (sum < 21) {
    let newCard = Math.floor(Math.random() * 10 + 2);
    cardsInHand += " " + newCard;
    sum += newCard;
    if (dealerSum < 17) {
      dealerDraw();
    }
  }
  startGame();
};

// This is what happens after player "stays"
const endGame = () => {
  while (dealerSum < 17) {
    dealerDraw();
    dealerCardsEl.textContent = dealerCards;
    dealerSumEl.textContent = dealerSum;
  }
  if (dealerSum >= 17) {
    if (dealerSum === 21 && sum !== 21) {
      message = "Dealer has Blackjack, and you're not even close. You lose.";
      isAlive = false;
    } else if (sum < 21 && dealerSum > 21) {
      message = "Dealer Busted! You win!";
    } else if (sum < dealerSum && dealerSum < 22) {
      message = "Dealer has better points. You lose.";
      isAlive = false;
    } else if (sum > dealerSum) {
      message = "You have better points than the Dealer. You win!";
    } else if (sum === dealerSum) {
      message = "D R A W !!!";
    }
  }
  messageEl.textContent = message;
};

// Reset game field
const gameReset = () => {
  // Player setup
  firstCard = Math.floor(Math.random() * 10 + 2);
  secondCard = Math.floor(Math.random() * 10 + 2);
  sum = firstCard + secondCard;
  cardsInHand = firstCard + " " + secondCard;
  hasBlackjack = false;
  isAlive = true;

  // Dealer Setup
  dealerFirstCard = Math.floor(Math.random() * 10 + 2);
  dealerSum = dealerFirstCard;
  dealerCards = dealerFirstCard;

  // Game Start Setup
  gameSession = false;
  message = "";

  dealerCardsEl.textContent = "";
  dealerSumEl.textContent = "";
  sumEl.textContent = "";
  cardsEl.textContent = "";
  messageEl.textContent = "Want to play a round?";
};

console.log("Player Cards: ", firstCard, secondCard, "Player sum: ", sum);
console.log(
  "Dealer First Card: ",
  dealerFirstCard,
  "\n",
  "Dealer cards: ",
  dealerCards,
  "\n",
  " Dealer sum: ",
  dealerSum
);
