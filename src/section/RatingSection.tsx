"use client";

import { useGetFiveStarFeedback } from "@/lib/api/feedback.api";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function TestimoniSliderSection() {
  const { data, isLoading } = useGetFiveStarFeedback();

  if (isLoading || !data?.data || data.data.length < 4) return null;

  return (
    <LayoutBackgroundWhite>
      <TitleComponent title="Sobat Randra Bilang..." subTitle="Pesan dan kesan dari pengguna untuk kamu." />
      <section className="py-10 px-4 md:px-24 bg-white">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          slidesPerView={1.3}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.2 },
          }}
        >
          {data.data.map((item) => {
            const firstName = item.user_name?.split(" ")[0] || "User";

            return (
              <SwiperSlide key={item.id}>
                <Card className="border border-gray-200 shadow-sm cursor-">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{firstName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{firstName}</p>
                        <div className="flex gap-1 text-yellow-500">
                          {Array(item.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} size={18} className="fill-yellow-400 stroke-yellow-500 drop-shadow-md transition-transform duration-200 hover:scale-110" />
                            ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line line-clamp-5">{item.message}</p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </LayoutBackgroundWhite>
  );
}
