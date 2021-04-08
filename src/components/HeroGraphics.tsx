import { motion } from "framer-motion";
import React from "react";
import heroImgOne from "../assets/png/heroimage-1.png";
import heroImgTwo from "../assets/png/heroimage-2.png";

const transition = { duration: 0.8 };

const parentVariants = {
  initial: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const childrenVariants = {
  initial: {
    x: 10,
    opacity: 0,
    transition,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition,
  },
  exit: {
    x: 10,
    opacity: 0,
    transition,
  },
};

const variants = {
  initial: {
    x: -10,
    opacity: 0,
    transition: { duration: 1 },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: {
    x: -10,
    opacity: 0,
    transition: { duration: 1 },
  },
};

const imgs = [
  { keyNumber: 1, number: "one", src: heroImgOne },
  { keyNumber: 2, number: "two", src: heroImgTwo },
];

const HeroGraphics: React.FC = () => (
  <div className="mainteaser__graphic">
    <motion.div
      variants={parentVariants}
      key="graphic-container"
      initial="initial"
      animate="animate"
      exit="exit"
      className="mainteaser__graphic__container"
    >
      <motion.span
        variants={variants}
        className="mainteaser__graphic__container_accent-rect"
      />
      {imgs.map(({ keyNumber, number, src }, index) => (
        <motion.img
          variants={childrenVariants}
          key={`graphic-${keyNumber}`}
          className={`mainteaser__graphic__container_img-${number}`}
          src={src}
          alt={`Hero #${keyNumber}`}
        />
      ))}
    </motion.div>
  </div>
);

export default HeroGraphics;
