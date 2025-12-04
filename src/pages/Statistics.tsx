import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useStatsStore } from '../store/statsStore';
import ReplayViewer from '../components/ReplayViewer';
import { GameRecord } from '../store/statsStore';

export default function Statistics() {
  const { stats, clearStats } = useStatsStore();
  const [selectedReplay, setSelectedReplay] = useState<GameRecord | null>(null);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <Link
            to="/"
            className="inline-block mb-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Voltar para o início
          </Link>
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Estatísticas
          </h1>
          <p className="text-gray-600">
            Acompanhe seu desempenho e revise seus jogos
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Total de Jogos</p>
            <p className="text-3xl font-bold text-primary-700">{stats.totalGames}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Vitórias</p>
            <p className="text-3xl font-bold text-green-600">{stats.wins}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Derrotas</p>
            <p className="text-3xl font-bold text-red-600">{stats.losses}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Taxa de Vitória</p>
            <p className="text-3xl font-bold text-primary-700">
              {stats.winRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Game History */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Histórico de Jogos</h2>
            {stats.games.length > 0 && (
              <button
                onClick={clearStats}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Limpar Estatísticas
              </button>
            )}
          </div>

          {stats.games.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Nenhum jogo registrado ainda. Jogue algumas partidas para ver suas estatísticas aqui!
            </p>
          ) : (
            <div className="space-y-2">
              {stats.games.map((game) => (
                <div
                  key={game.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer"
                  onClick={() => setSelectedReplay(game)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {new Date(game.date).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-600">
                        Placar: {game.score.team1} - {game.score.team2}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          game.result === 'win'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {game.result === 'win' ? 'Vitória' : 'Derrota'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {game.moves.length} jogadas
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedReplay && (
        <ReplayViewer
          record={selectedReplay}
          onClose={() => setSelectedReplay(null)}
        />
      )}
    </div>
  );
}

