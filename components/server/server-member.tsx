"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "../user-avatar";

type ServerMemberProps = {
  member: Member & {
    profile: Profile;
  };
  server: Server;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className=" w-4 h-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className=" text-rose-500 w-4 h-4 mr-2" />,
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const routers = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    routers.push(`/servers/${server.id}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 mb-1 transition",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {icon}
      <UserAvatar
        src={member.profile.imageUrl}
        className="md:w-8 md:h-8 w-8 h-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 text-left line-clamp-1 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
    </button>
  );
};

export default ServerMember;
