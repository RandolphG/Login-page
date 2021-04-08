import { motion } from "framer-motion";
import React from "react";

interface FeatureProps {
  className: string;
  svg: JSX.Element;
  title: string;
  altText: string;
  backgroundImg: string;
}

const variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 10,
    opacity: 0,
  },
};

const Feature: React.FC<FeatureProps> = ({
  className,
  svg,
  title,
  altText,
  backgroundImg,
}) => (
  <motion.div
    variants={variants}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={className}
  >
    <div className="content">
      <span className="image">{svg}</span>
      <span className="content__text">{title}</span>
    </div>
    <img className="background-img" src={backgroundImg} alt={altText} />
  </motion.div>
);

export default Feature;
