import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-accent-300 rounded-lg hover:border-primary-400 transition-all duration-200 shadow-sm hover:shadow-md"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className="text-lg">
        {language === 'pt' ? '🇺🇸' : '🇧🇷'}
      </span>
      <span className="text-sm font-medium text-accent-700">
        {language === 'pt' ? t('lang.english') : t('lang.portuguese')}
      </span>
    </button>
  );
};

export default LanguageToggle;