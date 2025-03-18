"use client";
import { ViewAllCard } from "@/components/card/ViewAllCard";
import ViewDeposit from "@/components/deposit/ViewDeposit";

export default function page() {
  return (
    <div className="min-h-screen py-32 bg-white ">
      <div className=" max-w-2xl mx-auto  space-y-8">
        <ViewDeposit />
        <ViewAllCard />

      </div>
    </div>
  )
}
