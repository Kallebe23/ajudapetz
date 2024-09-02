import { getUser } from "@/lib/data/user";
import ProfileForm from "./Form";

export default async function PublishPage() {
  const user = await getUser();

  return (
    <main className="max-w-screen-2xl	m-auto p-4">
      <h1 className="text-lg font-bold mb-8">Meu Perfil</h1>
      <ProfileForm user={user} />
    </main>
  );
}
