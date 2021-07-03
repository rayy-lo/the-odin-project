class EtchASketch {
  constructor(container, squareColumns) {
    this.container = container;
    this.squareColumns = squareColumns;
    this.squareRows = this.squareColumns;
    // dynamically set number of columns and rows
    this.container.style.gridTemplateColumns = `repeat(${this.squareColumns}, 1fr)`;
    this.renderSquares();
  }

  renderSquares() {
    const totalSquares = this.squareColumns * this.squareRows;
    for (let i = 0; i <= totalSquares; i++) {
      new Square();
    }
  }
}

class Square extends EtchASketch {
  constructor() {
    super(container);
    this.element = document.createElement("div");
    this.element.className = "square empty";
    this.addSquaresToGrid();
  }

  addSquaresToGrid() {
    this.container.appendChild(this.element);
  }
}

const container = document.querySelector("#container");
const etchASketch = new EtchASketch(container, 16);
