import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { AIDifficulty } from '../utils/aiLogic';

export default function Practice() {
  const navigate = useNavigate();
  const { setAIDifficulty, startGame } = useGameStore();
  const [selectedDifficulty, setSelectedDifficulty] = useState<AIDifficulty>('beginner');

  const handleStartPractice = () => {
    setAIDifficulty(selectedDifficulty);
    startGame(2);
    navigate('/game');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <Link
            to="/"
            className="inline-block mb-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Voltar para o início
          </Link>
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Modo Prática
          </h1>
          <p className="text-gray-600">
            Escolha a dificuldade da IA e pratique suas habilidades
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Selecione a Dificuldade
          </h2>
          
          <div className="space-y-3">
            {(['beginner', 'intermediate', 'advanced'] as AIDifficulty[]).map((difficulty) => {
              const difficultyNames: Record<AIDifficulty, string> = {
                beginner: 'Iniciante',
                intermediate: 'Intermediário',
                advanced: 'Avançado',
              };
              
              const difficultyDescriptions: Record<AIDifficulty, string> = {
                beginner: 'IA joga de forma mais simples, ideal para aprender',
                intermediate: 'IA usa estratégias moderadas',
                advanced: 'IA joga de forma mais estratégica e desafiante',
              };
              
              return (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all
                    ${selectedDifficulty === difficulty
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {difficultyNames[difficulty]}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {difficultyDescriptions[difficulty]}
                      </p>
                    </div>
                    {selectedDifficulty === difficulty && (
                      <span className="text-primary-600 text-xl">✓</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Dicas</h3>
          <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
            <li>Comece com dificuldade Iniciante para aprender as regras</li>
            <li>Use o modo Prática para testar diferentes estratégias</li>
            <li>Observe como a IA joga para melhorar suas próprias táticas</li>
            <li>Preste atenção quando você ou o oponente tiver Flor (🌸) - é uma oportunidade estratégica!</li>
          </ul>
        </div>

        <button
          onClick={handleStartPractice}
          className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
        >
          Iniciar Prática
        </button>
      </div>
    </div>
  );
}

