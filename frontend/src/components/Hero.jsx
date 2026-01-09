import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import img1 from "../assets/Herbal Oil.png";
import img2 from "../assets/Activated Charcoal Cow Milk Soap.png";
import img3 from "../assets/Saffron Goat Milk Soap.png";
import img4 from "../assets/Kuppameni Fase Wash.png";
import img5 from "../assets/Pure Cow Ghee.png";
import "./hero.css";

const slides = [
  { id: 1, img: img1, title: "Herbal Hair Oil", subtitle: "Secret to Long Hair", discount: "100% Organic" },
  { id: 2, img: img2, title: "Charcoal Soap", subtitle: "Deep Cleansing", discount: "Natural Detox" },
  { id: 3, img: img3, title: "Saffron Goat Milk Soap", subtitle: "Skin Brightening", discount: "Gentle Care" },
  { id: 4, img: img4, title: "Kuppameni Wash", subtitle: "Acne Free Skin", discount: "Herbal Formula" },
  { id: 5, img: img5, title: "Pure Cow Ghee", subtitle: "Traditional Taste", discount: "Farm Fresh" }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="hero-section-wrapper">
      <div className="container hero-container" key={slide.id}>
        <div className="hero-left fade-in">
          <span className="badge-new">New Arrivals 2026</span>

          <h1>
            Discover Your <br />
            <span className="highlight-text">{slide.title}</span>
          </h1>

          <p className="hero-desc">
            Explore premium products with exclusive deals and fast delivery.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Shop Now <FaArrowRight />
            </button>
            <button className="secondary-btn">View Deals</button>
          </div>
        </div>

        <div className="hero-right fade-in">
          <div className="featured-card">
            <img
              src={slide.img}
              alt={slide.title}
              className="featured-img"
            />

            <div className="float-card">
              <div className="float-content">
                <strong>{slide.subtitle}</strong>
                <span>{slide.discount}</span>
              </div>
              <button className="mini-shop-btn">Shop</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
