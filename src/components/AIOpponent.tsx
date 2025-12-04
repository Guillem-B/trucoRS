
interface AIOpponentProps {
  name: string;
  cardsRemaining: number;
}

export default function AIOpponent({ name, cardsRemaining }: AIOpponentProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
          <p className="text-sm text-gray-500">IA</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Cartas</p>
          <p className="text-xl font-bold text-primary-700">{cardsRemaining}</p>
        </div>
      </div>
    </div>
  );
}

