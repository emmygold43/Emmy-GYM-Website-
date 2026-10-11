import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { MembershipSection } from './components/MembershipSection';
import { CoachesSection } from './components/CoachesSection';
import { CommunitySection } from './components/CommunitySection';
import { FreeIntroBookingSection } from './components/FreeIntroBookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EmmyAiAssistant } from './components/EmmyAiAssistant';
import { VideoStoryModal } from './components/VideoStoryModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState<string | undefined>(undefined);
  const [preselectedProgram, setPreselectedProgram] = useState<string | undefined>(undefined);

  const scrollToBooking = (programTitle?: string) => {
    if (programTitle) {
      setPreselectedProgram(programTitle);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAssistant = (prompt?: string) => {
    setAssistantPrompt(prompt);
    setIsAssistantOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] font-body selection:bg-[#D3121A] selection:text-white">
      
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenAssistant={() => handleOpenAssistant()}
        onOpenBooking={() => scrollToBooking()}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Replicating reference composition & athlete) */}
        <HeroSection
          onOpenAssistant={() => handleOpenAssistant()}
          onOpenBooking={() => scrollToBooking()}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        {/* 3. Club Introduction / About Section (Structured exactly to match reference image) */}
        <AboutSection onOpenBooking={() => scrollToBooking()} />

        {/* 4. Training Programs (Balanced 3x2 Grid of 6 Cards) */}
        <ProgramsSection
          onSelectProgramToBook={(progTitle) => scrollToBooking(progTitle)}
          onOpenAssistantWithTopic={(topic) => handleOpenAssistant(topic)}
        />

        {/* 5. Training Schedule (Day-by-Day verified scanner) */}
        <ScheduleSection
          onBookSession={(progTitle) => scrollToBooking(progTitle)}
          onRequestScheduleEnquiry={() => {
            const contactEl = document.getElementById('contact');
            contactEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. Membership Information (3 transparent tier cards) */}
        <MembershipSection
          onOpenBooking={() => scrollToBooking()}
          onOpenEnquiry={(tier) => handleOpenAssistant(`What are the details and rates for the ${tier} membership?`)}
        />

        {/* 7. Coaches Section (Verified instructors) */}
        <CoachesSection />

        {/* 8. Testimonials / Community Ethos */}
        <CommunitySection />

        {/* 9. Free Introductory Session Booking (Honest submission flow) */}
        <FreeIntroBookingSection
          preselectedProgram={preselectedProgram}
          onClearPreselection={() => setPreselectedProgram(undefined)}
        />

        {/* 10. Contact and Location */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenAssistant={() => handleOpenAssistant()}
        onOpenBooking={() => scrollToBooking()}
      />

      {/* Floating EMMY AI Assistant Trigger (Bottom-Right) */}
      {!isAssistantOpen && (
        <button
          onClick={() => handleOpenAssistant()}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#111111] hover:bg-[#D3121A] text-white shadow-2xl border-2 border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Open EMMY AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-[#D3121A] group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider">
            Talk to EMMY AI
          </span>
        </button>
      )}

      {/* 12. EMMY AI Customer Assistant Interface */}
      <EmmyAiAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onOpenBooking={() => scrollToBooking()}
        initialPrompt={assistantPrompt}
      />

      {/* Video Story Modal */}
      <VideoStoryModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onOpenBooking={() => scrollToBooking()}
      />

    </div>
  );
}
