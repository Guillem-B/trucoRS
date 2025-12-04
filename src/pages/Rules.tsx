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
            className="inline-block mb-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Voltar para o início
          </Link>
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Regras do Truco Gaudério
          </h1>
          <p className="text-gray-600">
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
              className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayedRules.length > 0 ? (
            displayedRules.map((rule) => (
              <RuleSectionComponent key={rule.id} section={rule} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">
                Nenhuma regra encontrada para "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

