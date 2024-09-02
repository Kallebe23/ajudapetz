// app/chats/[chatId]/page.tsx
import { findChat } from "@/lib/data/chat";
import ChatWindow from "./ChatWindow";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatMessagesPage({ params }: ChatPageProps) {
  const { chat, userId } = await findChat(params.chatId);

  return (
    <main className="h-[calc(100vh-80px)]">
      <h1 className="text-2xl font-bold mb-4">{chat.donation.title}</h1>
      <ChatWindow chat={chat} userId={userId} />
    </main>
  );
}
