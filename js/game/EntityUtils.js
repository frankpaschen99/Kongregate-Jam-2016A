class ObjectManager {
	constructor() {
		this.objects = [];
	}
	update() {
		
	}
	create(posX, posY, texture) {
		this.objects.push(new GameObject(posX, posY, texture, 'default'));
	}
}

class MagnetType {
	/**
	*nType: 0-3 (North, South, Metal, None)
	*/
	constructor(nType) {
		if(typeof nType == "number" && nType >= 0 && nType <= 2){this.type = nType;}
		this.North = 0;
		this.South = 1;
		this.Metal = 2;
		this.None = 3;
		this.typeArray = ["North","South","Metal","None"];
		if(typeof nType == "string"){
			for(var i = 0; i < this.typeArray.length; i++){
				if(nType == this.typeArray[i]){
					this.type = i;
				}
			}
		}
	}
	
	getType() {
		return this.type;
	}
	
	getTypeName() {
		for(var i = 0; i < this.typeArray.length; i++){
			if(this.type == i){
				return this.typeArray[i];
			}
		}
	}
}

class Entity {
	constructor(posX, posY, texture) {
		this.sprite = game.add.sprite(posX, posY, texture);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.mass = 100;
		this.sprite.body.bounce = new Phaser.Point(0.5, 0.5);
		this.sprite.body.drag = new Phaser.Point(500, 0);
		this.sprite.body.friction = 300;
		
		this.magnetType = new MagnetType(3);
	}
	
	update(){
		game.physics.arcade.collide(this.sprite, lm.getCurrentCollisionLayer());
	}
	
	magnetTest(){
		if(this.magnetType !== this.magnetType.None){
			if(this.magnetType == this.magnetType.Metal){
				
			}
		}
	}
	
	magnetHold(){
		
	}
	
	
}
class GameObject extends Entity {
	constructor(x, y, texture, behavior) {
		super(x, y, texture);
		this.behavior = behavior;
	}
	
	update() {
		
	}
}
class Enemy extends Entity {
	constructor(x, y, texture, behavior) {
		super(x, y, texture);
		this.behavior = behavior;
	}
	update() {
		
	}
}