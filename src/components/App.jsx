import React, { Component, useState, useRef }	from 'react';
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
			numOfPlayers:			0,
			dealerScore:			0,
			playerScore:			0,
			dealerCards:			[],
			playerCards:			[],
			showNumPlayerButton:	false
		};

		this.cards		= new Cards();
		this.playGame 	= new playGame();
		this.props = props;
		sessionStorage.removeItem("howManyPlayer");


		// Binding this keyword
		this.updateState = this.updateState.bind(this);
	}

	// handle onChange event of the dropdown
	updateState = val => {
		this.setState({ numOfPlayers : val });
		this.setState({ showNumPlayerButton : true });
		sessionStorage.setItem('howManyPlayer', val);
	}

	render() {
		return (
			<div style={{ textAlign: "center" }}>
				<h1>Black Jack</h1>
				<div>
					<Dropdown onSelect={this.updateState}>
						<Dropdown.Toggle variant="primary" id="dropdown-basic" disabled={this.state.showNumPlayerButton}>
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
