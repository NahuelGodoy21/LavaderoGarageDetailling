import React from 'react';

export default function Logo({ className, style }) {
  return (
    <svg 
      className={className} 
      style={{ ...style, display: 'inline-block' }} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="url(#grad1)" stroke="#00f2fe" strokeWidth="2" />
      <path 
        d="M20 60 C30 60, 30 45, 45 45 L55 45 C70 45, 70 60, 80 60 L80 65 L20 65 Z" 
        fill="#ffffff" 
        fillOpacity="0.9" 
      />
      <path 
        d="M35 45 C40 35, 60 35, 65 45 Z" 
        fill="#4facfe" 
      />
      <circle cx="32" cy="65" r="7" fill="#1a1a1a" stroke="#00f2fe" strokeWidth="2" />
      <circle cx="68" cy="65" r="7" fill="#1a1a1a" stroke="#00f2fe" strokeWidth="2" />
      
      <circle cx="32" cy="65" r="3" fill="#ffffff" />
      <circle cx="68" cy="65" r="3" fill="#ffffff" />
      
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>
    </svg>
  );
}
