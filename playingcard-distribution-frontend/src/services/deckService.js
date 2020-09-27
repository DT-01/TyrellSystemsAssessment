import {CARDS} from '../libs/constants';

const DECK_SIZE = CARDS.length;

export class DeckService{

    constructor(){
        this.deck = CARDS;
    }

    deal(noOfPlayers){
        if(noOfPlayers < 0){
            //Invalid Value
            throw new Error("Only positive numeric values allowed")
        }

        var playerHands = [];

        if(noOfPlayers == 0) {
            return playerHands;
        }

        this.deck = this.shuffle(this.deck);


        let i = 0;
        let j = 0;
        while(i < DECK_SIZE){
            if(playerHands[j] == undefined) {
                playerHands[j] = [];
            }
            playerHands[j].push(this.deck[i]);
            j = (j + 1) % noOfPlayers;
            i++;
        }
        playerHands.forEach(playerHand => {
            playerHand = playerHand.toString();
        })

        return playerHands;
    }

    shuffle(deck,numberOfShuffles=4, cutEveryShuffle=true){
        for(let x = 0; x < numberOfShuffles; x++){
            deck = this.faroShuffle(deck);
            if(cutEveryShuffle){
                deck = this.cutDeck(deck);
            }
        }
        return deck;
    }

    //Call 8 times to return to new deck order
    //Out Shuffle
    faroShuffle(deck){
        let firstHalfStart = 0;
        let firstHalfEnd = Math.floor(DECK_SIZE / 2) - 1;
        let secondHalfStart = DECK_SIZE - firstHalfEnd - 1;
        let secondHalfEnd = DECK_SIZE - 1;

        let i = DECK_SIZE - 1;
        let shuffledDeck = [];

        while(i > -1){
            if(firstHalfEnd >= firstHalfStart && secondHalfEnd >= secondHalfStart){
                if(i % 2 == 0){
                    shuffledDeck[i--] = deck[firstHalfEnd--];
                }else{
                    shuffledDeck[i--] = deck[secondHalfEnd--];
                }
            }else{
                if(firstHalfEnd >= firstHalfStart){
                    shuffledDeck[i--] = deck[firstHalfEnd--];
                }else{
                    shuffledDeck[i--] = deck[secondHalfEnd--];
                }
            }
        }

        return shuffledDeck;
    }

    cutDeck(deck, randomizeCutPosition=true){

        let cutPosition = 0;
        if(randomizeCutPosition == true){
            cutPosition = Math.floor(Math.random() * (DECK_SIZE - 1) + 1);
        }else{
            cutPosition = Math.floor(DECK_SIZE / 2) - 1;
        }

        let firstHalfStart = 0;
        let firstHalfEnd = cutPosition;
        let secondHalfStart = firstHalfEnd + 1;
        let secondHalfEnd = DECK_SIZE - 1;
    
        return [...deck.slice(secondHalfStart,secondHalfEnd + 1),...deck.slice(firstHalfStart,firstHalfEnd + 1)];
    }

}