var saltoUno=0;
var saltoDos=0;
var portalUnoActivo = false;
var cofreAbierto = false;
var contador = 0;
var lluviaTerminada = false;
var colisionLluvia = false;
var tiempoLluvia = 0;
var portalDosActivo = false;
var posicionInicioX = 400;
var posicionInicioY = 2800;
var ganado = false;
var tiempoGanado = 0;
var empezarContadorGanado = false;
var tiempoBala = 0;
var lado = 0;
var vidaMonstruo = 2;

var nombreObjetos = ['espadaUnFilo', 'espadaDosFilos', 'flecha', 'hacha', 'lanza', 'martillo', 'tridente']


var escenaUno={ 
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
    game.load.image('paredSangre','assets/paredSangre.png');
    game.load.image('casa','assets/casa.png');
    game.load.image('manzana','assets/manzana.png');
    game.load.image('espantaPajarosGanado','assets/espantaPajarosGanado.png');
    game.load.spritesheet('naruto','assets/naruto.png', 45, 63.75);
    game.load.spritesheet('monstruo','assets/monstruo.png', 139, 145);
    game.load.spritesheet('portal','assets/portal.png', 36, 140);
    game.load.spritesheet('cofre','assets/cofre.png', 38, 40);

    //Lluvia
    game.load.image('colisionLluvia','assets/colisionLluvia.png');
    //Objetos lanzables
    game.load.image('espadaUnFilo','assets/objetosLluvia/espadaUnFilo.png');
    game.load.image('espadaDosFilos','assets/objetosLluvia/espadaDosFilos.png');
    game.load.image('flecha','assets/objetosLluvia/flecha.png');
    game.load.image('hacha','assets/objetosLluvia/hacha.png');
    game.load.image('lanza','assets/objetosLluvia/lanza.png');
    game.load.image('martillo','assets/objetosLluvia/martillo.png');
    game.load.image('tridente','assets/objetosLluvia/tridente.png');
},  

create:function(){
this.game.physics.startSystem(Phaser.Physics.ARCADE);
this.fondo=game.add.sprite(0,0,'fondo');
this.objetos=game.add.sprite(0,0,'objetos');
this.paredLateral = game.add.sprite(0, 0, 'paredLateral')
this.paredSangre = game.add.sprite(660, 1938, 'paredSangre')

this.plat = game.add.group()

this.marcoColisionLluvia = game.add.sprite(0, 1938, 'colisionLluvia')
this.suelos = game.add.group()
this.game.world.setBounds(0, 0, 800, 5000)

this.suelos.create(0,4970,'suelos');
this.suelos.create(400,4970,'suelos');
this.suelos.create(31,2315,'sueloSangre');

this.plat.create(625,4941,'platUno');
this.plat.create(484,4884,'platDos');
this.plat.create(315,4800,'platUno');
this.plat.create(504,4658,'platUno');
this.plat.create(678,4614,'platTres');
//this.plat.create(583,4524,'platTres');
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
this.plat.create(182,2850,'platUno');
this.plat.create(350,2690,'platUno');
this.plat.create(600,2600,'platUno');
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
this.portalDos = game.add.sprite(336, 2206, 'portal')
this.portalTres = game.add.sprite(636, 2491, 'portal')

this.monstruo = game.add.sprite(700, 3540, 'monstruo')
this.cofre = game.add.sprite(390, 618, 'cofre')
this.personaUno = game.add.sprite(posicionInicioX, posicionInicioY, 'naruto');/////////////////////////////////////


this.game.physics.arcade.enable(this.personaUno);
this.game.physics.arcade.enable(this.suelos);

this.game.physics.arcade.enable(this.movil)
this.movil.enableBody = true
this.movil.body.immovable = true

this.game.physics.arcade.enable(this.paredLateral)
this.paredLateral.enableBody = true
this.paredLateral.body.immovable = true

this.game.physics.arcade.enable(this.paredSangre)
this.paredSangre.enableBody = true
this.paredSangre.body.immovable = true

this.game.physics.arcade.enable(this.marcoColisionLluvia)
this.marcoColisionLluvia.enableBody = true
this.marcoColisionLluvia.body.immovable = true
this.marcoColisionLluvia.alpha = 0

this.game.physics.arcade.enable(this.monstruo)
this.monstruo.enableBody = true
this.monstruo.body.immovable = true

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

this.portalDos.animations.add('normal',[0, 1, 2, 3], 6, true);
this.portalDos.animations.play('normal');

this.portalTres.animations.add('normal',[0, 1, 2, 3], 6, true);
this.portalTres.animations.play('normal');

this.monstruo.animations.add('andando',[0, 1, 2, 3, 4, 5, 6, 7], 10, true);
this.monstruo.animations.play('andando');

this.monstruo.anchor.setTo(0.5)


this.game.physics.arcade.enable(this.suelos)
this.suelos.setAll('enableBody', true)
this.suelos.setAll('body.immovable', true)

this.game.physics.arcade.enable(this.plat)
this.plat.setAll('enableBody', true)
this.plat.setAll('body.immovable', true)

this.lluvia = game.add.group();
this.lluvia.enableBody = true;
this.lluvia.physicsBodyType = Phaser.Physics.ARCADE;
this.lluvia.setAll('anchor.x', 0.5)

this.balas = game.add.group();
this.balas.enableBody = true;
this.balas.physicsBodyType = Phaser.Physics.ARCADE;
this.balas.setAll('anchor.x', 0.5)
this.balas.setAll('anchor.y', 0.5)

this.game.physics.arcade.enable(this.portal)
this.portal.alpha = 0;

this.game.physics.arcade.enable(this.portalDos)
this.portalDos.alpha = 0;

this.game.physics.arcade.enable(this.portalTres)


this.game.physics.arcade.enable(this.cofre)
this.cofre.animations.add('cerrado',[0],10,true);
this.cofre.animations.add('abierto',[1],10,true);
this.cofre.animations.play('cerrado')

game.camera.follow(this.personaUno)
},

