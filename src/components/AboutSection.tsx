import React from 'react';
import { Target, Flame, Shield, Heart } from 'lucide-react';
import gymFloorImg from '../assets/images/emmy_gym_floor_1791744489933.jpg';

interface AboutSectionProps {
  onOpenBooking?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const scrollToBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el = document.getElementById('booking');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAFAFA] border-y border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header - Left-aligned matching reference image */}
        <div className="max-w-3xl mb-12">
          {/* Small red uppercase tracking label */}
          <p className="text-xs font-bold tracking-[0.22em] text-[#D3121A] uppercase mb-3 font-body">
            ABOUT EMMY BOXING CLUB
          </p>

          {/* Heading using H2 (matching reference: BUILT ON DISCIPLINE. DRIVEN BY CRAFT.) */}
          <h2 className="font-h2 text-[#111111] mb-5 tracking-tight">
            BUILT ON DISCIPLINE.
            <br />
            DRIVEN BY CRAFT.
          </h2>

          {/* Intro paragraph using luxury DM Sans */}
          <p className="font-body text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
            EMMY Boxing Club was created to make authentic boxing training accessible, challenging, and empowering. We believe the physical and mental discipline forged in the ring transforms every aspect of life outside it.
          </p>
        </div>

        {/* Main Content Grid: Left Gym Photo Card + Right 2x2 Feature Cards & Bottom CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: Rounded Gym Floor Photographic Card */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-[#E5E5E5] bg-[#111111] min-h-[420px] lg:min-h-[520px] flex flex-col justify-end group">
            <img
              src={gymFloorImg}
              alt="EMMY Boxing Club high-performance training ground with professional ring and heavy bags"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Dark gradient overlay for text readability at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"></div>

            {/* Bottom Caption matching reference */}
            <div className="relative z-10 p-6 sm:p-8">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#D3121A] mb-1.5 font-body">
                HIGH-PERFORMANCE TRAINING GROUND
              </span>
              <p className="font-body text-white font-bold text-base sm:text-lg leading-snug">
                Professional ring, heavy bags, speed stations & conditioning floor.
              </p>
            </div>
          </div>

          {/* RIGHT: 2x2 Cards Grid + Bottom CTA Card */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            
            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              
              {/* Card 1: Precision Technique */}
              <div className="luxury-card bg-white rounded-xl p-5 sm:p-6 border border-[#E8E8E8] shadow-sm hover:border-[#D3121A]/50 transition-all flex flex-col">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#D3121A] flex items-center justify-center mb-3.5 shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-h3 text-[#111111] mb-2">
                  Precision Technique
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Master genuine boxing fundamentals—stance, footwork, torque, and guard—taught step by step with zero shortcuts.
                </p>
              </div>

              {/* Card 2: Athletic Conditioning */}
              <div className="luxury-card bg-white rounded-xl p-5 sm:p-6 border border-[#E8E8E8] shadow-sm hover:border-[#D3121A]/50 transition-all flex flex-col">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#D3121A] flex items-center justify-center mb-3.5 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-h3 text-[#111111] mb-2">
                  Athletic Conditioning
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Build functional stamina, rotational power, and mental resilience through structured combat sport workouts.
                </p>
              </div>

              {/* Card 3: Safety & Discipline */}
              <div className="luxury-card bg-white rounded-xl p-5 sm:p-6 border border-[#E8E8E8] shadow-sm hover:border-[#D3121A]/50 transition-all flex flex-col">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#D3121A] flex items-center justify-center mb-3.5 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-h3 text-[#111111] mb-2">
                  Safety & Discipline
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Every round is guided with strict safety standards, protective equipment guidelines, and clear technical progression.
                </p>
              </div>

              {/* Card 4: Supportive Culture */}
              <div className="luxury-card bg-white rounded-xl p-5 sm:p-6 border border-[#E8E8E8] shadow-sm hover:border-[#D3121A]/50 transition-all flex flex-col">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-[#D3121A] flex items-center justify-center mb-3.5 shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-h3 text-[#111111] mb-2">
                  Supportive Culture
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#555555] leading-relaxed">
                  An inclusive, zero ego community where newcomers, youth athletes, and seasoned fighters train with mutual respect.
                </p>
              </div>

            </div>

            {/* Bottom Card 5: Free Session CTA Card (Matching Reference) */}
            <div className="luxury-card bg-white rounded-xl p-5 sm:p-6 border border-[#E8E8E8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-h3 text-[#111111]">
                  Ready to experience our training?
                </h3>
                <p className="font-body text-xs text-[#555555] mt-0.5">
                  Join us for a complimentary introductory session with zero commitment.
                </p>
              </div>

              <button
                onClick={scrollToBooking}
                className="shrink-0 px-5 py-2.5 bg-[#D3121A] hover:bg-[#B80F16] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer active:scale-95 text-center"
              >
                CLAIM FREE SESSION
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
