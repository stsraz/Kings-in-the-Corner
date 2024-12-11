// Author: Joe Rasmussen

document.addEventListener('DOMContentLoaded', () => {
    
    //Define Arrays for Card Suits, Ranks, and an empty array for the deck
    const suits = ['heart', 'diamond', 'club', 'spade'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    const computerHands = [[], [], []];
    const computerHandDivs = [document.getElementById("computer-hand-1"), document.getElementById("computer-hand-2"), document.getElementById("computer-hand-3")];


    //Define variables for number of human and computer players
    let numPlayers = prompt("Please Enter the Number of Players (2-4)", "2");
    const numComputerPlayers = numPlayers - 1;

    //Create the deck
    suits.forEach(suit => {
        ranks.forEach(rank => {
            const imageName = `${suit.charAt(0).toUpperCase() + suit.slice(1)} ${rank}.jpg`;
            deck.push({
                suit,
                rank,
                imageUrl: `images/cards/${imageName}`
            });
        });
    });

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

    const randomIndexes = generateRandomIndexes(52, 0, 51);
    const shuffledDeck = randomIndexes.map((index) => deck[index]);

    //BEGIN TEST BLOCK
    //A function that compares two arrays to make sure length and content are not equal
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
    }

    // Initializing duplicateFound for the test
    let duplicateFound;

    //A function that runs multiple shuffles to ensure that there are no duplicate shuffles
    function testShuffle() {
        const testArray = [];

        for (i=0; i<500; i++) {
            const randomIndexes = generateRandomIndexes(52, 0, 51);
            const testShuffle = randomIndexes.map((index) => deck[index]);
            testArray[i] = testShuffle;

            let duplicateFound = false;
            testArray.forEach((element, index) => {
                if (index !== i && arraysEqual(element, testArray[i])) {
                    duplicateFound=true;
                } else{
                    console.log("Checked and not a duplicate");
                }
            });
        };
        //If duplicateFound is true it will log as such. If not, it will log that instead.
        if (duplicateFound) {
            console.log("DUPLICATE!!");
        } else {
            console.log("NO DUPLICATES!!");
        }
    };

    // Run the test. The result is no duplicate shuffles.
    testShuffle();
    //END TEST BLOCK
    
    //console.log(deck);
    //console.log("---");
    //console.log(shuffledDeck);

    /* //Create a function that usess Fisher-Yates algorithm to shuffle the deck -- OLD FCTN
    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    
    //Shuffle the deck
    shuffleDeck(deck);
    */

    //Deal the cards to the gameboard and player/computer hands
    function dealCards() {
        const gameboard = document.getElementById('gameboard');
        const playerHand = document.getElementById('player-hand');

        //Clear the containers
        gameboard.innerHTML = '';
        playerHand.innerHTML = '';
        computerHands.forEach(handContainer => {
            handContainer.innerHTML = '';
        });

        //Declare a function for dealing computer hands
        function dealToComputers(numComputerPlayers) {
            for (i=0; i < numComputerPlayers; i++) {
                //Deal a card from the shuffled deck
                const card = shuffledDeck.pop();
                //Add card to computerr hand
                computerHands[i].push(card);

                //Create a div to hold the card and add a class 'card'
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                            
                //Add img to the div and add a class 'card-image'
                const cardImg = document.createElement('img');
                cardImg.src = 'images/cards/cardBack.jpg';
                cardImg.alt = 'The Diligent Coder Hard at Work';
                cardImg.classList.add('card-back');

                //Add cardImg as a child of cardDiv, and cardDiv as a child of the computer hands divs
                cardDiv.appendChild(cardImg);
                computerHandDivs[i].appendChild(cardDiv);
            }
        };

        //Deal the Gameboard
        for(let i = 0; i < 4; i++){
            //Deal a card from the shuffled deck
            const card = shuffledDeck.pop();
            
            //Create a div to hold the card and add a class 'card'
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            
            //Add img to the div and add a class 'card-image'
            const cardImg = document.createElement('img');
            cardImg.src = card.imageUrl;
            cardImg.alt = `${card.rank} of ${card.suit}`;
            cardImg.classList.add('card-image');

            //Add cardImg as a child of cardDiv, and cardDiv as a child of the gameboard div
            cardDiv.appendChild(cardImg);
            gameboard.appendChild(cardDiv);
        };

        //Deal All Hands
        for(let i = 0; i < 7; i++) {
            //Deal a card from the shuffled deck
            const card = shuffledDeck.pop();
            
            //Create a div to hold the card and add a class 'card'
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            
            //Add img to the div and add a class 'card-image'
            const cardImg = document.createElement('img');
            cardImg.src = card.imageUrl;
            cardImg.alt = `${card.rank} of ${card.suit}`;
            cardImg.classList.add('card-image');

            //Add cardImg as a child of cardDiv, and cardDiv as a child of the gameboard div
            cardDiv.appendChild(cardImg);
            playerHand.appendChild(cardDiv);

            //Call function to deal hands in series with the players hand so that deals go player, comp 1, comp 2, comp 3
            dealToComputers(numComputerPlayers);
        };
    };

    //Commented out for shuffle testing for duplicate shuffles to ensure shuffle integrity
    //dealCards();
});