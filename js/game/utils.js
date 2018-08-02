var utils = {
    centerGameObjects: function (objects) {
        objects.forEach(function (object) {
            object.anchor.setTo(0.5);
        });
    }
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

Array.prototype.remove = function(object){
	var index = this.indexOf(object);
	if(index > -1){
		this.splice(index, 1);
	}
}

class UpdateHandler{
	constructor(){
		this.entities = [];
	}
	
	update(){
		this.entities.clean(undefined);
		for(var i = 0; i < this.entities.length; i++){
			if(typeof this.entities[i] !== 'object'){continue;}
			if(this.entities[i].sprite == null){this.remove(this.entities[i]);continue;}
			this.entities[i].update();
		}
		
	}
	
	add(object){
		this.entities.push(object);
	}
	
	remove(object){
		this.entities.remove(object);
	}
}
