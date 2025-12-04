interface AchievementBadgeProps {
  title: string;
  description: string;
  icon?: string;
  unlocked: boolean;
}

export default function AchievementBadge({ title, description, icon = '🏆', unlocked }: AchievementBadgeProps) {
  return (
    <div
      className={`
        p-4 rounded-lg border-2 transition-all
        ${unlocked
          ? 'border-yellow-400 bg-yellow-50 shadow-md'
          : 'border-gray-300 bg-gray-100 opacity-60'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h3 className={`font-semibold ${unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
            {title}
          </h3>
          <p className={`text-sm ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
            {description}
          </p>
        </div>
        {unlocked && (
          <span className="text-green-600 font-bold">✓</span>
        )}
      </div>
    </div>
  );
}

