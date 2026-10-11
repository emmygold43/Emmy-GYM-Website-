# Hellian — Lavish Luxury Font Setup

To activate your licensed Hellian font files:
1. Place your font file into this directory:
   - `Hellian.woff2` (recommended for fastest web performance)
   - or `Hellian.woff`
   - or `Hellian.otf`
   - or `Hellian.ttf`

The global stylesheet (`/src/index.css`) is already pre-configured with the `@font-face` declaration:
```css
@font-face {
  font-family: 'Hellian';
  src: url('/fonts/Hellian.woff2') format('woff2'),
       url('/fonts/Hellian.woff') format('woff'),
       url('/fonts/Hellian.otf') format('opentype'),
       url('/fonts/Hellian.ttf') format('truetype');
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
}
```

Until your proprietary font file is added here, the website automatically displays the high-contrast lavish luxury serif fallbacks (`Cinzel`, `Playfair Display`, and `Cormorant Garamond`) that mirror the exact aesthetic.
