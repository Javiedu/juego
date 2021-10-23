var menuState={

    preload:function(){

    },	
        
    create:function(){
    
    },
    
    update:function(){
        
    }
    };
    
    var game=new Phaser.Game(1290,750,Phaser.AUTO,'gameDIV');
    game.state.add('menu', menuState);
    game.state.start('escenaUno');
    