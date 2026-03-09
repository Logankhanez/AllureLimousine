"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
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

  // Définir les animations en fonction de la direction
  const getVariants = () => {
    const directions = {
      up: {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      },
      down: {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      },
      left: {
        hidden: { x: 20, opacity: 0 },
        visible: { x: 0, opacity: 1 },
      },
      right: {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 },
      },
    }

    return directions[direction]
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    }),
  }

  const child = {
    ...getVariants(),
    visible: {
      ...getVariants().visible,
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
      {items.map((item, index) => (
        <motion.span key={index} variants={child} className={`inline-block ${type === "words" ? "mr-[0.25em]" : ""}`}>
          {item === " " && type === "chars" ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.div>
  )
}

