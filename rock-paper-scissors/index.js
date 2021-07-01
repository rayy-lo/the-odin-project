class RockPaperScissors {
  constructor() {
    this.computerScore = 0;
    this.playerScore = 0;
    this.gameChoices = ["rock", "paper", "scissors"];
    this.winner = null;
  }

  checkRoundWinner(playerChoice, computerChoice) {
    console.log("Player Choice: ", playerChoice);
    console.log("Computer Choice: ", computerChoice);

    if (playerChoice === computerChoice) {
      this.sendNotifications("Draw! Go Again!");
    }

    if (playerChoice === "rock" && computerChoice == "scissors") {
      this.playerScore++;
      this.sendNotifications("Player Wins");
    }

    if (playerChoice === "rock" && computerChoice == "paper") {
      this.playerScore++;
      this.sendNotifications("Computer Wins");
    }
  }

  sendNotifications(message) {
    alert(message);
  }

  checkGameWinner() {}

  start() {
    //   use while loop to play multiple rounds until computer/player gets to 3 score (best of 5)
    // while (!this.winner) {
    const computerChoice = computer.selectRandomChoice();
    const playerChoice = player.getPlayerChoice();

    this.checkRoundWinner(playerChoice, computerChoice);
    // }
  }
}

class Computer extends RockPaperScissors {
  selectRandomChoice() {
    let randomIndex = Math.floor(Math.random() * 3);
    return this.gameChoices[randomIndex];
  }
}

class Player extends RockPaperScissors {
  getPlayerChoice() {
    let playerChoice = prompt("Pick Rock, Paper or Scissors").toLowerCase();
    playerChoice = this.validatePlayerChoice(playerChoice);

    return playerChoice;
  }

  validatePlayerChoice(playerChoice) {
    let validatedInput = playerChoice;
    while (!this.gameChoices.includes(validatedInput)) {
      validatedInput = prompt(
        "Sorry, that's not a valid choice. Please select rock, paper or scissors"
      );
    }

    return validatedInput;
  }
}

const game = new RockPaperScissors();
const computer = new Computer();
const player = new Player();
