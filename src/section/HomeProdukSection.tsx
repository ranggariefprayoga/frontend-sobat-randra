import SemuaPaketSobatRandraSection from "@/components/AllPackageComponent/SemuaPaketSobatRandraSection";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { LayoutBackgroundImage } from "@/layout/LayoutBackgroundImage";

export default function HomeProdukSection() {
  return (
    <LayoutBackgroundImage>
      <div className="max-w-[1420px] mx-auto">
        <TitleComponent titleColor="text-black" title="Pilihan Paket Belajar" subTitle="Buat kamu pejuang NIP" />
        <SemuaPaketSobatRandraSection />
      </div>
    </LayoutBackgroundImage>
  );
}
