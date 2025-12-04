import { Card } from '../data/cards';
import { getCardValue } from '../utils/cardComparison';

interface HintSystemProps {
  hand: Card[];
  vira: Card | null;
  playedCards: Record<string, Card | null>;
  onDismiss: () => void;
}

export default function HintSystem({ hand, vira, playedCards, onDismiss }: HintSystemProps) {
  if (hand.length === 0) return null;

  // Simple hint: suggest playing the lowest card if opponent hasn't played yet
  // or suggest playing a card that beats the opponent's card
  const opponentCard = Object.values(playedCards).find(card => card !== null);
  
  let hint = '';
  let suggestedCard: Card | null = null;

  if (!opponentCard) {
    // Opponent hasn't played - suggest lowest card
    const sorted = [...hand].sort((a, b) => 
      getCardValue(a, vira) - getCardValue(b, vira)
    );
    suggestedCard = sorted[0];
    hint = 'Dica: Considere jogar sua carta mais baixa primeiro para economizar cartas fortes.';
  } else {
    // Opponent has played - find a card that beats it
    const opponentValue = getCardValue(opponentCard, vira);
    const beatingCards = hand.filter(card => 
      getCardValue(card, vira) > opponentValue
    );
    
    if (beatingCards.length > 0) {
      // Find the lowest card that still beats opponent
      const sorted = beatingCards.sort((a, b) => 
        getCardValue(a, vira) - getCardValue(b, vira)
      );
      suggestedCard = sorted[0];
      hint = 'Dica: Você tem uma carta que vence a do oponente. Considere jogá-la.';
    } else {
      // No card beats opponent - suggest lowest
      const sorted = [...hand].sort((a, b) => 
        getCardValue(a, vira) - getCardValue(b, vira)
      );
      suggestedCard = sorted[0];
      hint = 'Dica: Você não tem uma carta que vence. Jogue sua carta mais baixa.';
    }
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-1">💡 Dica</h3>
          <p className="text-yellow-700 text-sm">{hint}</p>
          {suggestedCard && (
            <p className="text-yellow-600 text-xs mt-2">
              Carta sugerida: {suggestedCard.rank} de {suggestedCard.suit}
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="ml-4 text-yellow-600 hover:text-yellow-800"
          aria-label="Fechar dica"
        >
          ×
        </button>
      </div>
    </div>
  );
}

