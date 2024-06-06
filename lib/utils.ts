import {Camera, Color} from "@/type/canvas";
import {type ClassValue, clsx} from "clsx";
import React from "react";
import {twMerge} from "tailwind-merge";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function idToColor(colorId: number): string {
  return COLORS[colorId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  Camera: Camera
) {
  return {
    x: Math.round(e.clientX) - Camera.x,
    y: Math.round(e.clientY) - Camera.y,
  };
}

export function rgbToHexColor(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`.trim();
}
