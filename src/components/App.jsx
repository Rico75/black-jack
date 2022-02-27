import React, { Component, useState }	from 'react';
import Dropdown							from 'react-bootstrap/Dropdown';
import playGame 						from "../phaser/scene";
import Player							from "../components/Player.jsx";
import Cards							from "../components/Cards.jsx";


class App extends Component {

	constructor(props)
	{
		super(props);
		// Set initial state
		this.state = {
			numOfPlayers:	1,
			dealerScore:	0,
			playerScore:	0,
			dealerCards:	[],
			playerCards:	[]
		};

		this.cards		= new Cards();
		this.playGame 	= new playGame;
		console.log('app:this:24',this.state);
		// this.playGame	= playGame(this.state);
		// this.playGame = new playGame(this.state);
		// this.deck = this.cards.getCardDeck();
		console.log('app:this:28',this);


		// Binding this keyword
		this.updateState = this.updateState.bind(this);
	}

	// handle onChange event of the dropdown
	updateState = val => {
		this.setState({ numOfPlayers : val });
		sessionStorage.setItem('howManyPlayer', val);
		this.playGame.updateState();
		console.log('app:this:37', this);
	}

	render() {
		return (
			<div style={{ textAlign: "center" }}>
				<h1>Black Jack</h1>
				<div>
					<Dropdown onSelect={this.updateState}>
						<Dropdown.Toggle variant="primary" id="dropdown-basic">
							Select Number of Players: {this.state.numOfPlayers}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item eventKey="1">1</Dropdown.Item>
							<Dropdown.Item eventKey="2">2</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
		);
	}
}

export default App;
