import { Link } from 'react-router-dom';
import GameBoard from '../components/GameBoard';

export default function Game() {
  return (
    <div>
      <div className="p-4">
        <Link
          to="/"
          className="inline-block mb-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Voltar para o início
        </Link>
      </div>
      <GameBoard />
    </div>
  );
}

