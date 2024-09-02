import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AnnouncementsList from "./AnnouncementsList";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.email !== "kallebegomesmendes@gmail.com") redirect("/");

  return (
    <main className="flex flex-col items-center justify-center max-w-screen-2xl m-auto p-8">
      <h1 className="text-lg font-bold mb-8">Aprovar Anúncios</h1>
      <AnnouncementsList />
    </main>
  );
}
