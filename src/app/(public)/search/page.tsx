"use client";

import { Suspense } from "react";
import SearchQueryContext from "@/components/search-query-context";

export default function SearchPage() {
  return (
    <div className="w-full pt-10 pb-64 relative lg:pb-80">
      <div className="absolute top-0 left-0 w-full h-[500px] hero-gradient z-0"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 -mb-32 relative z-10">
        <div className="bg-white p-2 rounded-xl shadow-2xl border border-blue-100">
          <Suspense>
            <SearchQueryContext />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
