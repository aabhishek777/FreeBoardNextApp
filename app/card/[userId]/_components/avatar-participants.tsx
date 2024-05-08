import {Hint} from "@/components/hint";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";

interface AvatarProps {
  src?: string;
  name: string;
  fallback: string;
  borderColor: string;
}

const AvatarParticipant = ({src, name, fallback, borderColor}: AvatarProps) => {
  return (
    <Hint sideOffset={10} label={name || "Teammate"}>
      <Avatar className="h-10 w-10 border-2" style={{borderColor}}>
        <AvatarImage src={src} alt="user avatar"></AvatarImage>
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default AvatarParticipant;
