import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, Brain, Target, Globe, Zap, Heart, Star,
  ChevronRight, ChevronLeft, Check, User
} from 'lucide-react';
import { LearningProfile, LearningLevel, LearningGoal, LearningStyle, LanguagePref, MemoryStrength, MotivationLevel } from '../types';
import { useAppStore } from '../store/appStore';

const steps = [
  { id: 'welcome', title: 'Welcome', icon: BookOpen },
  { id: 'name', title: 'Your Name', icon: User },
  { id: 'level', title: 'Your Level', icon: Star },
  { id: 'goal', title: 'Your Goal', icon: Target },
  { id: 'time', title: 'Daily Time', icon: Clock },
  { id: 'style', title: 'Learning Style', icon: Brain },
  { id: 'language', title: 'Language', icon: Globe },
  { id: 'memory', title: 'Memory', icon: Zap },
  { id: 'motivation', title: 'Motivation', icon: Heart },
  { id: 'experience', title: 'Experience', icon: BookOpen },
  { id: 'complete', title: 'Ready!', icon: Check },
];

export const OnboardingScreen: React.FC = () => {
  const completeOnboarding = useAppStore(s => s.completeOnboarding);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    name: '',
    level: '' as LearningLevel,
    goal: '' as LearningGoal,
    dailyTime: '20',
    style: '' as LearningStyle,
    language: 'english' as LanguagePref,
    memory: '' as MemoryStrength,
    motivation: '' as MotivationLevel,
    experience: false,
  });

  const progress = ((currentStep) / (steps.length - 1)) * 100;

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'welcome': return true;
      case 'name': return answers.name.trim().length >= 2;
      case 'level': return !!answers.level;
      case 'goal': return !!answers.goal;
      case 'time': return !!answers.dailyTime;
      case 'style': return !!answers.style;
      case 'language': return !!answers.language;
      case 'memory': return !!answers.memory;
      case 'motivation': return !!answers.motivation;
      case 'experience': return true;
      case 'complete': return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleComplete = () => {
    const timeMap: Record<string, number> = {
      '10': 10, '20': 20, '30': 30, '60': 60, '90': 90
    };
    const timeMinutes = timeMap[answers.dailyTime] || 20;

    const profile: LearningProfile = {
      id: `profile_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: answers.name,
      level: answers.level || 'beginner',
      goal: answers.goal || 'both',
      dailyTimeMinutes: timeMinutes,
      learningStyle: answers.style || 'explanation',
      language: answers.language,
      memoryStrength: answers.memory || 'moderate',
      motivationLevel: answers.motivation || 'medium',
      priorExperience: answers.experience,
      // Derived settings
      newVerseQuota: timeMinutes <= 10 ? 1 : timeMinutes <= 20 ? 2 : timeMinutes <= 30 ? 3 : 5,
      reviewVerseQuota: timeMinutes <= 10 ? 3 : timeMinutes <= 20 ? 5 : timeMinutes <= 30 ? 8 : 15,
      explanationDepth: answers.level === 'none' || answers.level === 'beginner' ? 'simple' : answers.level === 'intermediate' ? 'medium' : 'detailed',
      gamificationEnabled: answers.motivation === 'high',
    };

    completeOnboarding(profile);
  };

  const stepContent = steps[currentStep].id;

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 islamic-pattern">
      {/* Progress Bar */}
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="fixed top-0 left-0 right-0 z-10">
          <div className="h-1 bg-gray-800">
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c97e)', width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Welcome Screen */}
          {stepContent === 'welcome' && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))', border: '2px solid rgba(201,168,76,0.4)' }}
              >
                <span className="text-4xl">📖</span>
              </motion.div>
              <h1 className="text-3xl font-bold text-accent mb-2">بِسْمِ اللَّهِ</h1>
              <h2 className="text-xl font-semibold text-primary-c mb-3">Quran Adaptive Learning</h2>
              <p className="text-secondary-c text-sm mb-6 leading-relaxed">
                Your personal AI tutor for memorizing, understanding, and connecting with the Quran. 
                This onboarding will take <strong className="text-accent">2 minutes</strong> to create your personalized learning path.
              </p>
              <div className="verse-card p-4 mb-6 text-center">
                <p className="text-arabic arabic-lg text-accent mb-1">اقْرَأْ بِاسْمِ رَبِّكَ</p>
                <p className="text-secondary-c text-sm italic">"Read in the name of your Lord..." — Al-Alaq 96:1</p>
              </div>
            </div>
          )}

          {/* Name Step */}
          {stepContent === 'name' && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                  <User size={20} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-c">What's your name?</h2>
                  <p className="text-secondary-c text-sm">We'll personalize your journey</p>
                </div>
              </div>
              <input
                type="text"
                value={answers.name}
                onChange={e => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name..."
                className="w-full p-4 rounded-xl text-primary-c text-lg outline-none"
                style={{
                  background: 'var(--color-bg-secondary)',
                  border: `2px solid ${answers.name.trim().length >= 2 ? 'var(--color-accent)' : 'rgba(201,168,76,0.2)'}`,
                  fontFamily: 'var(--font-latin)'
                }}
                autoFocus
              />
              {answers.name.trim().length >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-accent text-sm mt-2 ml-1"
                >
                  Assalamu Alaikum, {answers.name}! 🌟
                </motion.p>
              )}
            </div>
          )}

          {/* Level Step */}
          {stepContent === 'level' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">What's your current level?</h2>
              <p className="text-secondary-c text-sm mb-5">Be honest — we'll adapt to you perfectly</p>
              {[
                { val: 'none' as LearningLevel, label: 'Complete Beginner', sub: 'No knowledge of Quran or Arabic', emoji: '🌱' },
                { val: 'beginner' as LearningLevel, label: 'Beginner', sub: 'Know some short Surahs', emoji: '📗' },
                { val: 'intermediate' as LearningLevel, label: 'Intermediate', sub: 'Know Juz Amma, learning more', emoji: '📘' },
                { val: 'advanced' as LearningLevel, label: 'Advanced', sub: 'Extensive Quran knowledge', emoji: '📙' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setAnswers(prev => ({ ...prev, level: opt.val }))}
                  className={`onboarding-option mb-3 flex items-center gap-4 ${answers.level === opt.val ? 'selected' : ''}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-secondary-c text-xs mt-0.5">{opt.sub}</p>
                  </div>
                  {answers.level === opt.val && <Check size={18} className="text-accent ml-auto" />}
                </button>
              ))}
            </div>
          )}

          {/* Goal Step */}
          {stepContent === 'goal' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">What's your primary goal?</h2>
              <p className="text-secondary-c text-sm mb-5">This shapes your entire learning path</p>
              {[
                { val: 'memorization' as LearningGoal, label: 'Memorization (Hifz)', sub: 'Memorize verses and Surahs by heart', emoji: '🧠' },
                { val: 'understanding' as LearningGoal, label: 'Understanding (Tafsir)', sub: 'Learn meanings, context, and wisdom', emoji: '💡' },
                { val: 'both' as LearningGoal, label: 'Both — Complete Learning', sub: 'Memorize AND understand deeply', emoji: '⭐' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setAnswers(prev => ({ ...prev, goal: opt.val }))}
                  className={`onboarding-option mb-3 flex items-center gap-4 ${answers.goal === opt.val ? 'selected' : ''}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-secondary-c text-xs mt-0.5">{opt.sub}</p>
                  </div>
                  {answers.goal === opt.val && <Check size={18} className="text-accent ml-auto" />}
                </button>
              ))}
            </div>
          )}

          {/* Time Step */}
          {stepContent === 'time' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">Daily study time?</h2>
              <p className="text-secondary-c text-sm mb-5">Consistency beats intensity. Be realistic.</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '10', label: '10 minutes', sub: 'Quick & consistent', emoji: '⚡' },
                  { val: '20', label: '20 minutes', sub: 'Recommended start', emoji: '✅', recommended: true },
                  { val: '30', label: '30 minutes', sub: 'Solid progress', emoji: '🔥' },
                  { val: '60', label: '1 hour', sub: 'Serious learner', emoji: '💪' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setAnswers(prev => ({ ...prev, dailyTime: opt.val }))}
                    className={`onboarding-option relative flex flex-col items-center text-center p-4 ${answers.dailyTime === opt.val ? 'selected' : ''}`}
                  >
                    {opt.recommended && (
                      <span className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-full bg-accent text-black font-semibold">Best</span>
                    )}
                    <span className="text-2xl mb-1">{opt.emoji}</span>
                    <p className="font-semibold text-sm">{opt.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Learning Style */}
          {stepContent === 'style' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">How do you learn best?</h2>
              <p className="text-secondary-c text-sm mb-5">We'll emphasize your preferred methods</p>
              {[
                { val: 'visual' as LearningStyle, label: 'Visual', sub: 'Charts, colors, patterns, and visuals', emoji: '👁️' },
                { val: 'repetition' as LearningStyle, label: 'Repetition', sub: 'Drilling, repetition, and practice', emoji: '🔄' },
                { val: 'explanation' as LearningStyle, label: 'Deep Explanation', sub: 'Tafsir, context, word meanings', emoji: '📚' },
                { val: 'audio' as LearningStyle, label: 'Audio/Listening', sub: 'Hearing recitation and repetition', emoji: '🎧' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setAnswers(prev => ({ ...prev, style: opt.val }))}
                  className={`onboarding-option mb-3 flex items-center gap-4 ${answers.style === opt.val ? 'selected' : ''}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-secondary-c text-xs mt-0.5">{opt.sub}</p>
                  </div>
                  {answers.style === opt.val && <Check size={18} className="text-accent ml-auto" />}
                </button>
              ))}
            </div>
          )}

          {/* Language */}
          {stepContent === 'language' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">Translation language?</h2>
              <p className="text-secondary-c text-sm mb-5">Choose your preferred language for translations</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: 'english' as LanguagePref, label: 'English', flag: '🇬🇧' },
                  { val: 'urdu' as LanguagePref, label: 'اردو', flag: '🇵🇰' },
                  { val: 'arabic' as LanguagePref, label: 'عربي', flag: '🇸🇦' },
                  { val: 'french' as LanguagePref, label: 'Français', flag: '🇫🇷' },
                  { val: 'malay' as LanguagePref, label: 'Melayu', flag: '🇲🇾' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setAnswers(prev => ({ ...prev, language: opt.val }))}
                    className={`onboarding-option flex items-center gap-3 ${answers.language === opt.val ? 'selected' : ''}`}
                  >
                    <span className="text-xl">{opt.flag}</span>
                    <span className="font-medium">{opt.label}</span>
                    {answers.language === opt.val && <Check size={16} className="text-accent ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Memory Strength */}
          {stepContent === 'memory' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">How's your memory?</h2>
              <p className="text-secondary-c text-sm mb-5">Self-assessment helps calibrate the algorithm</p>
              {[
                { val: 'weak' as MemoryStrength, label: 'I forget things quickly', sub: 'Need lots of repetition and review', emoji: '🌿' },
                { val: 'moderate' as MemoryStrength, label: 'Average memory', sub: 'Normal pace of learning', emoji: '🌳' },
                { val: 'strong' as MemoryStrength, label: 'Strong memory', sub: 'Can retain things well', emoji: '🏔️' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setAnswers(prev => ({ ...prev, memory: opt.val }))}
                  className={`onboarding-option mb-3 flex items-center gap-4 ${answers.memory === opt.val ? 'selected' : ''}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-secondary-c text-xs mt-0.5">{opt.sub}</p>
                  </div>
                  {answers.memory === opt.val && <Check size={18} className="text-accent ml-auto" />}
                </button>
              ))}
            </div>
          )}

          {/* Motivation */}
          {stepContent === 'motivation' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">Motivation level?</h2>
              <p className="text-secondary-c text-sm mb-5">Helps us determine how much encouragement you need</p>
              {[
                { val: 'low' as MotivationLevel, label: 'I need lots of encouragement', sub: 'Gentle pace, extra motivation features', emoji: '🌱' },
                { val: 'medium' as MotivationLevel, label: 'Moderate — I try to be consistent', sub: 'Balanced approach with reminders', emoji: '⭐' },
                { val: 'high' as MotivationLevel, label: 'Highly motivated', sub: 'Challenging goals, gamification enabled', emoji: '🚀' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setAnswers(prev => ({ ...prev, motivation: opt.val }))}
                  className={`onboarding-option mb-3 flex items-center gap-4 ${answers.motivation === opt.val ? 'selected' : ''}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-secondary-c text-xs mt-0.5">{opt.sub}</p>
                  </div>
                  {answers.motivation === opt.val && <Check size={18} className="text-accent ml-auto" />}
                </button>
              ))}
            </div>
          )}

          {/* Experience */}
          {stepContent === 'experience' && (
            <div className="py-4">
              <h2 className="text-xl font-bold text-primary-c mb-2">Prior Quran experience?</h2>
              <p className="text-secondary-c text-sm mb-5">Have you studied Quran or Arabic formally before?</p>
              {[
                { val: true, label: 'Yes — I have prior formal study', sub: 'Studied with a teacher, in madrasa, or courses', emoji: '📚' },
                { val: false, label: 'No — Self-taught or just starting', sub: 'Learning on my own or starting fresh', emoji: '🌟' },
              ].map(opt => (
                <button
                  key={String(opt.val)}
                  onClick={() => setAnswers(prev => ({ ...prev, experience: opt.val }))}
                  className={`onboarding-option mb-3 flex items-center gap-4 ${answers.experience === opt.val ? 'selected' : ''}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-secondary-c text-xs mt-0.5">{opt.sub}</p>
                  </div>
                  {answers.experience === opt.val && <Check size={18} className="text-accent ml-auto" />}
                </button>
              ))}
            </div>
          )}

          {/* Complete */}
          {stepContent === 'complete' && (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))', border: '2px solid #c9a84c' }}
              >
                <Check size={40} className="text-accent" />
              </motion.div>
              <h2 className="text-2xl font-bold text-primary-c mb-3">
                Your Profile is Ready, {answers.name}!
              </h2>
              <p className="text-secondary-c text-sm mb-6">
                Based on your answers, we've created a personalized learning plan.
              </p>
              <div className="verse-card p-4 text-left space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-accent">📊</span>
                  <div>
                    <p className="text-xs text-secondary-c">Learning Level</p>
                    <p className="text-sm font-semibold text-primary-c capitalize">{answers.level || 'Beginner'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent">🎯</span>
                  <div>
                    <p className="text-xs text-secondary-c">Primary Goal</p>
                    <p className="text-sm font-semibold text-primary-c capitalize">{answers.goal === 'both' ? 'Memorization + Understanding' : answers.goal}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent">⏱️</span>
                  <div>
                    <p className="text-xs text-secondary-c">Daily Goal</p>
                    <p className="text-sm font-semibold text-primary-c">{answers.dailyTime} minutes per day</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent">🧠</span>
                  <div>
                    <p className="text-xs text-secondary-c">Learning Style</p>
                    <p className="text-sm font-semibold text-primary-c capitalize">{answers.style}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-c">
                *The system will continuously adapt as it learns your patterns
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="flex gap-3 max-w-md mx-auto">
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <button onClick={handleBack} className="btn-secondary flex items-center gap-2 flex-1">
              <ChevronLeft size={18} /> Back
            </button>
          )}
          {currentStep < steps.length - 2 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`btn-primary flex items-center justify-center gap-2 flex-1 ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={!canProceed() ? { transform: 'none', boxShadow: 'none' } : {}}
            >
              {currentStep === 0 ? 'Begin Journey' : 'Continue'} <ChevronRight size={18} />
            </button>
          ) : currentStep === steps.length - 2 ? (
            <button onClick={handleNext} className="btn-primary flex items-center justify-center gap-2 flex-1">
              Build My Profile ✨
            </button>
          ) : (
            <button onClick={handleComplete} className="btn-primary flex items-center justify-center gap-2 flex-1">
              Start Learning 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
