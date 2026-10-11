import React, { useState } from 'react';
import { TRAINING_PROGRAMS, CLUB_BUSINESS_INFO } from '../data/clubData';
import { Check, ShieldCheck, Flame, Calendar, Clock, User, Mail, Phone, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FreeIntroBookingSectionProps {
  preselectedProgram?: string;
  onClearPreselection?: () => void;
}

export const FreeIntroBookingSection: React.FC<FreeIntroBookingSectionProps> = ({
  preselectedProgram,
  onClearPreselection,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: preselectedProgram || 'Boxing Fundamentals',
    preferredDate: '',
    timeSlot: 'Morning (07:00 AM – 08:30 AM)',
    experience: 'Complete Beginner (First time in boxing)',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<{
    bookingId: string;
    message: string;
    details: any;
  } | null>(null);

  // Sync if preselected program changes
  React.useEffect(() => {
    if (preselectedProgram) {
      setFormData((prev) => ({ ...prev, program: preselectedProgram }));
    }
  }, [preselectedProgram]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 letters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address so we can contact you.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMessage('Please enter a valid telephone number for booking confirmation.');
      return;
    }

    if (!formData.preferredDate) {
      setErrorMessage('Please pick your desired session date.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server rejected booking request. Please check your details.');
      }

      setBookingResult({
        bookingId: data.bookingId,
        message: data.message,
        details: data.booking,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while transmitting your booking request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setBookingResult(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      program: 'Boxing Fundamentals',
      preferredDate: '',
      timeSlot: 'Morning (07:00 AM – 08:30 AM)',
      experience: 'Complete Beginner (First time in boxing)',
      notes: '',
    });
    if (onClearPreselection) onClearPreselection();
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#111111] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D3121A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              CLAIM YOUR FREE TRIAL
            </span>
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
          </div>

          <h2 className="font-h2 text-white mb-4">
            YOUR FIRST ROUND IS ON US.
            <br />
            <span className="text-[#D3121A]">EXPERIENCE EMMY BOXING CLUB.</span>
          </h2>

          <p className="font-body text-gray-300 text-base sm:text-lg leading-relaxed">
            Zero upfront payment. Zero sales pressure. Complete a full 50-minute structured boxing workout, meet our coaches, and see if EMMY Boxing Club is where you belong.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: What's Included & Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1C1C1C] border border-gray-800 p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D3121A] mb-3">
                <Flame className="w-4 h-4" />
                <span>Complimentary Package Includes</span>
              </div>

              <h3 className="font-h3 text-white mb-4">
                EVERYTHING PROVIDED FOR YOUR SESSION
              </h3>

              <div className="space-y-4">
                {CLUB_BUSINESS_INFO.freeIntroOffer.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-[#D3121A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No credit card required for introductory trial</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated coach guidance from arrival to finish</span>
                </div>
              </div>
            </div>

            {/* Preparation Tip Box */}
            <div className="bg-[#181818] border-l-4 border-[#D3121A] p-6 text-xs text-gray-300 space-y-2">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                WHAT TO BRING ON YOUR FIRST DAY
              </p>
              <p>
                Wear comfortable athletic workout clothes and clean cross-training shoes. We supply sanitized boxing gloves and sanitized wraps. Bring a water bottle and arrive 10 minutes prior to class.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form or Result Confirmation */}
          <div className="lg:col-span-7 bg-white text-[#111111] p-8 sm:p-10 shadow-2xl border border-gray-200">
            {bookingResult ? (
              /* Success / Pending Confirmation Card */
              <div className="text-center py-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                </div>

                <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-700 bg-emerald-100/60 px-3 py-1">
                  REQUEST TRANSMITTED & LOGGED
                </span>

                <h3 className="font-display text-3xl sm:text-4xl text-[#111111] mt-3 mb-2">
                  THANK YOU, {bookingResult.details.fullName.toUpperCase()}!
                </h3>

                <p className="text-sm text-[#444444] max-w-md mx-auto mb-6">
                  {bookingResult.message}
                </p>

                {/* Booking summary box */}
                <div className="bg-[#F7F6F3] border border-[#E5E5E5] p-5 text-left text-xs space-y-2.5 max-w-md mx-auto mb-8">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-[#666666]">Reference Number:</span>
                    <span className="font-mono font-bold text-[#111111]">{bookingResult.bookingId}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-[#666666]">Selected Program:</span>
                    <span className="font-bold text-[#111111]">{bookingResult.details.program}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-[#666666]">Preferred Date:</span>
                    <span className="font-semibold text-[#111111]">{bookingResult.details.preferredDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-[#666666]">Preferred Time:</span>
                    <span className="font-semibold text-[#111111]">{bookingResult.details.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Confirmation Status:</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                      Pending Coach Slot Confirmation
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#777777] mb-6">
                  A verification message has been prepared for <strong className="text-[#111111]">{bookingResult.details.email}</strong>.
                </p>

                <button
                  onClick={handleResetForm}
                  className="px-6 py-3 bg-[#111111] hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Another Booking Request
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-gray-200 pb-3 mb-4">
                  <h3 className="font-h3 text-[#111111] mb-1">
                    RESERVE YOUR INTRODUCTORY SESSION
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Please submit your preferred training details. We will confirm coach availability.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Maya Lin"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Telephone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Preferred Program */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Preferred Training Program *
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                    >
                      {TRAINING_PROGRAMS.map((prog) => (
                        <option key={prog.id} value={prog.title}>
                          {prog.title} ({prog.level})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="date"
                        name="preferredDate"
                        min={minDateString}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                    >
                      <option value="Morning (07:00 AM – 08:30 AM)">Morning (07:00 AM – 08:30 AM)</option>
                      <option value="Midday (12:00 PM – 01:30 PM)">Midday (12:00 PM – 01:30 PM)</option>
                      <option value="Late Afternoon (04:30 PM – 06:00 PM)">Late Afternoon (04:30 PM – 06:00 PM)</option>
                      <option value="Evening (06:00 PM – 07:30 PM)">Evening (06:00 PM – 07:30 PM)</option>
                      <option value="Night (07:30 PM – 09:00 PM)">Night (07:30 PM – 09:00 PM)</option>
                    </select>
                  </div>

                  {/* Fitness Background */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Boxing & Fitness Experience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                    >
                      <option value="Complete Beginner (First time in boxing)">Complete Beginner (First time in boxing)</option>
                      <option value="Recreational Boxer (Some bag or pad experience)">Recreational Boxer (Some bag or pad experience)</option>
                      <option value="Intermediate Athlete (Active fitness / sparring experience)">Intermediate Athlete (Active fitness / sparring experience)</option>
                      <option value="Competitive Fighter">Competitive Fighter</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                      Goals / Any Injuries or Requirements (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Wanting to improve footwork stamina; no prior injuries"
                      className="w-full px-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#D3121A] hover:bg-[#B80F16] text-white text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Transmitting Booking Request...
                      </span>
                    ) : (
                      <>
                        <span>Confirm Free Introductory Booking</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#777777] text-center mt-2.5">
                    No charge is applied. Submission reserves a spot request subject to coach confirmation.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
