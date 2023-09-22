import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BookingModal from './BookingModal';

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, balls = [];
    let mouse = {
      x: undefined,
      y: undefined
    }
    
    let rgb = [
      "rgb(235, 64, 52)",
      "rgb(0, 255, 200)",
      "rgb(204, 102, 51)",
      "rgb(235, 64, 52)",
      "rgb(0, 255, 200)",
      "rgb(204, 102, 51)",
      "rgb(235, 232, 237)"
    ]

    const resizeReset = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    const animationLoop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      drawBalls();

      let temp = [];
      for (let i = 0; i < balls.length; i++) {
        if (balls[i].time <= balls[i].ttl) {
          temp.push(balls[i]);
        }
      }
      balls = temp;

      requestAnimationFrame(animationLoop);
    }

    const drawBalls = () => {
      for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
      }
    }

    const mousemove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;

      for (let i = 0; i < 3; i++) {
        balls.push(new Ball());
      }
    }

    const mouseout = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    }

    const getRandomInt = (min, max) => {
      return Math.round(Math.random() * (max - min)) + min;
    }

    const easeOutQuart = (x) => {
      return 1 - Math.pow(1 - x, 4);
    }

    class Ball {
      constructor() {
        this.start = {
          x: mouse.x + getRandomInt(-20, 20),
          y: mouse.y + getRandomInt(-20, 20),
          size: getRandomInt(30, 40)
        }
        this.end = {
          x: this.start.x + getRandomInt(-300, 300),
          y: this.start.y + getRandomInt(-300, 300)
        }

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.style = rgb[getRandomInt(0, rgb.length - 1)];

        this.time = 0;
        this.ttl = 120;
      }
      draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        if (this.time <= this.ttl) {
          let progress = 1 - (this.ttl - this.time) / this.ttl;

          this.size = this.start.size * (1 - easeOutQuart(progress));
          this.x = this.x + (this.end.x - this.x) * 0.01;
          this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
      }
    }

    const init = () => {
      resizeReset();
      animationLoop();
    }

    init();

    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);

    return () => {
      window.removeEventListener("resize", resizeReset);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseout);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % 2);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + 2) % 2);

  return (
    <>
    <div
      className="h-[100vh] relative transition-opacity duration-500"
      style={{
        backgroundImage: `url(${currentSlide === 0 ? 'https://avsmartsolutions.com/wp-content/uploads/2021/12/conference-room.jpg' : 'https://www.hotelsky.co.za/wp-content/uploads/2022/03/Boardroom3.jpg'})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <FaArrowLeft
        size={24}
        className={`absolute top-60 text-white left-0 cursor-pointer hover:scale-110 transition-transform z-30 ${isMobile && 'hidden'}`}
        onClick={prevSlide}
      />

      {/* Hero Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className={`text-5xl font-bold text-white mb-5`}>{currentSlide === 0 ? 'Alfeco Boardrooms Management' : 'Boardrooms Schedules'}</h1>
        <p className="text-xl text-white mb-5">{currentSlide === 0 ? 'An Easier Way to secure a spot for your next meeting.' : 'Check the schedules of the boardrooms so as to ensure your booking gets approved.'}</p>
      </div>

      <FaArrowRight
        size={24}
        className={`absolute top-60 right-0 text-white cursor-pointer hover:scale-110 transition-transform z-30 ${
          isMobile && 'hidden'
        }`}
        onClick={nextSlide}
      />

      {/* Action Buttons */}
      <div className="absolute inline bottom-24 left-1/2 transform -translate-x-1/2">
        <button onClick={currentSlide === 0 ? () => window.location.href = '/login' : () => window.location.href = '/schedules'}
         className={!isMobile ? `bg-[#00ffc7] bg-opacity-10 border-2 border-white text-white px-10 py-3 text-xl hover:bg-[#fff] hover:text-black hover:border-black hover:shadow-lg transition-shadow duration-300` : `bg-[#00ffc7] bg-opacity-10 border-2 border-white text-white px-7 py-3 text-xl hover:bg-[#fff] hover:text-black hover:border-black hover:shadow-lg transition-shadow duration-300` }>
          {currentSlide === 0 ? 'Book Now' : 'Check Schedules'}
        </button>
      </div>
          <canvas ref={canvasRef} id="canvas"></canvas>;

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        {[0, 1].map((slideIndex) => (
          <div
            key={slideIndex}
            className={`h-2 hover:cursor-pointer w-12 mx-1 inline-block ${
              currentSlide === slideIndex ? 'bg-[#fff]' : 'bg-gray-300 bg-opacity-10'
            }`}
            onClick={() => setCurrentSlide(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
    </>
  );
}