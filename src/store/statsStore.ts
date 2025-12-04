import { create } from 'zustand';

export interface GameRecord {
  id: string;
  date: Date;
  result: 'win' | 'loss';
  score: { team1: number; team2: number };
  moves: GameMove[];
}

export interface GameMove {
  round: number;
  player: string;
  card: string;
  timestamp: number;
}

export interface GameStats {
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  averageScore: number;
  games: GameRecord[];
}

interface StatsState {
  stats: GameStats;
  addGame: (record: Omit<GameRecord, 'id' | 'date'>) => void;
  clearStats: () => void;
}

const initialStats: GameStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  winRate: 0,
  averageScore: 0,
  games: [],
};

// Load stats from localStorage
function loadStats(): GameStats {
  const stored = localStorage.getItem('trucors-stats');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialStats;
    }
  }
  return initialStats;
}

// Save stats to localStorage
function saveStats(stats: GameStats): void {
  localStorage.setItem('trucors-stats', JSON.stringify(stats));
}

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: loadStats(),

  addGame: (record) => {
    const stats = get().stats;
    const newGame: GameRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date(),
    };

    const newStats: GameStats = {
      totalGames: stats.totalGames + 1,
      wins: stats.wins + (record.result === 'win' ? 1 : 0),
      losses: stats.losses + (record.result === 'loss' ? 1 : 0),
      winRate:
        ((stats.wins + (record.result === 'win' ? 1 : 0)) /
          (stats.totalGames + 1)) *
        100,
      averageScore:
        (stats.averageScore * stats.totalGames +
          record.score.team1) /
        (stats.totalGames + 1),
      games: [newGame, ...stats.games].slice(0, 50), // Keep last 50 games
    };

    set({ stats: newStats });
    saveStats(newStats);
  },

  clearStats: () => {
    set({ stats: initialStats });
    saveStats(initialStats);
  },
}));

