import React from 'react';
import { TRAINING_PROGRAMS, TrainingProgram } from '../data/clubData';
import { ArrowRight, Check, ShieldAlert, Sparkles, Clock, Compass } from 'lucide-react';

interface ProgramsSectionProps {
  onSelectProgramToBook: (programTitle: string) => void;
  onOpenAssistantWithTopic: (topic: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectProgramToBook,
  onOpenAssistantWithTopic,
}) => {
  return (
    <section id="programs" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Centred editorial header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              TRAINING DISCIPLINES
            </span>
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
          </div>

          <h2 className="font-h2 text-[#111111] mb-4">
            STRUCTURED BOXING PROGRAMS.
            <br />
            <span className="text-[#555555]">ENGINEERED FOR EVERY LEVEL.</span>
          </h2>

          <p className="font-body text-[#444444] text-base sm:text-lg leading-relaxed">
            From your very first jab to competitive ringcraft, every program at EMMY Boxing Club follows a proven technical curriculum. Choose your focus or let EMMY AI recommend the ideal path for your goals.
          </p>
        </div>

        {/* Balanced 3x2 Grid for Desktop, 2 cols on Tablet, 1 col on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRAINING_PROGRAMS.map((prog: TrainingProgram) => {
            const isSparring = prog.id === 'championship-sparring';
            const isFundamentals = prog.id === 'boxing-fundamentals';

            return (
              <div
                key={prog.id}
                className={`luxury-card flex flex-col justify-between bg-white border transition-all duration-300 relative group p-7 sm:p-8 ${
                  isFundamentals
                    ? 'border-[#D3121A] shadow-md ring-1 ring-[#D3121A]/20'
                    : 'border-[#E5E5E5] hover:border-[#D3121A] hover:shadow-lg'
                }`}
              >
                {/* Top Row: Number & Level Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl sm:text-4xl text-[#CBD5E1] group-hover:text-[#D3121A] transition-colors">
                      {prog.number}
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 border ${
                        isSparring
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : isFundamentals
                          ? 'bg-[#D3121A]/10 text-[#D3121A] border-[#D3121A]/30'
                          : 'bg-[#F7F6F3] text-[#555555] border-[#E5E5E5]'
                      }`}
                    >
                      {prog.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-h3 text-[#111111] leading-tight mb-2.5 group-hover:text-[#D3121A] transition-colors">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-[#555555] leading-relaxed mb-6 min-h-[64px]">
                    {prog.description}
                  </p>

                  {/* Duration and Recommendation */}
                  <div className="flex items-center gap-2 text-xs text-[#777777] mb-6 pb-4 border-b border-[#F0F0F0]">
                    <Clock className="w-3.5 h-3.5 text-[#D3121A]" />
                    <span className="font-semibold">{prog.duration} session</span>
                    <span className="text-[#CCCCCC]">•</span>
                    <span className="truncate">{prog.recommendedFor}</span>
                  </div>

                  {/* 3 Benefit Items */}
                  <div className="space-y-2.5 mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#999999]">
                      Key Focus Outcomes
                    </p>
                    {prog.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#222222]">
                        <Check className="w-4 h-4 text-[#D3121A] shrink-0 mt-0.5" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t border-[#F0F0F0] flex flex-col gap-2">
                  {isSparring && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/80 p-2 border border-amber-200/60 mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>Safety screening & headgear mandatory</span>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectProgramToBook(prog.title)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isFundamentals
                        ? 'bg-[#D3121A] hover:bg-[#B80F16] text-white shadow-sm'
                        : 'bg-[#111111] hover:bg-[#D3121A] text-white'
                    }`}
                  >
                    <span>Book Intro in This Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      onOpenAssistantWithTopic(`Tell me more about ${prog.title} and who it is recommended for.`)
                    }
                    className="w-full text-center py-1.5 text-[11px] text-[#666666] hover:text-[#D3121A] font-semibold transition-colors cursor-pointer"
                  >
                    Ask EMMY AI about this program →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to AI guidance */}
        <div className="mt-14 bg-[#F7F6F3] border border-[#E8E8E8] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white border border-[#E5E5E5] flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6 text-[#D3121A]" />
            </div>
            <div>
              <h3 className="font-h3 text-[#111111]">
                Unsure which program fits your current stamina or boxing goals?
              </h3>
              <p className="text-xs sm:text-sm text-[#555555]">
                EMMY AI can evaluate your goals and recommend whether to begin with Boxing Fundamentals or Bag Conditioning.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenAssistantWithTopic("Which training program is best for my background?")}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#111111] hover:text-white text-[#111111] border border-[#D3121A] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D3121A]" />
            <span>Consult EMMY AI</span>
          </button>
        </div>

      </div>
    </section>
  );
};
