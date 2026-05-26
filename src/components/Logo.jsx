// NutriWell Logo Component
const Logo = ({ size = 48, variant = "full" }) => {
  if (variant === "icon") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx="32" cy="32" r="30" stroke="#10b981" strokeWidth="2" fill="none" />
        
        {/* Inner circle */}
        <circle cx="32" cy="32" r="24" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.5" />
        
        {/* Leaf shape - top left */}
        <path d="M 24 20 Q 20 16 18 20 Q 16 24 20 28 Q 24 24 24 20" fill="#10b981" />
        
        {/* Leaf shape - top right */}
        <path d="M 40 20 Q 44 16 46 20 Q 48 24 44 28 Q 40 24 40 20" fill="#059669" />
        
        {/* Apple shape - center */}
        <circle cx="32" cy="36" r="8" fill="#10b981" opacity="0.8" />
        <path d="M 32 28 Q 30 26 32 24 Q 34 26 32 28" fill="#059669" />
        
        {/* Leaf on apple */}
        <path d="M 36 30 Q 40 28 42 30 Q 40 32 36 32" fill="#059669" />
        
        {/* Bottom leaf - left */}
        <path d="M 20 44 Q 16 48 18 52 Q 22 50 24 46" fill="#10b981" opacity="0.7" />
        
        {/* Bottom leaf - right */}
        <path d="M 44 44 Q 48 48 46 52 Q 42 50 40 46" fill="#059669" opacity="0.7" />
      </svg>
    );
  }

  // Full logo with text
  return (
    <svg width={size * 2.5} height={size} viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Logo icon */}
      <g>
        {/* Outer circle */}
        <circle cx="40" cy="40" r="30" stroke="#10b981" strokeWidth="2" fill="none" />
        
        {/* Inner circle */}
        <circle cx="40" cy="40" r="24" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.5" />
        
        {/* Leaf shape - top left */}
        <path d="M 32 28 Q 28 24 26 28 Q 24 32 28 36 Q 32 32 32 28" fill="#10b981" />
        
        {/* Leaf shape - top right */}
        <path d="M 48 28 Q 52 24 54 28 Q 56 32 52 36 Q 48 32 48 28" fill="#059669" />
        
        {/* Apple shape - center */}
        <circle cx="40" cy="44" r="8" fill="#10b981" opacity="0.8" />
        <path d="M 40 36 Q 38 34 40 32 Q 42 34 40 36" fill="#059669" />
        
        {/* Leaf on apple */}
        <path d="M 44 38 Q 48 36 50 38 Q 48 40 44 40" fill="#059669" />
        
        {/* Bottom leaf - left */}
        <path d="M 28 52 Q 24 56 26 60 Q 30 58 32 54" fill="#10b981" opacity="0.7" />
        
        {/* Bottom leaf - right */}
        <path d="M 52 52 Q 56 56 54 60 Q 50 58 48 54" fill="#059669" opacity="0.7" />
      </g>

      {/* Text */}
      <text x="90" y="55" fontFamily="Poppins, sans-serif" fontSize="36" fontWeight="700" fill="#10b981" letterSpacing="-0.5">
        NutriWell
      </text>
      
      {/* Tagline */}
      <text x="90" y="72" fontFamily="Poppins, sans-serif" fontSize="12" fontWeight="400" fill="#059669" opacity="0.8" letterSpacing="0.5">
        WELLNESS TRACKING
      </text>
    </svg>
  );
};

export default Logo;
