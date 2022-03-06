  import Phaser                 from "phaser";
  import React, {Component, useState } from 'react';
  import cards                  from "../assets/atlas/cards.png";
  import cardsJSON              from "../assets/atlas/cards.json";


class playGame extends Phaser.Scene {
  constructor(props)
  {
    super(props);
  }

  preload()
  {
    //  load images
    this.load.atlas('cards01',cards,cardsJSON);
    this.start = 0;
  }

  create()
  {
    let frames01 = this.textures.get('cards01').getFrameNames();
    let x1 = 450;
    let y1 = 125;
    this.start = this.start + 1;

    for (let i = 0; i < 52; i++)
    {
      let image01 = this.add.image(x1, y1, 'cards01', Phaser.Math.RND.pick(frames01)).setInteractive({ draggable: true });
    }

    // dealer camera
    this.cameras.main.setZoom(1).setBackgroundColor('#000000');
    this.input.on('drag', function (pointer, gameObject, dragX, dragY)
    {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
  }

  update()
  {
    if( sessionStorage.getItem("howManyPlayer") === '1' && this.start === 1)
    {
      this.cameras.add(0, 300, 1024, 300).setZoom(0.5).setBackgroundColor('#00aa00');
      this.start = this.start + 1;
    }
    if( sessionStorage.getItem("howManyPlayer") === '2' && this.start === 1)
    {
      this.cameras.add(0, 300, 512, 300).setZoom(0.5).setBackgroundColor('#00aa00');
      this.cameras.add(512, 300, 512, 300).setZoom(0.5).setBackgroundColor('#aa0000');
      this.start = this.start + 1;
    }

  }
}

export default playGame;
