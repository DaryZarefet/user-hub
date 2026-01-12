export function WaveDecoration() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-48 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(145 63% 35%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(80 65% 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(55 85% 55%)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(145 63% 40%)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(80 65% 55%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(55 85% 60%)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(145 63% 45%)" stopOpacity="0.25" />
            <stop offset="50%" stopColor="hsl(80 65% 60%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(55 85% 65%)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        
        {/* Wave 3 - Back */}
        <path
          fill="url(#waveGradient3)"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        
        {/* Wave 2 - Middle */}
        <path
          fill="url(#waveGradient2)"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        
        {/* Wave 1 - Front */}
        <path
          fill="url(#waveGradient1)"
          d="M0,256L48,266.7C96,277,192,299,288,293.3C384,288,480,256,576,240C672,224,768,224,864,234.7C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}
