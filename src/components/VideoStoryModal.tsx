import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, ArrowRight, Sparkles, Film, CheckCircle2 } from 'lucide-react';
import { EmmyLogo } from './EmmyLogo';

interface VideoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

const CHAPTERS = [
  { time: 0, title: 'Discipline & Preparation', tag: '01' },
  { time: 4, title: 'World-Class Facility', tag: '02' },
  { time: 8, title: 'Relentless Conditioning', tag: '03' },
  { time: 12, title: 'Championship Ringcraft', tag: '04' },
  { time: 16, title: 'More Than A Gym', tag: '05' },
];

export const VideoStoryModal: React.FC<VideoStoryModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20.4);
  const [volume, setVolume] = useState(0.8);
  const [showControls, setShowControls] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  // Auto-play when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setCurrentTime(0);
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {
            // Browser autoplay policy might require user gesture or muted
            setIsMuted(true);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => setIsPlaying(false));
            }
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts (Space, ESC, M, F)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, isMuted]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && volume === 0) {
      setVolume(0.8);
      videoRef.current.volume = 0.8;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);
    if (videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
    // Update active chapter index
    const chIdx = CHAPTERS.reduce((acc, ch, idx) => (curr >= ch.time ? idx : acc), 0);
    setActiveChapterIndex(chIdx);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const jumpToChapter = (chapterTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = chapterTime;
      setCurrentTime(chapterTime);
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0E0E0E] text-white border border-[#262626] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col group/player"
        onMouseEnter={() => setShowControls(true)}
      >
        {/* Top Header Bar with Luxury Branding & Close Button */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#141414]/90 backdrop-blur-sm border-b border-[#222222] z-20">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D3121A] animate-pulse"></div>
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#CBD5E1] uppercase font-body block">
                OFFICIAL BRAND FILM // 4K CINEMATIC
              </span>
              <h3 className="font-h3 text-sm text-white tracking-wide">
                EMMY BOXING CLUB: THE CRAFT & THE CALLING
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#D3121A] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center cursor-pointer select-none" onClick={togglePlay}>
          <video
            ref={videoRef}
            src="/videos/emmy-club-story.mp4"
            className="w-full h-full object-contain"
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsBuffering(false);
              setIsPlaying(true);
            }}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Buffering Spinner */}
          {isBuffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20">
              <div className="w-12 h-12 rounded-full border-3 border-white/20 border-t-[#D3121A] animate-spin"></div>
            </div>
          )}

          {/* Big Center Play Indicator (when paused) */}
          {!isPlaying && !isBuffering && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] z-20 transition-all">
              <div className="w-20 h-20 rounded-full bg-[#D3121A] hover:bg-[#B80F16] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 mb-3 group-hover/player:scale-105">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                CLICK TO PLAY FILM
              </p>
              <p className="text-[11px] text-[#A0A0A0] mt-1 font-body">
                Cinematic stereo audio enabled
              </p>
            </div>
          )}

          {/* Chapter badge in upper corner */}
          <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[11px] font-bold tracking-wider text-white uppercase flex items-center gap-2 pointer-events-none">
            <span className="text-[#D3121A]">{CHAPTERS[activeChapterIndex]?.tag}</span>
            <span>{CHAPTERS[activeChapterIndex]?.title}</span>
          </div>

          {/* Sound Muted Alert Badge */}
          {isMuted && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="absolute top-4 right-4 z-20 bg-[#D3121A]/90 hover:bg-[#D3121A] text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Click to Unmute Audio</span>
            </button>
          )}

          {/* Custom Luxury Controls Bar */}
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 z-30 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrubber / Progress Bar */}
            <div className="relative mb-3 group/scrub flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 20.4}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D3121A] relative z-10"
              />
              {/* Highlight Fill */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#D3121A] rounded-lg pointer-events-none h-1.5"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Transport Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play / Pause Toggle */}
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D3121A] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                {/* Restart / Replay */}
                <button
                  onClick={restartVideo}
                  className="p-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume & Mute */}
                <div className="flex items-center gap-2 group/vol">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-[#D3121A]" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D3121A]"
                  />
                </div>

                {/* Time Display */}
                <span className="text-xs font-mono tracking-wider text-gray-300 font-medium">
                  {formatTime(currentTime)} <span className="text-gray-500">/</span> {formatTime(duration)}
                </span>
              </div>

              {/* Right Side: Chapter indicator & Fullscreen */}
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Speed: 1.0x HD
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Toggle Fullscreen (F)"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Navigation Rail */}
        <div className="bg-[#121212] border-t border-[#222222] px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#888888]">
              FILM CHAPTERS (JUMP TO TIME)
            </span>
            <span className="text-[10px] text-[#A0A0A0] font-mono">
              5 KEYSTONES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.tag}
                  onClick={() => jumpToChapter(ch.time)}
                  className={`text-left px-2.5 py-1.5 rounded transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#1C1C1C] border-[#D3121A] text-white shadow-sm'
                      : 'bg-black/30 border-white/5 hover:border-white/20 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[10px] font-bold ${isActive ? 'text-[#D3121A]' : 'text-gray-500'}`}>
                      {ch.tag}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500">
                      {formatTime(ch.time)}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-tight truncate">
                    {ch.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="px-5 py-4 bg-[#161616] border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EmmyLogo variant="horizontal" theme="dark" size="sm" />
            <div className="h-4 w-[1px] bg-gray-700 hidden sm:block"></div>
            <span className="text-xs text-gray-400 hidden sm:inline-block font-body">
              Ready to experience this firsthand in the gym?
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#D3121A] hover:bg-[#B80F16] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book Your First Free Round</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
