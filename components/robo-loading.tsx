"use client";

import { cn } from "@/lib/utils";
import { useLottie } from "lottie-react";

export default function RoboLoading({ className }: { className: string }) {
  const options = {
    loop: true,
    autoplay: true,
    animationData: require("@/public/lottie/Robo.json"),
  };

  const { View } = useLottie(options);

  return <div className={cn(className, "")}>{View}</div>;
}