update:function(){

//Lluvia
colisionLluvia = false
this.game.physics.arcade.overlap(this.personaUno, this.marcoColisionLluvia, function(){
    colisionLluvia = true
})

if(colisionLluvia){
    tiempoLluvia += 1
} else {
    tiempoLluvia = 0
}

if(this.time.now > contador && colisionLluvia == true && lluviaTerminada == false){    
    objeto = Math.floor((Math.random() * (6 - 0)) + 0)
    posicion = Math.floor((Math.random() * (635 - 31)) + 31)
    bala = this.lluvia.create(posicion, 1900, nombreObjetos[objeto])
    if(bala){
        bala.body.velocity.y = 200
        contador = this.time.now + 100
    }
}

if(tiempoLluvia == 300){
    lluviaTerminada = true
    this.portalDos.alpha = 1
}

if(lluviaTerminada == true){
    this.game.physics.arcade.overlap(this.personaUno, this.portalDos, function(personaUno){
        personaUno.body.y = 615
        personaUno.body.x = 256
    })
    }


//Monstruo
if(this.monstruo.body.x > 600){
    this.monstruo.body.velocity.x = -100
    this.monstruo.scale.x = -1
} else if(this.monstruo.body.x < 350){
    this.monstruo.body.velocity.x = 100
    this.monstruo.scale.x = 1
}

//Movimiento plataforma movil
if(this.movil.body.y > 4186){
    this.movil.body.velocity.y = -100
} else if(this.movil.body.y < 3900) {
    this.movil.body.velocity.y = 100
}

saltoUno = 0

//Colisiones
this.game.physics.arcade.collide(this.personaUno, this.paredLateral)
this.game.physics.arcade.collide(this.personaUno, this.paredSangre)

this.game.physics.arcade.collide(this.personaUno, this.lluvia, function(personaUno, lluvia){
    lluvia.kill()
    personaUno.body.x = posicionInicioX
    personaUno.body.y = posicionInicioY
})

this.game.physics.arcade.collide(this.monstruo, this.balas, function(monstruo, balas){
    balas.kill()
    vidaMonstruo -= 1
})

this.game.physics.arcade.collide(this.lluvia, this.suelos, function(lluvia, suelo){
    lluvia.kill()
})

this.game.physics.arcade.collide(this.personaUno,this.suelos,function() {
    saltoUno=1;
});
this.game.physics.arcade.collide(this.personaUno,this.plat,function() {
    saltoUno=1;
});
this.game.physics.arcade.collide(this.personaUno,this.movil, function() {
    saltoUno=1;
});

this.game.physics.arcade.collide(this.personaUno, this.monstruo, function(personaUno, lluvia){
    personaUno.body.x = posicionInicioX
    personaUno.body.y = posicionInicioY
})

//Portal
console.log(vidaMonstruo)
if(vidaMonstruo == 0){
    portalUnoActivo = true;
    this.portal.alpha = 1;
    this.monstruo.kill()
}

if(portalUnoActivo == true){
this.game.physics.arcade.overlap(this.personaUno, this.portal, function(personaUno){
    personaUno.body.y = 2870
})
}

this.game.physics.arcade.overlap(this.personaUno, this.portalTres, function(personaUno){
    personaUno.body.y = 2260
    personaUno.body.x = 350
})

//Cofre
if(ganado == false){
this.game.physics.arcade.overlap(this.personaUno, this.cofre, function(personaUno, cofre){
    cofreAbierto = true
    cofre.animations.play('abierto')
    ganado = true
    game.add.image(280, 460, 'espantaPajarosGanado')
    empezarContadorGanado = true
})
}

if(empezarContadorGanado == true){ tiempoGanado += 1 }
if(tiempoGanado == 300){
    //Reinicio de variables
    saltoUno=0;
    saltoDos=0;
    portalUnoActivo = false;
    cofreAbierto = false;
    contador = 0;
    lluviaTerminada = false;
    colisionLluvia = false;
    tiempoLluvia = 0;
    portalDosActivo = false;
    posicionInicioX = 200;
    posicionInicioY = 400;
    ganado = false;
    tiempoGanado = 0;
    empezarContadorGanado = false;
    tiempoBala = 0;
    //Cambio escena
    game.state.start('fin')
}

//Disparar
if(this.time.now > tiempoBala && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){ 
    disparo = this.balas.create(this.personaUno.body.x, this.personaUno.body.y, 'manzana')
    if(disparo){
        if(lado == 1){disparo.body.velocity.x = 200} else {disparo.body.velocity.x = -200}
        tiempoBala = this.time.now + 700
    }
}

//Movimiento personaje
if (this.input.keyboard.isDown(Phaser.Keyboard.W) && saltoUno==1) {
    this.personaUno.body.y=this.personaUno.body.y-10;
    this.personaUno.body.velocity.y=-700;

}
if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
    this.personaUno.body.velocity.x=-200;
    lado = 0
}else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
    this.personaUno.body.velocity.x=200;
    lado = 1
}else if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
    this.personaUno.body.velocity.y=700; 
} else {
    this.personaUno.body.velocity.x=0;
}

//Animaciones personaje
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

game.state.add('nivelUno', escenaUno);