import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, Award, Flame, Brain, BookOpen, Target, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppStore } from '../store/appStore';
import { SURAHS } from '../data/surahs';
import { xpForNextLevel } from '../engine/srsAlgorithm';

const COLORS = ['#c9a84c', '#4caf82', '#5b9dd9', '#e8a838'];

export const ProgressScreen: React.FC = () => {
  const { setScreen, stats, verseProgress, sessions, profile } = useAppStore();

  // Build weekly study data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const daySessions = sessions.filter(s => s.startTime.startsWith(dateStr));
    const verses = daySessions.reduce((sum, s) => sum + s.versesStudied.length, 0);
    return {
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      verses,
      minutes: Math.round(daySessions.reduce((sum, s) => sum + (s.totalTime || 0), 0) / 60)
    };
  });

  // Mastery breakdown for pie chart
  const masteryData = [
    { name: 'Mastered', value: Object.values(verseProgress).filter(p => p.status === 'mastered').length || 0 },
    { name: 'Reviewing', value: Object.values(verseProgress).filter(p => p.status === 'review').length || 0 },
    { name: 'Learning', value: Object.values(verseProgress).filter(p => p.status === 'learning').length || 0 },
    { name: 'New', value: Object.values(verseProgress).filter(p => p.status === 'new').length || 0 },
  ].filter(d => d.value > 0);

  // Surah progress
  const surahProgress = SURAHS.map(surah => {
    const surahVerses = Object.values(verseProgress).filter(p => p.surahId === surah.id);
    const mastered = surahVerses.filter(p => p.status === 'mastered').length;
    const total = surahVerses.length;
    return {
      surah,
      total,
      mastered,
      avgRetention: total > 0 ? Math.round(surahVerses.reduce((s, p) => s + p.retentionScore, 0) / total) : 0
    };
  }).filter(s => s.total > 0);

  const xpForNext = xpForNextLevel(stats.level);
  const xpPct = xpForNext > 0 ? Math.min(100, Math.round((stats.xpPoints / xpForNext) * 100)) : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="verse-card p-3 text-xs">
          <p className="text-accent font-bold">{label}</p>
          {payload.map((p: any) => (
            <p key={p.name} style={{ color: p.color }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-primary pb-24">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => setScreen('dashboard')} className="p-2 rounded-xl bg-secondary">
            <ChevronLeft size={20} className="text-primary-c" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary-c">My Progress</h1>
            <p className="text-secondary-c text-xs">Detailed analytics</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-5">
        {/* Level Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="verse-card p-4"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(26,40,64,0.95))' }}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97e)' }}>
              {stats.level}
            </div>
            <div>
              <p className="text-xs text-secondary-c">Level {stats.level} Learner</p>
              <p className="text-xl font-bold text-primary-c">{profile?.name}</p>
              <p className="text-sm text-accent">{stats.xpPoints} XP total</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-secondary-c">Progress to Level {stats.level + 1}</span>
              <span className="text-accent">{xpPct}%</span>
            </div>
            <div className="mastery-bar">
              <motion.div className="mastery-fill" animate={{ width: `${xpPct}%` }} transition={{ duration: 0.8 }} />
            </div>
            <p className="text-xs text-muted-c mt-1">{xpForNext - stats.xpPoints} XP needed</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen, label: 'Verses Learned', value: stats.totalVersesLearned, color: '#c9a84c' },
            { icon: Brain, label: 'Mastered', value: stats.totalVersesMastered, color: '#4caf82' },
            { icon: TrendingUp, label: 'Avg Retention', value: `${stats.averageRetention}%`, color: '#5b9dd9' },
            { icon: Flame, label: 'Best Streak', value: `${stats.longestStreak}d`, color: '#ff8c00' },
            { icon: Target, label: 'Study Time', value: `${Math.round(stats.totalStudyTime)}m`, color: '#e8a838' },
            { icon: Star, label: 'Current Streak', value: `${stats.currentStreak}d`, color: '#c9a84c' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="verse-card p-4"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                style={{ background: `${stat.color}20` }}>
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <p className="text-xl font-bold text-primary-c">{stat.value}</p>
              <p className="text-xs text-secondary-c">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="verse-card p-4"
        >
          <h3 className="font-semibold text-primary-c mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-accent" /> Weekly Activity
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={last7Days} barSize={20}>
              <XAxis dataKey="day" tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="verses" fill="#c9a84c" radius={[4, 4, 0, 0]} name="Verses" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Mastery Breakdown */}
        {masteryData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="verse-card p-4"
          >
            <h3 className="font-semibold text-primary-c mb-4 flex items-center gap-2">
              <Brain size={16} className="text-accent" /> Mastery Breakdown
            </h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie
                    data={masteryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {masteryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {masteryData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                      <span className="text-xs text-secondary-c">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-primary-c">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Surah Progress */}
        {surahProgress.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="verse-card p-4"
          >
            <h3 className="font-semibold text-primary-c mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-accent" /> Surah Progress
            </h3>
            <div className="space-y-3">
              {surahProgress.map(({ surah, total, mastered, avgRetention }) => (
                <div key={surah.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-arabic text-accent text-sm">{surah.nameArabic}</span>
                      <span className="text-xs text-secondary-c">{surah.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-c">{mastered}/{total}</span>
                      <span className="text-xs font-bold text-accent">{avgRetention}%</span>
                    </div>
                  </div>
                  <div className="mastery-bar">
                    <motion.div
                      className="mastery-fill"
                      animate={{ width: `${total > 0 ? (mastered / total) * 100 : 0}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Weak Verses */}
        {stats.weakVerses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="verse-card p-4"
            style={{ borderColor: 'rgba(224,85,85,0.3)' }}
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#e05555' }}>
              <Award size={16} style={{ color: '#e05555' }} /> Weak Verses — Needs Review
            </h3>
            <div className="space-y-2">
              {stats.weakVerses.map((v, i) => {
                const key = `${v.surahId}:${v.ayahNumber}`;
                const prog = verseProgress[key];
                const surah = SURAHS.find(s => s.id === v.surahId);
                return (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl"
                    style={{ background: 'var(--color-bg-secondary)' }}>
                    <div>
                      <span className="text-xs font-semibold text-secondary-c">
                        {surah?.name || `Surah ${v.surahId}`} : {v.ayahNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="mastery-bar w-16">
                        <div className="h-full rounded-full" style={{
                          width: `${prog?.retentionScore || 0}%`,
                          background: '#e05555'
                        }} />
                      </div>
                      <span className="text-xs" style={{ color: '#e05555' }}>{prog?.retentionScore || 0}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setScreen('learn')}
              className="w-full mt-3 py-2 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(224,85,85,0.15)', color: '#e05555', border: '1px solid rgba(224,85,85,0.3)' }}
            >
              Review Weak Verses →
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {stats.totalVersesLearned === 0 && (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">📊</p>
            <p className="text-secondary-c">Start learning to see your progress!</p>
            <button onClick={() => setScreen('learn')} className="btn-primary mt-4">
              Begin Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
