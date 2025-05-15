"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createTryOutResponse } from "@/model/product.model";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  product?: createTryOutResponse | undefined;
};

function ProdukBelumTersedia() {
  return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground text-lg font-semibold">Produk Belum Tersedia</div>;
}

export default function DetailTO({ product }: Props) {
  const router = useRouter();
  if (!product) return <ProdukBelumTersedia />;

  const handleLinkToForm = () => {
    router.push(product.link_to_form || "");
  };

  return (
    <div className="px-8 md:px-24 max-w-7xl mx-auto mt-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
          <CardDescription className="text-muted-foreground">{product.marketing_text}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full h-64 md:h-auto md:w-1/2 rounded-lg overflow-hidden">
            {product.banner_image ? (
              <Image src={product.banner_image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-sm">Gambar tidak tersedia</div>
            )}
          </div>

          <div className="flex flex-col justify-between md:w-1/2">
            <p className="mb-4">{product.description}</p>

            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant={product.is_active ? "default" : "outline"} className="uppercase">
                {product.is_active ? "Aktif" : "Tidak Aktif"}
              </Badge>
              {product.is_free_available && (
                <Badge variant="outline" className="uppercase">
                  Gratis
                </Badge>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-lg font-semibold">
              {product.old_price && (
                <p>
                  Harga Lama: <span className="font-normal text-muted-foreground">{product.old_price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                </p>
              )}
              <p>
                Harga Baru: <span className="font-normal text-muted-foreground">{product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
              </p>
            </div>

            {product.link_to_form && (
              <Button onClick={handleLinkToForm} className="mt-4">
                Daftar Sekarang
              </Button>
            )}

            <p className="mt-6 text-xs text-muted-foreground">Terakhir diperbarui: {new Date(product.updated_at).toLocaleString("id-ID")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
