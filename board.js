var SnakeGame = (function(SnakeGame) {

	var Board = SnakeGame.Board = function () {
		this.width = 42;
		this.height = 22;
		this.snake = new SnakeGame.Snake(this);
	}

	Board.BLANK = "*";

	Board.prototype.renderBoard = function (width, height) {
		var board = [];

		for (var i = 0; i < height; i++) {
			var row = [];
			for (var j = 0; j < width; j++) {
				if (j === 0 || j === width - 1 ||
						i === 0 || i === height - 1) {
					row.push("W");
				} else {
					row.push(Board.BLANK);
				}
			}

			board.push(row);
		}

		for (var z = 0, len = this.snake.segments.length; z < len; z++) {
			var coord = this.snake.segments[z]
			console.log(coord)
			board[coord[0]][coord[1]] = SnakeGame.Snake.SYMBOL;
		}

		return board;
	}

	return SnakeGame;
})(SnakeGame || {});