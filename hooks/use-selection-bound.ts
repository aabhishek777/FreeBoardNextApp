import {useSelf, useStorage} from "@/liveblocks.config";
import {Layers, XYWH} from "@/type/canvas";
import {shallow} from "@liveblocks/client";
//TODO NEED TO FIX THE HIEGHT AND WIDTH CALCULATION
const boundingBox = (layers: Layers[]): XYWH | null => {
  const first = layers[0];

  if (!first) return null;

  let left = first.x;

  let right = first.x + first.width;

  let top = first.y;

  let bottom = first.y + first.height;

  for (let index = 0; index < layers.length; index++) {
    const {x, y, width, height} = layers[index];

    if (left > x) left = x;

    if (right < x + width) right = x + width;

    if (top < y) top = y;

    if (bottom > x + height) bottom = x + height;
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

export const useSelectionBound = () => {
  const selection = useSelf((me) => me.presence.selection);

  // console.log(selection);

  return useStorage((root) => {
    const selectedLayer = selection
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean);

    // console.log(boundingBox(selectedLayer));
    return boundingBox(selectedLayer);
  }, shallow);
};
