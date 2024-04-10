import { VendorsType } from "@components/types/vendors";
import Carousel from ".";
import { Card } from "../Card";
import RightArrowIcon from "@components/assets/icons/rightArrowIcon";
import { Dataset } from "@components/types/dataset";
import Link from "next/link";
import { useRouter } from "next/router";

interface CrouselWrapperType {
  heading: string;
  data: Dataset[];
  categoryId: Number;
}

export const CrouselWrapper = ({
  heading,
  data,
  categoryId,
}: CrouselWrapperType) => {
  const router = useRouter();
  return (
    <div>
      <div className="max-w-7xl mx-auto px-8 md:px-16 mt-16">
        <div className="flex items-end gap-4 md:gap-8">
          <p className="text-4xl font-semibold">{heading}</p>
          <Link
            href={`/category/${categoryId}`}
            target="_blank"
            className="text-[#4F87F5] flex items-center"
          >
            <p>See all</p>
            <RightArrowIcon width={24} />
          </Link>
        </div>
      </div>
      <div className="max-w-7xl md:px-16 px-8 mx-auto mt-12">
        {data && (
          <Carousel>
            {data.map((item: Dataset, index: number) => {
              return <Card key={index} cardData={item} />;
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
};
