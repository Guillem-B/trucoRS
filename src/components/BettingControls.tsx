import { BetLevel, betNames, betValues, getNextBet, canBet } from '../utils/bettingLogic';
import { Paper, Typography, Box, Button } from '@mui/material';
import { TrendingUp, Check, Close } from '@mui/icons-material';

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
    <Box sx={{ p: 3, backgroundColor: '#F0FDF4', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
            Aposta Atual
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
            {betNames[currentBet]} ({betValues[currentBet]} pontos)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {canMakeBet && nextBet && (
            <Button
              variant="contained"
              startIcon={<TrendingUp />}
              onClick={() => onBet(nextBet)}
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              {betNames[nextBet]}
            </Button>
          )}

          {canRespond && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<Check />}
                onClick={onAccept}
                sx={{ borderRadius: 2, px: 4, py: 1.5 }}
              >
                Aceitar
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Close />}
                onClick={onDecline}
                sx={{ borderRadius: 2, px: 4, py: 1.5 }}
              >
                Recusar
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

