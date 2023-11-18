import React, { Children, useEffect, useState } from "react";
import calculateDistanceToCenter from "../../utils/calculateDistanceToCenter";
import { PolyCarouselController } from "../../hooks/usePolyCarouselController";
interface PolyCourselProps {
  cardWidth: number;
  cardHeight: number;
  controller?: PolyCarouselController;
  gap?: number;
  children: React.ReactNode;
  resetRotationOnUnmount?: boolean;
  // rotationDuration?: number;
  // pauseOnHover?: boolean;
  // autoplay?: boolean;
  // autoplayType?: "smooth" | "onebyone";
  // onPause?: () => void;
  // onResume?: () => void;
}

const PolyCoursel: React.FC<PolyCourselProps> = ({
  cardWidth,
  cardHeight,
  controller,
  gap = 0,
  children,
  resetRotationOnUnmount = true,
  // rotationDuration = 3000,
  // autoplay = false,
  // autoplayType = "smooth",
  // pauseOnHover = false,
  // onPause,
  // onResume,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const childElements = Children.toArray(children);
  const distance = calculateDistanceToCenter(
    cardWidth + gap,
    childElements.length
  );
  const angleStep = 360 / childElements.length;
  useEffect(() => {
    controller?.ref.current?.on("next", () => {
      setRotationAngle((prevAngle) => prevAngle + angleStep);
    });
    controller?.ref.current?.on("previous", () => {
      setRotationAngle((prevAngle) => prevAngle - angleStep);
    });
  }, [controller, angleStep]);
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
        transition: "transform 0.3s ease-in-out",
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
