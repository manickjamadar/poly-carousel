import React from "react";
import PolyCarousel from "./components/PolyCarousel";
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
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PolyCarousel
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        rotationDuration={4000}
        gap={60}
        pauseOnHover
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
  );
};

export default App;
