var housemoney = 1000;
var playermoney = 500;
var betsize = 50;
var gameround = function(){
	//TODO: Check if house/player has more than 0 money, declare loss/win respectively if either is false.

	//Initial setup
	var deck = generatedeck();
	deck = _.shuffle(deck);

	var househand = [];
	var playerhand = [];

	//Take initial cost to play (ante?)
	playermoney = playermoney - betsize;
	var bet = betsize;

	//Draw 2
	househand.push(deck.pop());
	househand.push(deck.pop());

	//Draw 2
	playerhand.push(deck.pop());
	playerhand.push(deck.pop());

	//Function for printing hand
	var printhand = function(hand){
		for(x=0;x!==hand.length;x++)
		{
			console.log(hand[x].suit, hand[x].value);
		}
	}


	//Game loop
	for(;true;)
	{
		//Print info at start of round
		console.log('***********');
		console.log('player has:');
		printhand(playerhand);
		console.log('house has:');
		console.log(househand[0].suit, househand[0].value);
		console.log('and a hole (hidden) card!');
		console.log('current bet is at: $', bet);
		console.log('***********');

		//Check if player bust
		if (evaluatehand(playerhand, 0) > 21)
		{
			console.log('Player has gone bust!');
			housemoney = housemoney + bet;
			return;
		}

		var choice = prompt('Would you like to: (b)et and take a card | (d)ouble down | (s)tand');

		//TODO: add checks for if you can afford to bet/double down

		if (choice === 'b')
		{
			playermoney = playermoney - betsize;
			bet = bet + betsize;
			playerhand.push(deck.pop());
		}

		if (choice === 'd')
		{
			playermoney = playermoney - bet;
			bet = bet + bet;
			playerhand.push(deck.pop());
			break;
		}

		if (choice === 's')
		{
			break;
		}
	}

	//Check if player went bust after doubling down
	if (evaluatehand(playerhand, 0) > 21)
	{
		console.log('Player has gone bust!');
		housemoney = housemoney + bet;
		return;
	}



	//Check if player loses
	if (evaluatehand(playerhand, 0) < evaluatehand(househand, 0)){
		console.log('Player stood with:', evaluatehand(playerhand, 0));
		printhand(playerhand);
		console.log('House stood with:', evaluatehand(househand, 0));
		printhand(househand);
		console.log('House wins!');
		housemoney = housemoney + bet;
		return;
	}

	//If player is currently winning, house will draw until they have an equal or greater hand (even if this means going bust)
	for(;evaluatehand(playerhand, 0) > evaluatehand(househand, 0);)
	{
		househand.push(deck.pop());
	}
	//Pay out according to result

	//Dealer bust/player win (only possible scenario, given that dealer only stops if they win or go bust)
	if(evaluatehand(househand, 0) > 21)
	{
		playermoney = playermoney + bet + bet;
		housemoney = housemoney - bet;
		console.log('Player stood with:', evaluatehand(playerhand, 0));
		printhand(playerhand);
		console.log('House went bust with:', evaluatehand(househand, 0));
		printhand(househand);
		console.log('Player wins $', bet, '!')
		return;
	}

	//Draw
	if(evaluatehand(househand, 0) === evaluatehand(playerhand, 0)){
		playermoney = playermoney + bet; //Return bet
		console.log('Player stood with:', evaluatehand(playerhand, 0));
		printhand(playerhand);
		console.log('House stood with:', evaluatehand(househand, 0));
		printhand(househand);
		console.log('Draw!');
	}

	//House win
	if(evaluatehand(househand, 0) > evaluatehand(playerhand, 0))
	{
		housemoney = housemoney + bet;
		console.log('Player stood with:', evaluatehand(playerhand, 0));
		printhand(playerhand);
		console.log('House stood with:', evaluatehand(househand, 0));
		printhand(househand);
		console.log('House wins!');
	}


}


gameround();
