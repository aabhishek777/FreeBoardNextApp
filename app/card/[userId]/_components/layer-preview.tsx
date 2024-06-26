import React, { memo } from "react";
import { useStorage } from "@/liveblocks.config";
import { LayerTypes } from "@/type/canvas";
import { Rectangle } from "./rectangle";
import { Ellips } from "./ellips";
import { Text } from "./text";
import {Path} from "./path";
import {rgbToHexColor} from "@/lib/utils";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerTypes.Path:
        return (
          <Path
            x={layer.x}
            y={layer.y}
            points ={layer.points}
            onPointerDown={e => onLayerPointerDown(e,id)}
            fill={layer.fill? rgbToHexColor(layer.fill):"#000"}

            stroke={selectionColor}
          />
        );
      case LayerTypes.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerTypes.Ellips:
        return (
          <Ellips
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerTypes.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );

      default:
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
