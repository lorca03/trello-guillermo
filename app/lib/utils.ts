import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const priorityColors = {
  High: "bg-red-300 text-red-700",
  Mid: "bg-yellow-300 text-yellow-700",
  Low: "bg-green-300 text-green-700",
} as const;