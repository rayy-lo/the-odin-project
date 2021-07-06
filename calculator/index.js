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

class DeleteButton {
  constructor(el) {
    this.el = el;
  }

  deleteLastInput() {}
}

class AddButton extends Button {
  add() {}
}

class SubtractButton extends Button {
  subtract() {}
}

class DivideButton extends Button {
  divide() {}
}

class MultiplyButton extends Button {
  multiply() {}
}

const screenNode = document.querySelector(".screen");
const calculator = new Calculator(screenNode);

const deleteNode = document.querySelector('[data-button-type="delete"]');
const deleteBtn = new DeleteButton(deleteNode);

const digitBtns = document.querySelectorAll('[data-button-type="digit"]');
digitBtns.forEach((btn) => {
  new Button(btn);
});
