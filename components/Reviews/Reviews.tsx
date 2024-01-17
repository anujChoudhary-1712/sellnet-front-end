"use client"
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import MobileSlider from "../MobileSlider/MobileSlider";
import { SwiperSlide } from "swiper/react";

const reviews = [
  {
    review: `Stumbled upon a hidden gem! The variety of digital art is astounding. Smooth transaction process, and the instant download feature is a game-changer. This platform is a paradise for art lovers, and I'll be a returning customer for sure!`,
    username: "SarahDigitalArtFan",
  },
  {
    review: `A tech enthusiast's dream! The range of code assets is impressive, and the purchasing process is seamless. My coding projects have leveled up thanks to the quality finds on this platform. Highly recommended for fellow developers!`,
    username: "TechGeek101",
  },
  {
    review: `Joining this marketplace as a seller has been a game-changer for me. Listing my art is a breeze, and the promotional tools boost visibility. Transactions are smooth, and the supportive community is fantastic. Grateful for the opportunity to share my artistic vision with a broader audience.`,
    username: "ArtisticVisionary",
  },
];

export default function Reviews() {
  return (
    <section className="my-16">
      <p className="text-[#030637] text-3xl text-center w-full font-bold mb-8">
        Thousands Of Happy Customers!
      </p>

      {/* mobile view */}
      <MobileSlider className={""}>
        {reviews.map((review, index) => {
          return (
            <SwiperSlide key={index}>
              <Card className="w-10/12 mx-auto py-6 min-h-[400px] shadow-xl">
                <CardContent>
                  <CardDescription className="text-lg min-h-[280px]">
                    {review.review}
                  </CardDescription>
                  <CardTitle className="">
                    {`- `}
                    {review.username}
                  </CardTitle>
                </CardContent>
              </Card>
            </SwiperSlide>
          );
        })}
      </MobileSlider>

      {/* {desktop view} */}
      <div className="hidden md:flex justify-center items-center gap-6 max-w-[1400px] mx-auto w-[97%] lg:w-10/12">
        {reviews.map((review, index) => {
          return (
            <Card
              key={index}
              className="max-w-[350px] py-6 min-h-[400px] shadow-xl"
            >
              <CardContent>
                <CardDescription className="text-[15px] xl:text-lg min-h-[280px]">
                  {review.review}
                </CardDescription>
                <CardTitle className="">
                  {`- `}
                  {review.username}
                </CardTitle>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
