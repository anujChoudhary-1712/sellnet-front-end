"use client"
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { GrResources } from "react-icons/gr";
import { FaStore } from "react-icons/fa";
import { MdIntegrationInstructions } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import Image from "next/image";
import { IconContext } from "react-icons";

const features = [
  {
    title: "Cutting-Edge Resources",
    description:
      "Stay ahead with our ever-growing library of digital assets, tools, and templates. Fuel your creativity with resources designed to push boundaries.",
    Icon: GrResources,
  },
  {
    title: "Seamless Integration",
    description:
      "Download in various formats compatible with popular design tools. Effortlessly integrate our resources into your workflow for a smoother creative process.",
    Icon: MdIntegrationInstructions,
  },
  {
    title: "Effortless Store Setup",
    description:
      "Create your digital storefront in minutes. Showcase your portfolio, set prices, and let your unique style shine through with our user-friendly setup.",
    Icon: FaStore,
  },
  {
    title: "Performance Analytics",
    description:
      "Track your success with our analytics dashboard. Gain insights into your sales, understand your audience, and refine your strategy for maximum impact.",
    Icon: MdAnalytics,
  },
];

export default function Features() {
  return (
    <section className="w-full bg-violet-900 py-24">
      <div className="mx-auto max-w-[1400px] w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {features.map((feature, index) => {
          return (
            <Card
              key={index}
              className="bg-white flex flex-col justify-center items-center gap-5 rounded-lg px-4"
            >
              <CardContent>
                <IconContext.Provider
                  value={{
                    style: { height: "50px", width: "50px", color: "#030637",marginTop:"1rem" },
                  }}
                >
                  <feature.Icon />
                </IconContext.Provider>
              </CardContent>
              <CardContent className="sm:h-[200px] lg:h-[250px] px-0 w-11/12">
                <CardTitle className=" text-center text-[#030637] mb-2">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-center w-full">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
