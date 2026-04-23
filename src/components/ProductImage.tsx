"use client";
import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
};

export default function ProductImage({
  src,
  alt,
  width = 400,
  height = 400,
}: Props) {
  return (
    <Image
      src={src || "/images/placeholder.png"}
      alt={alt}
      width={width}
      height={height}
      className="rounded-xl mx-auto object-cover"
      onError={(e) => {
        e.currentTarget.src = "/images/placeholder.png";
      }}
    />
  );
}
