"use client";

import { useMemo, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "@/app/common/ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import "./styles/swiper.css";
type props = {
  key_?: string;
};

const RecommendedProducts: React.FC<props> = ({ key_ = "" }) => {
  const [reachedEnd, setReachedEnd] = useState(false);
  const [reachedBeginning, setReachedBeginning] = useState(true);

  const cards = useMemo(() => {
    return Array.from(new Array(10)).map((item, index) => {
      return (
        <SwiperSlide key={index}>
          <ProductCard />
        </SwiperSlide>
      );
    });
  }, []);

  return (
    <div className="relative">
      <Swiper
        spaceBetween={15}
        // navigation={true}
        navigation={{
          nextEl: `.next-class-${key_}`,
          prevEl: `.prev-class-${key_}`,
        }}
        slidesPerView={"auto"}
        modules={[Navigation]}
        className="row__swiper"
        onReachEnd={() => setReachedEnd(true)}
        onReachBeginning={() => setReachedBeginning(true)}
        onSliderMove={(swiper) =>
          swiper.swipeDirection === "prev"
            ? setReachedEnd(false)
            : setReachedBeginning(false)
        }
      >
        {cards}
      </Swiper>
      <button
        onClick={() => setReachedEnd(false)}
        className={`prev-class-${key_} hidden z-[100] absolute top-1/2 -translate-y-1/2 w-[44px] -left-5 shadow-2xl h-[44px] bg-[#ced4da] rounded-full items-center justify-center md:flex ${
          reachedBeginning && "md:hidden"
        } `}
      >
        <FaAngleLeft size={22} className="fill-black" />
      </button>
      <button
        onClick={() => {
          setReachedBeginning(false);
        }}
        className={`next-class-${key_} hidden z-[100] absolute top-1/2 -translate-y-1/2 w-[44px] -right-5 shadow-2xl h-[44px] bg-[#ced4da] rounded-full items-center justify-center md:flex ${
          reachedEnd && "md:hidden"
        } `}
      >
        <FaAngleRight size={22} className="fill-black" />
      </button>
    </div>
  );
};

export default RecommendedProducts;
