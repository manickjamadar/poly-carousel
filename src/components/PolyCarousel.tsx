import { motion, useAnimation } from "framer-motion";
import React, { Children, useEffect, useRef } from "react";
const calculateDistanceToCenter = (width: number, totalSide: number) => {
  if (width <= 0 || totalSide < 3) {
    return 0;
  }
  const centralAngle = Math.PI / totalSide;
  const distance = width / (2 * Math.tan(centralAngle));
  return distance;
};
interface PolyCourselProps {
  cardWidth: number;
  cardHeight: number;
  children: React.ReactNode;
  /**
   In Milliseconds
   **/
  rotationDuration?: number;
  gap?: number;
  pauseOnHover?: boolean;
  onPause?: () => void;
  onResume?: () => void;
}

const PolyCoursel: React.FC<PolyCourselProps> = ({
  cardWidth,
  cardHeight,
  children,
  rotationDuration = 3000,
  gap = 30,
  pauseOnHover = false,
  onPause,
  onResume,
}) => {
  const controls = useAnimation();
  const rotateRef = useRef<number>(0);
  useEffect(() => {
    controls.start({ rotateY: 360 });
  }, [controls]);
  const childElements = Children.toArray(children);
  const distance = calculateDistanceToCenter(
    cardWidth + gap,
    childElements.length
  );
  return (
    <motion.div
      onUpdate={(value) => {
        if (pauseOnHover) {
          rotateRef.current = value.rotateY as number;
        }
      }}
      onMouseEnter={() => {
        if (pauseOnHover) {
          controls.stop();
          onPause && onPause();
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          controls.start({ rotateY: rotateRef.current + 360 });
          onResume && onResume();
        }
      }}
      initial={{
        transformPerspective: 3000,
        rotateY: 0,
      }}
      animate={controls}
      transition={{
        repeat: Infinity,
        duration: rotationDuration / 1000,
        ease: "linear",
      }}
      style={{
        width: cardWidth,
        height: cardHeight,
        position: "relative",
        transformStyle: "preserve-3d",
      }}
    >
      {childElements.map((child, index) => (
        <div
          key={index + child.toString()}
          style={{
            width: cardWidth,
            height: cardHeight,
            position: "absolute",
            top: 0,
            left: 0,
            transformStyle: "preserve-3d",
            transformOrigin: "center",
            transform: `rotateY(${
              index * (360 / childElements.length)
            }deg) translateZ(${distance}px)`,
          }}
        >
          {child}
        </div>
      ))}
    </motion.div>
  );
};

export default PolyCoursel;
