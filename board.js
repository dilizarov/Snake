var SnakeGame = (function(SnakeGame) {

	var Board = SnakeGame.Board = function () {
		this.width = 42;
		this.height = 22;
		this.snake = new SnakeGame.Snake(this);
		this.apple = this.makeApple();
	}

	Board.BLANK = "*";

	Board.prototype.renderBoard = function (width, height) {
		this.grid = [];

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

			this.grid.push(row);
		}

		for (var z = 0, len = this.snake.segments.length; z < len; z++) {
			var coord = this.snake.segments[z]
			var symbol = SnakeGame.Snake.SYMBOL;
			if (this.snake.segments - 1 === z) { symbol = "H" }
			this.grid[coord[0]][coord[1]] = symbol;
		}

		var notUniqApple = true;
		var currentApplePos = this.apple;
		while (notUniqApple) {
			var notUniqApple = false;
			for (var a = 0, len = this.snake.segments.length; a < len; a++) {
				if (this.apple.toString() === this.snake.segments[a].toString()) {
					this.apple = this.makeApple();
					var notUniqApple = true;
				}
			}
		}

		this.grid[this.apple[0]][this.apple[1]] = "A"

		if ([currentApplePos[0], currentApplePos[1]].toString() === [this.snake.segments[this.snake.segments.length - 1][0], this.snake.segments[this.snake.segments.length - 1][1]].toString()) {

			this.grid[currentApplePos[0]][currentApplePos[1]] = "*";
			var last = this.snake.segments[0];

			if (this.snake.segments.length > 1) {
				var secondToLast = this.snake.segments[1];
				var destination = [2*last[0] - secondToLast[0], 2*last[1] - secondToLast[1]];
			} else {
				var dir = SnakeGame.Snake.DIFFS[this.snake.direction];
				var destination = [last[0] - dir[0], last[1] - dir[1]];
			}

			this.grid[destination[0]][destination[1]] = "S";
			this.snake.add(destination);
		}

		return this.grid;
	}

	Board.prototype.makeApple = function(grid) {
	  return [Math.floor(Math.random() * 20) + 1,
		        Math.floor(Math.random() * 40) + 1]
	}

	Board.prototype.didLose = function () {
		var snakeHead = this.snake.segments[this.snake.segments.length - 1];
		var pos = this.grid[snakeHead[0]][snakeHead[1]];
		return (pos === "W" || pos === "S");
	}


	return SnakeGame;
})(SnakeGame || {});