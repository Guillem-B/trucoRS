import { Card as CardType } from '../data/cards';
import { getCardDisplayName, getCardImagePath, cardImageExists } from '../data/cards';
import { useState, useEffect } from 'react';

interface CardProps {
  card: CardType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  showBack?: boolean;
  enableZoom?: boolean;
}

export default function Card({ card, size = 'md', onClick, selected = false, disabled = false, showBack = false, enableZoom = false }: CardProps) {
  const [imageExists, setImageExists] = useState<boolean | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    cardImageExists(card).then(setImageExists);
  }, [card]);

  const sizeClasses = {
    sm: 'w-12 h-16',
    md: 'w-16 h-24',
    lg: 'w-20 h-32',
    xl: 'w-32 h-48',
  };


  const SpanishCardFace = ({ card, size }: { card: CardType; size: 'sm' | 'md' | 'lg' | 'xl' }) => {
    const cardWidth = size === 'sm' ? 64 : size === 'md' ? 96 : size === 'lg' ? 128 : 192;
    const cardHeight = size === 'sm' ? 96 : size === 'md' ? 144 : size === 'lg' ? 192 : 288;

    // Suit colors
    const suitColors = {
      'ouros': '#FFD700',    // Gold
      'espadas': '#2D3748',  // Dark gray
      'copas': '#E53E3E',    // Red
      'paus': '#38A169',     // Green
    };

    const suitColor = suitColors[card.suit];

    // Generate suit symbols based on rank
    const getSuitSymbols = (rank: string, suit: CardType['suit']) => {
      const symbolSize = size === 'sm' ? 8 : size === 'md' ? 12 : 16;
      const centerX = cardWidth / 2;
      const centerY = cardHeight / 2;

      const suitSymbol = {
        'ouros': (
          <g>
            <circle cx="0" cy="0" r={symbolSize/2} fill={suitColor} />
            <circle cx="0" cy="0" r={symbolSize/3} fill="white" />
            <text x="0" y="2" textAnchor="middle" fontSize={symbolSize/2} fill={suitColor} fontWeight="bold">O</text>
          </g>
        ),
        'espadas': (
          <g>
            <path d={`M0,${-symbolSize/2} L${symbolSize/4},${symbolSize/4} L${symbolSize/2},0 L${symbolSize/4},${symbolSize/2} L0,${symbolSize/2} L${-symbolSize/4},${symbolSize/2} L${-symbolSize/2},0 L${-symbolSize/4},${symbolSize/4} Z`}
                  fill={suitColor} />
          </g>
        ),
        'copas': (
          <g>
            <path d={`M0,${-symbolSize/2} Q${symbolSize/3},${-symbolSize/2} ${symbolSize/2},0 Q${symbolSize/3},${symbolSize/4} 0,${symbolSize/2} Q${-symbolSize/3},${symbolSize/4} ${-symbolSize/2},0 Q${-symbolSize/3},${-symbolSize/2} 0,${-symbolSize/2} Z`}
                  fill={suitColor} />
            <ellipse cx="0" cy={symbolSize/2 + 2} rx={symbolSize/3} ry={symbolSize/4} fill={suitColor} />
          </g>
        ),
        'paus': (
          <g>
            <rect x={-symbolSize/8} y={-symbolSize/2} width={symbolSize/4} height={symbolSize} fill={suitColor} />
            <circle cx={-symbolSize/3} cy={-symbolSize/4} r={symbolSize/6} fill={suitColor} />
            <circle cx={symbolSize/3} cy={-symbolSize/4} r={symbolSize/6} fill={suitColor} />
            <circle cx="0" cy={symbolSize/4} r={symbolSize/6} fill={suitColor} />
          </g>
        ),
      };

      // Position symbols based on rank
      const positions = [];
      switch (rank) {
        case '1': // Ace - single large symbol in center
          positions.push({ x: centerX, y: centerY, scale: 2 });
          break;
        case '2':
          positions.push({ x: centerX, y: centerY - symbolSize * 2, scale: 1 });
          positions.push({ x: centerX, y: centerY + symbolSize * 2, scale: 1 });
          break;
        case '3':
          positions.push({ x: centerX, y: centerY - symbolSize * 2.5, scale: 1 });
          positions.push({ x: centerX, y: centerY, scale: 1 });
          positions.push({ x: centerX, y: centerY + symbolSize * 2.5, scale: 1 });
          break;
        case '4':
          positions.push({ x: symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          break;
        case '5':
          positions.push({ x: symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: centerX, y: centerY, scale: 1 });
          positions.push({ x: symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          break;
        case '6':
          positions.push({ x: symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: symbolSize * 2, y: centerY, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: centerY, scale: 1 });
          positions.push({ x: symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          break;
        case '7':
          positions.push({ x: symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: symbolSize * 2, scale: 1 });
          positions.push({ x: centerX, y: centerY - symbolSize, scale: 1 });
          positions.push({ x: symbolSize * 2, y: centerY, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: centerY, scale: 1 });
          positions.push({ x: symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          positions.push({ x: cardWidth - symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 1 });
          break;
        case '10':
          // 10 has a specific pattern: 4 corners + 3 center + 3 middle
          positions.push({ x: symbolSize * 2, y: symbolSize * 2, scale: 0.8 });
          positions.push({ x: cardWidth - symbolSize * 2, y: symbolSize * 2, scale: 0.8 });
          positions.push({ x: symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 0.8 });
          positions.push({ x: cardWidth - symbolSize * 2, y: cardHeight - symbolSize * 2, scale: 0.8 });
          positions.push({ x: centerX, y: centerY - symbolSize * 1.5, scale: 0.8 });
          positions.push({ x: centerX, y: centerY, scale: 0.8 });
          positions.push({ x: centerX, y: centerY + symbolSize * 1.5, scale: 0.8 });
          positions.push({ x: symbolSize * 2, y: centerY, scale: 0.8 });
          positions.push({ x: cardWidth - symbolSize * 2, y: centerY, scale: 0.8 });
          positions.push({ x: centerX, y: symbolSize * 2, scale: 0.8 });
          break;
        case 'J': // Jack - court figure
        case 'Q': // Queen - court figure
        case 'K': // King - court figure
          // For face cards, show a simple figure representation
          positions.push({ x: centerX, y: centerY, scale: 1.5 });
          break;
      }

      return positions.map((pos, index) => (
        <g key={index} transform={`translate(${pos.x}, ${pos.y}) scale(${pos.scale})`}>
          {suitSymbol[suit]}
        </g>
      ));
    };

    return (
      <svg width={cardWidth} height={cardHeight} viewBox={`0 0 ${cardWidth} ${cardHeight}`}>
        {/* Card background */}
        <rect width={cardWidth} height={cardHeight} fill="white" stroke="#ccc" strokeWidth="2" rx="8" />

        {/* Corner indices */}
        <text x="8" y="16" fontSize={size === 'sm' ? '10' : size === 'md' ? '14' : '18'} fill={suitColor} fontWeight="bold">
          {card.rank}
        </text>
        <text x={cardWidth - 8} y={cardHeight - 8} fontSize={size === 'sm' ? '10' : size === 'md' ? '14' : '18'} fill={suitColor} fontWeight="bold" textAnchor="end">
          {card.rank}
        </text>

        {/* Suit symbols */}
        {getSuitSymbols(card.rank, card.suit)}

        {/* Manilha indicator */}
        {card.isManilha && (
          <text x={cardWidth / 2} y={cardHeight - 12} textAnchor="middle" fontSize={size === 'sm' ? '8' : size === 'md' ? '10' : '12'} fill="#E53E3E" fontWeight="bold">
            MANILHA
          </text>
        )}
      </svg>
    );
  };

  return (
    <div className="relative inline-block">
      <div
        className={`
          ${sizeClasses[size]}
          ${selected ? 'ring-4 ring-blue-500 ring-offset-2' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${onClick && !disabled ? 'hover:scale-105 hover:shadow-lg' : ''}
          rounded-lg border-2 border-gray-300
          flex items-center justify-center
          transition-all duration-200
          shadow-md
          overflow-hidden
          relative
        `}
        onClick={disabled ? undefined : onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={getCardDisplayName(card)}
      >
        {showBack ? (
          <img
            src="/images/cards/back.png"
            alt="Card back"
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        ) : imageExists ? (
          <img
            src={getCardImagePath(card)}
            alt={getCardDisplayName(card)}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        ) : (
          <SpanishCardFace card={card} size={size} />
        )}

        {/* Manilha overlay */}
        {card.isManilha && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-xs font-bold text-center py-1 rounded-b-lg">
            MANILHA
          </div>
        )}
      </div>

      {/* Zoom overlay */}
      {isHovered && !disabled && enableZoom && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none bg-black bg-opacity-50">
          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="relative">
              {showBack ? (
                <img
                  src="/images/cards/back.png"
                  alt="Card back"
                  className="block w-80 h-120"
                  style={{ objectFit: 'contain' }}
                  loading="lazy"
                />
              ) : imageExists ? (
                <img
                  src={getCardImagePath(card)}
                  alt={getCardDisplayName(card)}
                  className="block w-80 h-120"
                  style={{ objectFit: 'contain' }}
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center p-4">
                  <SpanishCardFace card={card} size="xl" />
                </div>
              )}

              {/* Manilha overlay for zoomed card */}
              {card.isManilha && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-sm font-bold text-center py-2 rounded-b-lg">
                  MANILHA
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

