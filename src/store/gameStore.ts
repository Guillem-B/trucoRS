import { create } from 'zustand';
import { Card } from '../data/cards';
import { initializeGame } from '../utils/gameLogic';
import { getRoundWinner } from '../utils/cardComparison';
import { calculateHandResult, isHandComplete, RoundResult } from '../utils/roundLogic';
import { BetLevel, betValues } from '../utils/bettingLogic';
import { makeAIDecision, AIDifficulty, makeAIFlorDecision, makeAIFlorResponseDecision } from '../utils/aiLogic';
import { checkFlor, compareFlor, FlorResult } from '../utils/florLogic';

export type Player = 'player' | 'opponent1' | 'opponent2' | 'opponent3';

export interface GameState {
  // Game setup
  numPlayers: number;
  hands: Record<Player, Card[]>;

  // Current round state
  currentRound: number;
  currentHand: number;
  currentPlayer: Player;
  playedCards: Record<Player, Card | null>;
  roundWinner: Player | null;
  roundResults: RoundResult[];

  // Betting state
  currentBet: BetLevel;
  betChallenger: Player | null;
  betAccepted: boolean;

  // Flor state
  florDeclared: boolean;
  florChallenger: Player | null;
  florResults: Record<Player, FlorResult>;
  florAccepted: boolean;

  // AI settings
  aiDifficulty: AIDifficulty;

  // Game state
  scores: Record<'team1' | 'team2', number>;
  gameStatus: 'waiting' | 'playing' | 'roundEnd' | 'handEnd' | 'gameEnd';

  // Actions
  startGame: (numPlayers?: number) => void;
  setAIDifficulty: (difficulty: AIDifficulty) => void;
  playCard: (player: Player, card: Card) => void;
  makeBet: (bet: BetLevel) => void;
  acceptBet: () => void;
  declineBet: () => void;
  declareFlor: () => void;
  acceptFlor: () => void;
  declineFlor: () => void;
  nextRound: () => void;
  nextHand: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  numPlayers: 2,
  hands: {
    player: [],
    opponent1: [],
    opponent2: [],
    opponent3: [],
  },
  currentRound: 1,
  currentHand: 1,
  currentPlayer: 'player',
  playedCards: {
    player: null,
    opponent1: null,
    opponent2: null,
    opponent3: null,
  },
  roundWinner: null,
  roundResults: [],
  currentBet: 'none',
  betChallenger: null,
  betAccepted: true,
  florDeclared: false,
  florChallenger: null,
  florResults: {
    player: { hasFlor: false, suit: null, value: 0, cards: [] },
    opponent1: { hasFlor: false, suit: null, value: 0, cards: [] },
    opponent2: { hasFlor: false, suit: null, value: 0, cards: [] },
    opponent3: { hasFlor: false, suit: null, value: 0, cards: [] },
  },
  florAccepted: true,
  aiDifficulty: 'beginner',
  scores: {
    team1: 0,
    team2: 0,
  },
  gameStatus: 'waiting',

  startGame: (numPlayers = 2) => {
    const game = initializeGame(numPlayers);
    const hands: Record<Player, Card[]> = {
      player: game.hands[0] || [],
      opponent1: game.hands[1] || [],
      opponent2: game.hands[2] || [],
      opponent3: game.hands[3] || [],
    };

    // Check for Flor in initial hands
    const florResults: Record<Player, FlorResult> = {
      player: checkFlor(hands.player),
      opponent1: checkFlor(hands.opponent1),
      opponent2: checkFlor(hands.opponent2),
      opponent3: checkFlor(hands.opponent3),
    };

    set({
      numPlayers,
      hands,
      currentRound: 1,
      currentHand: 1,
      currentPlayer: 'player',
      playedCards: {
        player: null,
        opponent1: null,
        opponent2: null,
        opponent3: null,
      },
      roundWinner: null,
      roundResults: [],
      currentBet: 'none',
      betChallenger: null,
      betAccepted: true,
      florDeclared: false,
      florChallenger: null,
      florResults,
      florAccepted: true,
      scores: {
        team1: 0,
        team2: 0,
      },
      gameStatus: 'playing',
    });

    // Auto-play AI if it's AI's turn
    setTimeout(() => {
      const newState = get();
      if (newState.gameStatus === 'playing' && newState.currentPlayer !== 'player') {
        handleAITurn();
      }
    }, 500);
  },

  setAIDifficulty: (difficulty: AIDifficulty) => {
    set({ aiDifficulty: difficulty });
  },

