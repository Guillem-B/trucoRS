import { Card } from '../data/cards';
import CardComponent from './Card';

interface PlayerHandProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  disabled?: boolean;
  title?: string;
}

export default function PlayerHand({ cards, onCardClick, disabled = false, title }: PlayerHandProps) {
  return (
    <div className="flex flex-col items-center">
      {title && (
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      )}
      <div className="flex gap-2 flex-wrap justify-center">
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
      </div>
      {cards.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">Sem cartas</p>
      )}
    </div>
  );
}

