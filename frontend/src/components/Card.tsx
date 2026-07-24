import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', title, style }: CardProps) {
  return (
    <div className={`glass-panel ${className}`} style={style}>
      {title && <h3 style={{ marginBottom: '16px' }}>{title}</h3>}
      {children}
    </div>
  );
}
