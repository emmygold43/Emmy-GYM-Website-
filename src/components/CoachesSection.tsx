import React from 'react';
import { COACHES, CoachProfile } from '../data/clubData';
import { Award, ShieldCheck, Flame } from 'lucide-react';

export const CoachesSection: React.FC = () => {
  return (
    <section id="coaches" className="py-20 lg:py-28 bg-[#F7F6F3] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Centred editorial header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              COACHING STAFF
            </span>
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
          </div>

          <h2 className="font-h2 text-[#111111] mb-4">
            PROVEN INSTRUCTORS.
            <br />
            <span className="text-[#555555]">DEDICATED TO YOUR PROGRESS.</span>
          </h2>

          <p className="font-body text-[#444444] text-base sm:text-lg leading-relaxed">
            Our coaching team consists of seasoned combat-sports athletes and conditioning directors who prioritize your safety, technique, and long-term athletic confidence.
          </p>
        </div>

        {/* 3 Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COACHES.map((coach: CoachProfile) => (
            <div
              key={coach.id}
              className="luxury-card bg-white border border-[#E5E5E5] hover:border-[#D3121A] transition-all group overflow-hidden flex flex-col"
            >
              {/* Coach Portrait */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#FFA0A5]">
                    EMMY CERTIFIED COACH
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-h3 text-[#111111] leading-tight mb-1 group-hover:text-[#D3121A] transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D3121A] mt-1 mb-4">
                    {coach.role}
                  </p>

                  <p className="font-body text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                    {coach.bio}
                  </p>
                </div>

                {/* Specialties tags */}
                <div className="pt-4 border-t border-[#F0F0F0]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-2">
                    Key Specialties
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {coach.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-semibold bg-[#F7F6F3] text-[#333333] px-2.5 py-1 border border-[#E8E8E8]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
