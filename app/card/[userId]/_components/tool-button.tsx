"use client";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {LucideIcon} from "lucide-react";

interface ToolButtonProps {
  label: string;
  isActive?: boolean;
  isDiabled?: boolean;
  onClick: () => void;
  icon: LucideIcon;
}

export const ToolButton = ({
  label,
  isActive,
	onClick,
  isDiabled,
  icon: Icon
}: ToolButtonProps) => (
  <Hint side="right" label={label}>
	  <Button variant={isActive? "boardActive":"board"} onClick={onClick}
		  disabled={isDiabled}
		  size='icon'
	  >
		  
      <Icon />
    </Button>
  </Hint>
);
