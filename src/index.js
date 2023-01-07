const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = Types.canvasSize.width;
canvas.height = Types.canvasSize.height;

const board = new Board({ canvas: canvas });

window.addEventListener("load", function () {
  board.init();
});

function buttonClick(e) {
  switch (e) {
    case "newgame":
      let noPlayers = window.prompt("Enter No of Computer Players (1-3)");
      if (noPlayers != null) {
        if (noPlayers > 0 && noPlayers < 4) {
          board.handleEvents({ action: "newgame", noPlayers: noPlayers });
        } else {
          window.alert("Please enter between 1-3 computer players");
        }
      }
      break;
    case "newhand":
      board.handleEvents({ action: "newhand" });
      break;
    case "hole":
      board.handleEvents({ action: Types.dealTypes.Hole });
      break;
    case "flop":
      board.handleEvents({ action: Types.dealTypes.Flop });
      break;
    case "turn":
      board.handleEvents({ action: Types.dealTypes.Turn });
      break;
    case "river":
      board.handleEvents({ action: Types.dealTypes.River });
      break;
    case "getresult":
      board.handleEvents({ action: "getresult" });
  }
}
