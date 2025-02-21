"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      thumbnailRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      fullScreenRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className={`relative w-full aspect-[16/9] overflow-hidden rounded-lg ${
          isFullScreen
            ? "fixed inset-0 bg-black z-50 flex items-center justify-center"
            : ""
        }`}
        ref={fullScreenRef}
      >
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={toggleFullScreen}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors disabled:opacity-50"
          disabled={currentIndex === images.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Full-Screen Toggle Button */}
        <button
          onClick={toggleFullScreen}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          {isFullScreen ? (
            <X className="w-6 h-6" />
          ) : (
            <Maximize className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Thumbnails Section */}
      <div className="relative flex items-center">
        {/* Scroll Buttons */}
        {images.length > 8 && (
          <button
            onClick={() => scrollThumbnails("left")}
            className="absolute left-0 z-10 p-2 bg-white/80 hover:bg-white transition-colors rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide max-w-[640px] pl-8 pr-8"
          ref={thumbnailRef}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
                currentIndex === index ? "ring-2 ring-[#00a859]" : ""
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {images.length > 8 && (
          <button
            onClick={() => scrollThumbnails("right")}
            className="absolute right-0 z-10 p-2 bg-white/80 hover:bg-white transition-colors rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
