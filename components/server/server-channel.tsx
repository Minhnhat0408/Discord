"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();
  const routers = useRouter();

  const { onOpen } = useModal();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    routers.push(`/servers/${server.id}/channels/${channel.id}`);
  };

  // stop edit and delete button from triggering channel click
  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { server, channel });
  };

  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="text-zinc-500 dark:text-zinc-400 flex-shrink-0 w-5 h-5" />
      <p
        className={cn(
          "line-clamp-1 text-left font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {/* Admin and mod can edit and delete not general channel */}
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="gap-x-2 flex items-center ml-auto">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => {
                onAction(e, "editChannel");
              }}
              className="group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 hidden w-4 h-4 transition"
            ></Edit>
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={() => {
                onOpen("deleteChannel");
              }}
              className="group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 hidden w-4 h-4 transition"
            ></Trash>
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <ActionTooltip label="General channel is locked">
          <Lock className="text-zinc-500 dark:text-zinc-400 w-4 h-4 ml-auto"></Lock>
        </ActionTooltip>
      )}
    </button>
  );
};

export default ServerChannel;
