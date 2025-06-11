"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { Card } from "../ui/card";
import { useUpdateTryOutSession } from "@/lib/api/quisSession.api";
import { TryOutSessionResponse } from "@/model/quiz-session.model";

interface CountDownProps {
  quiz_session_data: TryOutSessionResponse;
}

export default function CountDownTimerForPremium({ quiz_session_data }: CountDownProps) {
  const router = useRouter();
  const { mutate, isPending } = useUpdateTryOutSession();
  const [countdownFinished, setCountdownFinished] = useState(false);

  // Set default value for expired_at if it's undefined
  const validExpiredAt = quiz_session_data.expired_at ?? new Date().toISOString();

  // Check if expired_at is undefined, show the refresh message
  useEffect(() => {
    if (!quiz_session_data.expired_at) {
      toast.error("Silakan refresh halaman.");
    }
  }, [quiz_session_data.expired_at]);

  const expiredTime = new Date(validExpiredAt).getTime();

  const [remainingTime, setRemainingTime] = useState<number>(() => Math.max(0, expiredTime - Date.now()));

  useEffect(() => {
    if (!validExpiredAt) return; // Skip if expired_at is undefined

    if (remainingTime <= 0) {
      setCountdownFinished(true);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = expiredTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
        setCountdownFinished(true); // Time's up, trigger mutation
      } else {
        setRemainingTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiredTime, remainingTime, validExpiredAt]);

  // Call API when countdown finishes
  useEffect(() => {
    if (countdownFinished) {
      mutate(
        { product_try_out_id: quiz_session_data.product_try_out_id, user_email: quiz_session_data.user_email, try_out_session_id: quiz_session_data.id },
        {
          onSuccess: () => {
            toast.success("Quiz selesai, Tunggu sebentar...");
            router.push("/history-nilai");
          },
          onError: () => {
            toast.error("Gagal submit Quiz, Coba lagi...");
          },
        }
      );
    }
  }, [countdownFinished, mutate, router, quiz_session_data.id, quiz_session_data.product_try_out_id, quiz_session_data.user_email]);

  if (!validExpiredAt) return null; // Do not display the countdown if expired_at is not available

  if (isPending) return <LoadingComponent color="ad0a1f" />;

  if (countdownFinished) {
    return (
      <div className="text-center font-semibold text-white bg-red-600 rounded-lg p-2 px-4 shadow-md">
        <span className="text-xl">Sesi sudah berakhir!</span>
      </div>
    );
  }

  // Format waktu menggunakan dayjs untuk tampilkan waktu yang lebih bagus
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-2">
      <Card className="p-2 px-4 border border-gray-300 bg-transparent text-gray-600 shadow-md rounded-lg">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="hidden sm:blocktext-base font-medium">Waktu tersisa:</span>
            <span className="font-bold text-[#ad0a1f] text-base">{formatTime(remainingTime)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
