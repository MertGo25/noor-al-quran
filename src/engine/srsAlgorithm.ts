/**
 * QURAN ADAPTIVE LEARNING ENGINE
 * Implements SM-2 Spaced Repetition Algorithm + Custom Enhancements
 * 
 * Quality Scale (0-5):
 *   5: Perfect response
 *   4: Correct response after a hesitation
 *   3: Correct response with serious difficulty
 *   2: Incorrect response; where the correct one seemed easy to recall
 *   1: Incorrect response; the correct one remembered
 *   0: Complete blackout
 */

import { VerseProgress, ResponseRecord, LearningProfile } from '../types';

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;
const WEAK_THRESHOLD = 50;

export interface SRSResult {
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string;
  retentionScore: number;
  status: 'new' | 'learning' | 'review' | 'mastered';
}

/**
 * Core SM-2 calculation with custom modifications
 */
export function calculateSRS(
  quality: number, // 0-5
  currentEaseFactor: number,
  currentInterval: number,
  currentRepetitions: number
): SRSResult {
  let newInterval: number;
  let newEaseFactor = currentEaseFactor;
  let newRepetitions = currentRepetitions;

  // Calculate new ease factor (EF)
  newEaseFactor = currentEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < MIN_EASE_FACTOR) newEaseFactor = MIN_EASE_FACTOR;

  if (quality >= 3) {
    // Successful recall
    if (currentRepetitions === 0) {
      newInterval = 1;
    } else if (currentRepetitions === 1) {
      newInterval = 4;
    } else {
      newInterval = Math.round(currentInterval * newEaseFactor);
    }
    newRepetitions = currentRepetitions + 1;
  } else {
    // Failed recall - restart
    newRepetitions = 0;
    newInterval = 1;
  }

  // Calculate retention score based on quality
  const retentionScore = Math.max(0, Math.min(100, (quality / 5) * 100));

  // Determine status
  let status: 'new' | 'learning' | 'review' | 'mastered' = 'new';
  if (newRepetitions === 0) status = 'learning';
  else if (newRepetitions < 3) status = 'learning';
  else if (newRepetitions < 6 || newInterval < 21) status = 'review';
  else status = 'mastered';

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    interval: newInterval,
    easeFactor: parseFloat(newEaseFactor.toFixed(2)),
    repetitions: newRepetitions,
    nextReviewDate: nextReviewDate.toISOString(),
    retentionScore,
    status
  };
}

/**
 * Create initial verse progress
 */
export function createVerseProgress(surahId: number, ayahNumber: number): VerseProgress {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return {
    surahId,
    ayahNumber,
    status: 'new',
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewDate: tomorrow.toISOString(),
    lastReviewDate: new Date().toISOString(),
    retentionScore: 0,
    responseHistory: [],
    memorizationScore: 0,
    comprehensionScore: 0
  };
}

/**
 * Update verse progress after a review session
 */
export function updateVerseProgress(
  progress: VerseProgress,
  quality: number,
  timeSpent: number,
  mode: ResponseRecord['mode']
): VerseProgress {
  const srsResult = calculateSRS(
    quality,
    progress.easeFactor,
    progress.interval,
    progress.repetitions
  );

  const record: ResponseRecord = {
    date: new Date().toISOString(),
    quality,
    timeSpent,
    mode
  };

  // Update memorization/comprehension scores based on mode
  let newMemScore = progress.memorizationScore;
  let newCompScore = progress.comprehensionScore;

  if (mode === 'flashcard' || mode === 'fillblank') {
    // These modes test memorization
    const memUpdate = quality >= 4 ? 10 : quality >= 3 ? 5 : -10;
    newMemScore = Math.max(0, Math.min(100, progress.memorizationScore + memUpdate));
  } else if (mode === 'recall') {
    // Recall tests both
    const update = quality >= 4 ? 8 : quality >= 3 ? 4 : -8;
    newMemScore = Math.max(0, Math.min(100, progress.memorizationScore + update));
    newCompScore = Math.max(0, Math.min(100, progress.comprehensionScore + update * 0.7));
  } else if (mode === 'listening') {
    // Listening improves comprehension more
    const update = quality >= 4 ? 6 : quality >= 3 ? 3 : -5;
    newCompScore = Math.max(0, Math.min(100, progress.comprehensionScore + update));
  }

  return {
    ...progress,
    ...srsResult,
    lastReviewDate: new Date().toISOString(),
    responseHistory: [...progress.responseHistory.slice(-20), record], // Keep last 20
    memorizationScore: newMemScore,
    comprehensionScore: newCompScore
  };
}

