import { RuleSection } from '../data/rules';
import Card from './Card';
import { useLanguage } from '../contexts/LanguageContext';

interface RuleSectionProps {
  section: RuleSection;
  level?: number;
}

export default function RuleSectionComponent({ section, level = 0 }: RuleSectionProps) {
  const { t } = useLanguage();
  const paddingClass = level === 0 ? 'p-6' : level === 1 ? 'p-5 ml-6' : 'p-4 ml-12';
  const titleSize = level === 0 ? 'text-2xl' : level === 1 ? 'text-xl' : 'text-lg';
  const bgClass = level === 0
    ? 'bg-gradient-to-br from-white to-accent-50 border-2 border-accent-200'
    : level === 1
    ? 'bg-gradient-to-r from-white to-secondary-50 border border-secondary-200'
    : 'bg-white border border-accent-100';

  const getIcon = (title: string) => {
    // Only show icons for main sections (level 0)
    if (level > 0) return null;

    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('hierarquia') || lowerTitle.includes('cartas')) return '🃏';
    if (lowerTitle.includes('envido') || lowerTitle.includes('flor')) return '💎';
    if (lowerTitle.includes('truco') || lowerTitle.includes('desafio')) return '⚔️';
    if (lowerTitle.includes('pontua')) return '🎯';
    if (lowerTitle.includes('vitória') || lowerTitle.includes('fim')) return '🏆';
    if (lowerTitle.includes('especial')) return '⭐';
    return '📋';
  };

  // Get translated content
  const getTranslatedContent = () => {
    const titleKey = `rules.${section.id}.title`;
    const contentKey = `rules.${section.id}.content`;

    const translatedTitle = t(titleKey);
    const translatedContent = t(contentKey);

    return {
      title: translatedTitle !== titleKey ? translatedTitle : section.title,
      content: translatedContent !== contentKey ? translatedContent : section.content
    };
  };

  const { title, content } = getTranslatedContent();

  return (
    <div className={`${paddingClass} ${bgClass} rounded-lg shadow-lg mb-4 transition-all hover:shadow-xl`}>
      <h3 className={`${titleSize} font-bold text-primary-800 mb-4 flex items-center gap-2`}>
        {getIcon(title) && <span className="text-2xl">{getIcon(title)}</span>}
        {title}
      </h3>
      <div className="text-accent-800 leading-relaxed text-base space-y-3">
        {content.split('\n').map((paragraph, idx) => {
          if (!paragraph.trim()) return <br key={idx} />;

          // Check if this is a numbered list item
          const numberMatch = paragraph.match(/^(\d+)\.\s*(.+)$/);
          if (numberMatch) {
            return (
              <div key={idx} className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold border border-primary-200">
                  {numberMatch[1]}
                </span>
                <span className="flex-1">{numberMatch[2]}</span>
              </div>
            );
          }

          // Check if this is a bullet point
          const bulletMatch = paragraph.match(/^•\s*(.+)$/);
          if (bulletMatch) {
            return (
              <div key={idx} className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                <span className="flex-1">{bulletMatch[1]}</span>
              </div>
            );
          }

          // Check for important terms to highlight
          const highlightedText = paragraph
            .replace(/(Truco|Retruco|Vale Quatro|Flor|Envido)/g, '<strong class="text-primary-700 font-semibold">$1</strong>')
            .replace(/(manilhas?|vira)/g, '<em class="text-secondary-700 italic">$1</em>');

          return (
            <p key={idx} className="mb-3" dangerouslySetInnerHTML={{ __html: highlightedText }} />
          );
        })}
      </div>
      
      {section.examples && section.examples.length > 0 && (
        <div className="mb-6 mt-4">
          <h4 className="text-lg font-semibold text-secondary-700 mb-3 flex items-center gap-2">
            <span className="text-xl">🎴</span>
            Exemplos:
          </h4>
          <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
            <div className="flex flex-wrap gap-3">
              {section.examples.map((example, idx) => (
                <div key={idx} className="flex gap-2 bg-white p-2 rounded-md shadow-sm border border-secondary-100">
                  {example.map((card) => (
                    <Card key={card.id} card={card} size="sm" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-6 space-y-3">
          {section.subsections.map((subsection) => {
            const subTitleKey = `rules.${subsection.id}.title`;
            const subContentKey = `rules.${subsection.id}.content`;

            const translatedSubTitle = t(subTitleKey);
            const translatedSubContent = t(subContentKey);

            const translatedSubsection = {
              ...subsection,
              title: translatedSubTitle !== subTitleKey ? translatedSubTitle : subsection.title,
              content: translatedSubContent !== subContentKey ? translatedSubContent : subsection.content
            };

            return (
              <RuleSectionComponent
                key={subsection.id}
                section={translatedSubsection}
                level={level + 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

