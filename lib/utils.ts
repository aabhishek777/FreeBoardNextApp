import {
  Camera,
  Color,
  LayerTypes,
  Layers,
  PathLayer,
  Point,
  Side,
  XYWH,
} from "@/type/canvas";
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
    height: bounds.height,
    width: bounds.width,
  };
  //TODO have to fix some issues in resizing//
  if ((corner & Side.Left) === Side.Left) {
    console.log("left");

    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }
  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }
  if ((corner & Side.Top) === Side.Top) {
    console.log("top");
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }
  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}

export function findIntersectingLayerWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layers>,
  a: Point,
  b: Point
) {
  const rect: XYWH = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (let layerId of layerIds) {
    const layer = layers.get(layerId);
    if (layer == null) {
      continue;
    }

    const {x, y, width, height} = layer;
    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }

  return ids;
}

export function penPointsToPathLayer(
  points: [number, number, number][],
  color: Color
): PathLayer {
  if (points.length < 2) {
    throw new Error("Point length cannot be less than 2");
  }
  let top = Number.POSITIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let left = Number.POSITIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }
    if (top > y) {
      top = y;
    }
    if (right < x) {
      right = x;
    }
    if (bottom < y) {
      bottom = y;
    }
  }
  return {
    type: LayerTypes.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}
