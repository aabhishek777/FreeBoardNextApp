"use client";

import {useStorage} from "@/liveblocks.config";
import {LayerTypes} from "@/type/canvas";
import {root} from "postcss";
import React, {memo} from "react";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({id, onLayerPointerDown, selectionColor}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerTypes.Rectangle:
        return <div>Rectangle</div>;

      default: {
        console.warn("not layyers present");
        return null;
      }
    }
  }
);

LayerPreview.displayName = "LayerPreview";
