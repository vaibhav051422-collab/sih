import { motion } from "framer-motion";

export default function HandWrittenTitle({
  title = "Hand Written",
  className = "w-48 h-20", // Default size for navbar
  textSize = "text-2xl", // Default text size
}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      // 1. Define opacity as a keyframe animation array.
      // It will go from 0 -> 1 -> 1 -> 0.
      opacity: [0, 1, 1, 0],
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        // 2. Define a separate, longer transition for the opacity keyframes.
        opacity: {
          duration: 2.5, // Total duration for the fade in/out sequence
          // 3. 'times' maps each keyframe value to a point in the duration.
          // 0 -> 1 (fade in) happens in the first 10% of the duration.
          // It stays at 1 until 70% of the duration.
          // It fades out from 70% to 100%.
          times: [0, 0.1, 0.7, 1],
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 200 80"
        initial="hidden"
        animate="visible"
        className="absolute inset-0 w-full h-full"
      >
        <title>{title}</title>
        <motion.path
          d="M 170 40 C 170 62, 140 80, 100 80 C 60 80, 30 62, 30 40 C 30 18, 60 0, 100 0 C 140 0, 170 18, 170 40 Z"
          fill="none"
          strokeWidth="5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          className="text-white opacity-90"
        />
      </motion.svg>
      <motion.h1
        className={`text-white tracking-tighter ${textSize}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {title}
      </motion.h1>
    </div>
  );
}
