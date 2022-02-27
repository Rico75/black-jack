  import Phaser                 from "phaser";
  import React, { useState }	from 'react';
  import cards                  from "../assets/atlas/cards.png";
  import cardsJSON              from "../assets/atlas/cards.json";
  // import app 		            from "../components/App.jsx";


class playGame extends Phaser.Scene {
  constructor(props)
  {
    super(props);
    this.state = {
      howManyPlayer: 0
    };
    // this.app   = app;
    console.log('scene:props:13', props);
    console.log('scene:this:17', this);

    this.updateState = this.updateState.bind(this);
  }

  preload ()
  {
    //  load images
    this.load.atlas('cards01',cards,cardsJSON);
  }

  create ()
  {

    let frames01 = this.textures.get('cards01').getFrameNames();
    let x1 = 450;
    let y1 = 125;

    for (let i = 0; i < 52; i++)
    {
      let image01 = this.add.image(x1, y1, 'cards01', Phaser.Math.RND.pick(frames01)).setInteractive({ draggable: true });
    }

    // dealer camera
    this.cameras.main.setZoom(1).setBackgroundColor('#000000');
    console.log('scene:42:this',this);
    // players camera
    if( this.state.howManyPlayer === '1')
    {
      this.cameras.add(0, 300, 512, 300).setZoom(0.5).setBackgroundColor('#00aa00');
    }
    if( this.state.howManyPlayer === '2')
    {
      this.cameras.add(512, 300, 512, 300).setZoom(0.5).setBackgroundColor('#aa0000');
    }

      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;

    });

  }

  updateState()
  {
    this.state.howManyPlayer = sessionStorage.getItem("howManyPlayer");
  }

}

export default playGame;
