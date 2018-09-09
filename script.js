// my first file of code.

function createDeck(){
    let deck = [];    
    let suits = [ "hearts", "diamonds", "spades", "clubs" ],    
        values = [ "ace", "two", "three", "four", "five", 
        "six", "seven", "eight", "nine", "ten", "jack", "queen", "king" ];
    let card = {};
    for( suitIndex = 0; suitIndex < suits.length; suitIndex++ ){
        for( valueIndex = 0; valueIndex < values.length; valueIndex++ ){
            card = {
                suit: suits[suitIndex],
                value: values[valueIndex],
                points: valueIndex < 10 ? valueIndex+1 : 10
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffle( deck ){
    let temp;
    for( cardIndex=0; cardIndex < deck.length; cardIndex++ ){
        randomIndex = Math.floor( 52 * Math.random() );
        temp = deck[ cardIndex ];
        deck[ cardIndex ] = deck[ randomIndex ];
        deck[ randomIndex ] = temp;
    }
}

function cardsToScore( cards ){
    let score = 0;
    let aceCount=0;
    for( cardIndex = 0; cardIndex < cards.length; cardIndex++ ){
        if( cards[cardIndex].value === 'ace' )
            aceCount++;
        score += cards[ cardIndex ].points;
    }
    while( aceCount > 0 && score < 12 ){
        score += 10;
        aceCount--;
    }
    return score;
}

function getNextCard( deck ){
    return deck.shift();
}

function cardToText( card ){
    let text = card.value + " of " + card.suit;
    return text;
}

function checkGameOver( pScore, dScore ){
    if( pScore > 21 || dScore > 21 || ( stayed && dScore > pScore ) ){
        return 0;
    } else{
        return 1;
    }
}

function gameOverRoutine(pScore, dScore, text){
    let winner = "";
    if( dScore <= 21 )
        winner = "Dealer";
    else
        winner = "Player";
    gameDisplay.innerText = text + winner + " wins!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    playerCards = [],
    dealerCards = [],
    playerScore = 0,
    dealerScore = 0,
    gameStatus = 0;
    gameDeck = [];
    stayed = 0;
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    newGameButton.style.display = 'inline';
}

function makeGameText( name, cards, score ){
    let prefix = name + " has: \n";
    let cardString = "";
    for(i = 0; i < cards.length; i++ ){
        cardString += cardToText( cards[i] ) + "\n";
    }
    let suffix = "(Score:" + score + ")"
    return prefix + cardString + suffix + "\n";
}

let gameDisplay = document.getElementById( "game-text" );
let newGameButton = document.getElementById( "button1" );
let hitButton = document.getElementById( "button2" );
let stayButton = document.getElementById( "button3" );

hitButton.style.display = 'none';
stayButton.style.display = 'none';

let playerCards = [],
    dealerCards = [],
    playerScore = 0,
    dealerScore = 0,
    status = 0;
    gameDeck = [];
    stayed = 0;

newGameButton.addEventListener( 'click', function() {
    status = 1;
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    gameDeck = createDeck();
    shuffle( gameDeck );
    dealerCards = [ getNextCard( gameDeck ), getNextCard( gameDeck ) ];
    playerCards = [ getNextCard( gameDeck ), getNextCard( gameDeck ) ];
    dealerScore = cardsToScore( dealerCards );    
    playerScore = cardsToScore( playerCards );
    let dealerText = makeGameText( "dealer", dealerCards, dealerScore );
    let playerText = makeGameText( "player", playerCards, playerScore );
    gameDisplay.innerText = "Let's start! \n" + dealerText + "\n" + playerText;
} );

hitButton.addEventListener('click', function(){
    dealerCards.push( getNextCard(gameDeck) );
    playerCards.push( getNextCard(gameDeck) );
    dealerScore = cardsToScore(dealerCards);
    playerScore = cardsToScore(playerCards);
    status = checkGameOver( playerScore, dealerScore );
    if( status == 0 ){
        let dealerText = makeGameText( "dealer", dealerCards, dealerScore );
        let playerText = makeGameText( "player", playerCards, playerScore );
        gameText = "You just got hit! \n" + dealerText + "\n" + playerText + "\n";
        gameOverRoutine( playerScore, dealerScore, gameText );
    } else {
        let dealerText = makeGameText( "dealer", dealerCards, dealerScore );
        let playerText = makeGameText( "player", playerCards, playerScore );
        gameDisplay.innerText = "You just got hit! \n" + dealerText + "\n" + playerText;
    }
})

stayButton.addEventListener('click', function(){
    stayed = 1;
    status = checkGameOver( playerScore, dealerScore );   
    while( status!=0 ){
        dealerCards.push( getNextCard(gameDeck) );
        dealerScore = cardsToScore(dealerCards); 
        status = checkGameOver( playerScore, dealerScore );   
    }
    
    let dealerText = makeGameText( "dealer", dealerCards, dealerScore );
    let playerText = makeGameText( "player", playerCards, playerScore );
    gameText = "You chose to stay \n" + dealerText + "\n" + playerText + "\n";
    gameOverRoutine(playerScore, dealerScore, gameText);

    // if( status == 0 ){
    //     gameOverRoutine( playerScore, dealerScore, gameText );
    // } else {
    //     let dealerText = makeGameText( "dealer", dealerCards, dealerScore );
    //     let playerText = makeGameText( "player", playerCards, playerScore );
    //     gameDisplay.innerText = "You chose to stay \n" + dealerText + "\n" + playerText;
    // }
})

// let gameDeck = createDeck();
// shuffle(gameDeck);
// let newCard = getNextCard( gameDeck );

// console.log( newCard );