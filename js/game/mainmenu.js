var MainMenu = function () {};

MainMenu.prototype = {
	playClick: function() {
		game.state.start("MainGame");
	},
	init: function() {
		
	},
	preload: function() {
		
	},
	create: function() {
		console.log("SWITCH");
		game.state.start('MainGame');
	},
	update: function() {
		
	}
};