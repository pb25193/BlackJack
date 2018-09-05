// my first file of code.

function create_deck(){
    let deck = [];    
    let suits = [ "diamonds", "hearts", "spades", "clubs" ],    
        values = [ "ace", "two", "three", "four", "five", 
        "six", "seven", "eight", "nine", "ten", "jack", "queen", "king" ];
    let card = {};
    for( suit_index = 0; suit_index < suits.length; suit_index++ ){
        for( value_index = 0; value_index < values.length; value_index++ ){
            card = {
                suit: suits[suit_index],
                value: values[value_index],
                points: value_index < 10 ? value_index+1 : 10
            };
            deck.push(card);
        }
    }
    return deck;
}

let game_deck = create_deck();

console.log( game_deck );