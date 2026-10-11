import React from 'react';
import { COMMUNITY_PILLARS } from '../data/clubData';
import { Users, Shield, Target, Sparkles, Heart } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              COMMUNITY & CULTURE
            </span>
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
          </div>

          <h2 className="font-h2 text-[#111111] mb-4">
            WHERE EVERYONE SWEATS AS ONE.
            <br />
            <span className="text-[#555555]">MUTUAL RESPECT IN EVERY ROUND.</span>
          </h2>

          <p className="font-body text-[#444444] text-base sm:text-lg leading-relaxed">
            At EMMY Boxing Club, community is not a marketing slogan—it is the heartbeat of our gym floor. We train together, encourage each other through difficult bag rounds, and celebrate genuine personal progress.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {COMMUNITY_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-[#F7F6F3] p-8 border border-[#E5E5E5] relative"
            >
              <div className="font-display text-4xl text-[#CBD5E1] mb-4">
                {pillar.number}
              </div>
              <h3 className="font-h3 text-[#111111] mb-2.5">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-[#555555] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Training Environment Checklist */}
        <div className="bg-[#111111] text-white p-8 sm:p-12 border-l-4 border-[#D3121A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
                THE EMMY CLUB STANDARD
              </span>
              <h3 className="font-h3 text-white mt-1 mb-2.5">
                A SAFE, INCLUSIVE COMBAT SPORTS ENVIRONMENT
              </h3>
              <p className="text-sm text-gray-300 font-body leading-relaxed max-w-2xl">
                We believe boxing should be accessible to anyone seeking discipline and strength. Our coaches ensure zero bullying, zero reckless sparring, and a clean, high-standard training floor suitable for every fitness level.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-gray-200">
                <Shield className="w-4 h-4 text-[#D3121A] shrink-0" />
                <span>Strict Coach Supervision Always</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-gray-200">
                <Target className="w-4 h-4 text-[#D3121A] shrink-0" />
                <span>Custom Pace for All Fitness Levels</span>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-gray-200">
                <Heart className="w-4 h-4 text-[#D3121A] shrink-0" />
                <span>Supportive Training Partners</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
