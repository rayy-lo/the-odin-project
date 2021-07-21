const gameBoard = (() => {
  const boardNode = document.querySelector("#tictactoe");

  const updateBoard = (event) => {
    const square = event.target;
    if (square.textContent !== "") return;
    const marker = gameLogic.get_PlayerToPlay().getMarker();
    square.textContent = marker;

    events.publish("playedNewMove", square);

    // gameLogic.updateState(row, column);
  };

  const bindEvents = () => {
    const squares = boardNode.querySelectorAll(".square");
    squares.forEach((square) => square.addEventListener("click", updateBoard));
  };

  bindEvents();

  return {
    updateBoard,
  };
})();

const gameLogic = (() => {
  const _state = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const cpu = playerFactory("X");
  const player = playerFactory("O");
  let _playerToPlay = player;

  const updateState = (square) => {
    const row = square.getAttribute("data-row");
    const column = square.getAttribute("data-column");
    _state[row][column] = _playerToPlay.getMarker();
  };

  const getPlayerToPlay = () => {
    return playerToPlay;
  };

  const checkForWinner = () => {
    console.log("check for winner");
  };

  const changePlayerTurn = () => {
    _playerToPlay = _playerToPlay === player ? cpu : player;
  };

  events.subscribe("playedNewMove", function (square) {
    updateState(square);
    checkForWinner();
    changePlayerTurn();
  });

  return {
    getPlayerToPlay,
    _state,
  };
})();
