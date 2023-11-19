import React from "react";
import PolyCarousel from "./components/PolyCarousel/PolyCarousel";
import usePolyCarouselController from "./hooks/usePolyCarouselController";
const images: string[] = [
  "/images/photo-1.jpg",
  "/images/photo-2.jpg",
  "/images/photo-3.jpg",
  "/images/photo-4.jpg",
  "/images/photo-5.jpg",
  "/images/photo-6.jpg",
];
const cardWidth = 300;
const cardHeight = 500;
const App = () => {
  const controller = usePolyCarouselController();
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PolyCarousel
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          controller={controller}
          autoplay={true}
          direction="right"
          // pauseOnHover
          gap={100}
          onPause={() => console.log("paused")}
          onResume={() => console.log("resume")}
        >
          {images.map((image) => (
            <div
              key={image}
              style={{
                height: cardHeight,
                width: cardWidth,
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                src={image}
                alt="image"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </PolyCarousel>
      </div>
      <div>
        <button onClick={controller.previous}>Previous</button>
        <button onClick={controller.next}>Next</button>
      </div>
    </div>
  );
};

export default App;
