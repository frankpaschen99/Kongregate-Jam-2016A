var LoadGame = function () {};
var levels = ['desert', 'mario'];
var lm;
var om;
LoadGame.prototype = {
    loadScripts: function () {
        game.load.script('MainGame', 'js/game/maingame.js');
        game.load.script('MainMenu', 'js/game/mainmenu.js');
        game.load.script('options', 'js/game/options.js');
    },
	
    loadAudio: function () {
        
    },
    
    loadImages: function () {
		game.load.image('playerBody','js/game/assets/player/player.png');
		game.load.image('playerNorth','js/game/assets/player/playerarm_north.png');
		game.load.image('playerSouth','js/game/assets/player/playerarm_south.png');
		game.load.image('bulletNorth','js/game/assets/player/bulletNorth.png');
		game.load.image('bulletSouth','js/game/assets/player/bulletSouth.png');
		game.load.image('playerNorth','js/game/assets/player/bullet.png');
		game.load.image('crate', 'js/game/assets/objects/crate.png');
    },
	
	preloadJSON: function() {
		for (var i = 0; i < levels.length; i++) {
			game.load.json(levels[i], 'js/game/assets/levels/' + levels[i] + '/' + levels[i] + '_script.json');
			game.load.tilemap(levels[i] + '_tilemap', 'js/game/assets/levels/' + levels[i] + '/' + levels[i] + '_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
			game.load.image(levels[i] + '_tiles', 'js/game/assets/levels/' + levels[i] + '/' + levels[i] + '_tiles.png');
		}
	},
	
	levelWarmup: function() {
		for (var i = 0; i < levels.length; i++)  {
			var json = game.cache.getJSON(levels[i]);
			var levelObjects = [];
			var levelEnemies = [];
			var collisionTiles = [];

			json.properties.collisiontiles.forEach(function(index) {
				collisionTiles.push(index);
			});
			json.objects.forEach(function(index) {
				levelObjects.push(index);
			});
			json.enemies.forEach(function(index) {
				levelEnemies.push(index);
			});
			lm.addLevel(levels[i] + '_tilemap', levels[i] + '_tiles', 'set_01', 'Ground', json.properties.id, levelObjects, levelEnemies, collisionTiles);
		}
	},
    loadFonts: function () {
    
    },
    
    init: function () {
    },
	
    preload: function () {
		lm = new LevelManager();
		om = new ObjectManager();
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadAudio();
		this.preloadJSON();
    },
    
    addGameStates: function () {
        game.state.add("MainGame", MainGame);
        game.state.add("MainMenu", MainMenu);
        game.state.add("Options", Options);
    },
    
    addGameMusic: function () {
        
    },
    create: function () {
        this.addGameStates();
        this.addGameMusic();
		this.levelWarmup();
		game.state.start('MainMenu');
    }
};