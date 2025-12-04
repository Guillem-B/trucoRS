import { Card } from '../data/cards';
import CardComponent from './Card';

interface StrategyExampleProps {
  title: string;
  description: string;
  cards?: Card[];
  scenario: string;
  solution: string;
}

export default function StrategyExample({
  title,
  description,
  cards,
  scenario,
  solution,
}: StrategyExampleProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      
      {cards && cards.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Cartas na mão:</p>
          <div className="flex gap-2">
            {cards.map((card) => (
              <CardComponent key={card.id} card={card} size="sm" />
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
        <h4 className="font-semibold text-blue-800 mb-2">Cenário:</h4>
        <p className="text-blue-700 text-sm">{scenario}</p>
      </div>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h4 className="font-semibold text-green-800 mb-2">Solução:</h4>
        <p className="text-green-700 text-sm">{solution}</p>
      </div>
    </div>
  );
}

