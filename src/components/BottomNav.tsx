import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Brain, TrendingUp, Sparkles, Settings } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { AppScreen } from '../types';

const navItems: Array<{
  screen: AppScreen;
  icon: React.ElementType;
  label: string;
}> = [
  { screen: 'dashboard', icon: Home, label: 'Home' },
  { screen: 'quran', icon: BookOpen, label: 'Quran' },
  { screen: 'quiz', icon: Brain, label: 'Quiz' },
  { screen: 'tutor', icon: Sparkles, label: 'Tutor' },
  { screen: 'progress', icon: TrendingUp, label: 'Progress' },
  { screen: 'settings', icon: Settings, label: 'Settings' },
];

export const BottomNav: React.FC = () => {
  const { currentScreen, setScreen } = useAppStore();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 safe-bottom"
      style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.3)'
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(item => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => setScreen(item.screen)}
              className="nav-item relative flex-1"
              style={{
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                background: isActive ? 'var(--color-accent-muted)' : 'transparent',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'var(--color-accent-muted)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </motion.div>
              <span className="text-[10px] relative z-10 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
