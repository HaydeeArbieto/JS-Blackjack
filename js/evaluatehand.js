//Evaluate an array containing a hand of cards.
//Pass the hand and 0 (or nothing???) to get the correct value, the second argument is there so that the function functions recursively.
var evaluatehand = function(hand, dropaces){
	var tempdropaces = dropaces;
	var evaluation = 0;
	for(var x=0;x!==hand.length;x++){

		if (hand[x].value === 'E')
		{
			if (tempdropaces !== 0)
			{
				tempdropaces--;
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


		//Really didn't think this through, should have a single if, then return evaluation;
		//lol
		if (evaluation > 21) {
			if (tempdropaces === 0) {
			dropaces++;
			return evaluatehand(hand, dropaces);
			} else {
			return evaluation;
			}
		} else {
			return evaluation;
		}


};
