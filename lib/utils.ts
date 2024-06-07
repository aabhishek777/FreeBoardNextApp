import {Camera, Color, Point, Side, XYWH} from "@/type/canvas";
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

export function resizeBounds(corner: Side, bounds: XYWH, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    height: 1,
    width: 2,
  };

  if ((corner && Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }
  if ((corner && Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(-bounds.x + point.x);
  }
  if ((corner && Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }
  if ((corner && Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}
