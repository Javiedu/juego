var escenaMenu={

    preload:function(){
        game.load.image('logo','assets/menu/logo.png');
        game.load.image('empezar','assets/menu/empezar.png');
    },	
        
    create:function(){
        game.add.sprite(500, 50, 'logo')
        game.add.sprite(400, 450, 'empezar').anchor.setTo(0.5)
    },
    
    update:function(){
        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            game.state.start('nivelUno')
        }
    }
    };
    
    var game=new Phaser.Game(800,600,Phaser.AUTO,'gameDIV');
    game.state.add('menu', escenaMenu);
    game.state.start('menu');