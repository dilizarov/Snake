var SnakeGame = (function(SnakeGame) {

	var View = SnakeGame.View = function() {};

	View.KEYS = {
		38: "N",
		39: "E",
		40: "S",
		37: "W"
	};

	View.prototype.render = function() {
		$('.board').empty();
		var grid = this.board.renderBoard(this.board.width, this.board.height);
		for (var i = 0, len = grid.length; i < grid.length; i++) {
			$('.board').append("<div></div>")
			var $div = $("div").last();
			for (var j = 0, len = grid[i].length; j < len; j++) {
				if (grid[i][j] === "W") {
					$div.append("<span class=wall></span>");
				} else if (grid[i][j] === SnakeGame.Snake.SYMBOL || grid[i][j] === "H") {
					$div.append("<span class=snake></span>");
				} else if (grid[i][j] === "A") {
					$div.append("<span class=apple></span>");
				} else {
					$div.append("<span class=tile></span>");
				}
			}
		}
	};


	View.prototype.start = function() {
		this.board = new SnakeGame.Board();
    var thatView = this;
		this.render();
		$(window).keydown(function(event) {

			if (event.keyCode >= 37 && event.keyCode <= 40) {
				var diffDir = SnakeGame.Snake.DIFFS[View.KEYS[event.keyCode]];
				var curDir = SnakeGame.Snake.DIFFS[thatView.board.snake.direction];

				if ([diffDir[0] + curDir[0], diffDir[1] + curDir[1]].toString() === [0,0].toString()) {
					console.log("Bonkers!");
				} else {
				thatView.board.snake.turn(View.KEYS[event.keyCode]);
				}
			}

			if (event.keyCode === 82) {
				thatView.board = new SnakeGame.Board();
			}

		});

		window.setInterval(this.step.bind(this),
 			50)
	};

	View.prototype.step = function () {
		this.board.snake.move();
		// if (this.board.didLose()) {
// 			$('body').append($('<div>').text("game over").addClass('gameover'));
// 		} else {
		this.render();
	  //}
	};

	return SnakeGame;
})(SnakeGame || {});

$(document).ready( function () {
	var game = new SnakeGame.View();
	game.start();
});