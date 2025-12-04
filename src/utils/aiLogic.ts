import { Card } from '../data/cards';
import { getCardValue } from './cardComparison';
import { BetLevel } from './bettingLogic';
import { FlorResult } from './florLogic';

export type AIDifficulty = 'beginner' | 'intermediate' | 'advanced';

interface AIContext {
  hand: Card[];
  vira: Card | null; // Kept for compatibility, but not used in Truco Gaudério
  playedCards: Record<string, Card | null>;
  currentBet: BetLevel;
  roundNumber: number;
}

/**
 * Simple AI that randomly selects a card
 */
export function selectRandomCard(hand: Card[]): Card | null {
  if (hand.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * hand.length);
  return hand[randomIndex];
}

/**
 * AI that selects the lowest card (beginner strategy)
 */
export function selectLowestCard(hand: Card[], vira: Card | null): Card | null {
  if (hand.length === 0) return null;
  
  let lowestCard = hand[0];
  let lowestValue = getCardValue(lowestCard, vira);
  
  for (const card of hand) {
    const value = getCardValue(card, vira);
    if (value < lowestValue) {
      lowestValue = value;
      lowestCard = card;
    }
  }
  
  return lowestCard;
}

/**
 * AI that selects the highest card (aggressive strategy)
 */
export function selectHighestCard(hand: Card[], vira: Card | null): Card | null {
  if (hand.length === 0) return null;
  
  let highestCard = hand[0];
  let highestValue = getCardValue(highestCard, vira);
  
  for (const card of hand) {
    const value = getCardValue(card, vira);
    if (value > highestValue) {
      highestValue = value;
      highestCard = card;
    }
  }
  
  return highestCard;
}

/**
 * AI decision making based on difficulty
 */
export function makeAIDecision(
  context: AIContext,
  difficulty: AIDifficulty = 'beginner'
): Card | null {
  switch (difficulty) {
    case 'beginner':
      // Beginner: mostly random, sometimes lowest
      if (Math.random() < 0.7) {
        return selectRandomCard(context.hand);
      }
      return selectLowestCard(context.hand, context.vira);
      
    case 'intermediate':
      // Intermediate: mix of strategies
      const rand = Math.random();
      if (rand < 0.4) {
        return selectLowestCard(context.hand, context.vira);
      } else if (rand < 0.8) {
        return selectRandomCard(context.hand);
      } else {
        return selectHighestCard(context.hand, context.vira);
      }
      
    case 'advanced':
      // Advanced: more strategic (simplified for now)
      // In a full implementation, this would consider:
      // - Opponent's played cards
      // - Remaining cards
      // - Betting situation
      // - Round number
      if (context.roundNumber === 1) {
        // First round: play medium card
        const sorted = [...context.hand].sort((a, b) => 
          getCardValue(a, context.vira) - getCardValue(b, context.vira)
        );
        return sorted[Math.floor(sorted.length / 2)];
      } else {
        // Later rounds: play strategically
        return selectHighestCard(context.hand, context.vira);
      }
  }
}

/**
 * AI betting decision
 */
export function makeAIBetDecision(
  currentBet: BetLevel,
  difficulty: AIDifficulty,
  handStrength: number // 0-1, where 1 is strongest hand
): 'bet' | 'accept' | 'decline' | null {
  if (currentBet === 'none') {
    // Decide whether to bet
    const betProbability = difficulty === 'beginner' ? 0.2 : difficulty === 'intermediate' ? 0.4 : 0.6;
    if (Math.random() < betProbability * handStrength) {
      return 'bet';
    }
    return null;
  } else {
    // Decide whether to accept or decline
    const acceptProbability = handStrength * (difficulty === 'beginner' ? 0.5 : difficulty === 'intermediate' ? 0.7 : 0.8);
    if (Math.random() < acceptProbability) {
      return 'accept';
    }
    return 'decline';
  }
}

/**
 * Calculates hand strength (0-1) based on card values
 */
export function calculateHandStrength(hand: Card[], vira: Card | null): number {
  if (hand.length === 0) return 0;

  const values = hand.map(card => getCardValue(card, vira));
  const maxValue = 104; // Highest possible (manilha of paus)
  const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length;

  return Math.min(avgValue / maxValue, 1);
}

/**
 * AI decision for Flor declaration
 * In Truco Gaudério, Flor is declared when you have it and it's reasonably strong
 */
export function makeAIFlorDecision(
  florResult: FlorResult,
  difficulty: AIDifficulty
): boolean {
  if (!florResult.hasFlor) return false;

  // Beginner AI: only declares very strong Flor
  if (difficulty === 'beginner') {
    return florResult.value >= 35; // Only declare very strong Flor
  }

  // Intermediate AI: declares most Flor
  if (difficulty === 'intermediate') {
    return florResult.value >= 25; // Declare decent Flor
  }

  // Advanced AI: declares any Flor
  return florResult.value >= 20; // Declare any Flor
}

/**
 * AI decision for responding to Flor declaration
 * In Truco Gaudério, accept if you have better Flor, decline otherwise
 */
export function makeAIFlorResponseDecision(
  florResult: FlorResult,
  challengerFlor: FlorResult
): 'accept' | 'decline' {
  if (!florResult.hasFlor) {
    // No Flor, always decline
    return 'decline';
  }

  // Compare Flor values
  if (florResult.value > challengerFlor.value) {
    // We have better Flor, accept
    return 'accept';
  } else {
    // We have equal or worse Flor, decline
    return 'decline';
  }
}

