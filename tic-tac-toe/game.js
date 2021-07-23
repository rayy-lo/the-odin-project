const gameBoard = (() => {
  const boardNode = document.querySelector("#tictactoe");

  const updateBoard = (event) => {
    const square = event.target;
    if (square.textContent !== "") return;
    const marker = gameLogic.getPlayerToPlay().getMarker();
    square.textContent = marker;

    events.publish("playedNewMove", square);
  };

  const bindEvents = () => {
    const squares = boardNode.querySelectorAll(".square");
    squares.forEach((square) => square.addEventListener("click", updateBoard));
  };

  bindEvents();
})();

const gameLogic = (() => {
  const _state = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let _moves = 0;
  const _cpu = playerFactory("X", "Computer");
  const _player = playerFactory("O", "Player");
  let _playerToPlay = _player;

  const _updateState = (square) => {
    _moves++;
    const row = square.getAttribute("data-row");
    const column = square.getAttribute("data-column");
    _state[row][column] = square.textContent;
  };
  const _checkForWinner = (square) => {
    console.log("check for winner");
    if (_moves === 9) events.publish("noWinner", square);
  };

  const _changePlayerTurn = () => {
    _playerToPlay = _playerToPlay === _player ? _cpu : _player;
  };

  events.subscribe("playedNewMove", function (square) {
    _updateState(square);
    _checkForWinner();
    _changePlayerTurn();
  });

  const getPlayerToPlay = () => {
    return _playerToPlay;
  };

  return {
    getPlayerToPlay,
  };
})();

const announcer = (() => {
  const announcerNode = document.querySelector("#announcer");

  const updateAnnouncement = () => {
    const playerName = gameLogic.getPlayerToPlay().getName();
    const playerMarker = gameLogic.getPlayerToPlay().getMarker();
    announcerNode.textContent = `It is ${playerName}'s (${playerMarker}) turn`;
  };

  updateAnnouncement();

  events.subscribe("playedNewMove", updateAnnouncement);
})();
