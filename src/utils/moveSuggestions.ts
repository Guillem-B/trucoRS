import { Card } from '../data/cards';
import { getCardValue } from './cardComparison';

export interface MoveSuggestion {
  card: Card;
  reason: string;
  confidence: number; // 0-1
}

/**
 * Suggests the best move based on current game state
 */
export function suggestMove(
  hand: Card[],
  vira: Card | null,
  playedCards: Record<string, Card | null>,
  roundNumber: number
): MoveSuggestion | null {
  if (hand.length === 0) return null;

  const opponentCard = Object.values(playedCards).find(card => card !== null);
  
  if (!opponentCard) {
    // Opponent hasn't played - suggest lowest card for first round
    if (roundNumber === 1) {
      const sorted = [...hand].sort((a, b) => 
        getCardValue(a, vira) - getCardValue(b, vira)
      );
      return {
        card: sorted[0],
        reason: 'Economize suas cartas fortes para rodadas posteriores',
        confidence: 0.7,
      };
    } else {
      // Later rounds - play strategically
      const sorted = [...hand].sort((a, b) => 
        getCardValue(a, vira) - getCardValue(b, vira)
      );
      return {
        card: sorted[Math.floor(sorted.length / 2)],
        reason: 'Jogue uma carta média para manter opções',
        confidence: 0.6,
      };
    }
  } else {
    // Opponent has played - find best response
    const opponentValue = getCardValue(opponentCard, vira);
    const beatingCards = hand.filter(card => 
      getCardValue(card, vira) > opponentValue
    );
    
    if (beatingCards.length > 0) {
      // Find the lowest card that still beats opponent (win with minimal value)
      const sorted = beatingCards.sort((a, b) => 
        getCardValue(a, vira) - getCardValue(b, vira)
      );
      return {
        card: sorted[0],
        reason: 'Esta carta vence a do oponente usando o mínimo necessário',
        confidence: 0.9,
      };
    } else {
      // No card beats opponent - play lowest (lose with minimal value)
      const sorted = [...hand].sort((a, b) => 
        getCardValue(a, vira) - getCardValue(b, vira)
      );
      return {
        card: sorted[0],
        reason: 'Você não pode vencer esta rodada, economize cartas melhores',
        confidence: 0.8,
      };
    }
  }
}

