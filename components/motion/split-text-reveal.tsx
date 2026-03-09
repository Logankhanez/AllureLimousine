"use client"

import { useEffect } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface SplitTextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
  once?: boolean
  threshold?: number
  type?: "words" | "chars"
  direction?: "up" | "down" | "left" | "right"
}

export default function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
  once = true,
  threshold = 0.1,
  type = "words",
  direction = "up",
}: SplitTextRevealProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce: once })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  // Diviser le texte en mots ou en caractères
  const items = type === "words" ? text.split(" ") : Array.from(text)

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    },
  }

  const getChildVariants = (): Variants => {
    const baseTransition = {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
      duration,
    }

    switch (direction) {
      case "up":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: baseTransition },
        }
      case "down":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: baseTransition },
        }
      case "left":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: baseTransition },
        }
      case "right":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: baseTransition },
        }
    }
  }

  const child = getChildVariants()

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {items.map((item, index) => (
        <motion.span key={index} variants={child} className={`inline-block ${type === "words" ? "mr-[0.25em]" : ""}`}>
          {item === " " && type === "chars" ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.div>
  )
}
