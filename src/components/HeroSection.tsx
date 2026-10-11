import React from 'react';
import { ArrowRight, Play, Sparkles, Flame, Film } from 'lucide-react';
import heroBoxerImg from '../assets/images/hero_boxer_1791741302613.jpg';

interface HeroSectionProps {
  onOpenAssistant: () => void;
  onOpenBooking: () => void;
  onOpenVideoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAssistant,
  onOpenBooking,
  onOpenVideoModal,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-[94vh] overflow-hidden bg-white flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24"
    >
      {/* 
        IMMERSIVE EDITORIAL PHOTOGRAPHIC CANVAS 
        Occupies 65–75% of visual emphasis on desktop, blending seamlessly into the white page.
        Carefully controlled lighting, crisp red glove and extended arm without heavy obscure filters.
      */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] xl:w-[72%] z-0 overflow-hidden pointer-events-none">
        {/* Main Athlete Photograph */}
        <img
          src={heroBoxerImg}
          alt="EMMY Boxing Club athlete in dynamic guard stance with extended crimson red glove"
          className="w-full h-full object-cover object-[center_22%] lg:object-[center_28%] scale-100 lg:scale-105 transition-transform duration-1000 ease-out contrast-[1.04] brightness-[1.02]"
          loading="eager"
        />

        {/* Sophisticated editorial blending masks */}
        {/* Horizontal soft blend from pure white editorial column into the gym photography */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-64 lg:w-96 bg-gradient-to-r from-white via-white/85 to-transparent hidden sm:block"></div>
        {/* Mobile overlay ensuring text legibility while keeping fighter visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-transparent sm:hidden"></div>

        {/* Bottom subtle shadow vignette */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white via-white/20 to-transparent"></div>

        {/* Athletic Crimson Slice in bottom right matching campaign visual language */}
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#D3121A] transform -rotate-45 translate-x-10 translate-y-10 hidden lg:block opacity-95"></div>

        {/* Vertical Campaign Badge */}
        <div className="absolute top-8 right-8 z-10 text-right hidden lg:block select-none">
          <p className="font-display text-xs tracking-[0.26em] text-white/95 drop-shadow-md">
            REAL PEOPLE.
          </p>
          <p className="font-display text-xs tracking-[0.26em] text-white/95 drop-shadow-md">
            REAL PROGRESS.
          </p>
          <p className="font-display text-sm tracking-[0.3em] text-[#EF232C] font-black drop-shadow-md">
            EMMY.
          </p>
        </div>
      </div>

      {/* FOREGROUND EDITORIAL CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-xl lg:max-w-2xl py-6 lg:py-24">
          
          {/* Subtitle Tagline */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#D3121A]"></span>
            <p className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#555555] uppercase font-body">
              DISCIPLINE &nbsp;/&nbsp; STRENGTH &nbsp;/&nbsp; RESULTS
            </p>
          </div>

          {/* 
            EXACT MATCH HERO HEADLINE:
            Global Heading System (Hellian luxury aesthetic).
            Balanced responsive scale (~42-54px desktop, ~36-44px tablet, ~30-36px mobile).
            Black for first line, Crimson Red for second line.
            EXACTLY ONE H1 ON THE ENTIRE WEBSITE!
          */}
          <h1 className="font-h1 text-[#111111] mb-5 tracking-tight">
            MORE THAN
            <br />
            <span className="text-[#D3121A]">JUST A GYM.</span>
          </h1>

          {/* Supporting Copy using Refined Inter font */}
          <p className="font-body text-[#333333] text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-normal">
            At <strong className="font-semibold text-[#111111]">EMMY Boxing Club</strong>, we build stronger bodies, sharper minds, and greater confidence. Whether you’re a beginner stepping through the ropes for the first time or a seasoned fighter, this is where your journey gets real.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            {/* Primary CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#D3121A] hover:bg-[#B80F16] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Dedicated AI Assistant CTA */}
            <button
              onClick={onOpenAssistant}
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#111111] hover:bg-[#222222] text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#111111] shadow-sm hover:border-[#D3121A] transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#D3121A] group-hover:scale-110 transition-transform" />
              <span>Talk to EMMY AI</span>
            </button>

            {/* REPAIRED & ENHANCED VIDEO STORY TRIGGER */}
            <button
              onClick={onOpenVideoModal}
              className="inline-flex items-center gap-2.5 px-4 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] hover:text-[#D3121A] transition-all group cursor-pointer"
              aria-label="Watch EMMY Boxing Club official brand video"
            >
              <div className="relative w-10 h-10 rounded-full bg-[#F7F6F3] border border-[#E5E5E5] group-hover:border-[#D3121A] flex items-center justify-center transition-colors shadow-sm">
                <span className="absolute inset-0 rounded-full border border-[#D3121A]/30 animate-ping opacity-60"></span>
                <Play className="w-4 h-4 text-[#111111] group-hover:text-[#D3121A] fill-current ml-0.5" />
              </div>
              <div className="text-left font-body">
                <div className="leading-tight flex items-center gap-1.5">
                  <span>Watch Our Story</span>
                  <span className="text-[10px] font-bold tracking-widest text-[#D3121A] bg-[#D3121A]/10 px-1.5 py-0.5 rounded">4K</span>
                </div>
                <div className="text-[10px] text-[#777777] font-normal lowercase tracking-normal">
                  20s brand film
                </div>
              </div>
            </button>
          </div>

          {/* Supporting Verified Metrics */}
          <div className="pt-6 border-t border-[#E8E8E8] grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="font-display text-4xl sm:text-5xl text-[#111111] leading-none">
                500<span className="text-[#D3121A]">+</span>
              </div>
              <div className="text-xs text-[#555555] mt-1.5 font-medium font-body">
                <span className="text-[#111111] font-semibold underline decoration-[#D3121A] decoration-2 underline-offset-4">Active</span> Members
              </div>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl text-[#111111] leading-none">
                10<span className="text-[#D3121A]">+</span>
              </div>
              <div className="text-xs text-[#555555] mt-1.5 font-medium font-body">
                Expert Trainers
              </div>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl text-[#111111] leading-none">
                6
              </div>
              <div className="text-xs text-[#555555] mt-1.5 font-medium font-body">
                Training Programs
              </div>
            </div>
          </div>

          {/* Complimentary First Session Pill Banner */}
          <div className="mt-8 inline-flex items-center gap-2 bg-[#F7F6F3] px-3.5 py-1.5 border border-[#E5E5E5] text-xs text-[#444444]">
            <Flame className="w-4 h-4 text-[#D3121A] shrink-0" />
            <span className="font-semibold text-[#111111]">First Session Free:</span>
            <span>Includes 1-on-1 coach assessment and equipment.</span>
          </div>

        </div>
      </div>
    </section>
  );
};
