export class Player {
    private purse: number;

    constructor() {
        this.purse = 0;
    }

    getCoin() {
        return this.purse;
    }

    gainCoin() {
        this.purse++;
    }
}

export class Game {

    rockQuestions: any[];
    isGettingOutOfPenaltyBox: boolean;
    playerIndex: number;
    sportsQuestions: any[];
    scienceQuestions: any[];
    inPenaltyBox: any[];
    popQuestions: any[];
    purses: any[];
    places: any[];
    players: any[];
    player_entities: Player[];

    constructor() {
        this.players = new Array();
        this.places = new Array(6);
        this.purses = new Array(6);
        this.inPenaltyBox = new Array(6);

        this.popQuestions = new Array();
        this.scienceQuestions = new Array();
        this.sportsQuestions = new Array();
        this.rockQuestions = new Array();

        this.playerIndex = 0;
        this.isGettingOutOfPenaltyBox = false;

        this.player_entities = []

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push(this.createRockQuestion(i));
        }

    }

    add(playerName) {
        this.players.push(playerName);
        this.places[this.howManyPlayers() - 1] = 0;
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;
        this.player_entities.push(new Player());

        console.log(playerName + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    };

    howManyPlayers() {
        return this.players.length;
    };

    didPlayerWin() {
        return !(this.player_entities[this.playerIndex].getCoin() == 6)
    };

    currentCategory() {
        if (this.places[this.playerIndex] == 0)
            return 'Pop';
        if (this.places[this.playerIndex] == 4)
            return 'Pop';
        if (this.places[this.playerIndex] == 8)
            return 'Pop';
        if (this.places[this.playerIndex] == 1)
            return 'Science';
        if (this.places[this.playerIndex] == 5)
            return 'Science';
        if (this.places[this.playerIndex] == 9)
            return 'Science';
        if (this.places[this.playerIndex] == 2)
            return 'Sports';
        if (this.places[this.playerIndex] == 6)
            return 'Sports';
        if (this.places[this.playerIndex] == 10)
            return 'Sports';
        return 'Rock';
    };


    askQuestion() {
        if (this.currentCategory() == 'Pop') {
            console.log(this.popQuestions.shift());
        }
        if (this.currentCategory() == 'Science') {
            console.log(this.scienceQuestions.shift());
        }
        if (this.currentCategory() == 'Sports') {
            console.log(this.sportsQuestions.shift());
        }
        if (this.currentCategory() == 'Rock') {
            console.log(this.rockQuestions.shift());
        }
    };

    createRockQuestion(index) {
        return "Rock Question " + index;
    };


    isPlayable(howManyPlayers) {
        return howManyPlayers >= 2;
    };

    roll(roll) {
        console.log(this.players[this.playerIndex] + " is the current player");
        console.log("They have rolled a " + roll);

        if (this.inPenaltyBox[this.playerIndex]) {
            if (roll % 2 != 0) {
                this.isGettingOutOfPenaltyBox = true;

                console.log(this.players[this.playerIndex] + " is getting out of the penalty box");
                this._movePlayerAndAskQuestion(roll);
            } else {
                console.log(this.players[this.playerIndex] + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {

            this._movePlayerAndAskQuestion(roll);
        }
    };

    _movePlayerAndAskQuestion(roll) {
        this.places[this.playerIndex] = this.places[this.playerIndex] + roll;
        if (this.places[this.playerIndex] > 11) {
            this.places[this.playerIndex] = this.places[this.playerIndex] - 12;
        }

        console.log(this.players[this.playerIndex] + "'s new location is " + this.places[this.playerIndex]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
    }

    wasCorrectlyAnswered() {
        if (this.inPenaltyBox[this.playerIndex]) {
            if (this.isGettingOutOfPenaltyBox) {
                console.log('Answer was correct!!!!');
                this.playerIndex += 1;
                if (this.playerIndex == this.players.length)
                    this.playerIndex = 0;

                this.player_entities[this.playerIndex].gainCoin()
                // this.purses[this.currentPlayer] += 1;
                console.log(this.players[this.playerIndex] + " now has " +
                    this.player_entities[this.playerIndex].getCoin() + " Gold Coins.");

                var winner = this.didPlayerWin();

                return winner;
            } else {
                this.playerIndex += 1;
                if (this.playerIndex == this.players.length)
                    this.playerIndex = 0;
                return true;
            }


        } else {
            console.log('Answer was correct!!!!');

            this.playerIndex += 1;
            if (this.playerIndex == this.players.length)
                this.playerIndex = 0;
            this.player_entities[this.playerIndex].gainCoin();
            console.log(this.players[this.playerIndex] + " now has " +
                this.player_entities[this.playerIndex].getCoin() + " Gold Coins.");

            var winner = this.didPlayerWin();

            return winner;
        }
    };

    wrongAnswer() {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.playerIndex] + " was sent to the penalty box");
        this.inPenaltyBox[this.playerIndex] = true;

        this.playerIndex += 1;
        if (this.playerIndex == this.players.length)
            this.playerIndex = 0;
        return true;
    };

}
