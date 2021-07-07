class Calculator {
  constructor(screen) {
    this.screen = screen;
    this.inputDisplay = screen.lastElementChild;
    this.historyDisplay = screen.firstElementChild;
    this.inputState = "0";
    this.historyState = "";
  }

  updateScreen() {
    this.inputDisplay.textContent = this.inputState;
    this.historyDisplay.textContent = this.historyState;
  }
}

class Button {
  constructor(el) {
    this.el = el;
    el.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    calculator.inputState === "0"
      ? (calculator.inputState = this.el.textContent)
      : (calculator.inputState += this.el.textContent);
    calculator.updateScreen();
  }
}

class OperatorButton {
  constructor(el) {
    this.el = el;
    el.addEventListener("click", this.handleOperatorClick.bind(this));
  }

  handleOperatorClick() {
    const operators = ["+", "-", "x", "÷"];
    const lastInput = calculator.inputState.slice(-1);
    // prevent adding another operator if last character is an operator
    if (operators.includes(lastInput)) return;

    calculator.inputState += this.el.textContent;
    calculator.updateScreen();
  }
}

class ClearButton {
  constructor(el) {
    this.el = el;
    el.addEventListener("click", this.clearInput.bind(this));
  }

  clearInput() {
    calculator.inputState = "0";
    calculator.updateScreen();
  }
}

class EqualButton {
  constructor(el) {
    el.addEventListener("click", this.calculateInput.bind(this));
  }

  calculateInput() {
    console.log("calculate");
  }
}

class DeleteButton {
  constructor(el) {
    this.el = el;
    el.addEventListener("click", this.deleteLastInput.bind(this));
  }

  deleteLastInput() {
    let newInput = calculator.inputState.slice(0, -1);
    if (newInput.length < 1) newInput = "0";

    calculator.inputState = newInput;
    calculator.updateScreen();
  }
}

const screenNode = document.querySelector(".screen");
const calculator = new Calculator(screenNode);

const deleteNode = document.querySelector('[data-button-type="delete"]');
new DeleteButton(deleteNode);

const clearButton = document.querySelector('[data-button-type="clear"]');
new ClearButton(clearButton);

const operatorButtons = document.querySelectorAll(
  '[data-button-type="operator"]'
);
operatorButtons.forEach((btn) => new OperatorButton(btn));

const digitBtns = document.querySelectorAll('[data-button-type="digit"]');
digitBtns.forEach((btn) => new Button(btn));

const equalBtn = document.querySelector('[data-button-type="equal"]');
new EqualButton(equalBtn);
