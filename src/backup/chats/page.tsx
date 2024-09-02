// app/chats/page.tsx
import { listUserChats } from "@/lib/data/chat";

export default async function ChatsPage() {
  const { chats, userId } = await listUserChats();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Seus Chats</h1>
      <div className="h-full flex flex-col gap-4">
        {chats.map((chat) => {
          const lastMessage = chat.messages[0];
          const isOwner = chat.donation.userId === userId;
          const otherUser = isOwner ? chat.donation.user : chat.interestedUser;

          return (
            <a href={`/chats/${chat.id}`} key={chat.id}>
              <div className="block p-4 border rounded-lg shadow hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold">{chat.donation.title}</h2>
                    <p className="text-sm text-gray-600">{otherUser.name}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {/* {lastMessage &&
                    formatDistanceToNow(new Date(lastMessage.createdAt), {
                      addSuffix: true,
                    })} */}
                  </div>
                </div>
                <p className="mt-2 text-gray-800">
                  {lastMessage
                    ? lastMessage.content
                    : "Sem mensagens ainda ..."}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
