import React from 'react';
import { format } from 'date-fns';
import { TimerSession } from '../types/timer';
import { TomatoIcon } from './TomatoIcon';

interface HistoryListProps {
  sessions: TimerSession[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ sessions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <TomatoIcon size={24} className="mr-2" />
        Histórico de Sessões
      </h3>
      <div className="max-h-60 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <TomatoIcon size={16} className="mr-2" />
              <span className="text-gray-700">
                {session.type === 'work' ? 'Foco' : session.type === 'shortBreak' ? 'Pausa Curta' : 'Pausa Longa'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {format(session.startTime, 'dd/MM HH:mm')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};