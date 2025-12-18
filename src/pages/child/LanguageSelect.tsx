import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores';
import type { SupportedLanguage } from '@/types';
import { ChevronRight } from 'lucide-react';

const languages: { id: SupportedLanguage; name: string; native: string; flag: string }[] = [
  { id: 'hindi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { id: 'tamil', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { id: 'telugu', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { id: 'kannada', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { id: 'malayalam', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { id: 'marathi', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { id: 'bengali', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { id: 'english', name: 'English', native: 'English', flag: '🌍' },
];

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { setLanguage, currentLanguage } = useGameStore();

  const handleSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    navigate('/child/quest');
  };

  return (
    <div className="min-h-full px-4 py-6">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div 
          className="text-5xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🗣️
        </motion.div>
        <h1 className="font-display text-2xl text-foreground mb-1">
          Choose Your Language
        </h1>
        <p className="text-sm text-muted-foreground">
          Practice speaking in your favorite language
        </p>
      </motion.div>

      {/* Language Grid */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {languages.map((lang, index) => (
          <motion.button
            key={lang.id}
            onClick={() => handleSelect(lang.id)}
            className={`card-game p-4 text-left group transition-all ${
              currentLanguage === lang.id 
                ? 'border-2 border-primary bg-primary/5' 
                : 'border-2 border-transparent hover:border-primary/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{lang.flag}</span>
              {currentLanguage === lang.id && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </div>
            <h3 className="font-bold text-foreground">{lang.name}</h3>
            <p className="text-sm text-muted-foreground">{lang.native}</p>
          </motion.button>
        ))}
      </div>

      {/* Continue hint */}
      <motion.p
        className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Tap a language to start learning
        <ChevronRight className="w-4 h-4" />
      </motion.p>
    </div>
  );
}
