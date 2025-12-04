import { Link } from 'react-router-dom';
import { allCards } from '../data/cards';
import Card from '../components/Card';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-2 drop-shadow-sm">
            TrucoRS
          </h1>
          <p className="text-lg text-accent-700">
            {t('home.subtitle')}
          </p>
        </header>

        <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <Link
            to="/rules"
            className="bg-gradient-to-br from-white to-accent-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-accent-200 hover:border-primary-400 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-primary-800 mb-2">📖 {t('nav.rules')}</h2>
            <p className="text-accent-700">{t('rules.title')}</p>
          </Link>

          <Link
            to="/tutorial"
            className="bg-gradient-to-br from-white to-accent-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-accent-200 hover:border-primary-400 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-primary-800 mb-2">🎓 {t('nav.tutorial')}</h2>
            <p className="text-accent-700">{t('nav.tutorial')}</p>
          </Link>

          <Link
            to="/practice"
            className="bg-gradient-to-br from-white to-accent-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-accent-200 hover:border-primary-400 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-primary-800 mb-2">🎮 {t('nav.practice')}</h2>
            <p className="text-accent-700">{t('nav.practice')}</p>
          </Link>

          <Link
            to="/strategy"
            className="bg-gradient-to-br from-white to-accent-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-accent-200 hover:border-primary-400 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-primary-800 mb-2">🎯 {t('nav.strategy')}</h2>
            <p className="text-accent-700">{t('nav.strategy')}</p>
          </Link>

          <Link
            to="/statistics"
            className="bg-gradient-to-br from-white to-accent-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-accent-200 hover:border-primary-400 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-primary-800 mb-2">📊 {t('nav.statistics')}</h2>
            <p className="text-accent-700">{t('nav.statistics')}</p>
          </Link>
        </nav>

        <section className="bg-gradient-to-br from-white to-secondary-50 rounded-lg shadow-lg border border-accent-200 p-6 mb-8">
           <h2 className="text-2xl font-semibold text-primary-800 mb-4">
             {t('home.deck.title')}
           </h2>
           <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
             {allCards
               .sort((a, b) => {
                 // Custom display order: group by suit first, then A to K within each suit
                 const displayOrder = ['A', '2', '3', '4', '5', '6', '7', '10', 'J', 'Q', 'K'];
                 const suitOrder = ['ouros', 'copas', 'espadas', 'paus'];

                 const aSuitIndex = suitOrder.indexOf(a.suit);
                 const bSuitIndex = suitOrder.indexOf(b.suit);

                 if (aSuitIndex !== bSuitIndex) {
                   return aSuitIndex - bSuitIndex;
                 }

                 // If same suit, sort by rank (A to K)
                 return displayOrder.indexOf(a.rank) - displayOrder.indexOf(b.rank);
               })
               .map((card) => (
                 <Card key={card.id} card={card} size="sm" enableZoom={true} />
               ))}
           </div>
         </section>
      </div>
    </div>
  );
}

