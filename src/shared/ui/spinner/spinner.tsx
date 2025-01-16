import React from "react";
import { motion } from "framer-motion";

interface SpinnerProps {
  size?: number; // Diameter of the spinner
  color?: string; // Color of the spinner
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "#00A859", // Default green
}) => {
  return (
    <motion.div
      animate={{
        rotate: 360, // Rotates the spinner
      }}
      transition={{
        repeat: Infinity, // Continuous rotation
        duration: 1, // Duration of one full rotation
        ease: "linear",
      }}
      style={{
        width: size,
        height: size,
        border: `${size / 10}px solid ${color}`, // Outer border
        borderTop: `${size / 10}px solid transparent`, // Transparent top
        borderRadius: "50%", // Circular shape
      }}
    />
  );
};
