import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  src?: string;
  className?: string;
};

const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src}></AvatarImage>
    </Avatar>
  );
};

export default UserAvatar;