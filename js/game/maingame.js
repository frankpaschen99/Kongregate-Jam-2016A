var MainGame = function () {};

class Player {
	constructor(posX, posY){
			this.x = posX;
			this.y = posY;
			this.sprite = game.add.sprite(this.x, this.y, 'playerBody');
			this.playerArm = new PlayerArm(this.sprite);
			game.physics.arcade.enableBody(this.sprite);
			this.sprite.body.checkCollision.down = true;
			this.sprite.body.collideWorldBounds = true;
			this.sprite.body.immovable = true;
			this.sprite.body.mass = 100;
			this.sprite.body.bounce = new Phaser.Point(0.5, 0.5);
			this.sprite.body.drag = new Phaser.Point(500, 0);
			this.sprite.body.friction = 300;

			this.bulletHandler = new UpdateHandler();

			this.keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
			this.keyRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
			this.keyUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
			this.keyDown = game.input.keyboard.addKey(Phaser.Keyboard.S);

			this.keyShoot = game.input.keyboard.addKey(Phaser.Keyboard.F);
			this.keySwitch = game.input.keyboard.addKey(Phaser.Keyboard.E);
			this.keySpawn = game.input.keyboard.addKey(Phaser.Keyboard.Q);

			//this.keyLeft.onDown.add(this.left, this);
			//this.keyRight.onDown.add(this.right, this);
			//this.keyUp.onDown.add(this.up, this);
			//this.keyDown.onDown.add(this.down, this);

			this.keySwitch.onDown.add(this.playerArm.switchNS, this.playerArm);
			this.keySpawn.onDown.add(this.spawnCrate, this);


			this.speed = 300;

			this.sprite.maxVelocity = 1000;
			this.sprite.maxSpeed = 1000;
	}

	update() {
		this.playerArm.update();

		this.bulletHandler.update();

		if(this.keyLeft.isDown){
			this.left();
		}
		if(this.keyRight.isDown){
			this.right();
		}
		if(this.keyUp.isDown){
			/*if(this.sprite.body.blocked.down == true){
				this.up();
			}else if(this.sprite.body.onFloor() || this.sprite.body.onWall()){
				this.up();
			}*/
			this.up();
		}
		if(this.keyDown.isDown){
			this.down();
		}
		if(this.keyShoot.isDown){
			this.shoot();
		}
	}

	getSprite() {
		return this.sprite;
	}

	left() {
		this.sprite.body.velocity.x = -this.speed;
	}

	right() {
		this.sprite.body.velocity.x = this.speed;
	}

	up() {
		this.sprite.body.velocity.y = -this.speed;
	}

	down() {
		this.sprite.body.velocity.y = this.speed/2;
	}

	shoot() {
		this.bulletHandler.add(new magBullet(this.playerArm));
	}

	spawnCrate(){
		var tempObj = new GameObject(game.input.position.x,game.input.position.y,'crate', '');
		tempObj.magnetType = new MagnetType(2);
		crateHandler.add();
	}
}

class PlayerArm {
	constructor(pSprite){
		this.ppSprite = pSprite;
		this.sprite = game.add.sprite(pSprite.x + (pSprite.width/2), pSprite.y + (pSprite.height/2), 'playerNorth');
		this.switched = false;
		this.sprite.anchor.setTo(0, 0.5);
	}

	update(){
		this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
		this.sprite.y = this.ppSprite.y + (this.ppSprite.height/2);
		this.sprite.x = this.ppSprite.x + (this.ppSprite.width/2);
	}

	switchNS(){
		this.switched ? this.swapToNorth() : this.swapToSouth();
	}

	swapToNorth(){
		this.sprite.destroy();
		this.sprite = game.add.sprite(this.ppSprite.x + (this.ppSprite.width/2), this.ppSprite.y + (this.ppSprite.height/2), 'playerNorth');
		this.sprite.anchor.setTo(0, 0.5);
		this.switched = false;
	}

	swapToSouth(){
		this.sprite.destroy();
		this.sprite = game.add.sprite(this.ppSprite.x + (this.ppSprite.width/2), this.ppSprite.y + (this.ppSprite.height/2), 'playerSouth');
		this.sprite.anchor.setTo(0, 0.5);
		this.switched = true;
	}
}

class magBullet{
	constructor(pSprite){
		this.ppSprite = pSprite;
		if(pSprite.switched){
			this.bulletTexture = 'bulletSouth';
		}else{
			this.bulletTexture = 'bulletNorth';
		}
		this.sprite = game.add.sprite(pSprite.sprite.x + (pSprite.sprite.width/2), pSprite.sprite.y + (pSprite.sprite.height/2), this.bulletTexture);
		this.sprite.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enableBody(this.sprite);
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;
		this.sprite.body.allowRotation = true;
		this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);

		this.speed = 300;

		console.log(this.sprite);
		console.log(this.bulletTexture);

		game.physics.arcade.moveToPointer(this.sprite, 400);
	}

	update(){
		if(this.sprite == null){return;}

		for(var i = 0; i < crateHandler.entities.length; i++){
			if(typeof crateHandler.entities[i] == 'undefined'){continue;}
			if(Phaser.Physics.Arcade.overlap(this.sprite, crateHandler.entities[i].sprite)){
				game.physics.arcade.moveToXY(crateHandler.entities[i].sprite, this.ppSprite.sprite.position.x,this.ppSprite.sprite.position.y, 300);
				this.sprite.destroy();
				this.sprite = null;
				console.log("COLLIDEED");
				break;
			}
		}

		if(!Phaser.Rectangle.contains(game.world.bounds, this.sprite.position.x, this.sprite.position.y)){
			this.sprite.destroy();
			this.sprite = null;
		}
	}
}

var player;
var crateHandler = new UpdateHandler();
MainGame.prototype = {
    switchFull: function () {
        game.scale.isFullScreen ? game.scale.stopFullScreen() : game.scale.startFullScreen(false);
    },

    create: function () {
        var pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.F6);
        pauseKey.onDown.add(this.switchFull, this);


		game.physics.startSystem(Phaser.Physics.Arcade);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.arcade.gravity = new Phaser.Point(0, 500);

		lm.startLevelById(2);

		player = new Player(0, 0);
    },

    update: function () {
		player.update();
		lm.update();
    }
};
