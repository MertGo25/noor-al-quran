/**
 * ZUSTAND GLOBAL STORE - Central state management
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  AppState, AppScreen, LearningProfile,
  VerseProgress, UserStats, ChatMessage, LearningSession
} from '../types';
import {
  createVerseProgress, updateVerseProgress, generateDailyPlan,
  calculateStreak, calculateLevel, calculateXPReward, getWeakVerses,
  calculateOverallRetention
} from '../engine/srsAlgorithm';
import { getAllAyahKeys } from '../data/ayahs';

const DEFAULT_STATS: UserStats = {
  totalVersesLearned: 0,
  totalVersesMastered: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalStudyTime: 0,
  averageRetention: 0,
  weakVerses: [],
  completedSurahs: [],
  lastStudyDate: '',
  xpPoints: 0,
  level: 1
};

interface AppStore extends AppState {
  // Navigation
  setScreen: (screen: AppScreen) => void;
  
  // Onboarding
  completeOnboarding: (profile: LearningProfile) => void;
  
  // Theme
  toggleTheme: () => void;
  
  // Daily Plan
  refreshDailyPlan: () => void;
  markVerseComplete: (surahId: number, ayahNumber: number, quality: number, timeSpent: number, mode: VerseProgress['responseHistory'][0]['mode']) => void;
  
  // Learning Progress
  initVerseProgress: (surahId: number, ayahNumber: number) => void;
  
  // Sessions
  startSession: (mode: LearningSession['mode']) => string;
  endSession: (sessionId: string, versesStudied: LearningSession['versesStudied']) => void;
  
  // Chat
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
  
  // Stats
  refreshStats: () => void;
  
  // Reset
  resetApp: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial State
      theme: 'dark',
      isOnboarded: false,
      profile: null,
      currentScreen: 'onboarding',
      dailyPlan: null,
      stats: DEFAULT_STATS,
      verseProgress: {},
      sessions: [],
      chatHistory: [],

      // Navigation
      setScreen: (screen) => set({ currentScreen: screen }),

      // Toggle theme
      toggleTheme: () => set(state => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),

      // Complete onboarding
      completeOnboarding: (profile) => {
        const allKeys = getAllAyahKeys();
        const plan = generateDailyPlan(profile, {}, allKeys);
        
        set({
          isOnboarded: true,
          profile,
          currentScreen: 'dashboard',
          dailyPlan: plan,
          stats: DEFAULT_STATS
        });
      },

      // Refresh daily plan
      refreshDailyPlan: () => {
        const { profile, verseProgress } = get();
        if (!profile) return;
        
        const allKeys = getAllAyahKeys();
        const plan = generateDailyPlan(profile, verseProgress, allKeys);
        set({ dailyPlan: plan });
      },

      // Initialize verse progress
      initVerseProgress: (surahId, ayahNumber) => {
        const key = `${surahId}:${ayahNumber}`;
        const { verseProgress } = get();
        
        if (!verseProgress[key]) {
          const newProgress = createVerseProgress(surahId, ayahNumber);
          set(state => ({
            verseProgress: {
              ...state.verseProgress,
              [key]: newProgress
            }
          }));
        }
      },

      // Mark verse complete after review
      markVerseComplete: (surahId, ayahNumber, quality, timeSpent, mode) => {
        const key = `${surahId}:${ayahNumber}`;
        const { verseProgress, stats, dailyPlan } = get();
        
        // Get or create progress
        const currentProgress = verseProgress[key] || createVerseProgress(surahId, ayahNumber);
        const isNew = currentProgress.repetitions === 0;
        
        // Update with SRS
        const updatedProgress = updateVerseProgress(currentProgress, quality, timeSpent, mode);
        
        // Calculate XP
        const xpEarned = calculateXPReward(quality, mode, isNew);
        const newXP = stats.xpPoints + xpEarned;
        
        // Update daily plan
        let newDailyPlan = dailyPlan;
        if (dailyPlan) {
          const isReview = dailyPlan.reviewVerses.some(v => v.surahId === surahId && v.ayahNumber === ayahNumber);
          newDailyPlan = {
            ...dailyPlan,
            reviewCompleted: isReview ? dailyPlan.reviewCompleted + 1 : dailyPlan.reviewCompleted,
            newCompleted: !isReview ? dailyPlan.newCompleted + 1 : dailyPlan.newCompleted
          };
        }

        set(state => {
          const newProgress = {
            ...state.verseProgress,
            [key]: updatedProgress
          };

          // Update stats
          const allProgress = newProgress;
          const weak = getWeakVerses(allProgress).slice(0, 10);
          const mastered = Object.values(allProgress).filter(p => p.status === 'mastered').length;
          const learned = Object.values(allProgress).filter(p => p.repetitions > 0).length;

          const newStats: UserStats = {
            ...state.stats,
            totalVersesLearned: learned,
            totalVersesMastered: mastered,
            averageRetention: calculateOverallRetention(allProgress),
            weakVerses: weak.map(p => ({ surahId: p.surahId, ayahNumber: p.ayahNumber })),
            xpPoints: newXP,
            level: calculateLevel(newXP),
            lastStudyDate: new Date().toISOString()
          };

          return {
            verseProgress: newProgress,
            stats: newStats,
            dailyPlan: newDailyPlan
          };
        });
      },

      // Start session
      startSession: (mode) => {
        const sessionId = `session_${Date.now()}`;
        const newSession: LearningSession = {
          id: sessionId,
          startTime: new Date().toISOString(),
          mode,
          versesStudied: [],
          totalTime: 0
        };
        
        set(state => ({
          sessions: [...state.sessions, newSession]
        }));
        
        return sessionId;
      },

      // End session
      endSession: (sessionId, versesStudied) => {
        set(state => {
          const updatedSessions = state.sessions.map(s => {
            if (s.id === sessionId) {
              const totalTime = Math.round(
                (new Date().getTime() - new Date(s.startTime).getTime()) / 1000
              );
              return { ...s, endTime: new Date().toISOString(), versesStudied, totalTime };
            }
            return s;
          });

          // Update streak
          const streak = calculateStreak(updatedSessions);
          
          return {
            sessions: updatedSessions,
            stats: {
              ...state.stats,
              currentStreak: streak,
              longestStreak: Math.max(state.stats.longestStreak, streak),
              totalStudyTime: state.stats.totalStudyTime + Math.round(
                updatedSessions.find(s => s.id === sessionId)?.totalTime || 0
              ) / 60
            }
          };
        });
      },

      // Chat
      addChatMessage: (message) => {
        set(state => ({
          chatHistory: [...state.chatHistory, message]
        }));
      },

      clearChatHistory: () => set({ chatHistory: [] }),

      // Refresh stats
      refreshStats: () => {
        const { verseProgress, sessions, stats } = get();
        const streak = calculateStreak(sessions);
        const weak = getWeakVerses(verseProgress).slice(0, 10);
        
        set({
          stats: {
            ...stats,
            currentStreak: streak,
            longestStreak: Math.max(stats.longestStreak, streak),
            averageRetention: calculateOverallRetention(verseProgress),
            weakVerses: weak.map(p => ({ surahId: p.surahId, ayahNumber: p.ayahNumber }))
          }
        });
      },

      // Reset app
      resetApp: () => {
        set({
          isOnboarded: false,
          profile: null,
          currentScreen: 'onboarding',
          dailyPlan: null,
          stats: DEFAULT_STATS,
          verseProgress: {},
          sessions: [],
          chatHistory: []
        });
      }
    }),
    {
      name: 'quran-als-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
