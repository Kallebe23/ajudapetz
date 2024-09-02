"use client";

export default function ChatMessage({
  message,
  userId,
}: {
  message: any;
  userId: string;
}) {
  // const messageDate = useMemo(() => {
  //   return new Date(message.createdAt).toLocaleString();
  // }, [message]);

  return (
    <div
      className={`flex ${
        message.senderId === userId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        key={message.id}
        className={`p-2 my-2 rounded-lg ${
          message.senderId === userId
            ? "bg-blue-200 text-right"
            : "bg-gray-200 text-left"
        }`}
      >
        <p className="text-sm">{message.sender.name}</p>
        <p>{message.content}</p>
        {/* <p className="text-xs text-gray-500">{messageDate}</p> */}
      </div>
    </div>
  );
}
