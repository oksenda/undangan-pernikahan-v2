import { motion } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ 
        once: true,    
        amount: 0.1,   
        margin: "0px"  
      }}
      
      transition={{ 
        duration: 0.6, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;