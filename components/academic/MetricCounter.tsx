'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

interface MetricCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: string;
  subtext?: string;
  duration?: number;
}

export default function MetricCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  decimals = 0,
  icon,
  subtext,
  duration = 2.5,
}: MetricCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      {icon && (
        <div className="text-4xl mb-3 opacity-80">
          {icon}
        </div>
      )}

      <div className="text-4xl font-bold text-gray-900 mb-2">
        {inView && (
          <CountUp
            start={0}
            end={value}
            duration={duration}
            decimals={decimals}
            prefix={prefix}
            suffix={suffix}
            separator=","
          />
        )}
      </div>

      <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </div>

      {subtext && (
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
          <span className="text-green-600">↑</span>
          {subtext}
        </div>
      )}
    </motion.div>
  );
}
