var game = function() {

    var deck = _.shuffle(generatedeck());

    var dealerHand = [];
    var playerHand = [];
    console.log(deck[deck.length - 1].suit + deck[deck.length - 1].value);

    var dealCard = function(array) {
        array.push(deck[deck.length - 1]);
        deck.pop();
    };

    dealCard(dealerHand);
    dealCard(dealerHand);
    for (var i = 0 in dealerHand) {
        console.log(dealerHand[i].suit + dealerHand[i].value);
    }

    dealCard(playerHand);
    dealCard(playerHand);
    for (var g = 0 in playerHand) {
        console.log(playerHand[g].suit + playerHand[g].value);
    }

    checkBlackJack();

    var faceValueConverter = function(parameter) {
        if (parameter === 'J' || parameter === 'Q' || parameter === 'K') {
            var result = 10;
            return result;
        } else if (parameter === 'E') {
            return chooseAceValue();
        } else {
            return parameter;
        }
    };

    var calculatePoints = function(array) {
        var sum = 0;
        for (var j in array) {
            sum = (Number(faceValueConverter(array[j].value)) + Number(sum));
        }
        return sum;
    };

    var checkStatusGame = function() {
      if (checkBlackJack()){
        alert('Black Jack. You win');
      } else if(busted()){
        alert('OOpps! you are busted');
      } else if(looser){
          alert('Sorry! You lost!');
      }
      return statusGame;
    };

    var busted = function () {
      if (calculatePoints(playerHand) > 21) {
          return true;

      } else if (calculatePoints(dealerHand) > 21) {
        return true;
    };

    var looser = function () {
      if (calculatePoints(playerHand)> calculatePoints(dealerHand)) {
        console.log('Player Wins');
      }
      else if (calculatePoints(dealerHand) > calculatePoints(playerHand)) {
        console.log('Dealer wins');
      }
    }

    var chooseAceValue = function(cardPoints) {
        var minValue = 1;
        var maxValue = 11;

        if ((21 - cardPoints) <= 11) {
            return minValue;
        } else {
            return maxValue;
        }
    };

    var checkBlackJack = function() {
        console.log(calculatePoints(playerHand));
        console.log(calculatePoints(dealerHand));
        if (calculatePoints(playerHand) === 21) {
            console.log('It is black jack. Player wins!!!');
              newGame();
        } else if (calculatePoints(dealerHand) === 21) {
            console.log('It is black jack. Dealer wins!!!');
              newGame();
        } else {
            gameLoop();
        }
    };

    var newGame = function(){
      var playerChoice;
        playerChoice = prompt('New game? type 1: yes, 2: no');
        if(playerChoice === '1'){
          game();
        }else if(playerChoice === '2'){
          console.log('Good Bye');
          return;
        }
        else{
          console.log('You have to choose 1 or 2');
          newGame();
        }
    };

    var gameLoop = function() {
        var playerChoice;
        playerChoice = prompt('Do you want continue? type 1: to continue, 2: to stop');
        if (playerChoice === '1') {
            dealCard(playerHand);
        } else if (playerChoice === '2') {

          for (var i = 0 in dealerHand) {
              console.log(dealerHand[i].suit + dealerHand[i].value);
          }
          for (var g = 0 in playerHand) {
              console.log(playerHand[g].suit + playerHand[g].value);
          }
        }
    };
};

//console.log(calculatePoints(playerHand));
