import { BetLevel, betNames, betValues, getNextBet, canBet } from '../utils/bettingLogic';

interface BettingControlsProps {
  currentBet: BetLevel;
  isPlayerTurn: boolean;
  hasPlayedCard: boolean;
  onBet: (bet: BetLevel) => void;
  onAccept: () => void;
  onDecline: () => void;
  canRespond: boolean;
}

export default function BettingControls({
  currentBet,
  isPlayerTurn,
  hasPlayedCard,
  onBet,
  onAccept,
  onDecline,
  canRespond,
}: BettingControlsProps) {
  const nextBet = getNextBet(currentBet);
  const canMakeBet = canBet(currentBet, isPlayerTurn, hasPlayedCard);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Aposta Atual</p>
          <p className="text-xl font-bold text-primary-700">
            {betNames[currentBet]} ({betValues[currentBet]} pontos)
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {canMakeBet && nextBet && (
            <button
              onClick={() => onBet(nextBet)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              {betNames[nextBet]}
            </button>
          )}

          {canRespond && (
            <>
              <button
                onClick={onAccept}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Aceitar
              </button>
              <button
                onClick={onDecline}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Recusar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

