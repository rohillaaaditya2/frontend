
// // import React, { useEffect, useState } from "react";
// // import "./HeroSlider.css";
// // const slides = [
// // {
// //   image:
// //     "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80",
// //   title: "🎉 Happy New Year 2026 🎉",
// //   desc: "Mega Sale is Live |  30% – 70% OFF on All Items",
// //   btn: "Shop New Year Deals",
// // }


// // ,
// //   {
// //     image:
// // "https://images.unsplash.com/photo-1607082349566-187342175e2f",
// //     title: "Men's Fashion Collection",
// //     desc: "Premium shirts, jeans & sneakers for men",
// //     btn: "Shop Men's Wear",
// //   },
// //   {
// //     image:
// //       "https://images.unsplash.com/photo-1521334884684-d80222895322",
// //     title: "Visit Our Shop",
// //     desc: "Experience fashion in-store with exclusive collections",
// //     btn: "Visit Store",
// //   },
// // ];

// // export default function HeroSlider() {
// //   const [current, setCurrent] = useState(0);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrent((prev) => (prev + 1) % slides.length);
// //     }, 4000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   return (
// //     <div className="slider-container">
// //       <div
// //         className="slider-wrapper"
// //         style={{ transform: `translateX(-${current * 100}vw)` }}
// //       >
// //         {slides.map((slide, index) => (
// //           <div className="slide" key={index}>
// //             <img src={slide.image} alt="fashion-banner" />
// //             <div className="overlay">
// //               <h1>{slide.title}</h1>
// //               <p>{slide.desc}</p>
// //               <button>{slide.btn}</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="dots">
// //         {slides.map((_, i) => (
// //           <span
// //             key={i}
// //             className={current === i ? "dot active" : "dot"}
// //             onClick={() => setCurrent(i)}
// //           ></span>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./HeroSlider.css";

// const slides = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80",
//     title: "🎉 Happy New Year 2026 🎉",
//     desc: "Mega Sale is Live |  30% – 70% OFF on All Items",
//     btn: "Shop New Year Deals",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1607082349566-187342175e2f",
//     title: "Men's Fashion Collection",
//     desc: "Premium shirts, jeans & sneakers for men",
//     btn: "Shop Men's Wear",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1521334884684-d80222895322",
//     title: "Visit Our Shop",
//     desc: "Experience fashion in-store with exclusive collections",
//     btn: "Visit Store",
//   },
// ];

// export default function HeroSlider() {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, []);

//   /* 👉 BUTTON CLICK HANDLER */
//   const handleButtonClick = () => {
//     navigate("/customermain/customerlogin");
//   };

//   return (
//     <div className="slider-container">
//       <div
//         className="slider-wrapper"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {slides.map((slide, index) => (
//           <div className="slide" key={index}>
//             <img src={slide.image} alt="fashion-banner" />
//             <div className="overlay">
//               <h1>{slide.title}</h1>
//               <p>{slide.desc}</p>
//               <button onClick={handleButtonClick}>
//                 {slide.btn}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DOTS */}
//       <div className="dots">
//         {slides.map((_, i) => (
//           <span
//             key={i}
//             className={current === i ? "dot active" : "dot"}
//             onClick={() => setCurrent(i)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    title: "🎉 New Year Mega Sale 2026 🎉",
    desc: "Flat 30% – 70% OFF on Trending Products",
    btn: "Shop New Year Deals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    title: "Men's Fashion Collection",
    desc: "Premium shirts, jeans & sneakers",
    btn: "Shop Men's Wear",
  },
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1520975698519-59c6e70d91c4?auto=format&fit=crop&w=1600&q=80",
  //   title: "Women's Latest Trends",
  //   desc: "Stylish dresses & accessories",
  //   btn: "Shop Women's Wear",
  // },
  {
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
    title: "Footwear Collection",
    desc: "Comfortable & stylish shoes for all",
    btn: "Shop Footwear",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    title: "Electronics & Gadgets",
    desc: "Best deals on latest gadgets",
    btn: "Shop Electronics",
  },
  {
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1600&q=80",
    title: "Visit Our Store",
    desc: "Experience shopping with exclusive offers",
    btn: "Visit Store",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);
  const navigate = useNavigate();

  /* AUTO SLIDE */
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  /* SWIPE HANDLERS */
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (diff < -50) {
      setCurrent((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
    }
  };

  const handleButtonClick = () => {
    navigate("/customermain/customerlogin");
  };

  return (
    <div
      className="slider-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.image} alt="banner" />
            <div
              className={`overlay ${
                index === current ? "active" : ""
              }`}
            >
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              <button onClick={handleButtonClick}>
                {slide.btn}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={current === i ? "dot active" : "dot"}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
