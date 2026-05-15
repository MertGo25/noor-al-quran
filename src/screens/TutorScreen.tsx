import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { generateAIResponse } from '../engine/srsAlgorithm';
import { ChatMessage } from '../types';

const QUICK_QUESTIONS = [
  "How do I memorize better?",
  "What is Tafsir?",
  "Explain Al-Fatihah",
  "Best surahs for beginners?",
  "What is Tajweed?",
  "How to be consistent?",
];

export const TutorScreen: React.FC = () => {
  const { setScreen, profile, chatHistory, addChatMessage, clearChatHistory } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  useEffect(() => {
    // Add welcome message if no history
    if (chatHistory.length === 0 && profile) {
      const welcomeMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `Assalamu Alaikum, **${profile.name}**! 🌟\n\nI'm your AI Quran tutor. I'm here to help you on your learning journey.\n\nBased on your profile, you're a **${profile.level === 'none' ? 'complete beginner' : profile.level}** focused on **${profile.goal === 'both' ? 'memorization and understanding' : profile.goal}**.\n\nI can help you with:\n• 📖 Verse explanations and tafsir\n• 🧠 Memorization strategies\n• 🔤 Arabic word meanings\n• 📅 Study planning\n• ❓ Any Islamic knowledge questions\n\nWhat would you like to explore today?`,
        timestamp: new Date().toISOString()
      };
      addChatMessage(welcomeMsg);
    }
  }, []);

  const handleSend = async (message?: string) => {
    const text = message || input.trim();
    if (!text || isTyping) return;
    if (!profile) return;

    setInput('');

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };
    addChatMessage(userMsg);

    // Show typing
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    // Generate response
    const response = generateAIResponse(text, profile);
    const assistantMsg: ChatMessage = {
      id: `msg_${Date.now() + 1}`,
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    };

    setIsTyping(false);
    addChatMessage(assistantMsg);
  };

  const formatMessage = (content: string) => {
    // Basic markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold text-accent">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith('• ')) {
          return (
            <div key={i} className="flex items-start gap-2 my-0.5">
              <span className="text-accent mt-0.5">•</span>
              <span>{formatInline(line.slice(2))}</span>
            </div>
          );
        }
        if (line.startsWith('**') || line.includes('**')) {
          return <p key={i}>{formatInline(line)}</p>;
        }
        if (line === '') return <br key={i} />;
        return <p key={i} className="my-0.5">{formatInline(line)}</p>;
      });
  };

  const formatInline = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="text-accent font-semibold">{part}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-8 pb-3" style={{ background: 'var(--color-bg-primary)' }}>
        <button onClick={() => setScreen('dashboard')} className="p-2 rounded-xl bg-secondary">
          <ChevronLeft size={20} className="text-primary-c" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))', border: '1px solid rgba(201,168,76,0.4)' }}>
            <Bot size={20} className="text-accent" />
          </div>
          <div>
            <h1 className="font-bold text-primary-c">AI Quran Tutor</h1>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs text-secondary-c">Always ready to help</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => { clearChatHistory(); }}
          className="p-2 rounded-xl"
          style={{ background: 'var(--color-bg-secondary)' }}
          title="Clear chat"
        >
          <RotateCcw size={16} className="text-muted-c" />
        </button>
      </div>

      {/* Quick Questions */}
      {chatHistory.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-secondary-c mb-2 uppercase tracking-wider">Quick Questions</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap text-xs px-3 py-2 rounded-full flex-shrink-0 transition-all hover:scale-105"
                style={{
                  background: 'var(--color-accent-muted)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: 'var(--color-accent)'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4" style={{ paddingBottom: '80px' }}>
        <AnimatePresence>
          {chatHistory.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                msg.role === 'user'
                  ? 'bg-accent text-black'
                  : 'bg-accent-muted border border-accent'
              }`} style={{ borderColor: msg.role === 'assistant' ? 'rgba(201,168,76,0.4)' : undefined }}>
                {msg.role === 'user'
                  ? <User size={14} className="text-black" />
                  : <Sparkles size={14} className="text-accent" />
                }
              </div>

              {/* Message bubble */}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-tr-sm text-white'
                    : 'rounded-tl-sm'
                }`}
                style={{
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #c9a84c, #b8860b)'
                    : 'var(--color-bg-card)',
                  border: msg.role === 'assistant' ? '1px solid rgba(201,168,76,0.15)' : 'none',
                  color: msg.role === 'user' ? '#fff' : 'var(--color-text-primary)'
                }}
              >
                <div className="space-y-1">
                  {formatMessage(msg.content)}
                </div>
                <p className="text-xs mt-2 opacity-50 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 items-start"
          >
            <div className="w-8 h-8 rounded-full bg-accent-muted border flex items-center justify-center"
              style={{ borderColor: 'rgba(201,168,76,0.4)' }}>
              <Sparkles size={14} className="text-accent" />
            </div>
            <div className="rounded-2xl rounded-tl-sm p-4 flex items-center gap-1"
              style={{ background: 'var(--color-bg-card)', border: '1px solid rgba(201,168,76,0.15)' }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Topics when mid-conversation */}
      {chatHistory.length > 2 && chatHistory.length < 6 && (
        <div className="px-4 py-2">
          <div className="flex gap-2 overflow-x-auto">
            {['Tell me more', 'Give an example', 'How to practice?', 'Related verses'].map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full flex-shrink-0"
                style={{
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div
        className="px-4 py-3 fixed bottom-16 left-0 right-0"
        style={{ background: 'var(--color-bg-primary)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div className="flex gap-2 items-end">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask anything about the Quran..."
            className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none resize-none"
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid rgba(201,168,76,0.25)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-latin)'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              background: input.trim() && !isTyping
                ? 'linear-gradient(135deg, #c9a84c, #e8c97e)'
                : 'var(--color-bg-secondary)',
              border: `1px solid ${input.trim() ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
              color: input.trim() ? '#0f1923' : 'var(--color-text-muted)',
              transform: input.trim() && !isTyping ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-muted-c text-center mt-2">
          AI responses are simplified educational explanations
        </p>
      </div>
    </div>
  );
};
