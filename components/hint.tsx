// ///this file is for showing hint like tooltip on hover///

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface hintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right" /*
	In TypeScript, the ? symbol used in the context of type definitions or function parameters denotes that the preceding identifier is optional. This means that when you're defining an interface, type, or function, you can specify certain properties or parameters as not strictly required.*/;

  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

export const Hint = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: hintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        {/* // delayDuration shows the time gap to apppear the tooltip */}
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
