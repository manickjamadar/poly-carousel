import React, { Children, useEffect, useState } from "react";
import calculateDistanceToCenter from "../../utils/calculateDistanceToCenter";
import { PolyCarouselController } from "../../hooks/usePolyCarouselController";
import "./PolyCarousel.css";
interface PolyCourselProps {
  cardWidth: number;
  cardHeight: number;
  controller?: PolyCarouselController;
  gap?: number;
  children: React.ReactNode;
  resetRotationOnUnmount?: boolean;
  rotationDuration?: number;
  autoplay?: boolean;
  direction?: "left" | "right";
  autoPlayDuration?: number;
  // pauseOnHover?: boolean;
  // onPause?: () => void;
  // onResume?: () => void;
}

const PolyCoursel: React.FC<PolyCourselProps> = ({
  cardWidth,
  cardHeight,
  controller,
  gap = 0,
  children,
  resetRotationOnUnmount = false,
  rotationDuration = 300,
  autoplay = true,
  direction = "right",
  autoPlayDuration = 2000,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  let animationName = "rotateRight";
  switch (direction) {
    case "left":
      animationName = "rotateLeft";
      break;
    case "right":
      animationName = "rotateRight";
      break;
    default:
      animationName = "rotateRight";
      break;
  }
  const childElements = Children.toArray(children);
  const distance = calculateDistanceToCenter(
    cardWidth + gap,
    childElements.length
  );
  const angleStep = 360 / childElements.length;
  useEffect(() => {
    const nextHandler = () => {
      if (autoplay) {
        return;
      }
      setRotationAngle((prevAngle) => prevAngle + angleStep);
    };
    const previousHandler = () => {
      if (autoplay) {
        return;
      }
      setRotationAngle((prevAngle) => prevAngle - angleStep);
    };
    controller?.ref.current?.on("next", nextHandler);
    controller?.ref.current?.on("previous", previousHandler);
    return () => {
      controller?.ref.current?.removeListener("next", nextHandler);
      controller?.ref.current?.removeListener("previous", previousHandler);
    };
  }, [controller, angleStep, autoplay]);
  useEffect(() => {
    return () => {
      if (resetRotationOnUnmount) {
        setRotationAngle(0);
      }
    };
  }, [resetRotationOnUnmount]);
  return (
    <div
      style={{
        width: cardWidth,
        height: cardHeight,
        position: "relative",
        transformStyle: "preserve-3d",
        transform: `perspective(3000px) rotateY(${rotationAngle}deg)`,
        transition: `transform ${rotationDuration}ms ease-in-out`,
        animation: autoplay
          ? `${animationName} ${autoPlayDuration}ms linear infinite`
          : "",
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
              index * angleStep
            }deg) translateZ(${distance}px)`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default PolyCoursel;
