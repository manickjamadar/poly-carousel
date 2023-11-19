import React, { Children, useEffect, useMemo, useState } from "react";
import calculateDistanceToCenter from "../../utils/calculateDistanceToCenter";
import { PolyCarouselController } from "../../hooks/usePolyCarouselController";
import "./PolyCarousel.css";
interface PolyCourselProps {
  cardWidth: number;
  cardHeight: number;
  controller?: PolyCarouselController;
  gap?: number;
  children: React.ReactNode;
  rotationDuration?: number;
  autoplay?: boolean;
  direction?: "left" | "right";
  autoPlayDuration?: number;
  pauseOnHover?: boolean;
  onPause?: () => void;
  onResume?: () => void;
}

const PolyCoursel: React.FC<PolyCourselProps> = ({
  cardWidth,
  cardHeight,
  controller,
  gap = 0,
  children,
  rotationDuration = 300,
  autoplay = false,
  direction = "right",
  autoPlayDuration = 2000,
  pauseOnHover = false,
  onPause,
  onResume,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hovered, setHovered] = useState(false);
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
  const handleMouseEntered = () => {
    setHovered(true);
    onPause && onPause();
  };
  const handleMouseLeave = () => {
    setHovered(false);
    onResume && onResume();
  };
  let animationDirection = "";
  switch (direction) {
    case "left":
      animationDirection = "reverse";
      break;
    case "right":
      animationDirection = "normal";
      break;
    default:
      animationDirection = "normal";
      break;
  }
  const animationValue = useMemo(
    () =>
      autoplay
        ? `rotate ${autoPlayDuration}ms linear infinite ${animationDirection} ${
            hovered ? "paused" : "running"
          }`
        : "",
    [autoplay, autoPlayDuration, hovered, animationDirection]
  );
  return (
    <div
      onMouseEnter={autoplay && pauseOnHover ? handleMouseEntered : undefined}
      onMouseLeave={autoplay && pauseOnHover ? handleMouseLeave : undefined}
      style={{
        width: cardWidth,
        height: cardHeight,
        position: "relative",
        transformStyle: "preserve-3d",
        transform: `perspective(3000px) rotateY(${rotationAngle}deg)`,
        transition: `transform ${rotationDuration}ms ease-in-out`,
        animation: animationValue,
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
