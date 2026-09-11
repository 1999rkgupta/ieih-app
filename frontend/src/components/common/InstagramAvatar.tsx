import React from 'react';

interface InstagramAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const InstagramAvatar: React.FC<InstagramAvatarProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center bg-slate-200 dark:bg-slate-700/80 text-slate-400 dark:text-slate-400 select-none ${selectedSize} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Default avatar"
      >
        {/* Head */}
        <circle cx="50" cy="36" r="16.5" />
        {/* Shoulders / Torso silhouette */}
        <path d="M 21 86 C 21 68, 33 60, 50 60 C 67 60, 79 68, 79 86 Z" />
      </svg>
    </div>
  );
};

export default InstagramAvatar;
