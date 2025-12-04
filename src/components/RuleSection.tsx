import { RuleSection } from '../data/rules';
import Card from './Card';

interface RuleSectionProps {
  section: RuleSection;
  level?: number;
}

export default function RuleSectionComponent({ section, level = 0 }: RuleSectionProps) {
  const paddingClass = level === 0 ? 'p-6' : level === 1 ? 'p-4 ml-4' : 'p-3 ml-8';
  const titleSize = level === 0 ? 'text-2xl' : level === 1 ? 'text-xl' : 'text-lg';
  
  return (
    <div className={`${paddingClass} bg-white rounded-lg shadow-md mb-4`}>
      <h3 className={`${titleSize} font-semibold text-gray-800 mb-3`}>
        {section.title}
      </h3>
      <p className="text-gray-700 mb-4 leading-relaxed">
        {section.content}
      </p>
      
      {section.examples && section.examples.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-medium text-gray-700 mb-2">Exemplos:</h4>
          <div className="flex flex-wrap gap-2">
            {section.examples.map((example, idx) => (
              <div key={idx} className="flex gap-1">
                {example.map((card) => (
                  <Card key={card.id} card={card} size="sm" />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-4 space-y-2">
          {section.subsections.map((subsection) => (
            <RuleSectionComponent
              key={subsection.id}
              section={subsection}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

