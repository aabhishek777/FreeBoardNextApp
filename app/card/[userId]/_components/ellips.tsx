import {rgbToHexColor} from "@/lib/utils";
import {Color, Layers} from "@/type/canvas";


interface EllipsProps{
	id: string;
	layer: Layers,
	onPointerDown: (e: React.PointerEvent,layerId:string) => void;
	selectionColor?: string;

}



export const Ellips=({
	id,
	layer,
	onPointerDown,
	selectionColor
}:EllipsProps) => {
  return (
	  <ellipse
		  className="drop-shadow-md"
		  onPointerDown={(e)=>	onPointerDown(e,id)}
		  stroke={selectionColor||"transparent"}
		  style={{
			  transform: `translate(
			 ${layer.x}px,
			 ${layer.y}px
			  )`
		  }}
		  cx={layer.width/2}
		  cy={layer.height/2}
		  rx={layer.width/2}
		  ry={layer.height/2}
		  fill={layer.fill? rgbToHexColor(layer.fill):"#000"}
		  strokeWidth="1"
		  
	  />
  )
}
