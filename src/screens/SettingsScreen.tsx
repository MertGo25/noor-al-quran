import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Moon, Sun, Target, Clock, Brain,
  Globe, Zap, Heart, Trash2, Shield, Info
} from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const SettingsScreen: React.FC = () => {
  const { setScreen, profile, theme, toggleTheme, resetApp } = useAppStore();

  const handleReset = () => {
    if (window.confirm('Are you sure? This will delete all your progress permanently.')) {
      resetApp();
    }
  };

  const settingRow = (icon: React.ReactNode, label: string, value: string, color?: string) => (
    <div className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: color ? `${color}20` : 'var(--color-bg-secondary)' }}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-secondary-c">{label}</p>
        <p className="text-sm font-medium text-primary-c capitalize">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-primary pb-24">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => setScreen('dashboard')} className="p-2 rounded-xl bg-secondary">
            <ChevronLeft size={20} className="text-primary-c" />
          </button>
          <h1 className="text-xl font-bold text-primary-c">Settings</h1>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Profile Card */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="verse-card p-5"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(26,40,64,0.95))' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c97e)', color: '#0f1923' }}>
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-primary-c text-lg">{profile.name}</h2>
                <p className="text-secondary-c text-sm capitalize">{profile.level} learner</p>
                <p className="text-xs text-muted-c">Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-0.5">
              {settingRow(<Target size={15} className="text-accent" />, 'Learning Goal', profile.goal === 'both' ? 'Memorization + Understanding' : profile.goal, '#c9a84c')}
              {settingRow(<Clock size={15} className="text-info" />, 'Daily Time', `${profile.dailyTimeMinutes} minutes`, '#5b9dd9')}
              {settingRow(<Brain size={15} className="text-success" />, 'Learning Style', profile.learningStyle, '#4caf82')}
              {settingRow(<Globe size={15} className="text-warning" />, 'Language', profile.language, '#e8a838')}
              {settingRow(<Zap size={15} className="text-danger" />, 'Memory Strength', profile.memoryStrength, '#e05555')}
              {settingRow(<Heart size={15} className="text-accent" />, 'Motivation Level', profile.motivationLevel, '#c9a84c')}
            </div>
          </motion.div>
        )}

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="verse-card p-4"
        >
          <h3 className="font-semibold text-secondary-c text-xs uppercase tracking-wider mb-3">Appearance</h3>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.15)' }}>
                {theme === 'dark' ? <Moon size={16} className="text-accent" /> : <Sun size={16} className="text-accent" />}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-primary-c">Theme</p>
                <p className="text-xs text-secondary-c">Currently {theme} mode</p>
              </div>
            </div>
            <div
              className="w-12 h-6 rounded-full relative transition-all"
              style={{ background: theme === 'dark' ? '#c9a84c' : 'rgba(201,168,76,0.3)' }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full transition-all"
                style={{
                  background: 'white',
                  left: theme === 'dark' ? '28px' : '4px'
                }}
              />
            </div>
          </button>
        </motion.div>

        {/* Learning Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="verse-card p-4"
        >
          <h3 className="font-semibold text-secondary-c text-xs uppercase tracking-wider mb-3">Learning Settings</h3>
          <div className="space-y-1">
            {profile && (
              <>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-primary-c">Daily New Verses</p>
                    <p className="text-xs text-secondary-c">New verses per day</p>
                  </div>
                  <span className="text-accent font-bold">{profile.newVerseQuota}</span>
                </div>
                <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                  <div>
                    <p className="text-sm font-medium text-primary-c">Review Quota</p>
                    <p className="text-xs text-secondary-c">Max reviews per day</p>
                  </div>
                  <span className="text-accent font-bold">{profile.reviewVerseQuota}</span>
                </div>
                <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                  <div>
                    <p className="text-sm font-medium text-primary-c">Explanation Depth</p>
                    <p className="text-xs text-secondary-c">Tafsir detail level</p>
                  </div>
                  <span className="text-accent font-bold capitalize">{profile.explanationDepth}</span>
                </div>
                <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                  <div>
                    <p className="text-sm font-medium text-primary-c">Gamification</p>
                    <p className="text-xs text-secondary-c">XP and level system</p>
                  </div>
                  <div
                    className="w-10 h-5 rounded-full relative"
                    style={{ background: profile.gamificationEnabled ? '#c9a84c' : 'rgba(201,168,76,0.2)' }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                      style={{ left: profile.gamificationEnabled ? '22px' : '2px', transition: 'left 0.2s' }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="verse-card p-4"
        >
          <h3 className="font-semibold text-secondary-c text-xs uppercase tracking-wider mb-3">About</h3>
          <div className="space-y-2">
            {[
              { icon: <Info size={15} className="text-accent" />, label: 'Version', value: '1.0.0' },
              { icon: <Shield size={15} className="text-accent" />, label: 'Algorithm', value: 'SM-2 Spaced Repetition' },
              { icon: <Brain size={15} className="text-accent" />, label: 'AI Tutor', value: 'Rule-based NLP' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 py-1.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-accent-muted">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="text-xs text-secondary-c">{item.label}</span>
                </div>
                <span className="text-xs text-primary-c font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <p className="text-arabic text-accent text-center text-lg mb-1">اقْرَأْ بِاسْمِ رَبِّكَ</p>
            <p className="text-xs text-muted-c text-center">Built with ❤️ for the Quran learning community</p>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="verse-card p-4"
          style={{ borderColor: 'rgba(224,85,85,0.3)' }}
        >
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: '#e05555' }}>
            Danger Zone
          </h3>
          <p className="text-secondary-c text-xs mb-3">
            This will permanently delete all your progress, learning data, and profile. This cannot be undone.
          </p>
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all hover:scale-[0.99]"
            style={{ background: 'rgba(224,85,85,0.15)', color: '#e05555', border: '1px solid rgba(224,85,85,0.3)' }}
          >
            <Trash2 size={16} /> Reset All Progress
          </button>
        </motion.div>
      </div>
    </div>
  );
};
