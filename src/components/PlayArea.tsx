import { Card } from '../data/cards';
import CardComponent from './Card';
import { useLanguage } from '../contexts/LanguageContext';

interface PlayAreaProps {
  playedCards: Record<string, Card | null>;
  roundWinner: string | null;
  playerNames?: Record<string, string>;
}

export default function PlayArea({ playedCards, roundWinner, playerNames }: PlayAreaProps) {
  const { t } = useLanguage();
  const entries = Object.entries(playedCards).filter(([_, card]) => card !== null);
  
  if (entries.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-300">
        <p className="text-gray-500">{t('game.waiting.cards')}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[200px]">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        {t('game.played.cards')}
      </h3>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {entries.map(([player, card]) => {
          const playerName = playerNames?.[player] || player;
          const isWinner = roundWinner === player;
          
          return (
            <div
              key={player}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                isWinner
                  ? 'bg-green-100 ring-4 ring-green-500 ring-offset-2'
                  : 'bg-gray-50'
              }`}
            >
              <p className={`text-sm mb-2 font-medium ${
                isWinner ? 'text-green-700' : 'text-gray-600'
              }`}>
                {playerName}
                {isWinner && ' ✓'}
              </p>
              {card && <CardComponent card={card} size="md" />}
            </div>
          );
        })}
      </div>
      {roundWinner && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-green-700">
            {t('game.round.winner')}: {playerNames?.[roundWinner] || roundWinner}
          </p>
        </div>
      )}
    </div>
  );
}

