import React from 'react';

interface EmmyLogoProps {
  variant?: 'full' | 'horizontal' | 'mark';
  theme?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EmmyLogo: React.FC<EmmyLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
}) => {
  // Sizing mappings
  const heightClass = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  }[size];

  // Gradients and colors based on theme
  const metalHighlight = theme === 'dark' ? '#F8FAFC' : '#475569';
  const metalMid = theme === 'dark' ? '#CBD5E1' : '#1E293B';
  const metalDark = theme === 'dark' ? '#64748B' : '#0F172A';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#111111';
  const crimson = '#D3121A';

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 160 140"
          className={`${heightClass} w-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="EMMY Boxing Club Official Mark"
        >
          <defs>
            <linearGradient id="metalGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={metalHighlight} />
              <stop offset="35%" stopColor={metalMid} />
              <stop offset="70%" stopColor={metalDark} />
              <stop offset="100%" stopColor={metalHighlight} />
            </linearGradient>
            <linearGradient id="gloveGradMark" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#990B12" />
              <stop offset="40%" stopColor="#D3121A" />
              <stop offset="85%" stopColor="#EF232C" />
              <stop offset="100%" stopColor="#B30E16" />
            </linearGradient>
            <filter id="shadowMark" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Top serif & horizontal arm of the E */}
          <path
            d="M 68 15 L 140 15 L 126 44 L 75 44 L 70 56 L 50 63 L 56 38 L 45 44 L 40 28 Z"
            fill="url(#metalGradMark)"
            stroke={metalHighlight}
            strokeWidth="0.8"
          />

          {/* Bottom horizontal arm of the E */}
          <path
            d="M 60 76 L 75 76 L 82 86 L 134 86 L 122 115 L 58 115 L 42 98 Z"
            fill="url(#metalGradMark)"
            stroke={metalHighlight}
            strokeWidth="0.8"
          />

          {/* Dynamic Crimson Glove & Punch Slash cutting across */}
          <g filter="url(#shadowMark)">
            {/* Tapered punch speed slash trail cutting through from bottom left */}
            <path
              d="M 22 112 C 45 88 70 70 114 53 L 110 44 C 70 60 40 82 22 112 Z"
              fill="url(#gloveGradMark)"
            />
            {/* Glove forearm / wrist strap */}
            <path
              d="M 100 58 L 115 52 L 118 64 L 103 70 Z"
              fill="#850B10"
              stroke="#D3121A"
              strokeWidth="0.5"
            />
            {/* Boxing Glove Fist punching forward */}
            <path
              d="M 112 52 C 114 44 122 39 130 40 C 137 41 142 46 142 53 C 142 62 135 68 126 69 C 120 70 115 67 112 63 L 112 52 Z"
              fill="url(#gloveGradMark)"
            />
            {/* Glove thumb contour */}
            <path
              d="M 124 67 C 127 71 133 71 136 67 C 138 64 137 60 134 58"
              fill="none"
              stroke="#7F0A0E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Highlight gleam on glove */}
            <path
              d="M 120 45 C 126 43 133 45 137 49"
              fill="none"
              stroke="#FFA0A5"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* Iconic Mark */}
        <svg
          viewBox="0 0 160 130"
          className={`${heightClass} w-auto shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="metalH" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={metalHighlight} />
              <stop offset="35%" stopColor={metalMid} />
              <stop offset="70%" stopColor={metalDark} />
              <stop offset="100%" stopColor={metalHighlight} />
            </linearGradient>
            <linearGradient id="gloveH" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#990B12" />
              <stop offset="45%" stopColor="#D3121A" />
              <stop offset="100%" stopColor="#EF232C" />
            </linearGradient>
          </defs>

          {/* Top bar of E */}
          <path
            d="M 68 12 L 142 12 L 128 42 L 76 42 L 70 54 L 50 62 L 56 36 L 45 42 L 40 25 Z"
            fill="url(#metalH)"
          />

          {/* Bottom bar of E */}
          <path
            d="M 62 76 L 78 76 L 85 86 L 136 86 L 123 115 L 58 115 L 42 98 Z"
            fill="url(#metalH)"
          />

          {/* Glove speed slash & punch */}
          <path
            d="M 20 112 C 45 88 72 70 116 53 L 112 44 C 70 60 40 82 20 112 Z"
            fill="url(#gloveH)"
          />
          {/* Fist */}
          <path
            d="M 112 51 C 114 43 123 38 131 40 C 138 41 143 46 143 54 C 143 63 135 69 126 70 C 119 71 114 67 112 62 Z"
            fill="url(#gloveH)"
          />
          <path
            d="M 124 68 C 127 72 133 72 136 68"
            fill="none"
            stroke="#6B080C"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Wordmark typography */}
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className="font-display text-2xl tracking-[0.14em] font-extrabold"
              style={{ color: textColor }}
            >
              EMMY
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-3.5 h-[1.5px] bg-[#D3121A] rounded-full inline-block"></span>
            <span
              className="text-[9px] font-bold tracking-[0.32em] uppercase"
              style={{ color: theme === 'dark' ? '#E2E8F0' : '#475569' }}
            >
              BOXING CLUB
            </span>
            <span className="w-3.5 h-[1.5px] bg-[#D3121A] rounded-full inline-block"></span>
          </div>
        </div>
      </div>
    );
  }

  // Full stacked official logo presentation (as on the original metallic asset)
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 180"
        className={`${heightClass} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EMMY Boxing Club Official Logo"
      >
        <defs>
          <linearGradient id="metalFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={metalHighlight} />
            <stop offset="30%" stopColor={metalMid} />
            <stop offset="65%" stopColor={metalDark} />
            <stop offset="100%" stopColor={metalHighlight} />
          </linearGradient>
          <linearGradient id="metalBevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gloveFull" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#850B10" />
            <stop offset="40%" stopColor="#D3121A" />
            <stop offset="85%" stopColor="#FF2E36" />
            <stop offset="100%" stopColor="#A30E14" />
          </linearGradient>
          <filter id="shadowFull" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- E ICON --- */}
        {/* Top arm with angled flair */}
        <path
          d="M 104 16 L 168 16 L 154 44 L 110 44 L 105 54 L 88 61 L 94 37 L 84 43 L 80 27 Z"
          fill="url(#metalFull)"
          stroke="url(#metalBevel)"
          strokeWidth="1"
        />

        {/* Bottom arm with angled cut */}
        <path
          d="M 98 75 L 112 75 L 118 84 L 162 84 L 150 112 L 95 112 L 81 96 Z"
          fill="url(#metalFull)"
          stroke="url(#metalBevel)"
          strokeWidth="1"
        />

        {/* Dynamic Crimson Glove & punch slash */}
        <g filter="url(#shadowFull)">
          <path
            d="M 64 112 C 86 89 110 71 146 56 L 143 48 C 106 63 80 84 64 112 Z"
            fill="url(#gloveFull)"
          />
          {/* Glove forearm */}
          <path
            d="M 134 60 L 147 54 L 149 65 L 136 71 Z"
            fill="#7F0A0E"
          />
          {/* Fist */}
          <path
            d="M 144 53 C 146 45 154 41 161 42 C 167 43 172 48 172 55 C 172 63 165 69 157 70 C 151 71 146 67 144 63 Z"
            fill="url(#gloveFull)"
          />
          {/* Thumb */}
          <path
            d="M 155 68 C 158 72 163 72 166 68"
            fill="none"
            stroke="#66080B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Highlight */}
          <path
            d="M 151 47 C 156 45 163 47 167 50"
            fill="none"
            stroke="#FFA5A9"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* --- EMMY TYPOGRAPHY --- */}
        <text
          x="120"
          y="148"
          textAnchor="middle"
          fontFamily="'Manrope', 'Cinzel', serif"
          fontWeight="900"
          fontSize="32"
          letterSpacing="4"
          fill="url(#metalFull)"
          stroke={metalHighlight}
          strokeWidth="0.4"
        >
          EMMY
        </text>

        {/* --- BOXING CLUB WITH TAPERED CRIMSON WINGS --- */}
        {/* Left red wing */}
        <path d="M 38 165 L 70 165 L 68 166.5 L 34 165.5 Z" fill={crimson} />
        <polygon points="34,165.5 70,165 68,166.5" fill={crimson} />

        {/* Text */}
        <text
          x="120"
          y="168"
          textAnchor="middle"
          fontFamily="'Manrope', sans-serif"
          fontWeight="700"
          fontSize="10"
          letterSpacing="5"
          fill={theme === 'dark' ? '#F1F5F9' : '#334155'}
        >
          BOXING CLUB
        </text>

        {/* Right red wing */}
        <polygon points="206,165.5 170,165 172,166.5" fill={crimson} />
      </svg>
    </div>
  );
};
