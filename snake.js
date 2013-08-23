var SnakeGame = (function(SnakeGame) {

	var Snake = SnakeGame.Snake = function (board) {
		var center = [board.height/2, board.width / 2];
		this.direction = "E";
		this.segments = [center];
	};

	Snake.DIFFS = {
		"N": [-1, 0],
		"E": [0, 1],
		"S": [1, 0],
		"W": [0, -1]
	};

	Snake.SYMBOL = "S";

	Snake.prototype.move = function () {

		var diff = Snake.DIFFS[this.direction];
		var nextPos = [this.segments[this.segments.length - 1][0] + diff[0],
									this.segments[this.segments.length - 1][1] + diff[1]];

		this.segments.push(nextPos);
		this.segments.shift();

	}

	Snake.prototype.turn = function (newDir) {
		this.direction = newDir;
	}

	return SnakeGame;
})(SnakeGame || {});