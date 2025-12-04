import { tutorialModules } from '../data/tutorials';
import { getModuleProgress } from '../data/tutorials';

export default function TutorialProgress() {
  const progress = tutorialModules.map(module => {
    const currentStep = getModuleProgress(module.id);
    const completed = currentStep >= module.steps.length;
    const progressPercent = (currentStep / module.steps.length) * 100;
    
    return {
      module,
      currentStep,
      completed,
      progressPercent,
    };
  });

  const totalCompleted = progress.filter(p => p.completed).length;
  const totalProgress = (totalCompleted / tutorialModules.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Seu Progresso
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progresso Geral</span>
          <span className="text-sm font-semibold text-gray-800">
            {totalCompleted} de {tutorialModules.length} módulos completos
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {progress.map(({ module, currentStep, completed, progressPercent }) => (
          <div key={module.id} className="border-2 border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{module.title}</h3>
              {completed && (
                <span className="text-green-600 font-bold">✓ Completo</span>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              {currentStep} de {module.steps.length} passos concluídos
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

