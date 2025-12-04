import { useGameStore } from '../store/gameStore';
import { getFlorDisplayName } from '../utils/florLogic';

export default function FlorControls() {
  const {
    florDeclared,
    florChallenger,
    florResults,
    florAccepted,
    declareFlor,
    acceptFlor,
    declineFlor,
    currentPlayer,
    gameStatus,
    playedCards,
  } = useGameStore();

  const playerFlor = florResults.player;
  const canDeclareFlor = playerFlor.hasFlor &&
                         !florDeclared &&
                         gameStatus === 'playing' &&
                         currentPlayer === 'player' &&
                         playedCards.player === null; // Can only declare before playing cards

  const canRespondToFlor = florDeclared &&
                          !florAccepted &&
                          florChallenger !== 'player' &&
                          gameStatus === 'playing';

  if (!florDeclared && !canDeclareFlor) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col items-center gap-3">
        {florDeclared ? (
          <>
            <div className="text-center">
              <p className="text-lg font-bold text-yellow-800 mb-2">🎯 Flor Declarada!</p>
              <p className="text-sm text-yellow-700 mb-1">
                {florChallenger === 'player' ? 'Você declarou' : 'Oponente declarou'} Flor
              </p>
              {florChallenger && (
                <p className="text-sm text-yellow-600">
                  {getFlorDisplayName(florResults[florChallenger])} ({florResults[florChallenger].value} pontos)
                </p>
              )}
            </div>

            {canRespondToFlor && (
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={acceptFlor}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Aceitar Flor
                </button>
                <button
                  onClick={declineFlor}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Recusar Flor
                </button>
              </div>
            )}

            {florAccepted && (
              <div className="text-center text-green-700 font-medium">
                ✅ Flor {florChallenger === 'player' ? 'aceita' : 'recusada'}!
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="text-lg font-bold text-yellow-800 mb-2">🌸 Você tem Flor!</p>
              <p className="text-sm text-yellow-700">
                {getFlorDisplayName(playerFlor)} ({playerFlor.value} pontos)
              </p>
            </div>

            <button
              onClick={declareFlor}
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              Declarar Flor
            </button>
          </>
        )}
      </div>
    </div>
  );
}