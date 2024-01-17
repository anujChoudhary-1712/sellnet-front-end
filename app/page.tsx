import BlogsCard from "@/components/Blogs/BlogsCard";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import Reviews from "@/components/Reviews/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Features />
      <Reviews />
      <BlogsCard />
    </main>
  )
}
