import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function idToColor(colorId: number): string{
  return COLORS[colorId%COLORS.length];
}