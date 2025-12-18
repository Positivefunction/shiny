import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores';
import { Button } from '@/components/ui/button';
import { Mic, Volume2, ChevronRight, X } from 'lucide-react';

const demoCards = [
  { id: '1', prompt: 'Apple', symbol: '🍎', phoneme: '/æ/' },
  { id: '2', prompt: 'Ball', symbol: '⚽', phoneme: '/b/' },
  { id: '3', prompt: 'Cat', symbol: '🐱', phoneme: '/k/' },
  { id: '4', prompt: 'Dog', symbol: '🐕', phoneme: '/d/' },
];

export default function Lesson() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { isRecording, setRecording, addXP, updateHearts, hearts } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentCard = demoCards[currentIndex];
  const progress = ((currentIndex + 1) / demoCards.length) * 100;

  const handleRecord = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      const correct = Math.random() > 0.3;
      setIsCorrect(correct);
      setShowFeedback(true);
      if (correct) addXP(10);
      else updateHearts(hearts - 1);
    }, 2000);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < demoCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate(`/child/lesson/${packId}/complete`);
    }
  };

  return (
    <div className="min-h-full flex flex-col px-4 py-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/child/quest')}>
          <X className="w-5 h-5" />
        </Button>
        <div className="flex-1 progress-game">
          <motion.div className="progress-game-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Card */}
      <motion.div className="flex-1 flex flex-col items-center justify-center" layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="card-game w-full max-w-xs p-8 text-center"
          >
            <div className="text-7xl mb-4">{currentCard.symbol}</div>
            <h2 className="font-display text-3xl text-foreground mb-2">{currentCard.prompt}</h2>
            <p className="text-muted-foreground text-sm">Say: "{currentCard.prompt}"</p>
          </motion.div>
        </AnimatePresence>

        {/* Feedback overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 flex items-center justify-center ${isCorrect ? 'bg-success/20' : 'bg-destructive/20'}`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{isCorrect ? '🎉' : '💪'}</div>
                <h3 className="font-display text-2xl">{isCorrect ? 'Great job!' : 'Try again!'}</h3>
                <Button onClick={handleNext} className="mt-4 btn-game btn-game-primary">
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      {!showFeedback && (
        <div className="flex justify-center gap-6 py-6">
          <Button variant="outline" size="icon" className="w-16 h-16 rounded-full">
            <Volume2 className="w-6 h-6" />
          </Button>
          <button
            onClick={handleRecord}
            className={`mic-button ${isRecording ? 'mic-button-recording' : ''}`}
          >
            <Mic className="w-10 h-10 text-primary-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}
