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
  let _isGameFinished = false;

  const _updateState = (square) => {
    const row = square.getAttribute("data-row");
    const column = square.getAttribute("data-column");
    _moves++;
    _state[row][column] = square.textContent;
  };
  const _checkForWinner = (square) => {
    if (_moves === 9) {
      _isGameFinished = true;
      events.publish("gameFinished", "draw");
    }

    const checkDiagonals = (marker) => {
      const topLeftToBottomRight = [];
      const topRightToBottomLeft = [];

      for (let i = 0; i < _state.length; i++) {
        topLeftToBottomRight.push(_state[i][i]);
        topRightToBottomLeft.push(_state[i][_state.length - i - 1]);
      }

      return (
        topLeftToBottomRight.every((mark) => mark === marker) ||
        topRightToBottomLeft.every((mark) => mark === marker)
      );
    };

    const checkRows = (marker) => {
      return _state.some((row) => row.every((mark) => mark === marker));
    };

    const checkColumns = (marker) => {
      const columns = [];
      for (let i = 0; i < _state.length; i++) {
        const column = _state.map((row) => row[i]);
        columns.push(column);
      }

      return columns.some((row) => row.every((mark) => mark === marker));
    };

    let checkForWinner =
      checkRows(square.textContent) ||
      checkColumns(square.textContent) ||
      checkDiagonals(square.textContent);

    if (checkForWinner) {
      _isGameFinished = true;
      events.publish("gameFinished", _playerToPlay);
    }
  };

  const _changePlayerTurn = () => {
    _playerToPlay = _playerToPlay === _player ? _cpu : _player;
  };

  events.subscribe("playedNewMove", function (square) {
    _updateState(square);
    _checkForWinner(square);
    _changePlayerTurn();
  });

  const getPlayerToPlay = () => {
    return _playerToPlay;
  };

  const getIsGameFinished = () => {
    return _isGameFinished;
  };

  return {
    getIsGameFinished,
    getPlayerToPlay,
  };
})();

const announcer = (() => {
  const announcerNode = document.querySelector("#announcer");

  const announcePlayerTurn = () => {
    if (gameLogic.getIsGameFinished()) return;

    const playerName = gameLogic.getPlayerToPlay().getName();
    const playerMarker = gameLogic.getPlayerToPlay().getMarker();
    const message = `It is ${playerName}'s (${playerMarker}) turn`;
    updateAnnouncer(message);
  };

  const updateAnnouncer = (message) => {
    announcerNode.textContent = message;
  };

  announcePlayerTurn();

  const declareWinner = (result) => {
    let message = null;

    if (result === "draw") {
      message = "It's a draw! No winners";
    }

    if (result) {
      message = `The winner is ${result.getName()} (${result.getMarker()})!`;
    }

    updateAnnouncer(message);
  };

  events.subscribe("playedNewMove", announcePlayerTurn);
  events.subscribe("gameFinished", declareWinner);
})();
