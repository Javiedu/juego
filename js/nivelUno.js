var saltoUno=0;
var saltoDos=0;


var mainState={ 
preload:function(){
    game.load.image('fondo','assets/fondo.png');
    game.load.image('suelos','assets/suelos.png');
    game.load.image('bloque','assets/bloque.png');

    game.load.spritesheet('naruto','assets/naruto.png',45,63.75);
},  

create:function(){
this.game.physics.startSystem(Phaser.Physics.ARCADE);
this.suelos = game.add.group()
this.plat = game.add.group()
this.fondo=game.add.sprite(0,0,'fondo');
this.game.world.setBounds(0, 0, 800, 5000)

this.suelos.create(0,4970,'suelos');
this.suelos.create(300,4970,'suelos');



this.personaUno=game.add.sprite(200,4850,'naruto');

this.game.physics.arcade.enable(this.personaUno);
this.game.physics.arcade.enable(this.suelos);


this.personaUno.body.gravity.y=1500;
this.personaUno.body.setSize(this.personaUno.width-20,this.personaUno.height-21,10,10);
this.personaUno.body.collideWorldBounds = true;

this.personaUno.animations.add('derecha',[6,7,8],10,true);
this.personaUno.animations.add('izquierda',[3,4,5],10,true);
this.personaUno.animations.add('reposo',[1],10,true);
this.personaUno.animations.add('salto',[10],10,true);
this.personaUno.animations.play('reposo');

this.game.physics.arcade.enable(this.suelos)
this.suelos.setAll('enableBody', true)
this.suelos.setAll('body.immovable', true)

},

update:function(){
saltoUno = 0

this.game.camera.y = this.personaUno.body.y -300


this.game.physics.arcade.collide(this.personaUno,this.suelos,function() {
    saltoUno=1;
});


if (this.input.keyboard.isDown(Phaser.Keyboard.W) && saltoUno==1) {
    this.personaUno.body.y=this.personaUno.body.y-10;
    this.personaUno.body.velocity.y=-700;
}
if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
    this.personaUno.body.velocity.x=-200;
}else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
    this.personaUno.body.velocity.x=200; 
} else {
    this.personaUno.body.velocity.x=0;
}


if (this.personaUno.body.velocity.x > 0) {
    this.personaUno.animations.play('derecha');
}else if (this.personaUno.body.velocity.x < 0) {
    this.personaUno.animations.play('izquierda');
}else if (saltoUno==1) {
    this.personaUno.animations.play('salto');
}else{
    this.personaUno.animations.play('reposo');
}
}   
};

var game=new Phaser.Game(800,600,Phaser.AUTO,'gameDIV');
game.state.add('main', mainState);
game.state.start('main');