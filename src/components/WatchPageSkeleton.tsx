import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WatchPageSkeleton = memo(() => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav skeleton */}
      <div className="sticky top-0 z-50 bg-card/95 border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-20" />
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Movie info header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Skeleton className="w-28 sm:w-36 aspect-[2/3] rounded-xl mx-auto sm:mx-0" />
          <div className="flex-1 space-y-3 w-full">
            <Skeleton className="h-8 w-3/4 mx-auto sm:mx-0" />
            <div className="flex gap-2 justify-center sm:justify-start">
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
            <div className="flex gap-2 justify-center sm:justify-start">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>

        {/* Video player skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="aspect-video w-full rounded-xl" />
        </div>

        {/* Support buttons */}
        <div className="flex gap-2 justify-center sm:justify-start">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Recommendations skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

WatchPageSkeleton.displayName = "WatchPageSkeleton";

export default WatchPageSkeleton;
