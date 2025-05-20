import { ConversionCard } from "@/components/conversion-card";
import { priceStats } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen">
      {/* Using the image as the background */}
      <Image
        alt="background"
        src="/coins.png"
        width={200}
        height={200}
        priority
        className="absolute inset-0 w-full h-full -z-20"
      />
      <div className="w-full flex flex-col gap-5 py-24">
        <header className="flex items-center flex-col gap-2">
          <h2 className="font-bold text-[42px]">Payfrica Bridge</h2>
          <p className="text-[33px] text-center">
            Buy Sui with your Local Currency
          </p>
        </header>
        <div className="max-w-4xl mx-auto px-3 w-full">
          <ConversionCard />
          <div className="flex items-center justify-center flex-col mt-3 w-full">
            <span>Powered by Sui on Campus</span>
            <div className="w-full space-y-2">
              <h2 className="font-bold text-center text-lg">Price Stats</h2>
              <div className="text-center flex items-center gap-3 flex-col">
                {priceStats.map((s) => (
                  <div key={s.id} className="flex items-center gap-5">
                    <h4 className="text-lg">{s.currency}</h4>
                    <p
                      className={cn(
                        s.id !== "1" ? "text-destructive" : "text-[#22E164]",
                        "font-semibold"
                      )}
                    >
                      {s.stat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
