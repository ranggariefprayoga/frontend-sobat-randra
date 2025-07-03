import BannerCPNS from "@/components/CallToAction/CTAComponent";
import HeroSection from "@/components/HeroComponent/HeroComponent";
import CaraBeliSection from "@/section/CaraBeliSection";
import HomeProdukSection from "@/section/HomeProdukSection";
import PenjelasanProdukSection from "@/section/PenjelasanProdukSection";
import TestimoniSliderSection from "@/section/RatingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PenjelasanProdukSection />
      <HomeProdukSection />
      <CaraBeliSection />
      <TestimoniSliderSection />
      <BannerCPNS />
    </>
  );
}
