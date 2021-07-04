class EtchASketch {
  constructor(container, gridSize = 16) {
    this.container = container;
    this.gridSize = gridSize;
    // dynamically set number of columns and rows
    this.setGridTemplateColumns(gridSize);
    this.renderSquares(gridSize);
  }

  renderSquares(gridSize) {
    const totalSquares = gridSize ** 2;
    for (let i = 1; i <= totalSquares; i++) {
      const square = new Square();
      square.addSquareToGrid(this.container);
    }
  }

  setGridTemplateColumns(gridSize) {
    this.container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  }

  clearGrid() {
    this.container.innerHTML = "";
  }

  createNewGrid() {
    const gridSize = this.promptGridSize();
    this.clearGrid();
    this.renderSquares(gridSize);
    this.setGridTemplateColumns(gridSize);
  }

  promptGridSize() {
    return prompt("What should the grid size be?");
  }
}
class Square {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "square";
    this.element.addEventListener("mouseover", this.onHover);
  }

  onHover(e) {
    if (e.target.classList.contains("hovered")) return;
    e.target.classList.add("hovered");
  }

  addSquareToGrid(container) {
    container.appendChild(this.element);
  }
}

const container = document.querySelector("#container");
const etchASketch = new EtchASketch(container);
const btn = document.querySelector("#clearGridBtn");

btn.addEventListener("click", (event) => {
  etchASketch.createNewGrid();
});