  playCard: (player: Player, card: Card) => {
    const state = get();
    const playerHand = state.hands[player];
    
    // Check if player has the card
    if (!playerHand.find(c => c.id === card.id)) {
      return;
    }
    
    // Remove card from hand
    const newHand = playerHand.filter(c => c.id !== card.id);
    
    // Set played card
    const newPlayedCards = { ...state.playedCards };
    newPlayedCards[player] = card;
    
    // Update hands
    const newHands = { ...state.hands };
    newHands[player] = newHand;
    
    set({
      hands: newHands,
      playedCards: newPlayedCards,
    });
    
    // Check if all players have played
    const players: Player[] = ['player', 'opponent1', 'opponent2', 'opponent3'];
    const activePlayers = players.slice(0, state.numPlayers);
    const allPlayed = activePlayers.every(player => newPlayedCards[player] !== null);
    
    if (allPlayed) {
      // Determine round winner (no vira in Truco Gaudério)
      const winner = getRoundWinner(newPlayedCards, null, state.numPlayers);
      const roundResult: RoundResult = {
        winner: winner as Player | null,
        roundNumber: state.currentRound,
      };
      
      const newRoundResults = [...state.roundResults, roundResult];
      const handComplete = isHandComplete(newRoundResults);
      
      set({
        roundWinner: winner as Player | null,
        roundResults: newRoundResults,
        gameStatus: handComplete ? 'handEnd' : 'roundEnd',
      });
    } else {
      // Move to next player
      const currentIndex = activePlayers.indexOf(state.currentPlayer);
      const nextIndex = (currentIndex + 1) % activePlayers.length;
      const nextPlayer = activePlayers[nextIndex];
      set({ currentPlayer: nextPlayer });
      
      // Auto-play AI turn
      if (nextPlayer !== 'player') {
        setTimeout(() => {
          handleAITurn();
        }, 1000);
      }
    }
  },

  makeBet: (bet: BetLevel) => {
    const state = get();
    set({
      currentBet: bet,
      betChallenger: state.currentPlayer,
      betAccepted: false,
    });
  },

  acceptBet: () => {
    set({ betAccepted: true });
  },

  declineBet: () => {
    const state = get();
    // If bet is declined, the challenger wins the hand
    const newScores = { ...state.scores };
    if (state.betChallenger === 'player') {
      newScores.team1 += betValues[state.currentBet];
    } else {
      newScores.team2 += betValues[state.currentBet];
    }

    // Check if game is over
    if (newScores.team1 >= 12 || newScores.team2 >= 12) {
      set({
        scores: newScores,
        gameStatus: 'gameEnd',
      });
    } else {
      // Start next hand
      get().nextHand();
    }
  },

  declareFlor: () => {
    const state = get();
    const playerHand = state.hands[state.currentPlayer];
    const florResult = checkFlor(playerHand);

    if (!florResult.hasFlor) return;

    const newFlorResults = { ...state.florResults };
    newFlorResults[state.currentPlayer] = florResult;

    set({
      florDeclared: true,
      florChallenger: state.currentPlayer,
      florResults: newFlorResults,
      florAccepted: false,
    });
  },

  acceptFlor: () => {
    const state = get();
    if (!state.florDeclared) return;

    // Calculate Flor winner and award points
    const challenger = state.florChallenger!;
    const challengerFlor = state.florResults[challenger];

    // Find opponent with Flor (in 2-player game, it's the other player)
    const opponent = challenger === 'player' ? 'opponent1' : 'player';
    const opponentFlor = checkFlor(state.hands[opponent]);

    const comparison = compareFlor(challengerFlor, opponentFlor);
    const newScores = { ...state.scores };

    if (comparison === 'flor1') {
      // Challenger wins Flor
      if (challenger === 'player') {
        newScores.team1 += 3; // Flor typically worth 3 points
      } else {
        newScores.team2 += 3;
      }
    } else if (comparison === 'flor2') {
      // Opponent wins Flor
      if (opponent === 'player') {
        newScores.team1 += 3;
      } else {
        newScores.team2 += 3;
      }
    }
    // If tie, no points awarded

    set({
      scores: newScores,
      florAccepted: true,
    });
  },

  declineFlor: () => {
    const state = get();
    if (!state.florDeclared) return;

    // If Flor is declined, the challenger wins the Flor points
    const newScores = { ...state.scores };
    if (state.florChallenger === 'player') {
      newScores.team1 += 3; // Flor points
    } else {
      newScores.team2 += 3;
    }

    set({
      scores: newScores,
      florAccepted: true,
    });
  },

