import BlogsCard from "@/components/Blogs/BlogsCard";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import Reviews from "@/components/Reviews/Reviews";
import TopProducts from "@/components/TopProducts/TopProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <TopProducts />
      <FeaturedProducts />
      <Features />
      <Reviews />
      {/* <BlogsCard /> */}
    </main>
  )
}
