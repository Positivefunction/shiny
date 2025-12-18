import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mic, Globe, Users, BookOpen, Sparkles } from 'lucide-react';

export default function Landing() {
  const features = [
    { icon: Mic, title: 'Speech Assessment', desc: 'AI-powered phoneme analysis' },
    { icon: Globe, title: '8+ Indian Languages', desc: 'Hindi, Tamil, Telugu & more' },
    { icon: Users, title: 'Teletherapy', desc: 'Remote sessions anywhere' },
    { icon: BookOpen, title: 'Progress Tracking', desc: 'Detailed analytics & reports' },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-60 -left-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 pt-12 pb-8">
          {/* Logo */}
          <motion.div 
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl text-foreground">VANI AI</h1>
          </motion.div>

          {/* Tagline */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
              Multilingual Speech-Language
              <br />
              <span className="text-gradient-primary">Assessment Platform</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Making speech therapy accessible, engaging, and effective for every child across India.
            </p>
          </motion.div>

          {/* Illustration/Mascot area */}
          <motion.div 
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {/* Playful circles background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-primary/5 animate-pulse" />
              </div>
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-primary/10" />
              </div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-primary/15" />
              </div>
              {/* Center mic icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary flex items-center justify-center shadow-glow"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/role-select">
              <Button className="btn-game btn-game-primary text-lg px-10 py-6 rounded-2xl">
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-game p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Designed for low bandwidth • Works offline • Made in India 🇮🇳
        </p>
      </div>
    </div>
  );
}
