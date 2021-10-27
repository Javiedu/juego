var escenaFin={

    preload:function(){
        game.load.image('texto','assets/fin/texto.png');
        game.load.image('volver','assets/fin/volver.png');
    },	
        
    create:function(){
        game.add.sprite(0, 400, 'texto')
        //contador = 0;
    },
    
    update:function(){
        /*
        contador += 1
        if(contador == 200){game.add.sprite(400, 200, 'volver').anchor.setTo(0.5)}

        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && contador >= 200){
            game.state.start('menu')
        }
        */
    }
    };
    
    game.state.add('fin', escenaFin);
