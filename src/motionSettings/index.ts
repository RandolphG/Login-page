const loginBody = {
  initial: { opacity: 0, transition: { duration: 0.8 } },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.8 } },
};

const header = {
  initial: { y: 10, opacity: 0, transition: { duration: 0.8 } },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  exit: { y: 10, opacity: 0, transition: { duration: 0.8 } },
};

const dropDown = {
  initial: { x: 10, opacity: 0, transition: { duration: 0.8 } },
  animate: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  exit: { x: 10, opacity: 0, transition: { duration: 0.8 } },
};

const variants = {
  initial: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.4 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const motionSettings = {
  loginBody,
  header,
  dropDown,
  variants,
};

export default motionSettings;
