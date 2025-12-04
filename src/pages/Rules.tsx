import { useState } from 'react';
import { Link } from 'react-router-dom';
import { rulesData, searchRules, RuleSection } from '../data/rules';
import RuleSectionComponent from '../components/RuleSection';

export default function Rules() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedRules, setDisplayedRules] = useState<RuleSection[]>(rulesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setDisplayedRules(rulesData);
    } else {
      setDisplayedRules(searchRules(query));
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <Link
            to="/"
            className="inline-block mb-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            ← Voltar para o início
          </Link>
          <h1 className="text-4xl font-bold text-primary-800 mb-2 drop-shadow-sm">
            📖 Regras do Truco Gaudério
          </h1>
          <p className="text-accent-700 text-lg">
            Referência completa das regras e mecânicas do jogo
          </p>
        </header>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar nas regras..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-accent-300 focus:border-primary-500 focus:outline-none bg-white shadow-sm focus:shadow-md transition-all"
            />
            <span className="absolute left-3 top-3 text-accent-500 text-lg">🔍</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayedRules.length > 0 ? (
            displayedRules.map((rule) => (
              <RuleSectionComponent key={rule.id} section={rule} />
            ))
          ) : (
            <div className="bg-gradient-to-br from-white to-accent-50 rounded-lg shadow-lg border border-accent-200 p-8 text-center">
              <p className="text-accent-700 text-lg">
                Nenhuma regra encontrada para "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

