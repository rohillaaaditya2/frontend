import React, { useEffect, useState } from "react";
import "./HomeSlider.css";

/* 🌐 8 E-COMMERCE BANNER IMAGES */
// const images = [
//   "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1920&q=80",
//   "https://images.unsplash.com/photo-1607083206173-91a1c7bff846?auto=format&fit=crop&w=1920&q=80",
// ];
/* 🌐 NEW E-COMMERCE SLIDER IMAGES */
const images = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1607082348034-74f73b7b7a44?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1607082349317-7b2b88d94c91?auto=format&fit=crop&w=1920&q=80",
 
];


function HomeSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-outer">
      <div className="home-slider">
        <img
          src={images[index]}
          alt={`Slider ${index + 1}`}
          className="home-slider-img"
        />

        {/* DOTS */}
        <div className="slider-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
