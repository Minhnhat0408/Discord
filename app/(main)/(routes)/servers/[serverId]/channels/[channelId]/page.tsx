import ChatHeader from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type ChannelIDPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

const ChannelIdPage = async ({ params }: ChannelIDPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  // fetch channel data
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  // see if member is in server
  const member = await db.member.findFirst({
    where: {
      serverID: params.serverId,
      profileID: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect(`/`);
  }

  const { serverId, channelId } = params;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader serverId={serverId} name={channel.name} type="channel" />
    </div>
  );
};

export default ChannelIdPage;