/**
 * Get verses due for review today
 */
export function getVersesDueForReview(
  allProgress: Record<string, VerseProgress>
): VerseProgress[] {
  const now = new Date();
  return Object.values(allProgress).filter(p => {
    const nextReview = new Date(p.nextReviewDate);
    return nextReview <= now && p.status !== 'mastered';
  }).sort((a, b) => {
    // Prioritize by retention score (lowest first) and date
    if (a.retentionScore !== b.retentionScore) {
      return a.retentionScore - b.retentionScore;
    }
    return new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime();
  });
}

/**
 * Get weak verses (low retention)
 */
export function getWeakVerses(
  allProgress: Record<string, VerseProgress>
): VerseProgress[] {
  return Object.values(allProgress)
    .filter(p => p.retentionScore < WEAK_THRESHOLD && p.repetitions > 0)
    .sort((a, b) => a.retentionScore - b.retentionScore);
}

/**
 * Calculate overall retention rate
 */
export function calculateOverallRetention(
  allProgress: Record<string, VerseProgress>
): number {
  const values = Object.values(allProgress);
  if (values.length === 0) return 0;
  
  const total = values.reduce((sum, p) => sum + p.retentionScore, 0);
  return Math.round(total / values.length);
}

/**
 * Generate adaptive daily plan based on profile
 */
export function generateDailyPlan(
  profile: LearningProfile,
  allProgress: Record<string, VerseProgress>,
  availableAyahKeys: Array<{ surahId: number; ayahNumber: number }>
) {
  const dueReviews = getVersesDueForReview(allProgress);
  
  // Determine how many new vs review based on available time
  const totalMinutes = profile.dailyTimeMinutes;
  const minutesPerVerse = 3; // average minutes per verse
  const totalVerses = Math.floor(totalMinutes / minutesPerVerse);
  
  const reviewCount = Math.min(
    dueReviews.length,
    Math.floor(totalVerses * 0.6) // 60% review
  );
  
  const newCount = Math.min(
    profile.newVerseQuota,
    totalVerses - reviewCount
  );

  // Get review verses (prioritize weak ones)
  const reviewVerses = dueReviews.slice(0, reviewCount).map(p => ({
    surahId: p.surahId,
    ayahNumber: p.ayahNumber
  }));

  // Get new verses (not yet started)
  const studiedKeys = new Set(
    Object.keys(allProgress).filter(k => allProgress[k].repetitions > 0)
  );
  
  const newVerses = availableAyahKeys
    .filter(k => !studiedKeys.has(`${k.surahId}:${k.ayahNumber}`))
    .slice(0, newCount);

  return {
    date: new Date().toISOString().split('T')[0],
    newVerses,
    reviewVerses,
    completed: false,
    newCompleted: 0,
    reviewCompleted: 0,
    estimatedMinutes: (newVerses.length + reviewVerses.length) * minutesPerVerse
  };
}

/**
 * Calculate user XP level
 */
export function calculateLevel(xpPoints: number): number {
  return Math.floor(Math.sqrt(xpPoints / 100)) + 1;
}

/**
 * Calculate XP for next level
 */
export function xpForNextLevel(currentLevel: number): number {
  return (currentLevel) * (currentLevel) * 100;
}

/**
 * Award XP based on performance
 */
export function calculateXPReward(quality: number, mode: string, isNew: boolean): number {
  const baseXP = isNew ? 20 : 10;
  const qualityMultiplier = quality >= 4 ? 1.5 : quality >= 3 ? 1.0 : 0.5;
  const modeBonus = mode === 'recall' ? 1.3 : mode === 'fillblank' ? 1.2 : 1.0;
  
  return Math.round(baseXP * qualityMultiplier * modeBonus);
}

/**
 * Get verse difficulty rating label
 */
export function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= 3) return 'Beginner';
  if (difficulty <= 6) return 'Intermediate';
  return 'Advanced';
}

/**
 * Calculate streak
 */
