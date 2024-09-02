// components/ChatWindow.tsx
"use client";

import { Button } from "@/components/ui/button";
import { sendMessage } from "@/lib/actions/chat";
import { useFormState } from "react-dom";
import ChatMessage from "./ChatMessage";

interface ChatWindowProps {
  chat: any;
  userId: string;
}

export default function ChatWindow({ chat, userId }: ChatWindowProps) {
  const [state, formAction] = useFormState(sendMessage as any, null);

  return (
    <div>
      <div className="mb-4 h-full p-4 border rounded-lg shadow overflow-y-auto">
        {chat?.messages.map((message: any) => (
          <ChatMessage userId={userId} message={message} key={message.id} />
        ))}
      </div>
      <form action={formAction} className="flex space-x-2">
        <input type="hidden" name="chatId" value={chat.id} />
        <input
          required
          type="text"
          name="content"
          className="flex-grow p-2 border rounded-lg"
          placeholder="Digite sua mensagem..."
        />
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
