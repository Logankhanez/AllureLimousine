"use client"

import { motion, useAnimation, type Variants } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
  once?: boolean
  threshold?: number
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  once = true,
  threshold = 0.1,
}: TextRevealProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce: once })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  const letters = Array.from(text)

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    },
  }

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

