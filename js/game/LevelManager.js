// Tiled level loader by Francis

class Level {
	constructor(tileMap, tilesImage, tileSetName, groundLayer, id, objects, enemies, collisionTiles) {
		this.objects = objects;
		this.enemies = enemies;
		this.tileMap = tileMap;
		this.tilesImage = tilesImage;
		this.tileSetName = tileSetName;
		this.groundLayer = groundLayer;
		this.collisionTiles = collisionTiles;
		this.id = id;
		this.active = false;
	}
	start() {
		this.map = game.add.tilemap(this.tileMap);
		this.map.addTilesetImage(this.tileSetName, this.tilesImage);	// set_01, tiles
		for (var i = 0; i < this.collisionTiles.length; i++) {
			this.map.setCollision(this.collisionTiles[i]);
		}
		this.groundLayer = this.map.createLayer(this.groundLayer);
		//this.groundLayer.debug = true;	// show collision boxes
	}
	end() {
		this.groundLayer.destroy();
	}
	update() {
		game.physics.arcade.collide(player.sprite, this.groundLayer);
	}
}
class LevelManager {
	constructor() {
		this.levels = []; // array of Level objects
		this.currentLevel;
	}

	/*
	@param {string} tileMap - asset key of the Tiled map
	@param {string} tilesImage - asset key of the tilemap png
	@param {string} groundLayer - Tiled id of the ground layer. Default Ground
	@param {array} objects - array of GameObjects that will be spawned in the world
	@param {string} enemies - array of Enemies that will be spawned in the world
	*/
	addLevel(tileMap, tilesImage, tileSetName = 'set_01', groundLayer = 'Ground', id = 0, objects = [], enemies = [], collisionTiles = []) {
		this.levels.push(new Level(tileMap, tilesImage, tileSetName, groundLayer, id, objects, enemies, collisionTiles));
	}
	startLevelById(id) {
		for (var i = 0; i < this.levels.length; i++) {
			if (this.levels[i].id == id) {
				this.levels[i].start();
				this.currentLevel = this.levels[i];
			}
		}
	}
	endCurrentLevel() {
		this.currentLevel.end();
	}
	update() {
		for (var i = 0; i < this.levels.length; i++) this.levels[i].update();
	}
	getCurrentCollisionLayer() {
		return this.currentLevel.groundLayer;
	}
}