export function calculateStreak(sessions: Array<{ startTime: string }>): number {
  if (sessions.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let checkDate = new Date(today);
  
  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().split('T')[0];
    const hasSession = sessions.some(s => 
      s.startTime.startsWith(dateStr)
    );
    
    if (hasSession) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      // Check yesterday if no session today
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}

/**
 * Generate AI tutor response based on context
 */
export function generateAIResponse(
  question: string,
  profile: LearningProfile
): string {
  const q = question.toLowerCase();
  
  // Pattern-based responses for common questions
  if (q.includes('memorize') || q.includes('memorization')) {
    if (profile.memoryStrength === 'weak') {
      return `Great question! For someone building their memorization, I recommend:\n\n**1. Start Small** — Focus on 1-2 verses per day maximum.\n\n**2. Chunking Method** — Memorize word by word, then combine:\n• Learn word 1\n• Learn word 2\n• Combine words 1+2\n• Add word 3... and so on\n\n**3. Morning Advantage** — Memorize after Fajr prayer. The mind is freshest and most receptive.\n\n**4. 5-Times Repetition** — Repeat each verse 5 times audibly, then write it once.\n\n**5. Sleep Consolidation** — Review before bed. Sleep strengthens memory consolidation.\n\nShall I create a personalized memorization schedule for a specific Surah?`;
    } else {
      return `For intermediate/advanced memorization, I suggest:\n\n**1. Chunking** — Memorize 5-verse blocks\n**2. Connection Method** — Link verses by theme or keyword\n**3. Recitation Review** — Recite in your prayers to reinforce\n**4. Spaced Repetition** — The system automatically schedules optimal review times\n**5. Teaching** — Explain verses to others to deepen retention\n\nYour current retention rate is being tracked. Which Surah are you working on?`;
    }
  }

  if (q.includes('meaning') || q.includes('what does') || q.includes('tafsir')) {
    return `To understand Quranic meanings deeply, consider:\n\n**Layer 1: Literal (Zahir)** — The direct translation\n**Layer 2: Contextual** — Why was this revealed? (Asbab al-Nuzul)\n**Layer 3: Linguistic** — Root words, grammar patterns\n**Layer 4: Spiritual** — How it applies to your life\n\nThe best approach is to study one verse at a time, thoroughly. Tap any verse in the learning screen to see its full tafsir explanation.\n\nWould you like me to explain a specific verse or concept?`;
  }

  if (q.includes('why') && q.includes('reveal')) {
    return `The circumstances of revelation (Asbab al-Nuzul) are crucial for understanding Quran! They help us:\n\n• Understand the specific context of each verse\n• Apply the wisdom to modern situations correctly\n• Avoid misinterpretation\n• Appreciate the wisdom of divine timing\n\nEach verse in our system includes revelation context where known. Check the 'Context' tab when studying a verse. Is there a specific verse you want to know about?`;
  }

  if (q.includes('arabic') || q.includes('language')) {
    return `Learning Quranic Arabic is a beautiful journey! Here's my recommended path:\n\n**Phase 1: Recognition** — Learn the Arabic alphabet and basic letter forms\n**Phase 2: Common Words** — Master the 100 most frequent Quranic words (covers ~50% of the text!)\n**Phase 3: Root System** — Arabic uses a 3-letter root system. Most words share root patterns\n**Phase 4: Grammar** — Basic noun cases (nominative, accusative, genitive)\n**Phase 5: Practice** — Apply by reading verses you've memorized\n\nOur word-by-word breakdown in each verse helps you learn vocabulary in context. This is the most effective method!`;
  }

  if (q.includes('surah') && (q.includes('start') || q.includes('begin') || q.includes('first'))) {
    const beginnerSurahs = ['Al-Fatihah (7 verses)', 'Al-Ikhlas (4 verses)', 'Al-Kawthar (3 verses)', 'An-Nasr (3 verses)', 'Al-Asr (3 verses)'];
    return `For beginners, I recommend starting with short, powerful surahs:\n\n${beginnerSurahs.map((s, i) => `**${i+1}. ${s}**`).join('\n')}\n\nStart with Al-Fatihah first — it's the foundation of every prayer and the most important surah. Then move to the short surahs of Juz Amma (30th chapter).\n\nYour daily plan is already set to guide you through this progression! Ready to start?`;
  }

  if (q.includes('streak') || q.includes('motivation') || q.includes('consistent')) {
    return `Consistency is everything in Quran learning! Here are proven strategies:\n\n**1. Habit Stacking** — Attach Quran study to an existing habit (after Fajr, before bed)\n**2. Start Micro** — Even 5 minutes daily beats 2 hours occasionally\n**3. Track Progress** — Seeing your streak grow is motivating!\n**4. Community** — Study with family or friends for accountability\n**5. Intention (Niyyah)** — Start each session with sincere intention\n\n*"The most beloved deed to Allah is the most regular and constant, even if it is little."* — Prophet Muhammad ﷺ\n\nYour current streak and progress are visible on the Dashboard. Keep going!`;
  }

  if (q.includes('tajweed') || q.includes('pronunciation') || q.includes('recite')) {
    return `Tajweed (proper Quran recitation) is both an art and a science:\n\n**Basic Rules to Start:**\n• **Madd** — Prolongation of vowel sounds (2, 4, or 6 counts)\n• **Ghunnah** — Nasal sound on Nun and Meem\n• **Qalqalah** — Echo on letters ق ط ب ج د\n• **Idgham** — Merging letters when they follow each other\n\n**Learning Path:**\n1. Listen to expert reciters (Mishary Al-Afasy recommended)\n2. Repeat after them verse by verse\n3. Learn the symbols in mushaf\n4. Find a qualified teacher for correction\n\nThe audio feature in the app lets you hear professional recitation. Use it as your model!`;
  }

  // Default response
  return `As your AI Quran tutor, I'm here to help you understand the Quran deeply and memorize it effectively. Here are some things I can help with:\n\n• 📖 **Explain any verse** — tafsir and context\n• 🧠 **Memorization strategies** — personalized to your level\n• 🔤 **Arabic word meanings** — root words and grammar\n• ❓ **Why was this revealed** — historical context\n• 📅 **Study planning** — optimize your learning schedule\n• 🎯 **Progress advice** — what to focus on next\n\nWhat would you like to explore today?`;
}

/**
 * Generate quiz questions for a verse
 */
export function generateQuizQuestions(ayah: import('../types').Ayah, profile: LearningProfile) {
  const questions = [];
  
  // Question 1: Translation
  questions.push({
    type: 'translation' as const,
    ayah,
    question: `What is the correct translation of this verse?`,
    options: shuffleArray([
      ayah.translation,
      generateDistractor(ayah.translation, 1),
      generateDistractor(ayah.translation, 2),
      generateDistractor(ayah.translation, 3)
    ]),
    correctAnswer: ayah.translation,
    explanation: ayah.tafsir.substring(0, 200) + '...'
  });

  // Question 2: Arabic recognition
  if (profile.level !== 'none') {
    questions.push({
      type: 'arabic' as const,
      ayah,
      question: `"${ayah.translation}" — Which Arabic text matches this translation?`,
      options: shuffleArray([
        ayah.arabic,
        `${ayah.arabic} ...`,
        ayah.transliteration,
        `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`
      ]),
      correctAnswer: ayah.arabic,
      explanation: `This verse reads: "${ayah.transliteration}"`
    });
  }

  // Question 3: Word meaning
  if (ayah.words && ayah.words.length > 0) {
    const targetWord = ayah.words[Math.floor(Math.random() * ayah.words.length)];
    questions.push({
      type: 'meaning' as const,
      ayah,
      question: `What does "${targetWord.arabic}" (${targetWord.transliteration}) mean?`,
      options: shuffleArray([
        targetWord.meaning,
        'Mercy',
        'Praise',
        'Guidance'
      ]),
      correctAnswer: targetWord.meaning,
      explanation: `"${targetWord.arabic}" comes from the root ${targetWord.root || 'N/A'} and means "${targetWord.meaning}"`
    });
  }

  return questions;
}

function generateDistractor(_correctAnswer: string, index: number): string {
  const distractors = [
    'And He is the Lord of all creation and the heavens.',
    'We send down blessings upon those who believe and do good.',
    'Indeed, with every difficulty comes a new beginning.',
    'Say: I seek refuge in the Lord of all mankind.',
    'Praise be to Allah who guides whom He wills.',
    'He is the One who created the heavens and the earth.',
    'And the believers will enter gardens of peace.',
    'Indeed, mankind was created from a single soul.'
  ];
  return distractors[index % distractors.length];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
