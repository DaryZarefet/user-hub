interface XaviaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function XaviaLogo({ size = 'md', showText = true }: XaviaLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Sphere Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="sphereGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(145 63% 55%)" />
              <stop offset="50%" stopColor="hsl(145 63% 40%)" />
              <stop offset="100%" stopColor="hsl(145 63% 30%)" />
            </linearGradient>
            <linearGradient id="stripeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 100%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(0 0% 100%)" stopOpacity="0.7" />
            </linearGradient>
            <clipPath id="sphereClip">
              <circle cx="50" cy="50" r="45" />
            </clipPath>
          </defs>
          
          {/* Main sphere */}
          <circle cx="50" cy="50" r="45" fill="url(#sphereGradient)" />
          
          {/* Stripes */}
          <g clipPath="url(#sphereClip)">
            <ellipse cx="50" cy="50" rx="48" ry="8" fill="url(#stripeGradient)" transform="rotate(-25 50 50) translate(0 -28)" />
            <ellipse cx="50" cy="50" rx="48" ry="8" fill="url(#stripeGradient)" transform="rotate(-25 50 50) translate(0 -10)" />
            <ellipse cx="50" cy="50" rx="48" ry="8" fill="url(#stripeGradient)" transform="rotate(-25 50 50) translate(0 8)" />
            <ellipse cx="50" cy="50" rx="48" ry="8" fill="url(#stripeGradient)" transform="rotate(-25 50 50) translate(0 26)" />
          </g>
          
          {/* Highlight */}
          <ellipse cx="35" cy="35" rx="15" ry="10" fill="white" opacity="0.3" transform="rotate(-30 35 35)" />
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <h1 className={`${textSizeClasses[size]} font-bold tracking-tight`}>
          <span className="text-primary">XAVIA</span>
          <span className="text-foreground ml-2">OAuth</span>
        </h1>
      )}
    </div>
  );
}
