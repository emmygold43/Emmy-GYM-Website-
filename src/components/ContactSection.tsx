import React, { useState } from 'react';
import { CLUB_BUSINESS_INFO } from '../data/clubData';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message.');

      setSuccessMsg(data.message || 'Your inquiry has been received. Our team will get back to you shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message. Please contact us via phone or email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F7F6F3] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#D3121A]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              LOCATION & CONTACT
            </span>
          </div>
          <h2 className="font-h2 text-[#111111]">
            FIND THE CLUB.
            <br />
            <span className="text-[#555555]">SPEAK WITH OUR TEAM.</span>
          </h2>
          <p className="font-body text-[#444444] text-base sm:text-lg mt-4 leading-relaxed">
            Have questions about private training, corporate packages, or scheduling? Reach out directly or visit our facility during open hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address */}
            <div className="bg-white p-7 border border-[#E5E5E5] flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F7F6F3] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#D3121A]" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                  Facility Address
                </p>
                <p className="font-display text-xl text-[#111111] mt-0.5">
                  {CLUB_BUSINESS_INFO.contact.address}
                </p>
                <p className="text-xs text-[#666666] mt-1">
                  Complimentary member parking and easy transit access.
                </p>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 border border-[#E5E5E5]">
                <Mail className="w-5 h-5 text-[#D3121A] mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                  Direct Email
                </p>
                <a
                  href={`mailto:${CLUB_BUSINESS_INFO.contact.email}`}
                  className="font-semibold text-xs sm:text-sm text-[#111111] hover:text-[#D3121A] transition-colors break-all"
                >
                  {CLUB_BUSINESS_INFO.contact.email}
                </a>
              </div>

              <div className="bg-white p-6 border border-[#E5E5E5]">
                <Phone className="w-5 h-5 text-[#D3121A] mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                  Telephone
                </p>
                <a
                  href={`tel:${CLUB_BUSINESS_INFO.contact.phone}`}
                  className="font-semibold text-xs sm:text-sm text-[#111111] hover:text-[#D3121A] transition-colors"
                >
                  {CLUB_BUSINESS_INFO.contact.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white p-7 border border-[#E5E5E5]">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#D3121A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Verified Operating Hours
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-[#666666]">Monday – Friday:</span>
                  <span className="font-bold text-[#111111]">{CLUB_BUSINESS_INFO.contact.openingHours.weekdays}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-[#666666]">Saturday:</span>
                  <span className="font-bold text-[#111111]">{CLUB_BUSINESS_INFO.contact.openingHours.saturday}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#666666]">Sunday:</span>
                  <span className="font-bold text-[#111111]">{CLUB_BUSINESS_INFO.contact.openingHours.sunday}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#E5E5E5] shadow-sm">
            <h3 className="font-h3 text-[#111111] mb-2">
              SEND AN INQUIRY TO FRONT DESK
            </h3>
            <p className="text-xs text-[#666666] mb-6">
              Have specific questions regarding coaches, group private bookings, or membership? Fill out the form below.
            </p>

            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need or what questions you have..."
                  className="w-full px-4 py-2.5 bg-[#F9F9F9] border border-[#D5D5D5] focus:border-[#D3121A] focus:bg-white text-sm outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
