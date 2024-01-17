"use client";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Card, CardContent, CardDescription } from "../ui/card";
import Image from "next/image";
import { IconContext } from "react-icons";
import Link from "next/link";
import MobileSlider from "../MobileSlider/MobileSlider";
import { SwiperSlide } from "swiper/react";
import blog1Img from "@/public/blog1.png"
import blog2Img from "@/public/blog2.png"
import blog3Img from "@/public/blog3.png"

const blogs = [
  {
    title: "Unleashing Creativity - A Guide to Selling Digital Art Online",
    description: `Are you an artist eager to showcase your digital masterpieces to the world? Or perhaps you're an art enthusiast searching for unique, digital treasures? Look no further! In this blog, we'll explore the world of selling and buying digital art on our vibrant digital marketplace.

    We'll delve into tips for artists on optimizing your listings, marketing your work effectively, and establishing your unique brand in the digital art space. For buyers, we'll guide you through navigating our marketplace to discover and acquire stunning digital art pieces that resonate with your taste. Join us on this creative journey and unlock the potential of the digital art marketplace!`,
    author: "Alex Creative",
    date: "March 15, 2023",
    imageUrl: blog1Img,
  },
  {
    title:
      "The Power of Pixels - How to Monetize Your Photography in the Digital Realm",
    description: `Calling all photographers and photography enthusiasts! Have you ever wondered how to turn your captivating digital snapshots into a source of income? Our digital marketplace provides the perfect platform for photographers to showcase and sell their work, while offering buyers a diverse array of stunning images to choose from.

    In this blog, we'll share insights into creating compelling photography listings, marketing strategies to attract potential buyers, and tips on building a successful photography portfolio. Whether you're a seasoned photographer or just starting, discover how the power of pixels can transform your passion into a profitable endeavor!`,
    author: "Emma Shutterbug",
    date: " April 8, 2023",
    imageUrl: blog2Img,
  },
  {
    title:
      "Crafting Code, Building Dreams - Navigating the Digital Asset Marketplace for Developers",
    description: `Are you a coding wizard looking to share your software creations with the world? Or are you a tech enthusiast seeking innovative digital solutions? Our digital marketplace is the perfect hub for developers to buy and sell digital assets, from plugins and scripts to complete software packages.

    Join us in this blog as we explore the nuances of selling and buying digital assets in the coding realm. Developers, learn how to showcase your code effectively, market your digital creations, and build a community around your work. Buyers, discover the latest and most ingenious digital tools that can elevate your projects to new heights. Let's embark on this coding adventure together in our thriving digital marketplace!`,
    author: "CodeCraftMaster",
    date: "May 20, 2023",
    imageUrl: blog3Img,
  },
];

export default function BlogsCard() {
  return (
    <section className="w-full bg-[#F0F0F0] py-16">
      <p className="text-[#030637] font-bold w-full text-center text-3xl mb-8">
        Recent Articles
      </p>
      <div className="hidden md:flex justify-center items-center gap-6 max-w-[1400px] mx-auto w-[97%] lg:w-10/12">
        {blogs.map((blog, index) => {
          return (
            <Card key={index} className="max-w-[350px] w-[30%] shadow-xl min-h-[450px] rounded-lg">
              <Image
                src={blog.imageUrl}
                alt=""
                className="h-[220px] w-full bg-black rounded-t-lg"
              />
              <CardContent className="flex flex-col lg:flex-row justify-between lg:items-center mt-2">
                <div className="flex gap-2 items-center">
                  <IconContext.Provider
                    value={{
                      style: { height: "12px", width: "12px", color: "gray" },
                    }}
                  >
                    <FaCalendarAlt />
                  </IconContext.Provider>
                  <CardDescription>{blog.date}</CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                  <IconContext.Provider
                    value={{
                      style: { height: "12px", width: "12px", color: "gray" },
                    }}
                  >
                    <FaRegUser />
                  </IconContext.Provider>
                  <CardDescription>{blog.author}</CardDescription>
                </div>
              </CardContent>
              <CardContent>
                <Link
                  href={`/blogs/${index}`}
                  className="text-[#030637] font-bold text-[15px] lg:text-[18px] hover:text-[#7ED7C1] transition-all delay-75"
                >
                  {blog.title}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* mobile view of reviews */}
      <MobileSlider className={""}>
        {blogs.map((blog, index) => {
          return (
            <SwiperSlide key={index}>
              <Card className="w-10/12 mx-auto shadow-xl min-h-[420px] rounded-lg">
                <Image
                  src={blog.imageUrl}
                  alt=""
                  className="h-[220px] w-full bg-black rounded-t-lg"
                />
                <CardContent className="flex justify-between items-center mt-2">
                  <div className="flex gap-2 items-center">
                    <IconContext.Provider
                      value={{
                        style: { height: "12px", width: "12px", color: "gray" },
                      }}
                    >
                      <FaCalendarAlt />
                    </IconContext.Provider>
                    <CardDescription>{blog.date}</CardDescription>
                  </div>
                  <div className="flex gap-2 items-center">
                    <IconContext.Provider
                      value={{
                        style: { height: "12px", width: "12px", color: "gray" },
                      }}
                    >
                      <FaRegUser />
                    </IconContext.Provider>
                    <CardDescription>{blog.author}</CardDescription>
                  </div>
                </CardContent>
                <CardContent>
                  <Link
                    href={`/blogs/${index}`}
                    className="text-[#030637] font-bold text-[17px] lg:text-xl hover:text-[#7ED7C1] transition-all delay-75"
                  >
                    {blog.title}
                  </Link>
                </CardContent>
              </Card>
            </SwiperSlide>
          );
        })}
      </MobileSlider>
    </section>
  );
}
