'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface DynamicCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function DynamicCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: DynamicCounterProps) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals)}${suffix}`
  );
  const [currentText, setCurrentText] = useState(`${prefix}${value.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setCurrentText(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return <span className={className}>{currentText}</span>;
}
