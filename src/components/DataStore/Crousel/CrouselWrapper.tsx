import Carousel from ".";
import { Card } from "../Card";

export const CrouselWrapper = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-8">
        <div className="flex items-end gap-4 md:gap-8">
          <p className="text-4xl font-semibold">Industry 1</p>
          <p className="text-blue-600">See all {">>"}</p>
        </div>
      </div>
      <div className="max-w-7xl md:px-16 px-8 mx-auto mt-12">
        <Carousel>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Carousel>
      </div>
    </div>
  );
};
