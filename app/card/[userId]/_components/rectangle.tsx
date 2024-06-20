import {rgbToHexColor} from "@/lib/utils";
import {RectangleLayer} from "@/type/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const {x, y, height, width, fill} = layer;
  
  return (
    <rect
      className=" drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e,id)}
      style={{transform: `translate(${x}px, ${y}px)`}}
      x={0}
      y={0}
      height={height}
      width={width}
      strokeWidth={1}
      fill={fill? rgbToHexColor(fill):"#000"}
      stroke={selectionColor||"transparent"}
    />
  );
};
