import React from 'react';
import { motion } from 'framer-motion';

export const TomatoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
  >
    <path
      d="M12 2C7.58 2 4 5.58 4 10c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8z"
      fill="#ff6b6b"
    />
    <path
      d="M12 0L9 3h6z"
      fill="#4caf50"
    />
  </motion.svg>
);