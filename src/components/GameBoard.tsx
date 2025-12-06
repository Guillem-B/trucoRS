import { useGameStore, Player } from '../store/gameStore';
import CardComponent from './Card';
import PlayerHand from './PlayerHand';
import PlayArea from './PlayArea';
import BettingControls from './BettingControls';
import FlorControls from './FlorControls';
import { Card } from '../data/cards';
import { useLanguage } from '../contexts/LanguageContext';
import { AppBar, Toolbar, Typography, Container, Paper, Box, Button, Chip, Alert } from '@mui/material';
import { PlayArrow, Refresh, SkipNext, EmojiEvents, Casino } from '@mui/icons-material';

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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 3, backgroundColor: '#F0FDF4' }}>
        <Box sx={{ p: 6, textAlign: 'center', maxWidth: 400 }}>
          <Casino sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />
          <Typography variant="h3" color="text.primary" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            {t('game.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
            Ready to play Truco?
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={() => startGame(2)}
            sx={{ borderRadius: 2, px: 6, py: 2, fontSize: '1.2rem', fontWeight: 600 }}
          >
            {t('game.start')}
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', p: 3, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ maxWidth: 1200 }}>
        {/* Header */}
        <AppBar position="static" sx={{ mb: 3, borderRadius: 2 }} elevation={0}>
          <Toolbar>
            <Casino sx={{ mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {t('game.title')}
              </Typography>
              <Typography variant="body2" color="inherit">
                {t('game.hand')} {currentHand} - {t('game.round')} {currentRound}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2">
                {t('game.score')}
              </Typography>
              <Typography variant="h4" sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 1.5, py: 0.5, borderRadius: 2, backdropFilter: 'blur(10px)' }}>
                {scores.team1} - {scores.team2}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>


        {/* Opponent Area */}
        <Box sx={{ mb: 4, p: 3, backgroundColor: '#F0FDF4', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t('game.opponent')}
            </Typography>
            {florResults.opponent1.hasFlor && (
              <Chip
                icon={<EmojiEvents />}
                label={t('game.has.flor')}
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
          <PlayerHand
            cards={hands.opponent1}
            disabled
            title={getPlayerName('opponent1')}
          />
          {playedCards.opponent1 && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t('game.card.played')}:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardComponent card={playedCards.opponent1} size="md" />
              </Box>
            </Box>
          )}
        </Box>

        {/* Play Area */}
        <Box sx={{ mb: 2 }}>
          <PlayArea
            playedCards={playedCards}
            roundWinner={roundWinner}
            playerNames={{
              player: getPlayerName('player'),
              opponent1: getPlayerName('opponent1'),
            }}
          />
          {gameStatus === 'playing' && (
            <Box sx={{ mt: 1, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('game.player.turn')}: <strong>{getPlayerName(currentPlayer)}</strong>
              </Typography>
            </Box>
          )}
        </Box>

        {/* Betting Controls */}
        {gameStatus === 'playing' && (
          <Box sx={{ mb: 2 }}>
            <BettingControls
              currentBet={currentBet}
              isPlayerTurn={currentPlayer === 'player'}
              hasPlayedCard={playedCards.player !== null}
              onBet={makeBet}
              onAccept={acceptBet}
              onDecline={declineBet}
              canRespond={!betAccepted && betChallenger !== 'player'}
            />
          </Box>
        )}

        {/* Flor Controls */}
        <FlorControls />

        {/* Player Hand */}
        <Box sx={{ mb: 4, p: 3, backgroundColor: '#F0FDF4', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t('game.player.hand')}
            </Typography>
            {florResults.player.hasFlor && (
              <Chip
                icon={<EmojiEvents />}
                label={t('game.flor.value').replace('{value}', florResults.player.value.toString())}
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
          <PlayerHand
            cards={hands.player}
            onCardClick={handleCardClick}
            disabled={gameStatus !== 'playing' || currentPlayer !== 'player'}
            title={getPlayerName('player')}
          />
        </Box>

        {/* Hand/Game End Messages */}
        {gameStatus === 'handEnd' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('game.hand.end')}
            </Typography>
            <Typography>
              {scores.team1 > scores.team2 ? t('game.hand.won') : t('game.hand.lost')}
            </Typography>
          </Alert>
        )}

        {gameStatus === 'gameEnd' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="h5" gutterBottom>
              {t('game.game.end')}
            </Typography>
            <Typography variant="h6">
              {scores.team1 >= 12 ? t('game.game.won') : t('game.game.lost')}
            </Typography>
          </Alert>
        )}

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
          {gameStatus === 'roundEnd' && (
            <Button
              variant="contained"
              startIcon={<SkipNext />}
              onClick={nextRound}
              sx={{ borderRadius: 3, px: 3 }}
            >
              {t('game.next.round')}
            </Button>
          )}
          {gameStatus === 'handEnd' && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={nextHand}
              sx={{ borderRadius: 3, px: 3 }}
            >
              {t('game.next.hand')}
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={resetGame}
            sx={{ borderRadius: 3, px: 3 }}
          >
            {t('game.reset')}
          </Button>
        </Box>
      </Container>
      </Box>
    );
  }

