var generatedeck = function(){
	var suits = ['♠ ', '♣ ', '♦ ', '♥ '];
	var values = ['E', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	var deck = [];

	for(var x=0;x!==suits.length;x++)
	{
		for(var y=0;y!==values.length;y++)
		{
			deck[deck.length]=suits[x]+values[y];
			console.log(deck[deck.length-1]);
		}
	}
	console.log(deck.length);
};

generatedeck();
