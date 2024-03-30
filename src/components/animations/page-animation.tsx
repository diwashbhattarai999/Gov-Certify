"use client";

import { useEffect, useRef } from "react";

import {
  useAnimation,
  useInView,
  motion,
  AnimationProps,
  TargetAndTransition,
} from "framer-motion";

// interface AnimationWrapper {
//   keyValue?: string;
//   initial?: AnimationProps["initial"];
//   animate?: AnimationProps["animate"];
//   transition?: AnimationProps["transition"];
//   className?: string;
//   children: React.ReactNode;
// }

// const AnimationWrapper = ({
//   keyValue,
//   initial = { opacity: 0 },
//   animate = { opacity: 1 },
//   transition = { duration: 0.5 },
//   className,
//   children,
// }: AnimationWrapper) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         key={keyValue}
//         initial={initial}
//         animate={animate}
//         transition={transition}
//         className={cn("w-full", className)}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default AnimationWrapper;

interface AnimationWrapper {
  keyValue?: string;
  initial?: AnimationProps["initial"];
  animate?: TargetAndTransition;
  transition?: AnimationProps["transition"];
  delayOffset?: number;
  className?: string;
  children: React.ReactNode;
}

export default function AnimationWrapper({
  keyValue,
  delayOffset,
  initial = { opacity: 0.5 },
  animate = { opacity: 1 },
  transition = {
    type: "spring",
    damping: 30,
    stiffness: 200,
    delay: delayOffset,
    delayChildren: 1,
    staggerChildren: 0.2,
  },
  className,
  children,
}: AnimationWrapper) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      controls.start(animate);
    }
  }, [controls, isInView, animate]);

  return (
    <motion.div
      key={keyValue}
      ref={ref}
      className={className}
      initial={initial}
      animate={controls}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
