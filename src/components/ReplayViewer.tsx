import { useState } from 'react';
import { GameRecord } from '../store/statsStore';
import { allCards } from '../data/cards';
import CardComponent from './Card';

interface ReplayViewerProps {
  record: GameRecord;
  onClose: () => void;
}

export default function ReplayViewer({ record, onClose }: ReplayViewerProps) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const displayedMoves = record.moves.slice(0, currentMoveIndex + 1);

  const canGoNext = currentMoveIndex < record.moves.length - 1;
  const canGoPrevious = currentMoveIndex > 0;

  const getCardById = (cardId: string) => {
    return allCards.find(c => c.id === cardId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Replay do Jogo</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Data:</span>{' '}
                <span className="font-semibold">
                  {new Date(record.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Resultado:</span>{' '}
                <span className={`font-semibold ${record.result === 'win' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.result === 'win' ? 'Vitória' : 'Derrota'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Placar Final:</span>{' '}
                <span className="font-semibold">
                  {record.score.team1} - {record.score.team2}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Total de Jogadas:</span>{' '}
                <span className="font-semibold">{record.moves.length}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Jogada {currentMoveIndex + 1} de {record.moves.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMoveIndex(Math.max(0, currentMoveIndex - 1))}
                  disabled={!canGoPrevious}
                  className={`px-4 py-2 rounded ${
                    canGoPrevious
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => setCurrentMoveIndex(Math.min(record.moves.length - 1, currentMoveIndex + 1))}
                  disabled={!canGoNext}
                  className={`px-4 py-2 rounded ${
                    canGoNext
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Próxima →
                </button>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              {displayedMoves.map((move, index) => {
                const card = getCardById(move.card);
                if (!card) return null;

                return (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded ${
                      index === currentMoveIndex ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        Rodada {move.round} - {move.player === 'player' ? 'Você' : 'Oponente'}
                      </span>
                      <CardComponent card={card} size="sm" />
                      <span className="text-xs text-gray-500">
                        {Math.floor(move.timestamp / 1000)}s
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

