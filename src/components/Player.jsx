import React from "react";

class Player extends React.Component {
    constructor(props)
    {
        super(props);
        this.score          = 0;
        this.wins           = 0;
        this.loses          = 0;
        this.cardHand       = [];
    }
    setPlayerScore(score)
    {
        let s = parseInt(score);
        this.score = s;
    }
    setPlayerWins(int)
    {
        let n = parseInt(int);
        this.wins = n;
    }
    setPlayerLose(int)
    {
        let n = parseInt(int);
        this.loses = n;
    }

}

export default Player;