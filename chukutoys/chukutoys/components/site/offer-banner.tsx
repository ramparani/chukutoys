"use client";

import { useState, useEffect } from "react";
import { callStrapiAPI } from "@/server/utils/backend";
import { Product } from "@/lib/products";

type Banner = {
  banner_description: string;
  banner_backgroundColor: string;
  banner_TextColor: string
};

export default function OfferBanner() {
  const [open, setOpen] = useState(true);
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    async function fetchBanner() {
      const pageResponse = await callStrapiAPI(
        `/banners`,
        "Error fetching page",
        "GET"
      );      
      
      const bannerData = pageResponse && pageResponse[0] as Banner;
      setBanner(bannerData);
    }

    fetchBanner();
  }, []);

  if (!open || !banner) return null;

  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm">
        <p className="text-pretty">
          { banner.banner_description}
        </p>
        <button
          type="button"
          aria-label="Dismiss offers banner"
          className="underline decoration-1 underline-offset-2"
          onClick={() => setOpen(false)}
        >
          Hide
        </button>
      </div>
    </div>
  );
}
