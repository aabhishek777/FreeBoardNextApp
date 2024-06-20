"use client";

import {useStorage} from "@/liveblocks.config";
import {LayerTypes} from "@/type/canvas";
import React, {memo} from "react";
import {Rectangle} from "./rectangle";
import {Ellips} from "./ellips";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({id, onLayerPointerDown, selectionColor}: LayerPreviewProps) => {
    const layer=useStorage((root) => root.layers.get(id));
    
    console.log(layer);
    

    if (!layer) {
      return null;
    }

    switch (layer.type) {

      case LayerTypes.Ellips:
        return (
          <Ellips
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        )
      case LayerTypes.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );

      default: {
        console.log("not layyers present");
        return null;
      }
    }
  }
);

LayerPreview.displayName = "LayerPreview";
