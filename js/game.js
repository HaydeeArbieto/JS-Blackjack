var deck = _.shuffle(generatedeck());

var dealerHand = [];
var playerHand = [];
console.log("************");
console.log(deck[deck.length-1].suit + deck[deck.length-1].value);

var dealCard = function(array){
  array.push(deck[deck.length-1]);
  deck.pop();
};

dealCard(dealerHand);
dealCard(dealerHand);
for(var i = 0 in dealerHand){
  console.log(dealerHand[i].suit + dealerHand[i].value);
}

dealCard(playerHand);
dealCard(playerHand);
for(var g = 0 in playerHand){
  console.log(playerHand[g].suit + playerHand[g].value);
}

var faceValueConverter = function(parameter){
  if(parameter === 'J' || parameter === 'Q' || parameter === 'K'){
    var result = 10;
    return result;
  }
  else if(parameter === 'E'){
    return chooseAceValue();
  }
  else {
    return parameter;
  }
};

var calculatePoints = function(array){
  var sum = 0;
  for(var j in array){
    sum = (Number(faceValueConverter(array[j].value)) + Number(sum));
  }
  return sum;
};

var chooseAceValue = function (cardPoints){
  var minValue = 1;
  var maxValue = 11;

  if((21 - cardPoints) < 11){
    return minValue;
  } else {
    return maxValue;
  }
};

var checkBlackJack = function (){
  console.log(calculatePoints(playerHand));
  console.log(calculatePoints(dealerHand));
  if(calculatePoints(playerHand) === 21){
    console.log('It is black jack. Player wins!!!');
  } else if (calculatePoints(dealerHand) === 21){
    console.log('It is black jack. Dealer wins!!!');
  } else {
    console.log('Continue or Stop??');
  }
};

checkBlackJack();

//console.log(calculatePoints(playerHand));
