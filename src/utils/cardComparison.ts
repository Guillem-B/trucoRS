import { Card } from '../data/cards';

/**
 * Determines the manilhas - in Truco Gaudério, these are fixed
 */
export function getManilhas(_vira: Card | null): Card[] {
  // In Truco Gaudério, manilhas are fixed, not dependent on vira
  // This function exists for compatibility but doesn't use vira
  return [
    // The fixed manilhas will be set during card creation
  ];
}

/**
 * Checks if a card is a manilha based on the fixed hierarchy
 */
export function isManilha(card: Card, _vira: Card | null): boolean {
  // In Truco Gaudério, manilhas are the highest cards in the fixed hierarchy
  // Cards with value 13+ are manilhas (1-espadas=16, 1-paus=15, 7-espadas=14, 7-ouros=13)
  return card.value >= 13;
}

/**
 * Gets the comparison value of a card using the fixed Truco Gaudério hierarchy
 * Higher value = stronger card
 */
export function getCardValue(card: Card, _vira: Card | null): number {
  return card.value;
}

/**
 * Compares two cards and returns which one wins
 * Returns: 1 if card1 wins, -1 if card2 wins, 0 if tie
 */
export function compareCards(card1: Card, card2: Card, vira: Card | null): number {
  const value1 = getCardValue(card1, vira);
  const value2 = getCardValue(card2, vira);
  
  if (value1 > value2) return 1;
  if (value1 < value2) return -1;
  
  // If same value (shouldn't happen with manilhas, but handle ties)
  return 0;
}

/**
 * Determines the winner of a round based on played cards
 */
export function getRoundWinner(
  playedCards: Record<string, Card | null>,
  vira: Card | null,
  _numPlayers: number
): string | null {
  const validCards: Array<{ player: string; card: Card }> = [];
  
  // Collect all valid played cards
  Object.entries(playedCards).forEach(([player, card]) => {
    if (card) {
      validCards.push({ player, card });
    }
  });
  
  if (validCards.length === 0) return null;
  if (validCards.length === 1) return validCards[0].player;
  
  // Find the highest card
  let winner = validCards[0];
  for (let i = 1; i < validCards.length; i++) {
    const comparison = compareCards(winner.card, validCards[i].card, vira);
    if (comparison < 0) {
      winner = validCards[i];
    }
  }
  
  return winner.player;
}

