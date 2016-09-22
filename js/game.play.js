'use strict'
game.play = function(){


    //TODO: Check if house/player has more than 0 money, declare loss/win respectively if either is false.

    //Initial setup
	
    var deck = game.generateDeck.generate();

    deck = _.shuffle(deck);

    var houseHand = [];
    var playerHand = [];

    //Take initial cost to play (ante?)
    game.playerMoney = game.playerMoney - game.betSize;
    var bet = game.betSize;

    //Draw 2
    houseHand.push(deck.pop());
    houseHand.push(deck.pop());

    //Draw 2
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());

    //Function for printing hand
    var printHand = function(hand) {
        for (var x = 0; x !== hand.length; x++) {
            console.log(hand[x].suit, hand[x].value);
        }
    };

    //Game loop
    for (;;) {
        //Print info at start of round
        console.log('***********');
        console.log('player has:');
        printHand(playerHand);
        console.log('house has:');
        console.log(houseHand[0].suit, houseHand[0].value);
        console.log('and a hole (hidden) card!');
        console.log('current bet is at: $', bet);
        console.log('***********');

        //Check if player bust
        if (game.logic.evaluateHand(playerHand, 0) > 21) {
            console.log('Player has gone bust!');
            game.houseMoney = game.houseMoney + bet;
            return;
        }

        var choice = prompt('Would you like to: (b)et and take a card | (d)ouble down | (s)tand');

        //TODO: add checks for if you can afford to bet/double down

        if (choice === 'b') {
            game.playerMoney = game.playerMoney - game.betSize;
            bet = bet + game.betSize;
            playerHand.push(deck.pop());
        }

        if (choice === 'd') {
            game.playerMoney = game.playerMoney - bet;
            bet = bet + bet;
            playerHand.push(deck.pop());
            break;
        }

        if (choice === 's') {
            break;
        }
    }

    //Check if player went bust after doubling down
    if (game.logic.evaluateHand(playerHand, 0) > 21) {
        console.log('Player has gone bust!');
        game.houseMoney = game.houseMoney + bet;
        return;
    }

    //Check if player loses
    if (game.logic.evaluateHand(playerHand, 0) < game.logic.evaluateHand(houseHand, 0)) {
        console.log('Player stood with:', game.logic.evaluateHand(playerHand, 0));
        printHand(playerHand);
        console.log('House stood with:', game.logic.evaluateHand(houseHand, 0));
        printHand(houseHand);
        console.log('House wins!');
        game.houseMoney = game.houseMoney + bet;
        return;
    }

    //If player is currently winning, house will draw until they have an equal or greater hand (even if this means going bust)
    for (; game.logic.evaluateHand(playerHand, 0) > game.logic.evaluateHand(houseHand, 0);) {
        houseHand.push(deck.pop());
    }
    //Pay out according to result

    //Dealer bust/player win (only possible scenario, given that dealer only stops if they win or go bust)
    if (game.logic.evaluateHand(houseHand, 0) > 21) {
        game.playerMoney = game.playerMoney + bet + bet;
        game.houseMoney = game.houseMoney - bet;
        console.log('Player stood with:', game.logic.evaluateHand(playerHand, 0));
        printHand(playerHand);
        console.log('House went bust with:', game.logic.evaluateHand(houseHand, 0));
        printHand(houseHand);
        console.log('Player wins $', bet, '!');
        return;
    }

    //Draw
    if (game.logic.evaluateHand(houseHand, 0) === game.logic.evaluateHand(playerHand, 0)) {
        game.playerMoney = game.playerMoney + bet; //Return bet
        console.log('Player stood with:', game.logic.evaluateHand(playerHand, 0));
        printHand(playerHand);
        console.log('House stood with:', game.logic.evaluateHand(houseHand, 0));
        printHand(houseHand);
        console.log('Draw!');
    }

    //House win
    if (game.logic.evaluateHand(houseHand, 0) > game.logic.evaluateHand(playerHand, 0)) {
        game.houseMoney = game.houseMoney + bet;
        console.log('Player stood with:', game.logic.evaluateHand(playerHand, 0));
        printHand(playerHand);
        console.log('House stood with:', game.logic.evaluateHand(houseHand, 0));
        printHand(houseHand);
        console.log('House wins!');
    }
};
