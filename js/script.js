// Author: Joe Rasmussen

document.addEventListener('DOMContentLoaded', () => {
    
    //Define Arrays for Card Suits, Ranks, and an empty array for the deck
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];

    //Define variables for number of human and computer players
    let numPlayers = prompt("Please Enter the Number of Players (2-4)", "2");
    const numComputerPlayers = numPlayers - 1;

    //Create the deck
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({suit,rank});
        })
    })

    //Create a function that usess Fisher-Yates algorithm to shuffle the deck
    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    
    //Shuffle the deck
    shuffleDeck(deck);

    //Deal the cards to the gameboard and player/computer hands
    function dealCards() {
        const gameboard = document.getElementById('gameboard');
        const playerHand = document.getElementById('player-hand');
        const computerHands = [document.getElementById('computer-hand-1'), document.getElementById('computer-hand-2'), document.getElementById('computer-hand-3')];

        //Clear the containers
        gameboard.innerHTML = '';
        playerHand.innerHTML = '';
        computerHands.forEach(handContainer => {
            handContainer.innerHTML = '';
        });

        //Declare a function for dealing computer hands
        function dealToComputers(numComputerPlayers) {
            for (i=0; i < numComputerPlayers; i++) {
                const card = deck.pop();
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                //Need to make this read unknown eventually
                cardDiv.innerText = 'Unknown Card';
                computerHands[i].appendChild(cardDiv);
            }
        };

        //Deal the Gameboard
        for(let i = 0; i < 4; i++){
            const card = deck.pop();
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.innerText = `${card.rank} of ${card.suit}`;
            gameboard.appendChild(cardDiv);
        };

        //Deal All Hands
        for(let i = 0; i < 7; i++) {
            const card = deck.pop();
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.innerText = `${card.rank} of ${card.suit}`;
            playerHand.appendChild(cardDiv);
            dealToComputers(numComputerPlayers);
        };
    };
    dealCards();
});