// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract BlackJack {

    struct Player {
        address player;
        uint256 playerCard1;
        uint256 playerCard2;
        uint256 playerWager;
        uint256 playerNextCard;
        uint256 playerCardsValue;
        uint256 playerCardsSplitValue;
    }
    struct Dealer {
        uint256 dealerCard1;
        uint256 dealerCard2;
        uint256 dealerWager;
        uint256 dealerNextCard;
        uint256 dealerCardsValue;
        uint256 dealerCardsSplitValue;
    }

    Player private player;
    Dealer private dealer;

//    mapping(string => CardDeck) public cards;
    function setCardDeck(string[] memory _cards) public pure {
        CardDeck(_cards);
    }

    function getCardDeck() public pure returns(string[] memory)
    {
        string[] memory cardDeck = new string[](52);
        return (cardDeck);
    }
}
