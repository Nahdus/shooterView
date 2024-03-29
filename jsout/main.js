"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
const config_1 = __importDefault(require("./key/config"));
//////////////////////////////////////
//Author:Nadar Ponsudhan a.k.a Sudhan/
//////////////////////////////////////
//Date:23/07/2019///////////////////////
//Time:07:08 pm///////////////////////
//////////////////////////////////////
////////////////////////////////////////
firebase.initializeApp(config_1.default);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
////////////////////////////////////////
const conf = {
    width: 800,
    height: 600,
    type: Phaser.WEBGL,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let beams;
let ship;
let speed;
let xpos;
let cursors;
let lastupdate = 0;
let game = new Phaser.Game(conf);
let leftLimit;
let rightLimit;
let refDb = db.collection('Positions').doc('SqlGqn0dPytJH67As4sS');
function preload() {
    this.load.image('nightSky', './assets/starryNight.jpg');
    this.load.image('starShip', './assets/starShip.png');
    this.load.image('beam', './assets/beam.png', 0.10);
}
function create() {
    // this.add.image(400,300,"nightSky")
    // this.add.image(300,500,"starShip").setScale(0.15)
    // this.add.image(300,400,"beam").setScale(0.10)
    //this.add.image(400,300,"starShip"
    let beam = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize: function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'beam');
            this.speed = Phaser.Math.GetSpeed(400, 1);
        },
        fire: function (x, y) {
            this.setPosition(x, y - 50);
            this.setActive(true);
            this.setVisible(true);
        },
        update: function (time, delta) {
            this.y -= this.speed * delta;
            if (this.y < -50) {
                this.setActive(false);
                this.setVisible(false);
            }
        }
    });
    beams = this.add.group({
        classType: beam,
        maxSize: 10,
        runChildUpdate: true
    });
    refDb.get().then(x => {
        xpos = x.data().x;
        ship = this.add.sprite(xpos, 500, 'starShip').setScale(0.15).setDepth(1);
    });
    cursors = this.input.keyboard.createCursorKeys();
    speed = Phaser.Math.GetSpeed(400, 1);
    leftLimit = 30;
    rightLimit = conf.width - leftLimit;
}
refDb.onSnapshot(snap => {
    xpos = snap.data().x;
});
function update(time, delta) {
    if (ship) {
        ship.x = xpos;
    }
    // if (cursors.left.isDown && ship.x>leftLimit)
    // {
    //     ship.x -= speed * delta;
    // }
    // else if (cursors.right.isDown && ship.x<rightLimit)
    // {
    //     ship.x += speed * delta;
    //     refDb.update({x:ship.x})
    // }
    // if (cursors.up.isDown && time > lastFired)
    // {
    //     var beam = beams.get() ;
    //     if (beam)
    //     {
    //         beam.fire(ship.x, ship.y);
    //         lastFired = time + 100;
    //     }
    // }
}
//# sourceMappingURL=main.js.map