import React from "react";
import Phaser     from "phaser";
import cards      from "../assets/atlas/cards.png";
import cardsJSON  from "../assets/atlas/cards.json";

class Cards extends React.Component {
	constructor(props)
	{
		super(props);
		this.cardNumber	=0;
		this.cardSuit	='';
		this.cardColor	='';
		this.cardName	='';
	}

	// methods
	setCardNumber(num)
	{
		this.cardNumber = num;
	}
	setCardSuit(suit)
	{
		this.cardSuit = suit;
	}
	setCardColor(color)
	{
		this.cardSuit = color;
	}
	setCardName(name)
	{
		this.cardName = name;
	}

	getCardNumber(num)
	{
		this.cardNumber = num;
	}
	getCardSuit(suit)
	{
		this.cardSuit = suit;
	}
	getCardColor(color)
	{
		this.cardSuit = color;
	}
	getCardName(name)
	{
		this.cardName = name;
	}

	getCardDeck()
	{
		// create obj cards01
		this.load.atlas('cards01',cards,cardsJSON);
		// get frameName from JSON
		let frames01 = this.textures.get('cards01').getFrameNames();
		// default values
		let x1 = 450;
		let y1 = 125;

		// loop through deck
		for (let i = 0; i < 54; i++)
		{
			console.log('frames01',frames01);
			let image = this.add.image(x1, y1, 'cards01', Phaser.Math.RND.pick(frames01)).setInteractive({ draggable: true });
			console.log('image',image);
		}
	}

}
export default Cards;