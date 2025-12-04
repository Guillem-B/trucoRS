export type Suit = 'ouros' | 'espadas' | 'copas' | 'paus';
export type Rank = '4' | '5' | '6' | '7' | '10' | 'Q' | 'J' | 'K' | 'A' | '2' | '3';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  value: number; // For comparison (higher = better)
  isManilha: boolean; // Special cards in Truco
}

// In Truco Gaudério, the deck has 44 cards (no 8s, 9s)
// The manilhas (highest cards) depend on the vira (face-up card)
// For now, we'll use a standard hierarchy where 3 is highest, then 2, then A, K, J, Q, 10, 7, 6, 5, 4
// Manilhas will be handled separately in game logic

const suits: Suit[] = ['ouros', 'espadas', 'copas', 'paus'];
const ranks: Rank[] = ['4', '5', '6', '7', '10', 'Q', 'J', 'K', 'A', '2', '3'];

// Truco Gaudério fixed hierarchy values
const cardValues: Record<string, number> = {
  // Highest cards (manilhas)
  'A-espadas': 16,  // Ace of swords
  'A-paus': 15,     // Ace of clubs
  '7-espadas': 14,  // 7 spades
  '7-ouros': 13,    // 7 diamonds
  
  // Regular cards
  '3-espadas': 12, '3-copas': 12, '3-paus': 12, '3-ouros': 12,  // all 3s
  '2-espadas': 11, '2-copas': 11, '2-paus': 11, '2-ouros': 11,  // all 2s
  
  'A-copas': 10, 'A-ouros': 10,  // Ace of cups = Ace of coins (equal)
  
  'K-espadas': 9, 'K-copas': 9, 'K-paus': 9, 'K-ouros': 9,  // all kings
  'Q-espadas': 8, 'Q-copas': 8, 'Q-paus': 8, 'Q-ouros': 8,  // all queens
  'J-espadas': 7, 'J-copas': 7, 'J-paus': 7, 'J-ouros': 7,  // all jacks

  '10-espadas': 6, '10-copas': 6, '10-paus': 6, '10-ouros': 6,  // all 10s

  '7-copas': 5, '7-paus': 5,  // 7 cups = 7 hearts (equal)

  '6-espadas': 4, '6-copas': 4, '6-paus': 4, '6-ouros': 4,  // all 6s
  '5-espadas': 3, '5-copas': 3, '5-paus': 3, '5-ouros': 3,  // all 5s
  '4-espadas': 2, '4-copas': 2, '4-paus': 2, '4-ouros': 2,  // all 4s (lowest)
};

export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        id: `${rank}-${suit}`,
        suit,
        rank,
        value: cardValues[`${rank}-${suit}`] || 0,
        isManilha: cardValues[`${rank}-${suit}`] >= 13, // Cards with value 13+ are manilhas
      });
    }
  }
  
  return deck;
}

export function getCardDisplayName(card: Card): string {
  const rankNames: Record<Rank, string> = {
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '10': '10',
    'Q': 'Dama',
    'J': 'Valete',
    'K': 'Rei',
    'A': 'Ás',
    '2': '2',
    '3': '3',
  };
  
  const suitNames: Record<Suit, string> = {
    'ouros': 'Ouros',
    'espadas': 'Espadas',
    'copas': 'Copas',
    'paus': 'Bastos',
  };
  
  return `${rankNames[card.rank]} de ${suitNames[card.suit]}`;
}

export function getCardShortName(card: Card): string {
  const suitSymbols: Record<Suit, string> = {
    'ouros': 'O',  // Oros (coins)
    'espadas': 'E', // Espadas (swords)
    'copas': 'C',   // Copas (cups)
    'paus': 'B',    // Bastos (clubs)
  };

  return `${card.rank}${suitSymbols[card.suit]}`;
}

export const allCards = createDeck();

/**
 * Get the image path for a card
 * Images should be placed in public/images/cards/ with naming convention: {rank}-{suit}.png
 * For example: 1-espadas.png, 7-ouros.png, etc.
 */
export function getCardImagePath(card: Card): string {
  return `/images/cards/${card.rank}-${card.suit}.png`;
}

/**
 * Check if a card image exists (for fallback handling)
 */
export function cardImageExists(card: Card): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = getCardImagePath(card);
  });
}

