import { Link } from 'react-router-dom';
import { strategiesData, StrategySection } from '../data/strategies';
import RuleSectionComponent from '../components/RuleSection';
import StrategyExample from '../components/StrategyExample';
import StrategyQuiz from '../components/StrategyQuiz';

export default function Strategy() {
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
            Guia de Estratégias
          </h1>
          <p className="text-gray-600">
            Aprenda técnicas avançadas para dominar o Truco Gaudério
          </p>
        </header>

        <div className="space-y-6">
          {strategiesData.map((strategy) => (
            <RuleSectionComponent key={strategy.id} section={strategy} />
          ))}
        </div>

        {/* Example Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Exemplos Práticos
          </h2>
          
          <StrategyExample
            title="Quando Desafiar com Truco"
            description="Um exemplo de quando é apropriado desafiar o oponente"
            scenario="Você tem uma mão com uma manilha e duas cartas médias. O oponente ainda não jogou nenhuma carta. É a primeira rodada."
            solution="Este é um bom momento para desafiar com Truco. Você tem uma mão forte o suficiente para ter confiança, mas não tão forte que precise esperar. O oponente pode recusar se tiver uma mão fraca, dando-lhe pontos sem risco."
          />
        </section>

        {/* Quiz Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Teste seu Conhecimento
          </h2>
          
          <StrategyQuiz
            question="Qual é a melhor estratégia quando você tem uma mão muito forte (ex: duas manilhas)?"
            options={[
              'Desafiar imediatamente com Vale Quatro',
              'Jogar normalmente e desafiar apenas se necessário',
              'Sempre recusar desafios do oponente',
              'Jogar todas as cartas altas na primeira rodada',
            ]}
            correctAnswer={1}
            explanation="Correto! Com uma mão muito forte, é melhor jogar normalmente primeiro. Isso permite que você veja como o oponente joga e pode desafiar mais tarde quando tiver mais informações. Desafiar muito cedo pode fazer o oponente recusar, perdendo a oportunidade de marcar mais pontos."
          />
        </section>
      </div>
    </div>
  );
}

