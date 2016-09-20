'use strict'
game.generateDeck = {};
game.generateDeck.generate = function(){
	var suits = ['♠ ', '♣ ', '♦ ', '♥ '];
	var values = ['E', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	var deck = [];

	for(var x=0; x!==suits.length; x++)
	{
		for(var y=0; y!==values.length; y++)
		{
			deck.push({suit: suits[x], value: values[y]});
		}
	}
	return deck;
};
