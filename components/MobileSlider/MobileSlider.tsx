"use client";
import React from "react";
import { Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { cn } from "@/lib/utils";

export default function MobileSlider({
  children,
  className,
}: {
  children: React.ReactNode;
  className: String;
}) {
  return (
    <div className="w-11/12 md:hidden mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={cn("myswiper", className)}
      >
        {children}
      </Swiper>
    </div>
  );
}
