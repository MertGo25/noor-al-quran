import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, BookOpen, Brain, TrendingUp, ChevronRight,
  Target, Clock, Star, Zap, Award
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { xpForNextLevel } from '../engine/srsAlgorithm';

export const DashboardScreen: React.FC = () => {
  const { profile, stats, dailyPlan, setScreen, refreshDailyPlan, refreshStats } = useAppStore();

  useEffect(() => {
    refreshDailyPlan();
    refreshStats();
  }, []);

  const totalDue = (dailyPlan?.newVerses.length || 0) + (dailyPlan?.reviewVerses.length || 0);
  const totalCompleted = (dailyPlan?.newCompleted || 0) + (dailyPlan?.reviewCompleted || 0);
  const planProgress = totalDue > 0 ? Math.round((totalCompleted / totalDue) * 100) : 0;

  const xpForNext = xpForNextLevel(stats.level);
  const xpProgress = xpForNext > 0 ? Math.min(100, Math.round((stats.xpPoints / xpForNext) * 100)) : 0;

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const arabic_greeting = new Date().getHours() < 12 ? 'صَبَاحُ الْخَيْرِ' : 'مَسَاءُ الْخَيْرِ';

  return (
    <div className="min-h-screen bg-primary pb-24 islamic-pattern">
      {/* Header */}
      <div className="px-4 pt-8 pb-4" style={{ background: 'linear-gradient(180deg, rgba(22,32,50,0.95) 0%, transparent 100%)' }}>
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-secondary-c text-sm">{greetingTime()}</p>
            <h1 className="text-2xl font-bold text-primary-c">{profile?.name || 'Learner'} 👋</h1>
          </div>
          <div className="text-right">
            <p className="text-accent font-arabic text-xl">{arabic_greeting}</p>
            <div className="flex items-center gap-1 justify-end mt-1">
              <Flame size={16} className="streak-fire" style={{ color: '#ff8c00' }} />
              <span className="text-sm font-bold" style={{ color: '#ff8c00' }}>{stats.currentStreak} day streak</span>
            </div>
          </div>
        </div>

        {/* XP Level Bar */}
        <div className="verse-card p-3 mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97e)' }}>
                {stats.level}
              </div>
              <div>
                <p className="text-xs text-secondary-c">Level {stats.level}</p>
                <p className="text-sm font-semibold text-accent">{stats.xpPoints} XP</p>
              </div>
            </div>
            <p className="text-xs text-muted-c">{xpForNext - stats.xpPoints} XP to next level</p>
          </div>
          <div className="mastery-bar">
            <motion.div
              className="mastery-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Daily Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="verse-card p-4"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(26,40,64,0.9))' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-accent" />
              <h2 className="font-bold text-primary-c">Today's Plan</h2>
            </div>
            <span className="text-xs text-secondary-c flex items-center gap-1">
              <Clock size={12} /> ~{dailyPlan?.estimatedMinutes || profile?.dailyTimeMinutes || 20} min
            </span>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-secondary-c mb-1.5">
              <span>{totalCompleted} of {totalDue} complete</span>
              <span className="text-accent font-semibold">{planProgress}%</span>
            </div>
            <div className="mastery-bar">
              <motion.div
                className="mastery-fill"
                initial={{ width: 0 }}
                animate={{ width: `${planProgress}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(201,168,76,0.1)' }}>
              <p className="text-2xl font-bold text-accent">{dailyPlan?.newVerses.length || 0}</p>
              <p className="text-xs text-secondary-c">New Verses</p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(91,157,217,0.1)' }}>
              <p className="text-2xl font-bold" style={{ color: '#5b9dd9' }}>{dailyPlan?.reviewVerses.length || 0}</p>
              <p className="text-xs text-secondary-c">Reviews Due</p>
            </div>
          </div>

          <button
            onClick={() => setScreen('learn')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <BookOpen size={18} />
            {planProgress === 0 ? "Start Today's Lesson" : planProgress === 100 ? "Review Complete ✅" : "Continue Learning"}
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-secondary-c mb-3 uppercase tracking-wider">Your Progress</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: BookOpen, label: 'Verses Learned', value: stats.totalVersesLearned, color: '#c9a84c', sub: 'total' },
              { icon: Brain, label: 'Mastered', value: stats.totalVersesMastered, color: '#4caf82', sub: 'verses' },
              { icon: TrendingUp, label: 'Retention', value: `${stats.averageRetention}%`, color: '#5b9dd9', sub: 'avg score' },
              { icon: Star, label: 'Streak', value: `${stats.currentStreak}d`, color: '#ff8c00', sub: 'current' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="verse-card p-4"
              >
                <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                  style={{ background: `${stat.color}20` }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-primary-c">{stat.value}</p>
                <p className="text-xs text-secondary-c">{stat.label}</p>
                <p className="text-xs text-muted-c">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-secondary-c mb-3 uppercase tracking-wider">Quick Access</h3>
          <div className="space-y-2">
            {[
              { icon: Brain, label: 'Quiz Mode', sub: 'Test your knowledge', screen: 'quiz' as const, color: '#c9a84c' },
              { icon: BookOpen, label: 'Browse Quran', sub: 'Explore all Surahs', screen: 'quran' as const, color: '#5b9dd9' },
              { icon: Zap, label: 'AI Tutor', sub: 'Ask any question', screen: 'tutor' as const, color: '#4caf82' },
              { icon: TrendingUp, label: 'Analytics', sub: 'View detailed progress', screen: 'progress' as const, color: '#e8a838' },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onClick={() => setScreen(action.screen)}
                className="verse-card p-4 w-full flex items-center gap-4 hover:scale-[1.01] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${action.color}20` }}>
                  <action.icon size={22} style={{ color: action.color }} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-primary-c">{action.label}</p>
                  <p className="text-xs text-secondary-c">{action.sub}</p>
                </div>
                <ChevronRight size={18} className="text-muted-c" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Weak Verses Alert */}
        {stats.weakVerses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="verse-card p-4"
            style={{ borderColor: 'rgba(224,85,85,0.4)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Award size={18} style={{ color: '#e05555' }} />
              <h3 className="font-semibold" style={{ color: '#e05555' }}>Needs Attention</h3>
            </div>
            <p className="text-xs text-secondary-c mb-3">
              {stats.weakVerses.length} verse{stats.weakVerses.length > 1 ? 's' : ''} need extra review
            </p>
            <button
              onClick={() => setScreen('learn')}
              className="w-full py-2 px-4 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(224,85,85,0.15)', color: '#e05555', border: '1px solid rgba(224,85,85,0.3)' }}
            >
              Review Weak Verses →
            </button>
          </motion.div>
        )}

        {/* Verse of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="verse-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent">✨</span>
            <h3 className="font-semibold text-secondary-c text-sm uppercase tracking-wider">Verse of the Day</h3>
          </div>
          <p className="text-arabic arabic-lg text-accent text-center mb-3 leading-loose">
            فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
          </p>
          <p className="text-primary-c text-center text-sm font-medium mb-1">
            "For indeed, with hardship will be ease."
          </p>
          <p className="text-muted-c text-xs text-center">— Ash-Sharh 94:5</p>
        </motion.div>
      </div>
    </div>
  );
};
