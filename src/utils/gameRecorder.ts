import { GameMove, GameRecord } from '../store/statsStore';
import { Card } from '../data/cards';
import { Player } from '../store/gameStore';

export class GameRecorder {
  private moves: GameMove[] = [];
  private startTime: number = Date.now();

  recordMove(round: number, player: Player, card: Card): void {
    this.moves.push({
      round,
      player,
      card: card.id,
      timestamp: Date.now() - this.startTime,
    });
  }

  getMoves(): GameMove[] {
    return [...this.moves];
  }

  reset(): void {
    this.moves = [];
    this.startTime = Date.now();
  }

  createRecord(result: 'win' | 'loss', score: { team1: number; team2: number }): Omit<GameRecord, 'id' | 'date'> {
    return {
      result,
      score,
      moves: this.getMoves(),
    };
  }
}

