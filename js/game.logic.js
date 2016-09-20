//Evaluate an array containing a hand of cards.
//Pass the hand and 0 (or nothing???) to get the correct value, the second argument is there so that the function functions recursively.
'use strict'
game.logic = {};
game.logic.evaluateHand = function(hand, dropAces){
	var tempDropAces = dropAces;
	var evaluation = 0;
	for(var x=0;x!==hand.length;x++){

		if (hand[x].value === 'E')
		{
			if (tempDropAces !== 0)
			{
				tempDropAces--;
				evaluation++;
				continue;
			} else
			{
				evaluation = evaluation + 11;
				continue;
			}
		}

		if (hand[x].value === 'J' || hand[x].value === 'Q' || hand[x].value === 'K'){
			evaluation = evaluation + 10;
			continue;
		}

		evaluation = evaluation + Number(hand[x].value);
		}

		if (evaluation > 21) {
			if (tempDropAces === 0) {
			dropAces++;
			return game.logic.evaluateHand(hand, dropAces);
			} else {
			return evaluation;
			}
		} else {
			return evaluation;
		}
};
