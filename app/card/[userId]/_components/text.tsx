import React, { useState, useEffect } from "react";
import { cn, rgbToHexColor } from "@/lib/utils";
import { Layers } from "@/type/canvas";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TextProps {
  id: string;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  layer: Layers;
  selectionColor?: string;
}

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

export const Text = ({ id, onPointerDown, layer, selectionColor }: TextProps) => {
  const { x, y, height, width, fill, value } = layer;
  const [html, setHtml] = useState(value || "text");

  useEffect(() => {
    setHtml(value || "text");
  }, [value]);

  const handleChange = (e: ContentEditableEvent) => {
    console.log("handleChange");
    setHtml(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        onPointerDown={(e) => {
          console.log("pointerdown in contentEditable");
          console.log(e.target);
        }}
        html={html} 
        disabled={false}
        onChange={(e) => {
          console.log('onchange');
          console.log(e);
          
        }}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none drop-shadow-md",
          font.className
        )}
        style={{
          color: fill ? rgbToHexColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};
