import { useState, useEffect } from 'react';
import { Star, Zap, Trophy, Heart } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function useFloatingAnimations() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  const createFloatingElement = (x: number, y: number, type: 'star' | 'zap' | 'trophy' | 'heart' = 'star') => {
    const icons = {
      star: Star,
      zap: Zap,
      trophy: Trophy,
      heart: Heart
    };

    const colors = {
      star: 'text-gamify-gold',
      zap: 'text-gamify-xp',
      trophy: 'text-gamify-gold',
      heart: 'text-red-500'
    };

    const newElement: FloatingElement = {
      id: Date.now() + Math.random(),
      x,
      y,
      icon: icons[type],
      color: colors[type]
    };

    setElements(prev => [...prev, newElement]);

    // Remove element after animation
    setTimeout(() => {
      setElements(prev => prev.filter(el => el.id !== newElement.id));
    }, 2000);
  };

  const triggerFloatingSuccess = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create multiple floating elements for more impact
    setTimeout(() => createFloatingElement(x - 20, y - 10, 'star'), 0);
    setTimeout(() => createFloatingElement(x + 20, y - 10, 'zap'), 200);
    setTimeout(() => createFloatingElement(x, y - 30, 'trophy'), 400);
  };

  const FloatingContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative ${className}`}>
      {children}
      {elements.map((element) => {
        const Icon = element.icon;
        return (
          <div
            key={element.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: element.x,
              top: element.y,
              animation: 'float-up 2s ease-out forwards'
            }}
          >
            <Icon className={`h-5 w-5 ${element.color} animate-bounce`} />
          </div>
        );
      })}
      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );

  return { createFloatingElement, triggerFloatingSuccess, FloatingContainer };
}
