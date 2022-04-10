// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

//BlackJack.sol
//Ricardo Peinado
//BlackJack smart contract
//03.13.2022


//RULES:
//This rules are based on the URL:
//https://www.lasvegasdirect.com/las-vegas-blackjack-rules-how-to-play-blackjack-and-win/

contract BlackJack is VRFConsumerBaseV2{
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // Rinkeby coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords =  2;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;

    string public card;

    constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender;
        s_subscriptionId = subscriptionId;
    }

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

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external onlyOwner {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(uint256 /* requestId */, uint256[] memory randomWords) internal override {
        s_randomWords = randomWords;
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }

    Player private player;
    Dealer private dealer;

    // deal one random card
    function dealCard() public {
        uint256 randCardNum;
        uint256 randCardSuit;
        uint256 numOfCards;
        uint256 numOfSuits;
        string[4] memory cardSuit;
        string memory strCardNum;
        string memory strCardSuit;
        cardSuit = ["clubs","diamonds","hearts","spades"];
        numOfCards = 13;
        numOfSuits = 4;
        randCardNum  = _randModulus(numOfCards);
        randCardSuit = _randModulus(numOfSuits);
        strCardNum = _uint2str(randCardNum);
        strCardSuit = cardSuit[randCardSuit];
        if(randCardNum == 11) {
            strCardNum = "Jack";
        }
        else if(randCardNum == 12) {
            strCardNum = "Queen";
        }
        else if(randCardNum == 13) {
            strCardNum = "King";
        }
        else if(randCardNum == 1) {
            strCardNum = "Ace";
        }

        card = string(abi.encodePacked(strCardSuit, strCardNum));
    }

    // get random number function
    function _randModulus(uint256 _maxRand) internal returns(uint256 rtnVal) {
        uint256 randModulusVal = _maxRand;

        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        return rtnVal = (s_requestId % randModulusVal) + 1;
    }

    // convert interger to string
    function _uint2str(uint256 _i ) internal pure returns (string memory str) {
        if (_i == 0)
        {
            return "0";
        }

        uint256 j = _i;
        uint256 length;

        while (j != 0)
        {
            length++;
            j /= 10;
        }

        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;

        while (j != 0)
        {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }

        str = string(bstr);
    }
}
