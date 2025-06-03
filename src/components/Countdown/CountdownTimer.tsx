// components/CountdownTimer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubmitFreeTryOut } from "@/lib/api/quisSession.api";

type Props = {
  expiredAt: string | Date; // dari payload API
};

export default function CountdownTimer({ expiredAt }: Props) {
  const router = useRouter();
  const { mutate: submitFreeTryOut } = useSubmitFreeTryOut();
  const [remainingTime, setRemainingTime] = useState<number>(() => {
    const expiredTime = new Date(expiredAt).getTime();
    return Math.max(0, expiredTime - Date.now());
  });

  useEffect(() => {
    if (remainingTime <= 0) {
      submitFreeTryOut(undefined, {
        onSuccess: () => {
          router.push("/free-quiz/selesai");
        },
      });
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, submitFreeTryOut, router]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="text-sm text-right text-muted-foreground">
      Waktu tersisa: <span className="font-semibold text-destructive">{formatTime(remainingTime)}</span>
    </div>
  );
}
