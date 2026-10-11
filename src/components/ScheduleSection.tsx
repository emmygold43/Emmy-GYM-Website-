import React, { useState } from 'react';
import { TRAINING_SCHEDULE, ScheduleItem } from '../data/clubData';
import { Clock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ScheduleSectionProps {
  onBookSession: (programTitle: string) => void;
  onRequestScheduleEnquiry: () => void;
}

const DAYS: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const SKILL_FILTERS = ['All Skill Levels', 'Beginner', 'Intermediate', 'Fighter Pro'];

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onBookSession,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All Skill Levels');

  const daySessions = TRAINING_SCHEDULE.filter((s) => s.day === selectedDay);
  const filteredSessions = selectedSkillFilter === 'All Skill Levels'
    ? daySessions
    : daySessions.filter((s) => {
        if (selectedSkillFilter === 'Beginner') return s.levelTag === 'BEGINNER';
        if (selectedSkillFilter === 'Intermediate') return s.levelTag === 'INTERMEDIATE';
        if (selectedSkillFilter === 'Fighter Pro') return s.levelTag === 'FIGHTER PRO';
        return true;
      });

  return (
    <section id="schedule" className="py-20 lg:py-24 bg-[#FAFAFA] border-t border-[#E8E8E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Centred matching reference image */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D3121A] inline-block"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase font-body">
              WEEKLY TIMETABLE
            </span>
          </div>

          <h2 className="font-h2 text-[#111111] mb-3 text-center">
            TRAIN ON YOUR SCHEDULE.
          </h2>

          <p className="font-body text-xs sm:text-sm text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Over 35 high-intensity sessions every week, from 6:00 AM dawn bags to 7:30 PM sparring.
            Reserve your bag in advance to secure coaching feedback.
          </p>
        </div>

        {/* Day Selection Tabs: Rounded pill buttons */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {DAYS.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-[#F0F1F3] hover:bg-[#E5E7EB] text-[#555555]'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Sub-filter / Skill Level Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {SKILL_FILTERS.map((filter) => {
            const isSelected = selectedSkillFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedSkillFilter(filter)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#D3121A] text-white shadow-xs'
                    : 'bg-transparent text-[#666666] hover:text-[#111111] hover:bg-gray-200/50'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Schedule Cards Stack matching uploaded reference image */}
        <div className="space-y-3.5">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session: ScheduleItem) => {
              // Calculate spots bar percentage
              const spotsTotal = session.spotsTotal || 18;
              const spotsLeft = session.spotsLeft || 4;
              const percentFilled = Math.min(100, Math.max(15, Math.round(((spotsTotal - spotsLeft) / spotsTotal) * 100)));

              return (
                <div
                  key={session.id}
                  className="luxury-card bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs hover:border-[#D3121A]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left Side: Time Badge + Program & Coach Info */}
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    
                    {/* Time Badge Box */}
                    <div className="w-20 sm:w-24 py-2.5 px-1.5 bg-white rounded-xl border border-gray-200/80 flex flex-col items-center justify-center text-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#D3121A] mb-1" />
                      <span className="font-body font-bold text-xs text-[#111111]">
                        {session.time}
                      </span>
                    </div>

                    {/* Program Title, Level Tag, Coach & Duration */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-h3 text-base sm:text-lg font-bold text-[#111111] tracking-wide">
                          {session.programTitle}
                        </h3>
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-[#555555] border border-gray-200/60 shrink-0">
                          {session.levelTag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#666666] font-medium">
                        <User className="w-3.5 h-3.5 text-[#D3121A] shrink-0" />
                        <span>{session.coach}</span>
                        <span className="text-gray-300">•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>

                  </div>

                  {/* Right Side: Spots Counter with Progress Bar + Book Spot Button */}
                  <div className="flex items-center justify-between md:justify-end gap-5 sm:gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    
                    {/* Spots Availability */}
                    <div className="text-left md:text-right">
                      <span className="text-xs font-bold text-[#222222] font-body">
                        {session.spotsLeft} / {session.spotsTotal} spots left
                      </span>
                      <div className="w-28 sm:w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-[#D3121A] rounded-full transition-all"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => onBookSession(session.programTitle)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#111111] hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
                    >
                      <span>BOOK SPOT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-[#777777]">
              <p className="font-h3 text-lg text-[#111111] mb-1">
                No sessions found for this skill level on {selectedDay}
              </p>
              <p className="text-xs text-[#666666]">
                Select another filter or ask EMMY AI to confirm additional private coaching slots.
              </p>
            </div>
          )}
        </div>

        {/* Footer Note matching reference */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666666]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All sessions include complimentary sanitizer, hand wrap tutorials, and loaner gloves.</span>
          </div>

          <span className="font-medium text-[#444444]">
            Open Gym Access: Mon-Sun 5:30 AM – 10:00 PM
          </span>
        </div>

      </div>
    </section>
  );
};
