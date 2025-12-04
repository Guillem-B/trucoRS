import { Card, createDeck } from '../data/cards';

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealCards(deck: Card[], numPlayers: number, cardsPerPlayer: number = 3): Card[][] {
  const hands: Card[][] = [];
  for (let i = 0; i < numPlayers; i++) {
    hands.push([]);
  }
  
  let cardIndex = 0;
  for (let round = 0; round < cardsPerPlayer; round++) {
    for (let player = 0; player < numPlayers; player++) {
      if (cardIndex < deck.length) {
        hands[player].push(deck[cardIndex]);
        cardIndex++;
      }
    }
  }
  
  return hands;
}

export function initializeGame(numPlayers: number = 2): {
  deck: Card[];
  hands: Card[][];
} {
  const fullDeck = createDeck();
  const shuffled = shuffleDeck(fullDeck);

  // Deal 3 cards to each player (no vira in Truco Gaudério)
  const cardsNeeded = numPlayers * 3;
  const gameDeck = shuffled.slice(0, cardsNeeded);

  // Deal cards to players
  const hands = dealCards(gameDeck, numPlayers, 3);

  return {
    deck: shuffled.slice(cardsNeeded),
    hands,
  };
}

