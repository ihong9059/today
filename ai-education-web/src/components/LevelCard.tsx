import Link from 'next/link';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Level } from '@/data/curriculum';

interface LevelCardProps {
  level: Level;
}

export default function LevelCard({ level }: LevelCardProps) {
  return (
    <Link href={`/level/${level.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
        <div className={`${level.color} h-2`} />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{level.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{level.title}</h3>
                <p className="text-blue-600 font-medium">{level.subtitle}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>

          <p className="mt-4 text-gray-600 text-sm line-clamp-2">
            {level.description}
          </p>

          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{level.lessons.length}개 레슨</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{level.totalTime}</span>
            </div>
          </div>

          {level.prerequisites.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {level.prerequisites.map((prereq) => (
                <span
                  key={prereq}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {prereq} 필요
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
