import React from 'react';
import { EmmyLogo } from './EmmyLogo';
import { ArrowUp, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { CLUB_BUSINESS_INFO, TRAINING_PROGRAMS } from '../data/clubData';

interface FooterProps {
  onOpenAssistant: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAssistant, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0B] text-white pt-16 pb-12 border-t-2 border-[#D3121A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-gray-800">
          
          {/* Col 1: Brand & Logo (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <EmmyLogo variant="horizontal" theme="dark" size="md" />
            
            <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mt-3">
              EMMY Boxing Club is a premium combat sports and athletic conditioning brand dedicated to authentic boxing technique, discipline, and personal empowerment.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1C1C1C] hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider transition-colors border border-gray-800"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D3121A] group-hover:text-white" />
                <span>Ask EMMY AI</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#D3121A] hover:bg-[#B80F16] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Free Intro Session</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-h4 text-xs font-bold uppercase tracking-[0.2em] text-[#D3121A]">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About EMMY</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Disciplines</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Weekly Timetable</a></li>
              <li><a href="#membership" className="hover:text-white transition-colors">Memberships</a></li>
              <li><a href="#coaches" className="hover:text-white transition-colors">Coaching Staff</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact & Facility</a></li>
            </ul>
          </div>

          {/* Col 3: Training Programs (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-h4 text-xs font-bold uppercase tracking-[0.2em] text-[#D3121A]">
              Disciplines
            </h3>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              {TRAINING_PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <a href="#programs" className="hover:text-white transition-colors flex items-center justify-between">
                    <span>{prog.title}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{prog.number}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Facility & Hours (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-h4 text-xs font-bold uppercase tracking-[0.2em] text-[#D3121A]">
              Facility & Hours
            </h3>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D3121A] shrink-0 mt-0.5" />
                <span>{CLUB_BUSINESS_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D3121A] shrink-0" />
                <a href={`mailto:${CLUB_BUSINESS_INFO.contact.email}`} className="hover:text-white">{CLUB_BUSINESS_INFO.contact.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D3121A] shrink-0" />
                <a href={`tel:${CLUB_BUSINESS_INFO.contact.phone}`} className="hover:text-white">{CLUB_BUSINESS_INFO.contact.phone}</a>
              </div>
              <div className="pt-2 text-[11px] text-gray-400 border-t border-gray-800">
                <p className="text-white font-semibold">Hours:</p>
                <p>Mon–Fri: {CLUB_BUSINESS_INFO.contact.openingHours.weekdays}</p>
                <p>Sat: {CLUB_BUSINESS_INFO.contact.openingHours.saturday}</p>
                <p>Sun: {CLUB_BUSINESS_INFO.contact.openingHours.sunday}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} EMMY BOXING CLUB. All rights reserved. Real People. Real Progress.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D3121A]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
