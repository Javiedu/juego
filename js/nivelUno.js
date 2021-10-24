var saltoUno=0;
var saltoDos=0;
var portalUnoActivo = false;
var cofreAbierto = false;


var mainState={ 
preload:function(){
    game.load.image('fondo','assets/fondoColor.png');
    game.load.image('objetos','assets/objetosTransparentes.png');
    game.load.image('paredLateral','assets/paredLateral.png');
    game.load.image('suelos','assets/suelos.png');
    game.load.image('platUno','assets/platFina.png');
    game.load.image('platUnoRev','assets/platFinaRev.png');
    game.load.image('platDos','assets/bloqueGrande.png');
    game.load.image('platTres','assets/tronco.png');
    game.load.image('sueloSangre','assets/sueloSangre.png');
    game.load.image('casa','assets/casa.png');
    game.load.spritesheet('naruto','assets/naruto.png', 45, 63.75);
    game.load.spritesheet('bowser','assets/bowser.png', 112.77, 99);
    game.load.spritesheet('portal','assets/portal.png', 35, 140);
    game.load.spritesheet('cofre','assets/cofre.png', 38, 40);
},  

create:function(){
this.game.physics.startSystem(Phaser.Physics.ARCADE);
this.fondo=game.add.sprite(0,0,'fondo');
this.objetos=game.add.sprite(0,0,'objetos');
this.paredLateral = game.add.sprite(0, 0, 'paredLateral')
this.plat = game.add.group()


this.suelos = game.add.group()
this.game.world.setBounds(0, 0, 800, 5000)

this.suelos.create(0,4970,'suelos');
this.suelos.create(400,4970,'suelos');
this.suelos.create(31,2315,'sueloSangre');

this.plat.create(625,4941,'platUno');
this.plat.create(484,4884,'platDos');
this.plat.create(315,4690,'platUno');
this.plat.create(504,4658,'platUno');
this.plat.create(678,4614,'platTres');
this.plat.create(583,4524,'platTres');
this.plat.create(441,4485,'platUno');
this.plat.create(303,4465,'platTres');
this.plat.create(175,4418,'platTres');
this.plat.create(185,4305,'platTres');
this.plat.create(320,4270,'platTres');
this.plat.create(344,3831,'platTres');
this.plat.create(220,3722,'platTres');
this.plat.create(220,3722,'platTres');

this.plat.create(361,3617,'platUnoRev');
this.plat.create(448,3617,'platUnoRev');
this.plat.create(536,3617,'platUnoRev');
this.plat.create(623,3617,'platUnoRev');
this.plat.create(710,3617,'platUnoRev');
this.plat.create(361,3608,'platUno');
this.plat.create(448,3608,'platUno');
this.plat.create(536,3608,'platUno');
this.plat.create(623,3608,'platUno');
this.plat.create(710,3608,'platUno');

this.plat.create(369,3013,'platDos');
this.plat.create(460,3013,'platDos');
this.plat.create(550,3013,'platDos');
this.plat.create(640,3013,'platDos');
this.plat.create(730,3013,'platDos');
//

this.plat.create(182,2802,'platUno');
//Muchas plataformas
//610
this.plat.create(0, 658,'platDos');
this.plat.create(90, 658,'platDos');
this.plat.create(180, 658,'platDos');
this.plat.create(270, 658,'platDos');
this.plat.create(360, 658,'platDos');
this.plat.create(450, 658,'platDos');
this.plat.create(540, 658,'platDos');
this.plat.create(630, 658,'platDos');
this.plat.create(720, 658,'platDos');

this.movil = game.add.sprite(400,4239,'platTres');

this.portal = game.add.sprite(750, 3500, 'portal')
this.bowser = game.add.sprite(650, 3500, 'bowser')
this.cofre = game.add.sprite(390, 618, 'cofre')
this.personaUno = game.add.sprite(360,4176,'naruto');/////////////////////////////////////


this.game.physics.arcade.enable(this.personaUno);
this.game.physics.arcade.enable(this.suelos);

this.game.physics.arcade.enable(this.movil)
this.movil.enableBody = true
this.movil.body.immovable = true

this.game.physics.arcade.enable(this.paredLateral)
this.paredLateral.enableBody = true
this.paredLateral.body.immovable = true

this.personaUno.body.gravity.y=1500;
this.personaUno.body.setSize(this.personaUno.width-20,this.personaUno.height-21,10,10);
this.personaUno.body.collideWorldBounds = true;

this.personaUno.animations.add('derecha',[6,7,8],10,true);
this.personaUno.animations.add('izquierda',[3,4,5],10,true);
this.personaUno.animations.add('reposo',[1],10,true);
this.personaUno.animations.add('salto',[10],10,true);
this.personaUno.animations.play('reposo');

this.portal.animations.add('normal',[0, 1, 2, 3], 6, true);
this.portal.animations.play('normal');

this.bowser.animations.add('normal',[0, 18, 36, 54, 72, 90], 5, true);
this.bowser.animations.play('normal');


this.game.physics.arcade.enable(this.suelos)
this.suelos.setAll('enableBody', true)
this.suelos.setAll('body.immovable', true)

this.game.physics.arcade.enable(this.plat)
this.plat.setAll('enableBody', true)
this.plat.setAll('body.immovable', true)

this.game.physics.arcade.enable(this.portal)
this.portal.alpha = 0;

this.game.physics.arcade.enable(this.cofre)
this.cofre.animations.add('cerrado',[0],10,true);
this.cofre.animations.add('abierto',[1],10,true);


},

update:function(){

if(this.movil.body.y > 4186){
    this.movil.body.velocity.y = -100
} else if(this.movil.body.y < 3900) {
    this.movil.body.velocity.y = 100
}

saltoUno = 1

this.game.camera.y = this.personaUno.body.y -300

this.game.physics.arcade.collide(this.personaUno, this.paredLateral)

this.game.physics.arcade.collide(this.personaUno,this.suelos,function() {
    saltoUno=1;
});

this.game.physics.arcade.collide(this.personaUno,this.plat,function() {
    saltoUno=1;
});

this.game.physics.arcade.collide(this.personaUno,this.movil, function() {
    saltoUno=1;
});

if(portalUnoActivo){
this.game.physics.arcade.overlap(this.personaUno, this.portal, function(personaUno){
    personaUno.body.y = 2870
})
}

this.game.physics.arcade.overlap(this.personaUno, this.cofre, function(){
    cofreAbierto = true
})


if(cofreAbierto == true){
    this.cofre.animations.play('abierto')
} else {
    this.cofre.animations.play('cerrado')
}


if(this.input.keyboard.isDown(Phaser.Keyboard.O)){
    portalUnoActivo = true;
    this.portal.alpha = 1;
}


if (this.input.keyboard.isDown(Phaser.Keyboard.W) && saltoUno==1) {
    this.personaUno.body.y=this.personaUno.body.y-10;
    this.personaUno.body.velocity.y=-700;
    console.log(this.personaUno.body.y)
}
if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
    this.personaUno.body.velocity.x=-200;
}else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
    this.personaUno.body.velocity.x=200; 
}else if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
    this.personaUno.body.velocity.y=700; 
} else {
    this.personaUno.body.velocity.x=0;
    //this.personaUno.body.velocity.y=0;

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