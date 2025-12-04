export type BetLevel = 'none' | 'truco' | 'retruco' | 'vale-quatro';

export interface BettingState {
  currentBet: BetLevel;
  challenger: 'player' | 'opponent' | null;
  accepted: boolean;
}

export const betValues: Record<BetLevel, number> = {
  'none': 1,
  'truco': 2,
  'retruco': 3,
  'vale-quatro': 4,
};

export const betNames: Record<BetLevel, string> = {
  'none': 'Normal',
  'truco': 'Truco',
  'retruco': 'Retruco',
  'vale-quatro': 'Vale Quatro',
};

/**
 * Gets the next bet level
 */
export function getNextBet(currentBet: BetLevel): BetLevel | null {
  switch (currentBet) {
    case 'none':
      return 'truco';
    case 'truco':
      return 'retruco';
    case 'retruco':
      return 'vale-quatro';
    case 'vale-quatro':
      return null; // Can't go higher
  }
}

/**
 * Checks if a bet can be made (only on player's turn, before playing card)
 */
export function canBet(
  currentBet: BetLevel,
  isPlayerTurn: boolean,
  hasPlayedCard: boolean
): boolean {
  if (hasPlayedCard) return false; // Can't bet after playing
  if (!isPlayerTurn) return false; // Can only bet on your turn
  if (currentBet === 'vale-quatro') return false; // Can't go higher
  return true;
}

/**
 * Validates if a bet response is valid
 */
export function canRespondToBet(
  currentBet: BetLevel,
  response: 'accept' | 'decline'
): boolean {
  if (currentBet === 'none') return false; // No bet to respond to
  return true;
}

