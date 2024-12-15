// Author: Joe Rasmussen

//Code to run when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    //Declare Arrays for Card Suits and Ranks
    const suits = ['heart', 'diamond', 'club', 'spade'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    //Declare array for the deck and variable declaration for shuffledDeck
    const deck = [];
    let shuffledDeck;

    //Declare an array of arrays to hold the computer hands
    const computerHands = [[], [], []];

    //Declare an array to hold the computer hands div location references
    const computerHandDivs = [document.getElementById("computer-hand-1"), document.getElementById("computer-hand-2"), document.getElementById("computer-hand-3")];

    //Create arrays for card location naming
    const foundationLocation = [['Top'], ['Bottom'], ['Left'], ['Right']];
    const cornerLocation = [['TopLeft'], ['TopRight'], ['BottomLeft'], ['BottomRight']];

    //Define variables for number of human and computer players
    let numPlayers = prompt("Please Enter the Number of Players (2-4)", "2");
    const numComputerPlayers = numPlayers - 1;

    //Generate a set() to shuffle the deck. Set() was used to ensure no duplicate entries and to provide a more human like shuffle
    //The Fisher-Yates algorithm would provide a more mathematically perfect shuffle, but I didn't want a mathematically perfect shuffle, just a realistic representation of the game I played as a kid.
    //This shuffle function is also less confusing as it prevents the need for any direct array manipulation. 
    //The set() returned as an array at the end.
    //The if is to prevent going past the max if code was reused at a later date and time and was typo'd.
    function generateRandomIndexes(count, min, max) {
        if (count > max + 1) {
            console.log("Count is greater than the max.");
            return;
        } else {
            let uniqueIndexes = new Set();
            while (uniqueIndexes.size < count) {
                uniqueIndexes.add(Math.floor(Math.random() * (max - min + 1)) + min);
            }
            return Array.from(uniqueIndexes);
        }
    }

    //Create the deck and div to hold the visual representation of the deck.
    function createDeck() {
        //Create the unshuffled deck array
        suits.forEach(suit => {
            ranks.forEach(rank => {
                //Generate a template literal for the file path to the card images
                const imageName = `${suit.charAt(0).toUpperCase() + suit.slice(1)} ${rank}.jpg`;
                deck.push({
                    suit,
                    rank,
                    imageUrl: `images/cards/${imageName}`
                });
            });
        });

        //Create and name the div for the deck
        const deckDiv = document.createElement('div');
        deckDiv.classList.add('card');
        deckDiv.classList.add('foundation');
        deckDiv.id = 'deck';
        
        //Add img to the div and add a class 'card-back'
        const deckImg = document.createElement('img');
        deckImg.src = 'images/cards/cardBack.jpg';
        deckImg.alt = 'The Diligent Coder';
        deckImg.classList.add('card-back');

        //Add deckImg as a child of deckDiv, and deckDiv as a child of the gameboard div
        deckDiv.appendChild(deckImg);
        gameboard.appendChild(deckDiv);
    }


    function shuffleDeck (deck) {
        //Create a new shuffled index for the deck
        const randomIndexes = generateRandomIndexes(52, 0, 51);

        //Use the new index to "shuffle the deck" by using map to create a new shuffledDeck array.
        shuffledDeck = randomIndexes.map((index) => deck[index]);
    }

    //Deal the cards to the gameboard and player/computer hands
    function dealCards() {
        //Assign div locations to variables
        const gameboard = document.getElementById('gameboard');
        const playerHand = document.getElementById('player-hand');

        //Clear the HTML containers
        gameboard.innerHTML = '';
        playerHand.innerHTML = '';
        computerHands.forEach(handContainer => {
            handContainer.innerHTML = '';
        });

        //Create the deck
        createDeck();

        //Shuffle the deck
        shuffledDeck = shuffleDeck(deck);

        //Deal the Gameboard
        for(let i = 0; i < 4; i++){
            //Deal a card from the shuffled deck
            const card = shuffledDeck.pop();
            
            //Create a div to hold the card and add classes 'card' and 'foundation'
            //'foundation' is the class to indicate that this is the first card in the stack
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.classList.add('foundation');
            cardDiv.id = `foundation${foundationLocation[i]}`;
            
            //Add img to the div and add a class 'card-image'
            const cardImg = document.createElement('img');
            cardImg.src = card.imageUrl;
            cardImg.alt = `${card.rank} of ${card.suit}`;
            cardImg.classList.add('card-image');

            //Add cardImg as a child of cardDiv, and cardDiv as a child of the gameboard div
            cardDiv.appendChild(cardImg);
            gameboard.appendChild(cardDiv);
        };

        //Create a function for dealing computer hands
        function dealToComputers(numComputerPlayers) {
            //Deal to each computer player
            for (i=0; i < numComputerPlayers; i++) {
                //Deal a card from the shuffled deck
                const card = shuffledDeck.pop();
                //Add card to computer hand
                computerHands[i].push(card);

                //Create a div to hold the card and add a class 'card'
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                            
                //Add img to the div, add a class 'card-image', add alt text if the image doesn't load, and add the cardBack image location
                const cardImg = document.createElement('img');
                cardImg.src = 'images/cards/cardBack.jpg';
                cardImg.alt = 'The Diligent Coder';
                cardImg.classList.add('card-back');

                //Add cardImg as a child of cardDiv, and cardDiv as a child of the computerHands divs held in the computerHandDivs located in the array.
                cardDiv.appendChild(cardImg);
                computerHandDivs[i].appendChild(cardDiv);
            }
        };        

        //Deal All Hands
        for(let i = 0; i < 7; i++) {
            //Deal a card from the shuffled deck
            const card = shuffledDeck.pop();
            
            //Create a div to hold the card and add classes 'card' and 'hand'
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.classList.add('hand');
            
            //Add img to the div and add a class 'card-image'
            const cardImg = document.createElement('img');
            cardImg.src = card.imageUrl;
            cardImg.alt = `${card.rank} of ${card.suit}`;
            cardImg.classList.add('card-image');

            //Add cardImg as a child of cardDiv, and cardDiv as a child of the playerHand div
            cardDiv.appendChild(cardImg);
            playerHand.appendChild(cardDiv);

            //Call function to deal hands in series with the players hand so that deals go player, comp 1, comp 2, comp 3
            dealToComputers(numComputerPlayers);
        };
    };

    dealCards();
});