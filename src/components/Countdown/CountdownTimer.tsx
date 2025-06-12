"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUpdateTryOutSession } from "@/lib/api/quisSession.api";

interface CountdownTimerProps {
  expiredAt: string;
  sessionId: number;
  productId: number;
  userEmail: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiredAt, sessionId, productId, userEmail }) => {
  const router = useRouter();
  const expiredTime = new Date(expiredAt).getTime();
  const [timeLeft, setTimeLeft] = useState(expiredTime - Date.now());

  const { mutate: updateQuizSession } = useUpdateTryOutSession();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = expiredTime - now;
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        updateQuizSession({
          try_out_session_id: sessionId,
          product_try_out_id: productId,
          user_email: userEmail,
        });
        router.push("/history-nilai");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredTime, timeLeft, router, sessionId, productId, userEmail, updateQuizSession]);

  if (timeLeft <= 0) return null;

  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <TimeBox label="Jam" value={hours} />
      <TimeBox label="Menit" value={minutes} />
      <TimeBox label="Detik" value={seconds} />
    </div>
  );
};

const TimeBox = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center">
    <span className="countdown font-mono text-base sm:text-lg md:text-2xl lg:text-3xl">
      <span style={{ "--value": value } as React.CSSProperties} aria-live="polite">
        {value}
      </span>
    </span>
    <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">{label}</span>
  </div>
);

export default CountdownTimer;
