import { Link } from 'react-router-dom';
import { tutorialModules } from '../data/tutorials';
import { useTutorialProgress } from '../hooks/useTutorialProgress';
import TutorialStepComponent from '../components/TutorialStep';
import TutorialProgress from '../components/TutorialProgress';
import { useParams } from 'react-router-dom';

export default function Tutorial() {
  const { moduleId } = useParams<{ moduleId?: string }>();
  
  // If no moduleId, show module selection
  if (!moduleId) {
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
              Tutorial Interativo
            </h1>
            <p className="text-gray-600">
              Escolha um módulo para começar a aprender
            </p>
          </header>

          <TutorialProgress />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {tutorialModules.map((module) => (
              <Link
                key={module.id}
                to={`/tutorial/${module.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-primary-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {module.title}
                </h2>
                <p className="text-gray-600">{module.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {module.steps.length} passos
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show tutorial module
  const module = tutorialModules.find((m) => m.id === moduleId);
  
  if (!module) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-gray-800 mb-4">Módulo não encontrado</h1>
          <Link
            to="/tutorial"
            className="text-primary-600 hover:text-primary-700"
          >
            Voltar para a seleção de módulos
          </Link>
        </div>
      </div>
    );
  }

  const { currentStep, nextStep, previousStep } = useTutorialProgress(moduleId);
  const currentStepData = module.steps[currentStep];
  const hasNext = currentStep < module.steps.length - 1;
  const hasPrevious = currentStep > 0;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <Link
            to="/tutorial"
            className="inline-block mb-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Voltar para módulos
          </Link>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">
            {module.title}
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / module.steps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Passo {currentStep + 1} de {module.steps.length}
          </p>
        </header>

        <TutorialStepComponent
          step={currentStepData}
          onNext={nextStep}
          onPrevious={previousStep}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </div>
    </div>
  );
}

