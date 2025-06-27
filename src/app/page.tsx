import HeroSection from "@/components/HeroComponent/HeroComponent";
import CaraBeliSection from "@/section/CaraBeliSection";
import HomeProdukSection from "@/section/HomeProdukSection";
import PenjelasanProdukSection from "@/section/PenjelasanProdukSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PenjelasanProdukSection />
      <HomeProdukSection />
      <CaraBeliSection />
    </>
  );
}
