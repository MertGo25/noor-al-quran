import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Search, BookOpen, ChevronRight, Star, MapPin, Info, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { SURAHS } from '../data/surahs';
import { getSurahAyahs } from '../data/ayahs';
import { Surah, Ayah } from '../types';

export const QuranScreen: React.FC = () => {
  const { setScreen, verseProgress } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredSurahs = SURAHS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameArabic.includes(searchQuery) ||
      s.nameTranslation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filter === 'all' || s.difficulty === filter;
    return matchSearch && matchFilter;
  });

  const getMasteryForSurah = (surahId: number) => {
    const ayahs = getSurahAyahs(surahId);
    if (ayahs.length === 0) return 0;
    const studied = ayahs.filter(a => {
      const key = `${a.surahId}:${a.ayahNumber}`;
      return verseProgress[key] && verseProgress[key].repetitions > 0;
    });
    return Math.round((studied.length / ayahs.length) * 100);
  };

  const getStatusBadge = (surahId: number) => {
    const mastery = getMasteryForSurah(surahId);
    if (mastery === 0) return null;
    if (mastery === 100) return { label: 'Mastered', color: '#4caf82' };
    if (mastery > 50) return { label: `${mastery}%`, color: '#e8a838' };
    return { label: `${mastery}%`, color: '#5b9dd9' };
  };

  return (
    <div className="min-h-screen bg-primary pb-24">
      {/* Header */}
      <div className="px-4 pt-8 pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setScreen('dashboard')} className="p-2 rounded-xl bg-secondary">
            <ChevronLeft size={20} className="text-primary-c" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary-c">Browse Quran</h1>
            <p className="text-secondary-c text-xs">{SURAHS.length} Surahs available</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-c" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search surahs..."
            className="w-full pl-9 pr-4 py-3 rounded-xl outline-none text-sm"
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-latin)'
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`tab-pill whitespace-nowrap text-xs ${filter === f ? 'active' : ''}`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Surah List */}
      {!selectedSurah ? (
        <div className="px-4 space-y-2">
          {filteredSurahs.map((surah, i) => {
            const badge = getStatusBadge(surah.id);
            const ayahsAvailable = getSurahAyahs(surah.id).length;
            
            return (
              <motion.button
                key={surah.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedSurah(surah)}
                className="verse-card p-4 w-full flex items-center gap-4 text-left"
              >
                {/* Number */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: surah.difficulty === 'beginner'
                      ? 'rgba(76,175,130,0.15)'
                      : surah.difficulty === 'intermediate'
                      ? 'rgba(232,168,56,0.15)'
                      : 'rgba(224,85,85,0.15)',
                    color: surah.difficulty === 'beginner'
                      ? '#4caf82'
                      : surah.difficulty === 'intermediate'
                      ? '#e8a838'
                      : '#e05555'
                  }}>
                  {surah.id}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-primary-c">{surah.name}</p>
                    {badge && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                        style={{ background: `${badge.color}20`, color: badge.color }}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-secondary-c">{surah.nameTranslation}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-c flex items-center gap-1">
                      <MapPin size={10} /> {surah.revelationPlace}
                    </span>
                    <span className="text-xs text-muted-c">
                      {ayahsAvailable > 0 ? `${ayahsAvailable} available` : `${surah.totalAyahs} ayahs`}
                    </span>
                  </div>
                </div>

                {/* Arabic name */}
                <div className="text-right">
                  <p className="font-arabic text-lg text-accent">{surah.nameArabic}</p>
                  <ChevronRight size={14} className="text-muted-c ml-auto mt-1" />
                </div>
              </motion.button>
            );
          })}

          {filteredSurahs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-secondary-c">No surahs found</p>
            </div>
          )}
        </div>
      ) : (
        /* Surah Detail */
        <SurahDetail
          surah={selectedSurah}
          onBack={() => setSelectedSurah(null)}
          onAyahSelect={setSelectedAyah}
          verseProgress={verseProgress}
        />
      )}

      {/* Ayah Detail Modal */}
      <AnimatePresence>
        {selectedAyah && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setSelectedAyah(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-lg rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto"
              style={{ background: 'var(--color-bg-card)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-accent" />
                  <span className="text-sm font-semibold text-secondary-c">
                    {selectedSurah?.name} : {selectedAyah.ayahNumber}
                  </span>
                </div>
                <button onClick={() => setSelectedAyah(null)} className="p-1">
                  <X size={20} className="text-muted-c" />
                </button>
              </div>

              <p className="text-arabic arabic-xl text-accent text-center leading-loose mb-4">
                {selectedAyah.arabic}
              </p>
              <p className="text-secondary-c text-sm italic text-center mb-3">
                {selectedAyah.transliteration}
              </p>
              <p className="text-primary-c text-center font-medium mb-4">
                {selectedAyah.translation}
              </p>

              {/* Word Analysis */}
              {selectedAyah.words && selectedAyah.words.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-secondary-c uppercase tracking-wider mb-2">Word by Word</p>
                  <div className="space-y-2">
                    {selectedAyah.words.map((w, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-xl"
                        style={{ background: 'var(--color-bg-secondary)' }}>
                        <span className="font-arabic text-xl text-accent w-16 text-center">{w.arabic}</span>
                        <div>
                          <p className="text-xs text-muted-c">{w.transliteration}</p>
                          <p className="text-sm text-primary-c font-medium">{w.meaning}</p>
                          {w.grammar && <p className="text-xs text-muted-c">{w.grammar}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tafsir */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(91,157,217,0.08)', border: '1px solid rgba(91,157,217,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} style={{ color: '#5b9dd9' }} />
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5b9dd9' }}>Tafsir</p>
                </div>
                <p className="text-secondary-c text-sm leading-relaxed">{selectedAyah.tafsir}</p>
              </div>

              {selectedAyah.revelationReason && (
                <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <p className="text-xs font-semibold text-accent mb-1">🕌 Context of Revelation</p>
                  <p className="text-secondary-c text-xs leading-relaxed">{selectedAyah.revelationReason}</p>
                </div>
              )}

              {/* Themes */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedAyah.themes.map(theme => (
                  <span key={theme} className="text-xs px-2 py-1 rounded-full bg-accent-muted text-accent border"
                    style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                    {theme}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SurahDetail: React.FC<{
  surah: Surah;
  onBack: () => void;
  onAyahSelect: (ayah: Ayah) => void;
  verseProgress: Record<string, any>;
}> = ({ surah, onBack, onAyahSelect, verseProgress }) => {
  const ayahs = getSurahAyahs(surah.id);

  return (
    <div>
      {/* Surah Header */}
      <div className="px-4 mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-accent text-sm mb-4">
          <ChevronLeft size={16} /> All Surahs
        </button>
        <div className="verse-card p-5 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(26,40,64,0.9))' }}>
          <p className="font-arabic text-4xl text-accent mb-1">{surah.nameArabic}</p>
          <h2 className="text-xl font-bold text-primary-c">{surah.name}</h2>
          <p className="text-secondary-c text-sm">{surah.nameTranslation}</p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-c">
            <span className="flex items-center gap-1"><MapPin size={11} />{surah.revelationPlace}</span>
            <span>{surah.totalAyahs} Ayahs</span>
            <span className={`px-2 py-0.5 rounded-full ${
              surah.difficulty === 'beginner' ? 'badge-easy' :
              surah.difficulty === 'intermediate' ? 'badge-medium' : 'badge-hard'
            }`}>
              {surah.difficulty}
            </span>
          </div>
          <p className="text-xs text-secondary-c mt-2 italic">{surah.theme}</p>
        </div>
      </div>

      {/* Basmala */}
      {surah.id !== 9 && (
        <div className="px-4 mb-3">
          <p className="text-arabic arabic-lg text-accent text-center">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-secondary-c text-xs text-center">In the name of Allah, the Most Gracious, the Most Merciful</p>
        </div>
      )}

      {/* Ayah List */}
      <div className="px-4 space-y-3">
        {ayahs.length > 0 ? ayahs.map((ayah, i) => {
          const key = `${ayah.surahId}:${ayah.ayahNumber}`;
          const prog = verseProgress[key];
          const hasProgress = prog && prog.repetitions > 0;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onAyahSelect(ayah)}
              className="verse-card p-4 w-full text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1"
                  style={{
                    background: hasProgress ? 'rgba(201,168,76,0.2)' : 'var(--color-bg-secondary)',
                    color: hasProgress ? '#c9a84c' : 'var(--color-text-muted)'
                  }}>
                  {ayah.ayahNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-arabic arabic-sm text-accent leading-loose mb-2 text-right">
                    {ayah.arabic}
                  </p>
                  <p className="text-secondary-c text-xs">{ayah.translation}</p>
                  {hasProgress && (
                    <div className="flex items-center gap-2 mt-2">
                      <Star size={10} className="text-accent" />
                      <span className="text-xs text-accent">{prog.retentionScore}% retention</span>
                      <span className="text-xs text-muted-c capitalize">{prog.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        }) : (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">📖</p>
            <p className="text-secondary-c text-sm">Full content for this surah will be available in the complete version</p>
            <p className="text-xs text-muted-c mt-1">This surah has {surah.totalAyahs} ayahs total</p>
          </div>
        )}
      </div>
    </div>
  );
};
