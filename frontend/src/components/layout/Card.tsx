import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'gold' | 'plain' | 'maroon';
}

const Card: React.FC<CardProps> = ({ children, title, className = '', variant = 'gold' }) => {
  const baseStyles = "rounded-2xl p-6 transition-all duration-400 ease-lux";
  
  const variants = {
    gold: "bg-royal-navy/60 backdrop-blur-md border border-cosmic-gold/30 hover:border-cosmic-gold shadow-xl hover:shadow-gold-light",
    plain: "bg-white/5 border border-white/10",
    maroon: "bg-deep-maroon/40 border border-cosmic-gold/20"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {title && (
        <h3 className="font-serif text-xl font-semibold text-cosmic-gold mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;
