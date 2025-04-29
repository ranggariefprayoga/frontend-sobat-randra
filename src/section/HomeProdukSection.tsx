"use client";

import CardTryOut from "@/components/CardProductComponent/CardTryOut";
import NullComponent from "@/components/NullComponent/NullComponent";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { Button } from "@/components/ui/button";
import { dummyProductTryOut } from "@/data/dummy/product.home";
import { LayoutBackgroundImage } from "@/layout/LayoutBackgroundImage";
import { TryOutProductModel } from "@/model/product.model";
import { useRouter } from "next/navigation";

export default function HomeProdukSection() {
  const router = useRouter();
  return (
    <LayoutBackgroundImage>
      <TitleComponent subTitleColor="text-[#FFA500]" titleColor="text-white" title="Pilihan Paket Belajar" subTitle="Buat kamu pejuang CPNS, BUMN, dan POLRI" textAlign="start" />
      <div className="w-full px-8 md:px-28 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <Button className="bg-white text-black hover:bg-[#f5f5f5]" variant="default" size="lg">
          Try Out
        </Button>
        <Button className="bg-transparent border hover:bg-white hover:text-black" variant="default" size="lg">
          Bimbel
        </Button>
        <Button className="bg-transparent border hover:bg-white hover:text-black" variant="default" size="lg">
          Smart Book
        </Button>
        <Button className="bg-transparent border hover:bg-white hover:text-black" variant="default" size="lg">
          Video Belajar
        </Button>
      </div>
      {dummyProductTryOut && dummyProductTryOut.length > 0 ? (
        <>
          <div className="w-full px-8 md:px-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {dummyProductTryOut.map((product: TryOutProductModel) => (
              <CardTryOut key={product.id} product={product} customLink="/pilihan-paket" />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => router.push("/pilihan-paket")} variant="default" className="bg-white text-[#ad0a1f] hover:bg-[#f5f5f5] hover:text-[#d7263d] cursor-pointer">
              Lihat Semua Paket Belajar
            </Button>
          </div>
        </>
      ) : (
        <NullComponent message="Tidak ada produk tersedia" color="text-white" />
      )}
    </LayoutBackgroundImage>
  );
}
