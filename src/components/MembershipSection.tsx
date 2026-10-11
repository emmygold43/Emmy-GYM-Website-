import React from 'react';
import { MEMBERSHIP_TIERS, MembershipTier } from '../data/clubData';
import { Check, ArrowRight, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

interface MembershipSectionProps {
  onOpenBooking: () => void;
  onOpenEnquiry: (tierName: string) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  onOpenBooking,
  onOpenEnquiry,
}) => {
  return (
    <section id="membership" className="py-20 lg:py-28 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              MEMBERSHIP PLANS
            </span>
            <span className="w-6 h-[2px] bg-[#D3121A]"></span>
          </div>

          <h2 className="font-h2 text-[#111111] mb-4">
            TRANSPARENT MEMBERSHIPS.
            <br />
            <span className="text-[#555555]">BUILT FOR SUSTAINED PROGRESS.</span>
          </h2>

          <p className="font-body text-[#444444] text-base sm:text-lg leading-relaxed">
            All memberships at EMMY Boxing Club include expert coaching, access to premium amenities, and flexible monthly terms. Every newcomer starts with our complimentary introductory session.
          </p>
        </div>

        {/* 3 Balanced Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_TIERS.map((tier: MembershipTier) => {
            const isFeatured = tier.isPopular;

            return (
              <div
                key={tier.id}
                className={`luxury-card flex flex-col justify-between bg-white border relative p-8 transition-all duration-300 ${
                  isFeatured
                    ? 'border-[#D3121A] shadow-xl ring-2 ring-[#D3121A]/20 scale-100 lg:scale-[1.03] z-10'
                    : 'border-[#E5E5E5] hover:border-gray-400 shadow-sm'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#D3121A] text-white px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm">
                    {tier.badge || 'MOST POPULAR'}
                  </div>
                )}

                <div>
                  {/* Tier Title */}
                  <div className="mb-4">
                    <h3 className="font-h3 text-[#111111] leading-tight">
                      {tier.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555555] mt-2 font-body min-h-[40px]">
                      {tier.description}
                    </p>
                  </div>

                  {/* Allowance Banner */}
                  <div className="p-3.5 bg-[#F7F6F3] border border-[#E5E5E5] mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                      Training Allowance
                    </p>
                    <p className="font-display text-xl text-[#111111] mt-0.5">
                      {tier.sessionAllowance}
                    </p>
                  </div>

                  {/* Transparent Terms Note */}
                  <div className="text-xs text-[#555555] font-semibold mb-6 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D3121A] shrink-0" />
                    <span>{tier.priceNote}</span>
                  </div>

                  {/* Included Benefits */}
                  <div className="space-y-3 mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#999999]">
                      Package Privileges
                    </p>
                    {tier.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#222222]">
                        <Check className="w-4 h-4 text-[#D3121A] shrink-0 mt-0.5" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-[#F0F0F0] space-y-2.5">
                  <button
                    onClick={onOpenBooking}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isFeatured
                        ? 'bg-[#D3121A] hover:bg-[#B80F16] text-white shadow-md'
                        : 'bg-[#111111] hover:bg-[#222222] text-white'
                    }`}
                  >
                    <span>Claim Free Intro Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(tier.name)}
                    className="w-full text-center py-2 text-xs font-bold uppercase tracking-wider text-[#555555] hover:text-[#D3121A] border border-[#E5E5E5] hover:border-[#D3121A] bg-white transition-all cursor-pointer"
                  >
                    Enquire About Membership
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Rates Notice */}
        <div className="mt-12 p-6 bg-[#F7F6F3] border border-[#E5E5E5] text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#555555]">
            <strong className="text-[#111111]">Honest Pricing Policy:</strong> In line with club standards, tailored rates are discussed in person after your initial technique assessment so you never pay for training you do not need. No hidden activation charges.
          </p>
        </div>

      </div>
    </section>
  );
};
