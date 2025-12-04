import { useState } from 'react';
import { Link } from 'react-router-dom';
import { rulesData, searchRules, RuleSection } from '../data/rules';
import RuleSectionComponent from '../components/RuleSection';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

export default function Rules() {
  const { t } = useLanguage();
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
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        <header className="mb-6">
          <Link
            to="/"
            className="inline-block mb-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            ← {t('nav.back')}
          </Link>
          <h1 className="text-4xl font-bold text-primary-800 mb-2 drop-shadow-sm">
            📖 {t('rules.title')}
          </h1>
          <p className="text-accent-700 text-lg">
            {t('rules.subtitle')}
          </p>
        </header>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('rules.search.placeholder')}
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
                {t('rules.no.results')} "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

