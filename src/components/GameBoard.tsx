import { useGameStore, Player } from '../store/gameStore';
import CardComponent from './Card';
import PlayerHand from './PlayerHand';
import PlayArea from './PlayArea';
import BettingControls from './BettingControls';
import FlorControls from './FlorControls';
import { Card } from '../data/cards';

export default function GameBoard() {
  const {
    hands,
    currentPlayer,
    playedCards,
    roundWinner,
    currentRound,
    currentHand,
    gameStatus,
    scores,
    currentBet,
    betChallenger,
    betAccepted,
    florResults,
    playCard,
    makeBet,
    acceptBet,
    declineBet,
    nextRound,
    nextHand,
    startGame,
    resetGame,
  } = useGameStore();

  const handleCardClick = (card: Card) => {
    if (gameStatus === 'playing' && currentPlayer === 'player') {
      playCard('player', card);
    }
  };

  const getPlayerName = (player: Player): string => {
    const names: Record<Player, string> = {
      player: 'Você',
      opponent1: 'Oponente 1',
      opponent2: 'Oponente 2',
      opponent3: 'Oponente 3',
    };
    return names[player];
  };

  if (gameStatus === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold text-primary-700 mb-6">Truco Gaudério</h1>
        <button
          onClick={() => startGame(2)}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Iniciar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary-700">Truco Gaudério</h1>
              <p className="text-gray-600">
                Mão {currentHand} - Rodada {currentRound}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Placar</div>
              <div className="text-xl font-bold">
                {scores.team1} - {scores.team2}
              </div>
            </div>
          </div>
        </div>


        {/* Opponent Area */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Oponente</h2>
            {florResults.opponent1.hasFlor && (
              <div className="text-sm text-yellow-600 font-medium">
                🌸 Tem Flor
              </div>
            )}
          </div>
          <PlayerHand
            cards={hands.opponent1}
            disabled
            title={getPlayerName('opponent1')}
          />
          {playedCards.opponent1 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Carta jogada:</p>
              <div className="flex justify-center">
                <CardComponent card={playedCards.opponent1} size="md" />
              </div>
            </div>
          )}
        </div>

        {/* Play Area */}
        <div className="mb-4">
          <PlayArea
            playedCards={playedCards}
            roundWinner={roundWinner}
            playerNames={{
              player: getPlayerName('player'),
              opponent1: getPlayerName('opponent1'),
            }}
          />
          {gameStatus === 'playing' && (
            <div className="mt-2 text-center text-gray-600">
              É a vez de: <strong>{getPlayerName(currentPlayer)}</strong>
            </div>
          )}
        </div>

        {/* Betting Controls */}
        {gameStatus === 'playing' && (
          <div className="mb-4">
            <BettingControls
              currentBet={currentBet}
              isPlayerTurn={currentPlayer === 'player'}
              hasPlayedCard={playedCards.player !== null}
              onBet={makeBet}
              onAccept={acceptBet}
              onDecline={declineBet}
              canRespond={!betAccepted && betChallenger !== 'player'}
            />
          </div>
        )}

        {/* Flor Controls */}
        <FlorControls />

        {/* Player Hand */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Sua Mão</h2>
            {florResults.player.hasFlor && (
              <div className="text-sm text-yellow-600 font-medium">
                🌸 Flor: {florResults.player.value} pontos
              </div>
            )}
          </div>
          <PlayerHand
            cards={hands.player}
            onCardClick={handleCardClick}
            disabled={gameStatus !== 'playing' || currentPlayer !== 'player'}
            title={getPlayerName('player')}
          />
        </div>

        {/* Hand/Game End Messages */}
        {gameStatus === 'handEnd' && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Mão Finalizada!</h3>
            <p className="text-blue-700">
              {scores.team1 > scores.team2 ? 'Você venceu a mão!' : 'O oponente venceu a mão!'}
            </p>
          </div>
        )}
        
        {gameStatus === 'gameEnd' && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
            <h3 className="text-2xl font-bold text-green-800 mb-2">Fim de Jogo!</h3>
            <p className="text-green-700 text-lg">
              {scores.team1 >= 12 ? '🎉 Você venceu a partida! 🎉' : 'O oponente venceu a partida.'}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          {gameStatus === 'roundEnd' && (
            <button
              onClick={nextRound}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Próxima Rodada
            </button>
          )}
          {gameStatus === 'handEnd' && (
            <button
              onClick={nextHand}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Próxima Mão
            </button>
          )}
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Reiniciar Jogo
          </button>
        </div>
      </div>
    </div>
  );
}