  nextRound: () => {
    const state = get();
    const handResult = calculateHandResult(state.roundResults);
    
    if (handResult.winner) {
      // Update scores with bet multiplier
      const newScores = { ...state.scores };
      const points = betValues[state.currentBet];
      if (handResult.winner === 'team1') {
        newScores.team1 += points;
      } else {
        newScores.team2 += points;
      }
      
      // Check if game is over (12 points to win)
      if (newScores.team1 >= 12 || newScores.team2 >= 12) {
        set({
          scores: newScores,
          gameStatus: 'gameEnd',
        });
      } else {
        set({
          scores: newScores,
          gameStatus: 'handEnd',
        });
      }
    } else if (state.currentRound < 3) {
      // Continue to next round
      set({
        currentRound: state.currentRound + 1,
        currentPlayer: 'player',
        playedCards: {
          player: null,
          opponent1: null,
          opponent2: null,
          opponent3: null,
        },
        roundWinner: null,
        gameStatus: 'playing',
      });
    } else {
      // End of hand (tie)
      set({ gameStatus: 'handEnd' });
    }
  },

  nextHand: () => {
    const state = get();
    const game = initializeGame(state.numPlayers);
    const hands: Record<Player, Card[]> = {
      player: game.hands[0] || [],
      opponent1: game.hands[1] || [],
      opponent2: game.hands[2] || [],
      opponent3: game.hands[3] || [],
    };

    // Check for Flor in new hands
    const florResults: Record<Player, FlorResult> = {
      player: checkFlor(hands.player),
      opponent1: checkFlor(hands.opponent1),
      opponent2: checkFlor(hands.opponent2),
      opponent3: checkFlor(hands.opponent3),
    };

    set({
      hands,
      currentRound: 1,
      currentHand: state.currentHand + 1,
      currentPlayer: 'player',
      playedCards: {
        player: null,
        opponent1: null,
        opponent2: null,
        opponent3: null,
      },
      roundWinner: null,
      roundResults: [],
      currentBet: 'none',
      betChallenger: null,
      betAccepted: true,
      florDeclared: false,
      florChallenger: null,
      florResults,
      florAccepted: true,
      gameStatus: 'playing',
    });

    // Auto-play AI if it's AI's turn
    setTimeout(() => {
      const newState = get();
      if (newState.gameStatus === 'playing' && newState.currentPlayer !== 'player') {
        handleAITurn();
      }
    }, 500);
  },

  resetGame: () => {
    set({
      numPlayers: 2,
      hands: {
        player: [],
        opponent1: [],
        opponent2: [],
        opponent3: [],
      },
      currentRound: 1,
      currentHand: 1,
      currentPlayer: 'player',
      playedCards: {
        player: null,
        opponent1: null,
        opponent2: null,
        opponent3: null,
      },
      roundWinner: null,
      roundResults: [],
      currentBet: 'none',
      betChallenger: null,
      betAccepted: true,
      florDeclared: false,
      florChallenger: null,
      florResults: {
        player: { hasFlor: false, suit: null, value: 0, cards: [] },
        opponent1: { hasFlor: false, suit: null, value: 0, cards: [] },
        opponent2: { hasFlor: false, suit: null, value: 0, cards: [] },
        opponent3: { hasFlor: false, suit: null, value: 0, cards: [] },
      },
      florAccepted: true,
      scores: {
        team1: 0,
        team2: 0,
      },
      gameStatus: 'waiting',
    });
  },
}));

// Helper function to handle AI turns
function handleAITurn() {
  const state = useGameStore.getState();

  if (state.gameStatus !== 'playing' || state.currentPlayer === 'player') {
    return;
  }

  const aiHand = state.hands[state.currentPlayer];
  if (aiHand.length === 0) return;

  // Check if AI should declare Flor
  const aiFlor = state.florResults[state.currentPlayer];
  if (aiFlor.hasFlor && !state.florDeclared) {
    const shouldDeclare = makeAIFlorDecision(aiFlor, state.aiDifficulty);
    if (shouldDeclare) {
      useGameStore.getState().declareFlor();
      return; // Don't play card if declaring Flor
    }
  }

  // Check if AI needs to respond to Flor
  if (state.florDeclared && !state.florAccepted && state.florChallenger !== state.currentPlayer) {
    const challengerFlor = state.florResults[state.florChallenger!];
    const response = makeAIFlorResponseDecision(aiFlor, challengerFlor);

    setTimeout(() => {
      if (response === 'accept') {
        useGameStore.getState().acceptFlor();
      } else {
        useGameStore.getState().declineFlor();
      }
    }, 1000);
    return;
  }

  // Normal card play
  const aiCard = makeAIDecision(
    {
      hand: aiHand,
      vira: null, // No vira in Truco Gaudério
      playedCards: state.playedCards,
      currentBet: state.currentBet,
      roundNumber: state.currentRound,
    },
    state.aiDifficulty
  );

  if (aiCard) {
    useGameStore.getState().playCard(state.currentPlayer, aiCard);
  }
}

