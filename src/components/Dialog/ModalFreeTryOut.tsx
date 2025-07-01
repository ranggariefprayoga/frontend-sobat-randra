"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import NullComponent from "@/components/NullComponent/NullComponent";
import { Button } from "@/components/ui/button";
import CardTryOut from "../CardProductComponent/CardTryOut";
import { useGetAllFreeTryOutProductsForUser } from "@/lib/api/productTryOut.api";

export default function FreeTryOutModalSection() {
  const { data: freeTryOut, isLoading } = useGetAllFreeTryOutProductsForUser();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="bg-[#ad0a1f] text-white hover:bg-[#d7263d] transition font-semibold">
          Lihat Try Out Gratis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl w-full max-h-[90vh] overflow-y-auto px-4 py-6">
        <DialogTitle className="text-lg font-bold text-center mb-4">Try Out Gratis</DialogTitle>

        {isLoading ? (
          <p className="text-center py-8">Memuat...</p>
        ) : !freeTryOut?.data || freeTryOut.data.length === 0 ? (
          <NullComponent message="Try Out gratis belum tersedia." />
        ) : (
          <div className="w-full max-w-xs mx-auto">
            <CardTryOut product={freeTryOut.data[0]} customLink={`/pilihan-paket/tryout-gratis/${freeTryOut.data[0].id}`} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
