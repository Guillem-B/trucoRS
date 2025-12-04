
export type RoundResult = {
  winner: string | null;
  roundNumber: number;
};

export type HandResult = {
  team1Wins: number;
  team2Wins: number;
  winner: 'team1' | 'team2' | null;
};

/**
 * Calculates the result of a hand based on round wins
 */
export function calculateHandResult(roundResults: RoundResult[]): HandResult {
  let team1Wins = 0;
  let team2Wins = 0;
  
  roundResults.forEach((result) => {
    if (result.winner === 'player') {
      team1Wins++;
    } else if (result.winner === 'opponent1') {
      team2Wins++;
    }
    // In 4-player games, we'd need to track teams differently
  });
  
  let winner: 'team1' | 'team2' | null = null;
  if (team1Wins >= 2) {
    winner = 'team1';
  } else if (team2Wins >= 2) {
    winner = 'team2';
  }
  
  return {
    team1Wins,
    team2Wins,
    winner,
  };
}

/**
 * Checks if a hand is complete (2 rounds won by same team or 3 rounds played)
 */
export function isHandComplete(roundResults: RoundResult[]): boolean {
  if (roundResults.length >= 3) return true;
  
  const result = calculateHandResult(roundResults);
  return result.winner !== null;
}

