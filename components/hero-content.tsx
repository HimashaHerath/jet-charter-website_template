'use client';

import { useEffect, useState } from 'react';

export function HeroContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center pointer-events-none">
      {/* Top Content - Heading and Subheading */}
      <div
        className={`text-center mt-16 md:mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
      >
        <p className="text-[10px] md:text-xs font-light tracking-[0.5em] text-foreground/60 uppercase mb-4">
          Private Charter
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.28em] text-foreground/90 mb-4 uppercase">
          TRACE THE HORIZON
        </h1>
        <p className="text-[11px] md:text-sm font-light tracking-[0.2em] text-foreground/60 uppercase">
          Gold-lined journeys for business and leisure
        </p>
      </div>

      {/* Bottom Content */}
      <div
        className={`absolute bottom-16 md:bottom-20 max-w-2xl mx-auto text-center transition-all duration-1000 delay-300 px-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <p className="text-foreground/55 text-[10px] md:text-xs font-light leading-relaxed tracking-wide">
          When your time matters most,{' '}
          <span className="text-foreground/75 font-medium">Aurelian Air</span>{' '}
          Private Jet Charter maps each journey with precision and poise. From
          urgent business legs to slow escapes, our private fleet will connect
          you to your destination with quiet confidence and gold-standard care.
        </p>
      </div>
    </div>
  );
}
