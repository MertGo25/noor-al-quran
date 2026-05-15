import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from './store/appStore';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { LearnScreen } from './screens/LearnScreen';
import { QuranScreen } from './screens/QuranScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { TutorScreen } from './screens/TutorScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

function App() {
  const { isOnboarded, currentScreen, theme } = useAppStore();
  const [showSplash, setShowSplash] = useState(true);

  // Apply theme to HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <DashboardScreen />;
      case 'learn': return <LearnScreen />;
      case 'quran': return <QuranScreen />;
      case 'quiz': return <QuizScreen />;
      case 'progress': return <ProgressScreen />;
      case 'tutor': return <TutorScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <DashboardScreen />;
    }
  };

  const showNav = !['learn'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-primary" style={{ fontFamily: 'var(--font-latin)' }}>
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Main App */}
      {!showSplash && (
        <>
          {!isOnboarded ? (
            <OnboardingScreen />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="min-h-screen"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
              {showNav && <BottomNav />}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
