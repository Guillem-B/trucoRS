import { Card } from '../data/cards';
import CardComponent from './Card';
import { Box, Typography, Paper } from '@mui/material';

interface PlayerHandProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  disabled?: boolean;
  title?: string;
}

export default function PlayerHand({ cards, onCardClick, disabled = false, title }: PlayerHandProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            size="md"
            onClick={() => onCardClick?.(card)}
            disabled={disabled}
            showBack={disabled}
          />
        ))}
      </Box>
      {cards.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Sem cartas
        </Typography>
      )}
    </Box>
  );
}

