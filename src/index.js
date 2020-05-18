import Phaser from 'phaser';
import GameScreen from './scenes/GameScreen';

const config = {
    "title": 'PhaserTestGame',
    "width": 1000,
    "height": 500,
    "type": Phaser.AUTO,
    "backgroundColor": '#000',
    "parent": 'game-container',
    "scale": {
        // "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_HORIZONTALLY
    },
}

const game = new Phaser.Game( config );

window.onload = () => {
    game.scene.add( 'Boot', Boot, true );
    game.scene.add( 'GameScreen', GameScreen, false );
}

class Boot extends Phaser.Scene {

    constructor() {
        super( {
            key: 'Boot'
        } )
    }

	preload = () => {
        this.load.setBaseURL( 'src/assets/' );

        this.load.image( 'background', 'background.jpg' );
        this.load.image( 'yellow-grass', 'yellow-grass.png' );
        this.load.image( 'forest-tile', 'forest-tile.png' );
        this.load.image( 'mona', 'art-1-5.png' );
        this.load.image( 'piano', 'piano-1.png' );
        this.load.image( 'shadow', 'shadow.png' );
        this.load.spritesheet( 'player-1', 'players/players-1.png', {
            frameWidth: 85,
            frameHeight: 170,
        } );
    }
    
    initAnimations = () => {
        this.anims.create( {
            key: 'player-1-left-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 24,
                end: 29,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
        this.anims.create( {
            key: 'player-1-right-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 0,
                end: 5,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
        this.anims.create( {
            key: 'player-1-up-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 12,
                end: 17,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
        this.anims.create( {
            key: 'player-1-down-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 42,
                end: 47,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
        this.anims.create( {
            key: 'player-1-ul-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 18,
                end: 23,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
        this.anims.create( {
            key: 'player-1-ur-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 6,
                end: 11,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
        this.anims.create( {
            key: 'player-1-dr-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 36,
                end: 41,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
        this.anims.create( {
            key: 'player-1-dl-anim',
            frames: this.anims.generateFrameNumbers( 'player-1', {
                start: 30,
                end: 35,
            } ),
            frameRate: 10,
            repeat: -1,
        } );
    }

	create = () => {
        this.add.text( 50, 50, "Loading game..." );
        this.initAnimations();
        this.scene.start( 'GameScreen' );
    }
}
