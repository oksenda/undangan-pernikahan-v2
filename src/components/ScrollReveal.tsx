import { motion } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      
      transition={{ 
        duration: 0.8, 
        ease: [0.17, 0.67, 0.83, 0.67]
      }}
      
      viewport={{ 
        once: false, 
        amount: 0.2,
        margin: "0px 0px -50px 0px"
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;