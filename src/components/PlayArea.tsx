import { Card } from '../data/cards';
import CardComponent from './Card';
import { useLanguage } from '../contexts/LanguageContext';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { SportsSoccer } from '@mui/icons-material';

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
      <Box sx={{ p: 4, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed', borderColor: 'grey.300', borderRadius: 2, backgroundColor: 'grey.50' }}>
        <Box sx={{ textAlign: 'center' }}>
          <SportsSoccer sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
          <Typography color="text.secondary" variant="h6">{t('game.waiting.cards')}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, minHeight: 200, backgroundColor: '#F0FDF4', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
        {t('game.played.cards')}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
        {entries.map(([player, card]) => {
          const playerName = playerNames?.[player] || player;
          const isWinner = roundWinner === player;

          return (
            <Box
              key={player}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 1,
                bgcolor: isWinner ? 'success.light' : 'grey.50',
                ...(isWinner && { border: 2, borderColor: 'success.main' })
              }}
            >
              <Chip
                label={playerName}
                color={isWinner ? 'success' : 'default'}
                size="small"
                sx={{ mb: 1 }}
              />
              {card && <CardComponent card={card} size="md" />}
            </Box>
          );
        })}
      </Box>
      {roundWinner && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Chip
            icon={<SportsSoccer />}
            label={`${t('game.round.winner')}: ${playerNames?.[roundWinner] || roundWinner}`}
            color="success"
            size="medium"
            sx={{ fontWeight: 'bold', fontSize: '1rem' }}
          />
        </Box>
      )}
    </Box>
  );
}

