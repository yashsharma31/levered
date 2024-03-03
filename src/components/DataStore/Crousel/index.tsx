// components/Carousel.tsx

import { useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(children.length / itemsPerPage);

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const startIndex = currentIndex * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, children.length);
  const itemsToShow = children.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex transition-transform duration-500 ease-in-out`}
        style={{
          transform: `translateX(-${(100 / itemsPerPage) * currentIndex}%)`,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="carousel-item flex-none w-full"
            style={{ width: `calc(100% / ${itemsPerPage})` }}
          >
            {child}
          </div>
        ))}
      </div>
      {currentIndex > 0 && (
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-4"
          onClick={prevSlide}
        >
          {"<"}
        </button>
      )}
      {currentIndex < totalPages - 1 && children.length > itemsPerPage && (
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-4"
          onClick={nextSlide}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default Carousel;
