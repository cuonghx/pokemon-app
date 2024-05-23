import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[140px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[140px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[140px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[140px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
    </div>
  );
}
