class RockPaperScissors {
  constructor() {
    this.round = 1;
    this.computerScore = 0;
    this.playerScore = 0;
    this.gameChoices = ["rock", "paper", "scissors"];
    this.winner = null;
  }

  checkRoundWinner(playerChoice, computerChoice) {
    // 2D-array to find winner
    // user selection; x-axis
    // computer selection; y-axis
    // the order across and down axes is rock --> paper --> scissors
    // result[computerChoiceIndex][playerChoiceIndex] to determine winner
    const result = [
      ["tie", "player", "cpu"],
      ["cpu", "tie", "player"],
      ["player", "cpu", "tie"],
    ];

    const playerChoiceIndex = this.gameChoices.indexOf(playerChoice);
    const computerChoiceIndex = this.gameChoices.indexOf(computerChoice);

    const winner = result[computerChoiceIndex][playerChoiceIndex];

    if (winner === "tie") {
      this.sendNotifications("It was a tie! Go again!");
      const { playerChoice, computerChoice } = this.getSelections();
      this.checkRoundWinner(playerChoice, computerChoice);
      return;
    }

    if (winner === "player") this.playerScore++;
    if (winner === "cpu") this.computerScore++;

    this.sendNotifications(`${winner} has won round ${this.round++}`);
    this.checkGameWinner();
  }

  checkGameWinner() {
    if (this.playerScore === 3) {
      this.winner = "Player";
      this.sendNotifications("Player has won the best of 5! Congratulations!");
    }

    if (this.computerScore === 3) {
      this.winner = "Computer";
      this.sendNotifications(
        "Computer has won! Machines will take over the world!"
      );
    }
  }

  getSelections() {
    const computerChoice = computer.selectRandomChoice();
    const playerChoice = player.getPlayerChoice();

    return {
      computerChoice,
      playerChoice,
    };
  }

  sendNotifications(message) {
    alert(message);
  }

  start() {
    while (!this.winner) {
      const { playerChoice, computerChoice } = this.getSelections();
      this.checkRoundWinner(playerChoice, computerChoice);
    }
  }

  restart() {
    this.round = 1;
    this.computerScore = 0;
    this.playerScore = 0;
    this.winner = null;
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
      ).toLowerCase();
    }

    return validatedInput;
  }
}

const game = new RockPaperScissors();
const computer = new Computer();
const player = new Player();
