"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";

interface UserProfileAnimationProps {
  keyValue?: string;
  initial?: AnimationProps["initial"];
  animate?: AnimationProps["animate"];
  exit?: AnimationProps["exit"];
  transition?: AnimationProps["transition"];
  delayOffset?: number;
  className?: string;
  children: React.ReactNode;
}

const UserProfileAnimation = ({
  keyValue,
  initial = { y: -10, opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: 10, opacity: 0 },
  delayOffset,
  transition = {
    type: "spring",
    damping: 30,
    stiffness: 200,
    delay: delayOffset,
    delayChildren: 0.3,
  },
  className,
  children,
}: UserProfileAnimationProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfileAnimation;
