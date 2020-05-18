import IsoPlugin, { IsoPhysics, IsoSprite } from 'phaser3-plugin-isometric';
import { map1 } from '../mapdata/maps';

export default class GameScreen extends Phaser.Scene {

    constructor() {
        super( {
            key: 'GameScreen',
            mapAdd: { isoPlugin: "iso", isoPhysics: 'isoPhysics' },
        } );
    }

    preload = () => {
        this.load.scenePlugin( {
            key: 'IsoPlugin',
            url: IsoPlugin,
            sceneKey: 'iso',
        } );

        this.load.scenePlugin( {
            key: 'IsoPhysics',
            url: IsoPhysics,
            sceneKey: 'isoPhysics'
        } );

        this.tiles = this.add.group();

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    loadMap = () => {
        for ( let xx = 0; xx < map1[0].length; xx++ ) {
            for ( let yy = 0; yy < map1.length; yy++ ) {
                if( map1[yy][xx] !== 0 ) {
                    let tileType = map1[yy][xx] === 1 ? 'yellow-grass' : 'forest-tile';
                    let newTile = this.add.isoSprite( ( xx + 1 ) * 90, ( yy + 1 ) * 90, 0, tileType, this.tiles );
                    this.isoPhysics.world.enable( newTile );
                    newTile.body.collideWorldBounds = true;
                    newTile.body.immovable = true;
                }
            }
        }
    }

    playerController = () => {
        this.playerShadow.isoX = this.player.body.position.x;
        this.playerShadow.isoY = this.player.body.position.y;

        if( this.player.body.position.z < -500 ) {
            this.player.body.position.setTo( 810, 1350, 130 );
        }

        if( this.cursorKeys.left.isDown ) {
            if( this.cursorKeys.up.isDown ) {
                this.player.body.velocity.set( -150, 0, this.player.body.velocity.z );
                this.player.anims.resume();
                this.player.play( 'player-1-ul-anim', true );
            }
            else if( this.cursorKeys.down.isDown ) {
                this.player.body.velocity.set( 0, 150, this.player.body.velocity.z );
                this.player.anims.resume();
                this.player.play( 'player-1-dl-anim', true );
            }
            else {
                this.player.body.velocity.set( -85, 85, this.player.body.velocity.z );
                this.player.anims.resume();
                this.player.play( 'player-1-left-anim', true );
            }
        }
        else if( this.cursorKeys.right.isDown ) {
            if( this.cursorKeys.up.isDown ) {
                this.player.body.velocity.set( 0, -150, this.player.body.velocity.z );
                this.player.anims.resume();
                this.player.play( 'player-1-ur-anim', true );
            }
            else if( this.cursorKeys.down.isDown ) {
                this.player.body.velocity.set( 150, 0, this.player.body.velocity.z );
                this.player.anims.resume();
                this.player.play( 'player-1-dr-anim', true );
            }
            else {
                this.player.body.velocity.set( 85, -85, this.player.body.velocity.z );
                this.player.anims.resume();
                this.player.play( 'player-1-right-anim', true );
            }
        }
        else if( this.cursorKeys.up.isDown ) {
            this.player.body.velocity.set( -125, -125, this.player.body.velocity.z )
            this.player.anims.resume();
            this.player.play( 'player-1-up-anim', true );
        }
        else if( this.cursorKeys.down.isDown ) {
            this.player.body.velocity.set( 125, 125, this.player.body.velocity.z );
            this.player.anims.resume();
            this.player.play( 'player-1-down-anim', true );
        }
    }

    initKeyListeners = () => {
        this.input.keyboard.on( 'keyup_LEFT', () => {
            this.player.body.velocity.set( 0, 0, this.player.body.velocity.z );
            if( ! this.cursorKeys.right.isDown ) {
                this.player.anims.pause( this.anims.anims.get( 'player-1-left-anim' ).frames[0] );
            }
        } );
        this.input.keyboard.on( 'keyup_RIGHT', () => {
            this.player.body.velocity.set( 0, 0, this.player.body.velocity.z );
            if( ! this.cursorKeys.left.isDown ) {
                this.player.anims.pause( this.anims.anims.get( 'player-1-right-anim' ).frames[0] );
            }
        } );
        this.input.keyboard.on( 'keyup_UP', () => {
            this.player.body.velocity.set( 0, 0, this.player.body.velocity.z );
            if( ! this.cursorKeys.down.isDown ) {
                this.player.anims.pause( this.anims.anims.get( 'player-1-up-anim' ).frames[0] );
            }
        } );
        this.input.keyboard.on( 'keyup_DOWN', () => {
            this.player.body.velocity.set( 0, 0, this.player.body.velocity.z );
            if( ! this.cursorKeys.up.isDown ) {
                this.player.anims.pause( this.anims.anims.get( 'player-1-down-anim' ).frames[0] );
            }
        } );

        this.input.keyboard.on( 'keyup_SPACE', () => {
            if( parseInt( this.player.body.velocity.z ) === 0 ) {
                this.player.body.velocity.set( this.player.body.velocity.x, this.player.body.velocity.y, 400 );
            }
        } );
    }

    initPlayer = () => {
        this.player = this.add.isoSprite( 810, 1350, 130, 'player-1' );
        this.isoPhysics.world.enable( this.player );
        this.player.body.bounce.set( 0.5, 0.5, 0.1 );
        this.player.body.mass = 0;

        this.cameras.main.zoomTo( 0.2, 500 );
        this.cameras.main.startFollow( this.player );
        console.log( this.cameras.main );
        console.log( this.cameras.main._scrollX, this.cameras.main._scrollY );
        this.background = this.add.tileSprite( 0, 0, 1000, 500, 'background' );
        this.background.setOrigin( this.cameras.main._scrollX, this.cameras.main._scrollY );

        this.player.play( 'player-1-down-anim' );
        this.player.anims.pause();

        this.playerShadow = this.add.isoSprite( 810, 1350, 60, 'shadow' );
        this.playerShadow.alpha = 0.5;
        this.playerShadow.scale = 1.5;
    }

    create = () => {
        // this.background = this.add.tileSprite( 0, 0, 1000, 500, 'background' );
        

        this.isoPhysics.world.setBounds( 90, 90, 0, 6750, 1800, 500 );
        this.isoPhysics.world.gravity.setTo( 0, 0, -500 );
        this.isoPhysics.projector.origin.setTo( 0.5, 0.3 );
        this.loadMap();

        this.initPlayer();
        
        this.object1 = this.add.isoSprite( 810, 1450, 90, 'piano' );
        this.isoPhysics.world.enable( this.object1 );
        this.object1.body.bounce.set( 0.5, 0.5, 0.1 );
        this.object1.body.mass = 0;

        this.initKeyListeners();
    }

    update = () => { 
        this.isoPhysics.world.collide( this.player, this.tiles );
        this.isoPhysics.world.collide( this.object1, this.tiles );
        this.isoPhysics.world.collide( this.player, this.object1 );

        this.playerController();
    }
}