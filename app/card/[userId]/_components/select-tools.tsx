"use client";

import {useSelectionBound} from "@/hooks/use-selection-bound";
import {useMutation, useSelf} from "@/liveblocks.config";
import {Camera, Color} from "@/type/canvas";
import {memo} from "react";
import {ColorPicker} from "./color-picker";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {useDeleteSelectedLayer} from "@/hooks/use-delete-selection";

interface SelectToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectTools = memo(
  ({camera, setLastUsedColor}: SelectToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const bounds = useSelectionBound();

    
    
    const setFill=useMutation((
      {storage},
      fill: Color,
    ) => {
      
      const livelayers=storage.get("layers");
      setLastUsedColor(fill);

      selection.forEach((id) => {
        livelayers.get(id)?.set("fill",fill);
      })
    },[selection,setLastUsedColor]);


    const deleteLayer=useDeleteSelectedLayer();
    if (!bounds) return null;
    const x = bounds.width / 2 + bounds.x + camera.x;
    const y = bounds.y + camera.y;
    console.log({x,y});

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
        <ColorPicker onChange={setFill} />
        <div className=" flex justify-center
        items-center border-l">
          <Hint label="Delete">
            <Button variant="board"
            onClick={deleteLayer}>
              <Trash2/>
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);
