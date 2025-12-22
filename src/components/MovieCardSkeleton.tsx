import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton = memo(() => {
  return (
    <div className="rounded-lg bg-card border border-border overflow-hidden">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
});

MovieCardSkeleton.displayName = "MovieCardSkeleton";

export default MovieCardSkeleton;
