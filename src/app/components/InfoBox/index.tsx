import InfoIcon from "@/app/icons/InfoIcon";
import React from "react";

interface InfoBoxProps {
  title: string;
}

export default function InfoBox({ title }: InfoBoxProps) {
  return (
    <div className="flex gap-2 bg-[#f7f7f7] border border-[#ddd] p-4 m-4 rounded-md">
      <InfoIcon width={24} height={24} />
      <h1>{title}</h1>
    </div>
  );
}
