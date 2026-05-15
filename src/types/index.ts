// ============================================================
// CORE TYPES FOR QURAN ADAPTIVE LEARNING SYSTEM
// ============================================================

export type LearningLevel = 'none' | 'beginner' | 'intermediate' | 'advanced';
export type LearningGoal = 'memorization' | 'understanding' | 'both';
export type LearningStyle = 'visual' | 'repetition' | 'explanation' | 'audio';
export type LanguagePref = 'english' | 'arabic' | 'urdu' | 'french' | 'malay';
export type MemoryStrength = 'weak' | 'moderate' | 'strong';
export type MotivationLevel = 'low' | 'medium' | 'high';
export type DailyTime = '10' | '20' | '30' | '60' | '90';

export interface LearningProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  level: LearningLevel;
  goal: LearningGoal;
  dailyTimeMinutes: number;
  learningStyle: LearningStyle;
  language: LanguagePref;
  memoryStrength: MemoryStrength;
  motivationLevel: MotivationLevel;
  priorExperience: boolean;
  name: string;
  // Derived settings
  newVerseQuota: number;
  reviewVerseQuota: number;
  explanationDepth: 'simple' | 'medium' | 'detailed';
  gamificationEnabled: boolean;
}

export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  nameTranslation: string;
  totalAyahs: number;
  revelationPlace: 'Mecca' | 'Medina';
  juz: number[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  theme: string;
}

export interface Ayah {
  surahId: number;
  ayahNumber: number;
  arabic: string;
  transliteration: string;
  translation: string;
  words: WordData[];
  tafsir: string;
  revelationReason?: string;
  themes: string[];
  difficulty: number; // 1-10
  juz: number;
  page: number;
}

export interface WordData {
  arabic: string;
  transliteration: string;
  meaning: string;
  root?: string;
  grammar?: string;
}

// ============================================================
// LEARNING ENGINE TYPES
// ============================================================

export type ReviewStatus = 'new' | 'learning' | 'review' | 'mastered';

export interface VerseProgress {
  surahId: number;
  ayahNumber: number;
  status: ReviewStatus;
  easeFactor: number;        // SM-2 ease factor (default 2.5)
  interval: number;          // Days until next review
  repetitions: number;       // Number of successful reviews
  nextReviewDate: string;    // ISO date string
  lastReviewDate: string;    // ISO date string
  retentionScore: number;    // 0-100
  responseHistory: ResponseRecord[];
  memorizationScore: number; // 0-100
  comprehensionScore: number; // 0-100
}

export interface ResponseRecord {
  date: string;
  quality: number; // 0-5 (SM-2 quality)
  timeSpent: number; // seconds
  mode: 'flashcard' | 'fillblank' | 'recall' | 'listening';
}

export interface DailyPlan {
  date: string;
  newVerses: Array<{ surahId: number; ayahNumber: number }>;
  reviewVerses: Array<{ surahId: number; ayahNumber: number }>;
  completed: boolean;
  completedAt?: string;
  newCompleted: number;
  reviewCompleted: number;
  estimatedMinutes: number;
}

export interface LearningSession {
  id: string;
  startTime: string;
  endTime?: string;
  mode: 'flashcard' | 'fillblank' | 'recall' | 'listening' | 'reading';
  versesStudied: Array<{ surahId: number; ayahNumber: number; quality: number }>;
  totalTime: number; // seconds
}

export interface UserStats {
  totalVersesLearned: number;
  totalVersesMastered: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number; // minutes
  averageRetention: number;
  weakVerses: Array<{ surahId: number; ayahNumber: number }>;
  completedSurahs: number[];
  lastStudyDate: string;
  xpPoints: number;
  level: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  relatedVerse?: { surahId: number; ayahNumber: number };
}

export interface AppState {
  theme: 'dark' | 'light';
  isOnboarded: boolean;
  profile: LearningProfile | null;
  currentScreen: AppScreen;
  dailyPlan: DailyPlan | null;
  stats: UserStats;
  verseProgress: Record<string, VerseProgress>;
  sessions: LearningSession[];
  chatHistory: ChatMessage[];
}

export type AppScreen = 
  | 'onboarding' 
  | 'dashboard' 
  | 'learn' 
  | 'quran' 
  | 'quiz' 
  | 'progress' 
  | 'tutor'
  | 'settings'
  | 'surahDetail';

export interface QuizQuestion {
  type: 'translation' | 'arabic' | 'fillblank' | 'order' | 'meaning';
  ayah: Ayah;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
