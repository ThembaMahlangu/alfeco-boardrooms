import React from 'react'
import { motion } from 'framer-motion'

export default function Transition() {
    return (
        <div className='z-50'>
      <motion.div
        className="fixed top-0 bottom-0 right-full h-screen w-screen z-30 bg-white"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: 0, width: "100%" }}
        exit={{ x:["0%", "100%"], width:["0%", "100%"]}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed top-0 bottom-0 right-full h-screen w-screen z-20 bg-[#00ffc7]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: 0, width: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.div 
        className="fixed top-0 bottom-0 right-full h-screen w-screen z-10 bg-[#cc6633]"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: 0, width: "100%" }}
        transition={{delay: 0.6, duration: 0.8, ease: "easeInOut" }}
      />
      </div>    
    )
  }