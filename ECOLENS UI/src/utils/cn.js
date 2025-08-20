import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(
    clsx(
      inputs
        .flatMap((cls) => typeof cls === 'string' ? cls.split(" ") : cls)
        .map((token) => (token === "duration-3" ? "duration-300" : token))
        .filter(Boolean)
    )
  );
}
