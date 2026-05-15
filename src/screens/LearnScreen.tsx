import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, BookOpen, Brain, Mic, Eye, ChevronRight,
  Check, X, RotateCcw, Star, Info
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { Ayah } from '../types';
import { getAyah } from '../data/ayahs';

type LearningMode = 'read' | 'flashcard' | 'fillblank' | 'recall';

interface CurrentVerse {
  surahId: number;
  ayahNumber: number;
  isNew: boolean;
}

export const LearnScreen: React.FC = () => {
  const { setScreen, dailyPlan, verseProgress, markVerseComplete, initVerseProgress, profile, startSession, endSession } = useAppStore();
  const [mode, setMode] = useState<LearningMode>('read');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string>('');
  const [versesStudied, setVersesStudied] = useState<Array<{ surahId: number; ayahNumber: number; quality: number }>>([]);
  const [showTafsir, setShowTafsir] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [fillAnswer, setFillAnswer] = useState('');
  const [sessionComplete, setSessionComplete] = useState(false);

  // Build verse queue from daily plan
  const verseQueue: CurrentVerse[] = [
    ...(dailyPlan?.newVerses.map(v => ({ ...v, isNew: true })) || []),
    ...(dailyPlan?.reviewVerses.map(v => ({ ...v, isNew: false })) || [])
  ];

  const current = verseQueue[currentIndex];
  const currentAyah: Ayah | undefined = current ? getAyah(current.surahId, current.ayahNumber) : undefined;
  const progress = verseQueue.length > 0 ? Math.round(((currentIndex) / verseQueue.length) * 100) : 0;

  useEffect(() => {
    const id = startSession('reading');
    setSessionId(id);
    if (current) initVerseProgress(current.surahId, current.ayahNumber);
    return () => {
      if (id) endSession(id, versesStudied);
    };
  }, []);

  useEffect(() => {
    setRevealed(false);
    setShowTafsir(false);
    setShowWords(false);
    setFillAnswer('');
    if (current) initVerseProgress(current.surahId, current.ayahNumber);
  }, [currentIndex, mode]);

  const handleQuality = useCallback((quality: number) => {
    if (!current || !currentAyah) return;

    markVerseComplete(current.surahId, current.ayahNumber, quality, 60, mode === 'read' ? 'flashcard' : mode as 'flashcard' | 'fillblank' | 'recall' | 'listening');
    setVersesStudied(prev => [...prev, { surahId: current.surahId, ayahNumber: current.ayahNumber, quality }]);

    if (currentIndex < verseQueue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      endSession(sessionId, versesStudied);
      setSessionComplete(true);
    }
  }, [current, currentAyah, currentIndex, verseQueue.length, mode, sessionId, versesStudied]);

  const generateFillBlank = (arabic: string): { text: string; blanks: string[] } => {
    const words = arabic.split(' ');
    if (words.length <= 2) return { text: arabic, blanks: [] };
    
    const blankIndex = Math.floor(words.length / 2);
    const blank = words[blankIndex];
    words[blankIndex] = '___________';
    
    return { text: words.join(' '), blanks: [blank] };
  };

  const getModeIcon = (m: LearningMode) => {
    switch (m) {
      case 'read': return Eye;
      case 'flashcard': return BookOpen;
      case 'fillblank': return Brain;
      case 'recall': return Mic;
    }
  };

  if (verseQueue.length === 0) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-primary-c mb-2">All Done!</h2>
        <p className="text-secondary-c mb-6">No verses scheduled for today. Come back tomorrow!</p>
        <button onClick={() => setScreen('dashboard')} className="btn-primary">Back to Dashboard</button>
      </div>
    );
  }

  if (sessionComplete) {
    const avgQuality = versesStudied.length > 0
      ? versesStudied.reduce((s, v) => s + v.quality, 0) / versesStudied.length
      : 0;
    const goodCount = versesStudied.filter(v => v.quality >= 3).length;

    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-4"
        >
          {avgQuality >= 4 ? '🌟' : avgQuality >= 3 ? '✅' : '💪'}
        </motion.div>
        <h2 className="text-2xl font-bold text-primary-c mb-2">Session Complete!</h2>
        <p className="text-secondary-c mb-6">
          {profile?.name}, you reviewed {versesStudied.length} verses
        </p>
        <div className="verse-card p-4 w-full max-w-sm mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-secondary-c">Verses reviewed</span>
            <span className="text-primary-c font-bold">{versesStudied.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-c">Successful recalls</span>
            <span className="font-bold" style={{ color: '#4caf82' }}>{goodCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-c">Average score</span>
            <span className="font-bold text-accent">{Math.round((avgQuality / 5) * 100)}%</span>
          </div>
        </div>
        <div className="flex gap-3 w-full max-w-sm">
          <button onClick={() => { setCurrentIndex(0); setSessionComplete(false); setVersesStudied([]); }} className="btn-secondary flex-1">
            <RotateCcw size={16} /> Review Again
          </button>
          <button onClick={() => setScreen('dashboard')} className="btn-primary flex-1">Dashboard</button>
        </div>
      </div>
    );
  }

  if (!currentAyah) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-secondary-c">Loading verse...</p>
      </div>
    );
  }

  const fillData = mode === 'fillblank' ? generateFillBlank(currentAyah.arabic) : null;
  const verseKey = `${current.surahId}:${current.ayahNumber}`;
  const vProgress = verseProgress[verseKey];

  return (
    <div className="min-h-screen bg-primary pb-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-8">
        <button onClick={() => setScreen('dashboard')} className="p-2 rounded-xl bg-secondary">
          <ChevronLeft size={20} className="text-primary-c" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-secondary-c">
              {currentIndex + 1} / {verseQueue.length} {current.isNew ? '🆕' : '🔄'}
            </p>
            <p className="text-xs text-accent font-semibold">{progress}%</p>
          </div>
          <div className="mastery-bar">
            <motion.div
              className="mastery-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
        {(['read', 'flashcard', 'fillblank', 'recall'] as LearningMode[]).map(m => {
          const Icon = getModeIcon(m);
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`tab-pill flex items-center gap-1.5 whitespace-nowrap ${mode === m ? 'active' : ''}`}
            >
              <Icon size={14} />
              {m === 'read' ? 'Read' : m === 'flashcard' ? 'Flashcard' : m === 'fillblank' ? 'Fill Blank' : 'Recall'}
            </button>
          );
        })}
      </div>

      {/* Verse Content */}
      <div className="flex-1 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${mode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="verse-card p-5 mb-4"
          >
            {/* Surah Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {current.isNew && (
                  <span className="badge-easy text-xs px-2 py-0.5 rounded-full font-semibold">NEW</span>
                )}
                <span className="text-xs text-secondary-c">
                  Surah {current.surahId} : Ayah {current.ayahNumber}
                </span>
              </div>
              {vProgress && (
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-accent" />
                  <span className="text-xs text-accent">{vProgress.retentionScore}%</span>
                </div>
              )}
            </div>

            {/* MODE: READ */}
            {mode === 'read' && (
              <div>
                <p className="text-arabic arabic-xl text-accent text-center leading-loose mb-6">
                  {currentAyah.arabic}
                </p>
                <p className="text-secondary-c text-sm text-center italic mb-3">
                  {currentAyah.transliteration}
                </p>
                <p className="text-primary-c text-center mb-4">
                  {currentAyah.translation}
                </p>
                <button
                  onClick={() => setShowWords(!showWords)}
                  className="w-full py-2 text-xs text-accent border rounded-xl mb-2 flex items-center justify-center gap-2"
                  style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'var(--color-accent-muted)' }}
                >
                  <Info size={14} /> {showWords ? 'Hide' : 'Show'} Word Analysis
                </button>
                {showWords && currentAyah.words && (
                  <div className="space-y-2 mb-3">
                    {currentAyah.words.map((w, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: 'var(--color-bg-secondary)' }}>
                        <span className="font-arabic text-lg text-accent">{w.arabic}</span>
                        <div className="flex-1">
                          <p className="text-xs text-secondary-c">{w.transliteration}</p>
                          <p className="text-sm font-medium text-primary-c">{w.meaning}</p>
                        </div>
                        {w.root && <span className="text-xs text-muted-c">{w.root}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MODE: FLASHCARD */}
            {mode === 'flashcard' && (
              <div>
                {!revealed ? (
                  <div className="text-center">
                    <p className="text-xs text-secondary-c mb-4 uppercase tracking-wider">Translate this verse:</p>
                    <p className="text-arabic arabic-xl text-accent leading-loose mb-6">
                      {currentAyah.arabic}
                    </p>
                    <p className="text-secondary-c text-sm italic mb-6">{currentAyah.transliteration}</p>
                    <button
                      onClick={() => setRevealed(true)}
                      className="btn-primary w-full"
                    >
                      Reveal Translation
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-arabic arabic-xl text-accent text-center leading-loose mb-4">
                      {currentAyah.arabic}
                    </p>
                    <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--color-accent-muted)', border: '1px solid rgba(201,168,76,0.3)' }}>
                      <p className="text-primary-c text-center font-medium">{currentAyah.translation}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MODE: FILL IN THE BLANK */}
            {mode === 'fillblank' && fillData && (
              <div>
                <p className="text-xs text-secondary-c mb-4 uppercase tracking-wider text-center">Complete the verse:</p>
                <p className="text-arabic arabic-lg text-accent text-center leading-loose mb-4" dir="rtl">
                  {fillData.text}
                </p>
                {!revealed ? (
                  <div>
                    <input
                      type="text"
                      value={fillAnswer}
                      onChange={e => setFillAnswer(e.target.value)}
                      placeholder="Type the missing word..."
                      className="w-full p-3 rounded-xl text-center mb-3 outline-none text-lg"
                      style={{
                        background: 'var(--color-bg-secondary)',
                        border: '2px solid rgba(201,168,76,0.3)',
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-latin)',
                        direction: 'rtl'
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRevealed(true)}
                        className="btn-primary flex-1"
                      >
                        Check Answer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="p-3 rounded-xl mb-3 text-center" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
                      <p className="text-xs text-secondary-c mb-1">Missing word:</p>
                      <p className="font-arabic text-2xl text-accent">{fillData.blanks[0]}</p>
                    </div>
                    <p className="text-secondary-c text-sm text-center">{currentAyah.translation}</p>
                  </div>
                )}
              </div>
            )}

            {/* MODE: RECALL */}
            {mode === 'recall' && (
              <div>
                <p className="text-xs text-secondary-c mb-4 uppercase tracking-wider text-center">Recall from memory:</p>
                {!revealed ? (
                  <div className="text-center">
                    <p className="text-primary-c font-medium mb-4">"{currentAyah.translation}"</p>
                    <p className="text-secondary-c text-sm mb-2">Surah {current.surahId}, Ayah {current.ayahNumber}</p>
                    <div className="p-6 rounded-xl mb-6 text-muted-c text-sm"
                      style={{ background: 'var(--color-bg-secondary)', border: '2px dashed rgba(201,168,76,0.3)' }}>
                      Try to recall the Arabic text...
                    </div>
                    <button
                      onClick={() => setRevealed(true)}
                      className="btn-primary w-full"
                    >
                      Show Arabic
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-arabic arabic-xl text-accent text-center leading-loose mb-3">
                      {currentAyah.arabic}
                    </p>
                    <p className="text-secondary-c text-sm text-center italic">
                      {currentAyah.transliteration}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tafsir Toggle */}
        <button
          onClick={() => setShowTafsir(!showTafsir)}
          className="w-full p-3 mb-4 rounded-xl text-sm flex items-center gap-2 justify-center"
          style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
        >
          <BookOpen size={14} />
          {showTafsir ? 'Hide' : 'Show'} Tafsir Explanation
        </button>

        {showTafsir && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="verse-card p-4 mb-4"
            style={{ borderColor: 'rgba(91,157,217,0.3)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} style={{ color: '#5b9dd9' }} />
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5b9dd9' }}>Tafsir</p>
            </div>
            <p className="text-secondary-c text-sm leading-relaxed">{currentAyah.tafsir}</p>
            {currentAyah.revelationReason && (
              <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(91,157,217,0.08)' }}>
                <p className="text-xs font-semibold text-secondary-c mb-1">🕌 Context of Revelation</p>
                <p className="text-secondary-c text-xs leading-relaxed">{currentAyah.revelationReason}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Quality Rating (shown after reveal) */}
        {(revealed || mode === 'read') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs text-secondary-c text-center mb-3 uppercase tracking-wider">How well did you know this?</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Again', sub: 'Forgot', quality: 1, color: '#e05555' },
                { label: 'Hard', sub: 'Difficult', quality: 3, color: '#e8a838' },
                { label: 'Good', sub: 'Correct', quality: 4, color: '#4caf82' },
              ].map(opt => (
                <button
                  key={opt.label}
                  onClick={() => handleQuality(opt.quality)}
                  className="py-3 px-2 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{
                    background: `${opt.color}20`,
                    border: `2px solid ${opt.color}40`,
                    color: opt.color
                  }}
                >
                  <div>{opt.label}</div>
                  <div className="text-xs opacity-70">{opt.sub}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => handleQuality(5)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Check size={18} /> Perfect — I knew it!
            </button>
          </motion.div>
        )}

        {/* Skip for read mode */}
        {mode === 'read' && !revealed && (
          <div className="flex gap-2">
            <button
              onClick={() => handleQuality(2)}
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <X size={16} /> Skip
            </button>
            <button
              onClick={() => handleQuality(4)}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <ChevronRight size={16} /> Got it
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
