import { FC } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { motion } from 'framer-motion';
import 'react-circular-progressbar/dist/styles.css';
import { useTimer } from './hooks/useTimer';
import { formatTime } from './utils/timer';
import { HistoryList } from './components/HistoryList';
import { TomatoIcon } from './components/TomatoIcon';

const App: FC = () => {
  const {
    timeRemaining,
    isRunning,
    currentState,
    completedPomodoros,
    progressPercentage,
    sessions,
    toggleTimer,
    resetTimer
  } = useTimer();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-500 text-white p-4 text-center text-2xl font-bold shadow-md flex items-center justify-center">
        <TomatoIcon size={32} className="mr-3" />
        <span>Pomodoro Timer</span>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <motion.h2 
          className="text-2xl text-center text-gray-700 font-bold mb-8 flex items-center justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <TomatoIcon size={24} className="mr-2" />
          {currentState}
        </motion.h2>
        
        <div className="flex flex-col items-center">
          <motion.div 
            className="w-64 h-64 mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CircularProgressbar
              value={progressPercentage}
              text={formatTime(timeRemaining)}
              styles={{
                path: { stroke: '#ef4444' },
                text: { fill: '#ef4444', fontSize: '16px' },
                trail: { stroke: '#fee2e2' }
              }}
            />
          </motion.div>
          
          <div className="flex gap-4 mb-8">
            <motion.button
              onClick={toggleTimer}
              className={`${
                isRunning ? 'bg-yellow-500' : 'bg-green-500'
              } text-white font-bold py-2 px-6 rounded-lg w-32 flex items-center justify-center`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TomatoIcon size={20} className="mr-2" />
              {isRunning ? 'Pausar' : 'Iniciar'}
            </motion.button>
            <motion.button
              onClick={resetTimer}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg w-32 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TomatoIcon size={20} className="mr-2" />
              Reiniciar
            </motion.button>
          </div>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <p className="text-lg text-center text-gray-600 mb-2 flex items-center justify-center">
            <TomatoIcon size={24} className="mr-2" />
            Pomodoros Completados
          </p>
          <p className="text-4xl font-bold text-center text-red-500">
            {completedPomodoros}
          </p>
        </motion.div>

        <HistoryList sessions={sessions} />
      </main>
    </div>
  );
};

export default App;