import HeroButtons from "@/components/HeroComponent/HeroButtons";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import LayoutBackgroundRed from "@/layout/LayoutBackgroundRed";
import LayoutContent from "@/layout/LayoutContent";

export default function CTASection() {
  return (
    <LayoutBackgroundRed>
      <TitleComponent subTitleColor="text-white" titleColor="text-white" title="Hubungi Kami" />
      <LayoutContent>
        <p className="mb-8">Buat akunmu sekarang dan Uji Kemampuanmu melalui Try Out Sobat Randra. Sebuah langkah awal untuk lolos ke menjadi seorang CPNS, BUMN, dan Polri impianmu</p>
        <HeroButtons />
      </LayoutContent>
    </LayoutBackgroundRed>
  );
}
