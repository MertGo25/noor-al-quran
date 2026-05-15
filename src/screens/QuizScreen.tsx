import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Brain, Check, X, RotateCcw, Trophy, Zap, Star } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { AYAHS } from '../data/ayahs';
import { generateQuizQuestions } from '../engine/srsAlgorithm';
import { QuizQuestion } from '../types';

export const QuizScreen: React.FC = () => {
  const { setScreen, profile, markVerseComplete, stats } = useAppStore();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [quizMode, setQuizMode] = useState<'select' | 'quiz'>('select');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'mixed' | 'hard'>('mixed');

  const startQuiz = () => {
    if (!profile) return;
    
    const availableAyahs = AYAHS.filter(a => {
      if (selectedDifficulty === 'easy') return a.difficulty <= 3;
      if (selectedDifficulty === 'hard') return a.difficulty >= 5;
      return true;
    });

    const shuffled = [...availableAyahs].sort(() => Math.random() - 0.5).slice(0, 5);
    const qs: QuizQuestion[] = [];
    
    shuffled.forEach(ayah => {
      const ayahQuestions = generateQuizQuestions(ayah, profile);
      if (ayahQuestions.length > 0) {
        qs.push(ayahQuestions[Math.floor(Math.random() * ayahQuestions.length)]);
      }
    });

    setQuestions(qs.slice(0, 5));
    setCurrentQ(0);
    setScore(0);
    setQuizComplete(false);
    setSelected(null);
    setAnswered(false);
    setXpEarned(0);
    setQuizMode('quiz');
  };

  const handleAnswer = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    const isCorrect = option === questions[currentQ].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setXpEarned(prev => prev + 15);
      markVerseComplete(
        questions[currentQ].ayah.surahId,
        questions[currentQ].ayah.ayahNumber,
        4, 30, 'flashcard'
      );
    } else {
      markVerseComplete(
        questions[currentQ].ayah.surahId,
        questions[currentQ].ayah.ayahNumber,
        2, 30, 'flashcard'
      );
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const getScoreGrade = () => {
    const pct = score / questions.length;
    if (pct >= 0.9) return { grade: 'Excellent!', emoji: '🌟', color: '#c9a84c' };
    if (pct >= 0.7) return { grade: 'Great job!', emoji: '✅', color: '#4caf82' };
    if (pct >= 0.5) return { grade: 'Good effort!', emoji: '💪', color: '#5b9dd9' };
    return { grade: 'Keep practicing!', emoji: '📚', color: '#e8a838' };
  };

  // Mode select screen
  if (quizMode === 'select') {
    return (
      <div className="min-h-screen bg-primary pb-24 px-4 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setScreen('dashboard')} className="p-2 rounded-xl bg-secondary">
            <ChevronLeft size={20} className="text-primary-c" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary-c">Quiz Mode</h1>
            <p className="text-secondary-c text-xs">Test your knowledge</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="verse-card p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{stats.totalVersesLearned}</p>
              <p className="text-xs text-secondary-c">Total Learned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: '#4caf82' }}>{stats.totalVersesMastered}</p>
              <p className="text-xs text-secondary-c">Mastered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-c">{stats.averageRetention}%</p>
              <p className="text-xs text-secondary-c">Avg Retention</p>
            </div>
          </div>
        </div>

        {/* Difficulty Selection */}
        <h3 className="text-sm font-semibold text-secondary-c uppercase tracking-wider mb-3">Select Difficulty</h3>
        <div className="space-y-3 mb-6">
          {[
            { val: 'easy' as const, label: 'Easy', sub: 'Short, beginner-friendly verses', emoji: '🌱', color: '#4caf82' },
            { val: 'mixed' as const, label: 'Mixed', sub: 'Variety of difficulty levels', emoji: '⭐', color: '#c9a84c', recommended: true },
            { val: 'hard' as const, label: 'Hard', sub: 'Complex verses requiring deep knowledge', emoji: '🔥', color: '#e05555' },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setSelectedDifficulty(opt.val)}
              className={`w-full p-4 rounded-xl flex items-center gap-4 text-left transition-all ${
                selectedDifficulty === opt.val ? 'border-2' : 'border border-transparent'
              }`}
              style={{
                background: selectedDifficulty === opt.val ? `${opt.color}15` : 'var(--color-bg-secondary)',
                borderColor: selectedDifficulty === opt.val ? opt.color : undefined
              }}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-primary-c">{opt.label}</p>
                  {opt.recommended && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-accent text-black font-semibold">Best</span>
                  )}
                </div>
                <p className="text-xs text-secondary-c">{opt.sub}</p>
              </div>
              {selectedDifficulty === opt.val && <Check size={18} style={{ color: opt.color }} />}
            </button>
          ))}
        </div>

        {/* Quiz Types */}
        <h3 className="text-sm font-semibold text-secondary-c uppercase tracking-wider mb-3">What's Tested</h3>
        <div className="verse-card p-4 mb-6">
          {[
            { icon: '📖', label: 'Translation Recognition', sub: 'Match Arabic to English meaning' },
            { icon: '🔤', label: 'Word Meanings', sub: 'Identify individual Arabic words' },
            { icon: '📝', label: 'Arabic Recognition', sub: 'Match translation to Arabic text' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 py-2 ${i < 2 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-primary-c">{item.label}</p>
                <p className="text-xs text-secondary-c">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={startQuiz} className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4">
          <Brain size={20} /> Start Quiz
        </button>
      </div>
    );
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const grade = getScoreGrade();
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-6xl mb-4"
        >
          {grade.emoji}
        </motion.div>
        <h2 className="text-2xl font-bold text-primary-c mb-1">{grade.grade}</h2>
        <p className="text-secondary-c mb-6">Quiz Complete</p>

        <div className="verse-card p-6 w-full max-w-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary-c">Score</span>
            <span className="text-2xl font-bold" style={{ color: grade.color }}>
              {score}/{questions.length}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary-c">Accuracy</span>
            <span className="font-bold text-accent">
              {Math.round((score / questions.length) * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-secondary-c">XP Earned</span>
            <div className="flex items-center gap-1">
              <Zap size={16} className="text-accent" />
              <span className="font-bold text-accent">+{xpEarned}</span>
            </div>
          </div>
          <div className="mastery-bar">
            <motion.div
              className="mastery-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(score / questions.length) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="flex gap-3 w-full max-w-sm">
          <button onClick={startQuiz} className="btn-secondary flex-1 flex items-center justify-center gap-2">
            <RotateCcw size={16} /> Try Again
          </button>
          <button onClick={() => { setQuizMode('select'); }} className="btn-primary flex-1">
            <Trophy size={16} /> Finish
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz
  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="min-h-screen bg-primary pb-8 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => setQuizMode('select')} className="p-2 rounded-xl bg-secondary">
            <ChevronLeft size={20} className="text-primary-c" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-secondary-c mb-1">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span className="text-accent font-bold">{score} correct</span>
            </div>
            <div className="mastery-bar">
              <motion.div
                className="mastery-fill"
                animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="verse-card p-5 mb-4"
          >
            {/* Question type badge */}
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-accent-muted text-accent mb-3 capitalize">
              {q.type === 'translation' ? '📖 Translation' : q.type === 'arabic' ? '🔤 Arabic' : '💡 Word Meaning'}
            </span>

            <p className="text-sm text-secondary-c mb-3">{q.question}</p>

            {/* Show Arabic if it's a translation question */}
            {q.type === 'translation' && (
              <div className="p-3 rounded-xl mb-4 text-center" style={{ background: 'var(--color-bg-secondary)' }}>
                <p className="text-arabic arabic-lg text-accent leading-loose">
                  {q.ayah.arabic}
                </p>
                <p className="text-secondary-c text-xs italic mt-1">{q.ayah.transliteration}</p>
              </div>
            )}

            {q.type === 'meaning' && (
              <div className="p-3 rounded-xl mb-4 text-center" style={{ background: 'var(--color-bg-secondary)' }}>
                <p className="font-arabic text-2xl text-accent">{q.question.match(/"([^"]+)"/)?.[1] || ''}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="space-y-3 mb-4">
          {q.options.map((option, i) => {
            const isSelected = selected === option;
            const isCorrect = option === q.correctAnswer;
            let optionClass = 'quiz-option';
            if (answered) {
              if (isCorrect) optionClass += ' correct';
              else if (isSelected && !isCorrect) optionClass += ' incorrect';
            }

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={optionClass}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: answered
                        ? isCorrect ? 'rgba(76,175,130,0.2)' : isSelected ? 'rgba(224,85,85,0.2)' : 'var(--color-bg-secondary)'
                        : 'var(--color-bg-secondary)',
                      border: `1px solid ${answered ? isCorrect ? '#4caf82' : isSelected ? '#e05555' : 'transparent' : 'transparent'}`
                    }}>
                    {answered
                      ? isCorrect ? <Check size={14} /> : isSelected ? <X size={14} /> : String.fromCharCode(65 + i)
                      : String.fromCharCode(65 + i)
                    }
                  </div>
                  <span className="text-sm flex-1 text-left">{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation after answer */}
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="verse-card p-4 mb-4"
            style={{
              borderColor: selected === q.correctAnswer ? 'rgba(76,175,130,0.3)' : 'rgba(224,85,85,0.3)',
              background: selected === q.correctAnswer ? 'rgba(76,175,130,0.05)' : 'rgba(224,85,85,0.05)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {selected === q.correctAnswer
                ? <><Star size={14} style={{ color: '#4caf82' }} /><span className="text-sm font-semibold" style={{ color: '#4caf82' }}>Correct! +15 XP</span></>
                : <><X size={14} style={{ color: '#e05555' }} /><span className="text-sm font-semibold" style={{ color: '#e05555' }}>Incorrect</span></>
              }
            </div>
            <p className="text-secondary-c text-xs leading-relaxed">{q.explanation}</p>
          </motion.div>
        )}

        {answered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="btn-primary w-full"
          >
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
          </motion.button>
        )}
      </div>
    </div>
  );
};
