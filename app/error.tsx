"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { replace, refresh } = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-screen h-screen flex justify-center items-center text-center">
      <div>
        <h2 className="text-xl pb-2">Something went wrong!</h2>
        <button
          className="bg-red-300 hover:bg-red-400 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
          onClick={
            // Attempt to recover by trying to re-render the segment
            async () => {
              startTransition(() => {
                replace(`${pathname}`);
                refresh();
                reset();
              });
            }
          }
        >
          Back to home page
        </button>
      </div>
    </div>
  );
}
