import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaPaw } from "react-icons/fa";
import { Button } from "./ui/button";

export default async function Header() {
  const session = await auth();
  return (
    <header className="p-6 py-4 shadow h-20">
      <div className="max-w-screen-2xl m-auto h-full flex  justify-between items-center max-w-">
        <a href="/" className="text-primary">
          <FaPaw fontSize={40} />
        </a>
        {session?.user ? (
          <div className="flex gap-4 items-center">
            <Button size="sm">
              <a href="/publish">Anunciar</a>
            </Button>
            {/* <Button size="sm" variant="outline">
              <a href="/chats">Mensagens</a>
            </Button> */}
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="border shadow cursor-pointer">
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>
                    {session.user.email?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="max-w-40 p-1">
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <div className="flex flex-col ">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="justify-start focus-visible:ring-transparent"
                      asChild
                    >
                      <a href="/profile">Minha Conta</a>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="justify-start focus-visible:ring-transparent"
                      asChild
                    >
                      <a href="/user-announcements">Meus anúncios</a>
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      variant="ghost"
                      className="justify-start focus-visible:ring-transparent"
                    >
                      Sair
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Button asChild>
              <a href="/login">Anunciar</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/login">Entrar</a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
