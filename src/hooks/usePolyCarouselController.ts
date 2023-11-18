import EventEmitter from "eventemitter3";
import { useEffect, useRef } from "react";
export interface PolyCarouselControllerEvent {
  next: () => void;
  previous: () => void;
}
export type PolyCarouselEventEmitter =
  EventEmitter<PolyCarouselControllerEvent>;
export type PolyCarouselControllerRef =
  React.RefObject<PolyCarouselEventEmitter>;
export interface PolyCarouselController {
  next: () => void;
  previous: () => void;
  ref: PolyCarouselControllerRef;
}
const usePolyCarouselController = (): PolyCarouselController => {
  const controllerRef: PolyCarouselControllerRef = useRef(
    new EventEmitter<PolyCarouselControllerEvent>()
  );
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      controllerRef.current?.removeAllListeners();
    };
  }, []);
  const next = () => {
    controllerRef.current?.emit("next");
  };
  const previous = () => {
    controllerRef.current?.emit("previous");
  };
  return {
    ref: controllerRef,
    next,
    previous,
  };
};
export default usePolyCarouselController;
