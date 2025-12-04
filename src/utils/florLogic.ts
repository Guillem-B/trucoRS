import { Card } from '../data/cards';

export interface FlorResult {
  hasFlor: boolean;
  suit: string | null;
  value: number;
  cards: Card[];
}

/**
 * Checks if a hand has Flor (three cards of the same suit)
 */
export function checkFlor(hand: Card[]): FlorResult {
  if (hand.length !== 3) {
    return { hasFlor: false, suit: null, value: 0, cards: [] };
  }

  // Group cards by suit
  const suits = hand.reduce((acc, card) => {
    if (!acc[card.suit]) {
      acc[card.suit] = [];
    }
    acc[card.suit].push(card);
    return acc;
  }, {} as Record<string, Card[]>);

  // Check if any suit has 3 cards
  for (const [suit, cards] of Object.entries(suits)) {
    if (cards.length === 3) {
      const value = calculateFlorValue(cards);
      return {
        hasFlor: true,
        suit,
        value,
        cards: cards.sort((a, b) => b.value - a.value), // Sort by value descending
      };
    }
  }

  return { hasFlor: false, suit: null, value: 0, cards: [] };
}

/**
 * Calculates the value of a Flor hand
 * In Truco Argentino, Flor value is calculated similarly to Envido:
 * - Cards of the same suit add their values
 * - Face cards (10, J, Q, K) are worth 0 for Flor calculation
 * - Aces are worth 1
 * - Number cards are worth their face value
 */
export function calculateFlorValue(cards: Card[]): number {
  if (cards.length !== 3) return 0;

  // Convert card ranks to Flor values
  const florValues: Record<string, number> = {
    'A': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '10': 0, // Face cards worth 0
    'J': 0,
    'Q': 0,
    'K': 0,
  };

  // Sum the values of the three cards
  const totalValue = cards.reduce((sum, card) => {
    return sum + (florValues[card.rank] || 0);
  }, 0);

  // Add 20 points (base Flor value)
  return totalValue + 20;
}

/**
 * Compares two Flor hands and returns the winner
 */
export function compareFlor(flor1: FlorResult, flor2: FlorResult): 'flor1' | 'flor2' | 'tie' {
  if (!flor1.hasFlor && !flor2.hasFlor) return 'tie';
  if (!flor1.hasFlor) return 'flor2';
  if (!flor2.hasFlor) return 'flor1';

  if (flor1.value > flor2.value) return 'flor1';
  if (flor2.value > flor1.value) return 'flor2';

  // If values are equal, it's a tie (or could implement suit hierarchy)
  return 'tie';
}

/**
 * Gets the display name for a Flor
 */
export function getFlorDisplayName(flor: FlorResult): string {
  if (!flor.hasFlor) return '';

  const suitNames: Record<string, string> = {
    'ouros': 'Ouros',
    'espadas': 'Espadas',
    'copas': 'Copas',
    'paus': 'Bastos',
  };

  return `Flor de ${suitNames[flor.suit || '']}`;
}