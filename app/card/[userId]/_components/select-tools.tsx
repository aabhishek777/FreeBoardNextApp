"use client";

import {useSelectionBound} from "@/hooks/use-selection-bound";
import {useSelf} from "@/liveblocks.config";
import {Camera, Color} from "@/type/canvas";
import {memo} from "react";
import {ColorPicker} from "./color-picker";

interface SelectToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectTools = memo(
  ({camera, setLastUsedColor}: SelectToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const bounds = useSelectionBound();

    if (!bounds) return null;
    const x = bounds.width / 2 + bounds.x + camera.x;
    const y = bounds.y + camera.y;
    console.log({x, y});

    return (
      <div
        className="absolute p-2 flex border shadow-sm rounded-md bg-white select-none"
        style={{
          transform: `translate(
			calc(${x}px - 50%),
			calc(${y - 16}px - 100%)
			)`,
        }}
      >
        <ColorPicker onChange={() => {}} />
      </div>
    );
  }
);
