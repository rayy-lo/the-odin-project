const gameBoard = (() => {
  const state = [
    ["X", "O", "X"],
    ["X", "O", "X"],
    ["X", "O", "X"],
  ];

  const boardNode = document.querySelector("#tictactoe");

  const renderBoard = () => {
    const markup = `
        ${state
          .map((row) => {
            return row
              .map(
                (square) => `
                <div class="square">
                    ${square}
                </div>
            `
              )
              .join("");
          })
          .join("")}
    `;

    boardNode.innerHTML = markup;
  };

  renderBoard();

  return {
    renderBoard,
  };
})();
