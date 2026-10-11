import React, { useState, useEffect, useRef } from 'react';
import { EmmyLogo } from './EmmyLogo';
import {
  Sparkles,
  X,
  Send,
  Mic,
  MicOff,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRight,
  AlertCircle,
  Bot,
  User,
  Flame,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: string;
}

interface EmmyAiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  initialPrompt?: string;
}

const SUGGESTED_QUESTIONS = [
  'What training programs do you offer?',
  'How do I claim my free introductory session?',
  'What are your membership prices?',
  'What are your verified opening hours?',
  'Where is EMMY Boxing Club located?',
  'What should I wear for my first workout?',
];

export const EmmyAiAssistant: React.FC<EmmyAiAssistantProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      role: 'assistant',
      text: 'Welcome to EMMY Boxing Club! I’m EMMY AI, your club assistant. I can help you explore our training programs, understand our verified membership options, check our confirmed opening hours and location, and guide you toward booking a free introductory session.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [micNotice, setMicNotice] = useState<string | null>(null);

  // Speech synthesis (TTS) states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastAssistantSpeech, setLastAssistantSpeech] = useState<string>(
    'Welcome to EMMY Boxing Club! I am EMMY AI, your club assistant.'
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle external prompt if passed
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Initialize Speech Recognition once
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setMicNotice(null);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setInput(transcript);

          if (event.results[current].isFinal) {
            setIsListening(false);
            if (transcript.trim().length > 0) {
              handleSendMessage(transcript.trim());
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition event:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setMicNotice(
              'Microphone access is unavailable. You can still ask EMMY AI questions using the text box below.'
            );
          } else if (event.error === 'no-speech') {
            setMicNotice('No speech was detected. Please tap the mic and speak clearly.');
          } else {
            setMicNotice('Voice input timed out. You can continue typing in the text box.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        setVoiceSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-To-Speech function
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const engVoice = voices.find(
        (v) =>
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel')) &&
          v.lang.startsWith('en')
      );
      if (engVoice) utterance.voice = engVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setLastAssistantSpeech(cleanText);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!voiceSupported) {
      setMicNotice('Voice recognition is not supported in this browser. Please use text chat.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      setMicNotice(null);
      stopSpeaking();
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorMessage(null);
    setMicNotice(null);
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages.slice(-5),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server was unable to process question.');
      }

      const assistantReply =
        data.reply ||
        'At EMMY Boxing Club, we guide members through Boxing Fundamentals, Heavy Bag Conditioning, and our other specialized disciplines. Would you like to book a free introductory workout?';

      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: assistantReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(assistantReply);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Unable to connect with AI service. You can still reach us directly or submit a booking request.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    stopSpeaking();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
    }
    setMessages([
      {
        id: 'm-welcome-reset',
        role: 'assistant',
        text: 'Conversation reset. I’m EMMY AI, your club assistant. How can I help you discover EMMY Boxing Club or claim your free introductory session?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInput('');
    setErrorMessage(null);
    setMicNotice(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex flex-col w-full sm:w-[440px] md:w-[480px] h-full sm:h-[620px] max-h-screen bg-white sm:border border-[#E5E5E5] sm:shadow-2xl overflow-hidden font-body animate-in slide-in-from-bottom-6 duration-200">
      
      {/* Top Header Bar */}
      <div className="bg-[#111111] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#D3121A] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#D3121A] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg tracking-wider text-white">EMMY AI</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
              Official Club Representative
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Audio Speaking Controller */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-1.5 text-[#FFA5A9] hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
              title="Stop Speaking"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          )}

          {/* Reset Conversation */}
          <button
            onClick={handleReset}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
            title="Reset Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-1.5 text-gray-400 hover:text-[#D3121A] hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Close EMMY AI"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Free Trial Banner in Assistant */}
      <div className="bg-[#F7F6F3] border-b border-[#E8E8E8] px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <Flame className="w-3.5 h-3.5 text-[#D3121A] shrink-0" />
          <span className="font-bold text-[#111111]">Complimentary First Session</span>
        </div>
        <button
          onClick={() => {
            onClose();
            onOpenBooking();
          }}
          className="text-[11px] font-bold uppercase tracking-wider text-[#D3121A] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Claim Trial</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Mic Notice / Permission Banner */}
      {micNotice && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{micNotice}</span>
          </div>
          <button
            onClick={() => setMicNotice(null)}
            className="text-amber-800 hover:text-amber-950 font-bold ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Message History Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white text-sm">
        {messages.map((msg) => {
          const isAi = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 leading-relaxed rounded-none border ${
                  isAi
                    ? 'bg-[#F7F6F3] text-[#111111] border-[#E8E8E8]'
                    : 'bg-[#111111] text-white border-[#111111]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-bold tracking-wider opacity-70">
                  {isAi ? (
                    <>
                      <Bot className="w-3 h-3 text-[#D3121A]" />
                      <span>EMMY AI</span>
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 text-gray-400" />
                      <span>You</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>

              {/* Replay spoken answer button for assistant */}
              {isAi && (
                <div className="mt-1 flex items-center gap-2">
                  <button
                    onClick={() => speakText(msg.text)}
                    className="text-[10px] text-gray-500 hover:text-[#D3121A] flex items-center gap-1 cursor-pointer transition-colors"
                    title="Listen to this answer"
                  >
                    <Volume2 className="w-3 h-3 text-[#D3121A]" />
                    <span>Replay Voice</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Thinking / Loading indicator */}
        {loading && (
          <div className="flex items-start">
            <div className="bg-[#F7F6F3] border border-[#E8E8E8] p-3 text-xs text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D3121A] animate-ping"></span>
              <span>EMMY AI is formulating response...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Scroll */}
      <div className="px-4 py-2 bg-[#FAFAFA] border-t border-[#E8E8E8] overflow-x-auto scrollbar-none shrink-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1.5">
          Suggested Topics
        </p>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-white hover:bg-[#D3121A] hover:text-white text-[#333333] px-3 py-1.5 border border-[#E0E0E0] transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Active Listening Indicator */}
      {isListening && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2 flex items-center justify-between text-xs text-red-700 shrink-0 animate-pulse">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-[#D3121A]" />
            <span className="font-semibold">Listening to speech... speak your question</span>
          </div>
          <button
            onClick={toggleListening}
            className="text-[11px] font-bold uppercase text-[#D3121A] underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-3 bg-white border-t border-[#E8E8E8] flex items-center gap-2 shrink-0"
      >
        {/* Voice Input Microphone Button */}
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2.5 transition-colors cursor-pointer ${
            isListening
              ? 'bg-[#D3121A] text-white animate-pulse'
              : 'bg-[#F7F6F3] hover:bg-[#EAEAEA] text-[#111111] border border-[#E0E0E0]'
          }`}
          title={isListening ? 'Stop listening' : 'Speak using microphone'}
          aria-label="Microphone Voice Input"
        >
          {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#D3121A]" />}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask EMMY AI about classes, pricing..."
          className="flex-1 px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E0E0E0] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
          disabled={loading}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 bg-[#111111] hover:bg-[#D3121A] text-white transition-colors disabled:opacity-30 cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
