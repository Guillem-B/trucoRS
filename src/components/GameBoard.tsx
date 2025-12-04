import { useGameStore, Player } from '../store/gameStore';
import CardComponent from './Card';
import PlayerHand from './PlayerHand';
import PlayArea from './PlayArea';
import BettingControls from './BettingControls';
import FlorControls from './FlorControls';
import { Card } from '../data/cards';
import { useLanguage } from '../contexts/LanguageContext';

export default function GameBoard() {
  const { t } = useLanguage();
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
      player: t('game.player.name'),
      opponent1: t('game.opponent1.name'),
      opponent2: t('game.opponent2.name'),
      opponent3: t('game.opponent3.name'),
    };
    return names[player];
  };

  if (gameStatus === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold text-primary-700 mb-6">{t('game.title')}</h1>
        <button
          onClick={() => startGame(2)}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          {t('game.start')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-accent-50 via-secondary-50 to-primary-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent-100 to-secondary-100 rounded-lg shadow-lg border-2 border-accent-200 p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary-800">{t('game.title')}</h1>
              <p className="text-accent-700">
                {t('game.hand')} {currentHand} - {t('game.round')} {currentRound}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-accent-700 font-medium">{t('game.score')}</div>
              <div className="text-2xl font-bold text-primary-700 bg-white bg-opacity-50 px-3 py-1 rounded">
                {scores.team1} - {scores.team2}
              </div>
            </div>
          </div>
        </div>


        {/* Opponent Area */}
        <div className="bg-gradient-to-r from-white to-accent-50 rounded-lg shadow-lg border border-accent-200 p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-primary-800">{t('game.opponent')}</h2>
            {florResults.opponent1.hasFlor && (
              <div className="text-sm text-secondary-700 font-medium bg-secondary-100 px-2 py-1 rounded">
                🌸 {t('game.has.flor')}
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
              <p className="text-sm text-gray-600 mb-2">{t('game.card.played')}:</p>
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
              {t('game.player.turn')}: <strong>{getPlayerName(currentPlayer)}</strong>
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
        <div className="bg-gradient-to-r from-white to-primary-50 rounded-lg shadow-lg border border-primary-200 p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-primary-800">{t('game.player.hand')}</h2>
            {florResults.player.hasFlor && (
              <div className="text-sm text-secondary-700 font-medium bg-secondary-100 px-2 py-1 rounded">
                🌸 {t('game.flor.value').replace('{value}', florResults.player.value.toString())}
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
            <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('game.hand.end')}</h3>
            <p className="text-blue-700">
              {scores.team1 > scores.team2 ? t('game.hand.won') : t('game.hand.lost')}
            </p>
          </div>
        )}

        {gameStatus === 'gameEnd' && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
            <h3 className="text-2xl font-bold text-green-800 mb-2">{t('game.game.end')}</h3>
            <p className="text-green-700 text-lg">
              {scores.team1 >= 12 ? t('game.game.won') : t('game.game.lost')}
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
              {t('game.next.round')}
            </button>
          )}
          {gameStatus === 'handEnd' && (
            <button
              onClick={nextHand}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              {t('game.next.hand')}
            </button>
          )}
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            {t('game.reset')}
          </button>
        </div>
      </div>
    </div>
  );
}

