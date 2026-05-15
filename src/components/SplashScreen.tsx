import React from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0f1923 60%, #162032 100%)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => setTimeout(onComplete, 1800)}
    >
      {/* Decorative background rings */}
      <div className="absolute inset-0 overflow-hidden">
        {[300, 500, 700].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(201,168,76,0.08)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div
            className="w-28 h-28 rounded-full mx-auto flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.08))',
              border: '2px solid rgba(201,168,76,0.5)',
              boxShadow: '0 0 60px rgba(201,168,76,0.25)'
            }}
          >
            <span className="text-5xl">📖</span>
          </div>
        </motion.div>

        <motion.p
          className="text-arabic text-3xl text-accent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h1 className="text-2xl font-bold text-primary-c mb-1">Quran ALS</h1>
          <p className="text-secondary-c text-sm">Adaptive Learning System</p>
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100px', opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mx-auto mt-8 h-px rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex items-center justify-center gap-2"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: '#c9a84c' }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
