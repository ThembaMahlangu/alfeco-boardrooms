import React from 'react'
import { motion } from 'framer-motion'

export default function Transition() {
    return (
        <>
      <motion.div
        className="fixed top-0 bottom-0 right-full h-screen w-screen z-30 bg-[#00ffc7]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: 0, width: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed top-0 bottom-0 right-full h-screen w-screen z-20 bg-[#fff]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: 0, width: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.div 
        className="fixed top-0 bottom-0 right-full h-screen w-screen z-10 bg-[rgba(188,198,204,1)]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: 0, width: "100%" }}
        transition={{delay: 0.4, duration: 0.8, ease: "easeInOut" }}
      />
      </>
    )
}